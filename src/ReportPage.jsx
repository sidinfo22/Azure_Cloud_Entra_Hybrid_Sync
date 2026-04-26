import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { pages } from './pages';
import { reportContent } from './reportContent';

const DESCRIPTION =
  'A Summit Care Medical Clinic centralized identity and hybrid network architecture report covering Azure-hosted Active Directory, Microsoft Entra ID, Entra Connect Sync, master-leaf one-way trusts, Meraki VPN hubs, Azure VPN Gateway, GPO logon restrictions, SSO, MFA, RBAC, password writeback, and HIPAA-aligned safeguards.';

function updateMeta(page) {
  document.title = page.title || 'Centralized Identity & Hybrid Network Architecture | Summit Care Medical Clinic';

  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', DESCRIPTION);
}

function SectionBlock({ section }) {
  const renderItemContent = (item) => {
    if (item.points) {
      return (
        <ul className="report-list report-list-tight">
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      );
    }

    if (item.metrics) {
      return (
        <div className="report-bars report-bars-compact">
          {item.metrics.map((metric) => (
            <div key={metric.label} className="report-bar-row">
              <div className="report-bar-copy">
                <span>{metric.label}</span>
                <strong>{metric.value}%</strong>
              </div>
              <div className="report-bar-track">
                <div className="report-bar-fill" style={{ width: `${metric.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    return item.body ? <p>{item.body}</p> : null;
  };

  return (
    <section className="report-section">
      <div className="report-section-heading">
        {section.kicker ? <p className="report-section-eyebrow">{section.kicker}</p> : null}
        <h2 className="report-section-title">{section.title}</h2>
        {section.lead ? <p className="report-section-lead">{section.lead}</p> : null}
      </div>

      {section.kind === 'cards' ? (
        <div className="report-card-grid">
          {section.items.map((item) => (
            <article key={item.title} className="report-card">
              <h3>{item.title}</h3>
              {renderItemContent(item)}
            </article>
          ))}
        </div>
      ) : null}

      {section.kind === 'split' ? (
        <div className="report-split-grid">
          {section.items.map((item) => (
            <article key={item.title} className="report-split-card">
              <h3>{item.title}</h3>
              {renderItemContent(item)}
            </article>
          ))}
        </div>
      ) : null}

      {section.kind === 'list' ? (
        <ul className="report-list">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {section.kind === 'timeline' ? (
        <div className="report-timeline">
          {section.items.map((item, index) => (
            <div key={item} className="report-timeline-item">
              <span className="report-timeline-index">{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      ) : null}

      {section.kind === 'bars' ? (
        <div className="report-bars">
          {section.items.map((item) => (
            <div key={item.label} className="report-bar-row">
              <div className="report-bar-copy">
                <span>{item.label}</span>
                <strong>{item.value}%</strong>
              </div>
              <div className="report-bar-track">
                <div className="report-bar-fill" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {section.kind === 'table' ? (
        <div className="report-table-shell">
          <table className="report-table">
            <thead>
              <tr>
                {section.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {section.callout ? <div className="report-callout">{section.callout}</div> : null}
    </section>
  );
}

export function ReportPage({ page }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactState, setContactState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    status: 'idle',
    feedback: '',
  });

  useEffect(() => {
    updateMeta(page);
  }, [page]);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page.slug]);

  const content = reportContent[page.slug] || reportContent.index;
  const pageIndex = pages.findIndex((entry) => entry.slug === page.slug);
  const previousPage = pageIndex > 0 ? pages[pageIndex - 1] : null;
  const nextPage = pageIndex >= 0 && pageIndex < pages.length - 1 ? pages[pageIndex + 1] : null;

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const isHome = page.slug === 'index';

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !contactState.name.trim() ||
      !contactState.email.trim() ||
      !contactState.subject.trim() ||
      !contactState.message.trim()
    ) {
      setContactState((current) => ({
        ...current,
        status: 'error',
        feedback: 'Please fill out all contact fields before sending your message.',
      }));
      return;
    }

    if (import.meta.env.PROD) {
      setContactState((current) => ({
        ...current,
        status: 'success',
        feedback:
          'This static GitHub Pages version does not send form submissions. Please use the email or phone link shown here.',
      }));
      return;
    }

    setContactState((current) => ({
      ...current,
      status: 'submitting',
      feedback: '',
    }));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactState.name,
          email: contactState.email,
          subject: contactState.subject,
          message: contactState.message,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message right now.');
      }

      setContactState({
        name: '',
        email: '',
        subject: '',
        message: '',
        status: 'success',
        feedback: 'Your message was sent successfully.',
      });
    } catch (error) {
      setContactState((current) => ({
        ...current,
        status: 'error',
        feedback: error.message || 'Unable to send your message right now.',
      }));
    }
  }

  return (
    <div className="report-app-shell">
      <header className="report-topbar">
        <div className="report-topbar-inner">
          <p>Centralized identity, hybrid networking, Microsoft Entra ID, and infrastructure workflow by Sidiq Daniel</p>
        </div>
      </header>

      <div className="report-background" />

      <div className="report-frame">
        <header className="report-header">
          <Link to="/" className="report-brand">
            <img
              src={`${import.meta.env.BASE_URL}images/daters.png`}
              alt="Summit Care Centralized Identity Architecture icon"
              className="report-brand-mark"
            />
            <div className="report-brand-copy">
              <strong>Summit Care Identity Architecture</strong>
              <span>React Report Experience</span>
            </div>
          </Link>

          <nav className="report-nav-inline" aria-label="Primary navigation">
            {pages.map((entry) => (
              <NavLink
                key={entry.slug}
                to={entry.route}
                className={({ isActive }) =>
                  `report-nav-inline-link ${isActive ? 'is-active' : ''}`
                }
              >
                {entry.slug === 'index' ? 'Home' : entry.title.split('|')[0].trim()}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className={`report-menu-toggle ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

        </header>

        <nav className={`report-nav-drawer ${menuOpen ? 'is-open' : ''}`}>
          <div className="report-nav-drawer-inner">
            <p className="report-nav-label">Navigate The Report</p>
            {pages.map((entry) => (
              <NavLink
                key={entry.slug}
                to={entry.route}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `report-nav-link ${isActive ? 'is-active' : ''}`
                }
              >
                {entry.slug === 'index' ? 'Home' : entry.title.split('|')[0].trim()}
              </NavLink>
            ))}
          </div>
        </nav>

        <main className="report-main">
          {!isHome && (previousPage || nextPage) ? (
            <div className="report-page-rail">
              <div className="report-page-rail-side">
                {previousPage ? (
                  <Link to={previousPage.route} className="report-page-rail-link">
                    <span className="report-page-rail-arrow" aria-hidden="true">
                      ←
                    </span>
                    <span>{previousPage.title.split('|')[0].trim()}</span>
                  </Link>
                ) : null}
              </div>
              <div className="report-page-rail-side report-page-rail-side-right">
                {nextPage ? (
                  <Link to={nextPage.route} className="report-page-rail-link">
                    <span>{nextPage.title.split('|')[0].trim()}</span>
                    <span className="report-page-rail-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                ) : null}
              </div>
            </div>
          ) : null}

          <section className="report-hero">
            <div className="report-hero-copy">
              <p className="report-eyebrow">{content.eyebrow}</p>
              <h1>{content.heroTitle}</h1>
              <p className="report-lead">{content.heroText}</p>

              {content.heroMeta ? (
                <div className="report-meta-pills">
                  {content.heroMeta.map((item) => (
                    <span key={item} className="report-pill">
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <aside className="report-hero-panel">
              <p className="report-panel-label">Current Page</p>
              <h2>{page.title.split('|')[0].trim()}</h2>
              <p>
                On-premises Active Directory remains the identity foundation while
                SCGLOBAL in Azure centralizes global identity while campus domains stay
                isolated through one-way trusts, VPN routing, and GPO restrictions.
              </p>
              <div className="report-page-jump">
                {previousPage ? (
                  <Link to={previousPage.route} className="report-page-jump-link">
                    <span>Previous</span>
                    {previousPage.title.split('|')[0].trim()}
                  </Link>
                ) : null}
                {nextPage ? (
                  <Link to={nextPage.route} className="report-page-jump-link">
                    <span>Next</span>
                    {nextPage.title.split('|')[0].trim()}
                  </Link>
                ) : null}
              </div>
            </aside>
          </section>

          {content.stats ? (
            <section className="report-stat-grid">
              {content.stats.map((item) => (
                <article key={item.label} className="report-stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </section>
          ) : null}

          {content.cards ? (
            <section className="report-feature-grid">
              {content.cards.map((item) => (
                <Link key={item.title} to={item.href} className="report-feature-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span>Open section</span>
                </Link>
              ))}
            </section>
          ) : null}

          {content.sections.map((section) => (
            <SectionBlock key={section.title} section={section} />
          ))}
        </main>

        <footer className="report-footer">
          {!isHome ? (
            <section className="report-footer-nav">
              <div>
                <p className="report-footer-eyebrow">Continue Through The Report</p>
                <h2>Move between the major hybrid identity workflow sections.</h2>
              </div>
              <div className="report-footer-links">
                {previousPage ? (
                  <Link to={previousPage.route} className="report-footer-link secondary">
                    {previousPage.title.split('|')[0].trim()}
                  </Link>
                ) : null}
                <Link to="/" className="report-footer-link ghost">
                  Home
                </Link>
                {nextPage ? (
                  <Link to={nextPage.route} className="report-footer-link primary">
                    {nextPage.title.split('|')[0].trim()}
                  </Link>
                ) : null}
              </div>
            </section>
          ) : null}

          <section className="report-contact">
            <div className="report-contact-copy">
              <p className="report-footer-eyebrow">Let's Connect</p>
              <h2>Open to thoughtful infrastructure work and technical collaboration.</h2>
              <p>
                Reach out for project collaboration, infrastructure engineering opportunities,
                or technical conversations around Microsoft Entra ID, Active Directory,
                Microsoft 365, identity security, VPN architecture, HIPAA-aligned safeguards,
                and hybrid cloud operations.
              </p>
              <div className="report-contact-direct">
                <a href="mailto:Sidinfo21@gmail.com">Sidinfo21@gmail.com</a>
                <a href="tel:+15163686457">(516) 368-6457</a>
              </div>
            </div>

            <form className="report-contact-form" onSubmit={handleSubmit}>
              <div className="report-form-grid">
                <input
                  type="text"
                  placeholder="Name"
                  value={contactState.name}
                  onChange={(event) =>
                    setContactState((current) => ({ ...current, name: event.target.value }))
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={contactState.email}
                  onChange={(event) =>
                    setContactState((current) => ({ ...current, email: event.target.value }))
                  }
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="report-form-full"
                  value={contactState.subject}
                  onChange={(event) =>
                    setContactState((current) => ({ ...current, subject: event.target.value }))
                  }
                />
                <textarea
                  placeholder="Message"
                  className="report-form-full"
                  value={contactState.message}
                  onChange={(event) =>
                    setContactState((current) => ({ ...current, message: event.target.value }))
                  }
                />
              </div>
              <div className="report-form-actions">
                <button type="submit" disabled={contactState.status === 'submitting'}>
                  {contactState.status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                {contactState.feedback ? (
                  <p
                    className={`report-form-feedback ${
                      contactState.status === 'error' ? 'is-error' : 'is-success'
                    }`}
                  >
                    {contactState.feedback}
                  </p>
                ) : null}
              </div>
            </form>
          </section>

          <div className="report-legal">
            <span>New York, New York</span>
            <span>Design: Sidiq Daniel</span>
            <span>{currentYear}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
