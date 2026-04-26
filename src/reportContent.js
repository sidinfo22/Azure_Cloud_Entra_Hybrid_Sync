export const reportContent = {
  index: {
    eyebrow: 'Master Report',
    heroTitle: 'Summit Care Centralized Identity & Hybrid Network Architecture',
    heroText:
      'A detailed mock enterprise design for Summit Care Medical Clinic showing how Azure, Microsoft Entra ID, on-premises Active Directory, one-way domain trusts, Meraki site-to-site VPNs, Azure VPN Gateway, GPO logon restrictions, SSO, MFA, password hash sync, password writeback, and HIPAA-aligned safeguards can support secure nationwide clinic operations.',
    heroMeta: [
      'SCGLOBAL.LOCAL in Azure',
      'summitcare.org Entra Tenant',
      'Master-Leaf AD Trusts',
      'Hub-and-Spoke VPN',
      'HIPAA Identity Safeguards',
    ],
    stats: [
      { value: '10.90.0.0/16', label: 'Azure identity and VPN backbone' },
      { value: '10.91.0.0/16', label: 'East regional clinic network' },
      { value: '10.92.0.0/16', label: 'West regional clinic network' },
      { value: '1-way', label: 'Campus-to-SCGLOBAL trust model' },
    ],
    cards: [
      {
        title: 'Overview & Strategy',
        text: 'Explain the business purpose, identity tiers, central Azure role, and why Summit Care uses a master-leaf AD model instead of full campus trust mesh.',
        href: '/objectives',
      },
      {
        title: 'Architecture & Deployment',
        text: 'Detail the Azure hub, regional VPN hubs, campus spokes, IP scheme, trust paths, DNS forwarding, and Microsoft Entra hybrid sync build.',
        href: '/deploy',
      },
      {
        title: 'Operations & Isolation',
        text: 'Document sync health checks, Task Scheduler recovery, Group Policy local logon restrictions, validation steps, and daily admin workflows.',
        href: '/voip',
      },
      {
        title: 'HIPAA & Governance',
        text: 'Summarize MFA, Conditional Access, RBAC, audit logs, offboarding, blockers, risk controls, and the final security value of the design.',
        href: '/hippa',
      },
    ],
    sections: [
      {
        kicker: 'Purpose',
        title: 'Centralized Identity With Local Campus Autonomy',
        lead:
          'Summit Care Medical Clinic needs one global identity control plane without removing the independence of each clinic location. The architecture uses SCGLOBAL.LOCAL, hosted in Azure, as the master identity authority for Tier A global users while each campus keeps its own local Active Directory domain for Tier B local staff, local GPOs, local resources, and local operations.',
      },
      {
        kicker: 'Core Concept',
        title: 'Azure Becomes The Identity Brain And Private Network Backbone',
        kind: 'cards',
        items: [
          {
            title: 'SCGLOBAL.LOCAL Master Domain',
            body:
              'The central Active Directory domain is hosted on Azure virtual machines. It stores Tier A identities such as traveling clinicians, executives, IT administrators, and corporate support users who may need to authenticate across multiple campuses.',
          },
          {
            title: 'summitcare.org Entra Tenant',
            body:
              'Microsoft Entra ID provides the cloud identity layer for Microsoft 365, Teams, Outlook, SSO, MFA, Conditional Access, password writeback, audit visibility, and cloud-based governance.',
          },
          {
            title: 'Campus Leaf Domains',
            body:
              'Each campus keeps its own AD domain, users, groups, GPOs, and resources. Campus users remain local unless they are intentionally elevated into a global Tier A workflow.',
          },
          {
            title: 'Private WAN-Like VPN Fabric',
            body:
              'Meraki VPN tunnels connect each campus to a regional hub, and each regional hub connects to Azure VPN Gateway. Campuses do not directly trust or directly route to one another.',
          },
        ],
        callout:
          'Key idea: nobody fully trusts every other campus. Each campus trusts SCGLOBAL for global authentication, while campus-to-campus lateral movement is intentionally blocked.',
      },
      {
        kicker: 'Identity Tiers',
        title: 'Tier A And Tier B Access Model',
        kind: 'table',
        columns: ['Tier', 'Stored In', 'Example User', 'Access Scope'],
        rows: [
          ['Tier A - Global', 'SCGLOBAL.LOCAL in Azure', 'sdaniel@summitcare.org', 'Can authenticate at authorized Summit Care campuses through the one-way trust model'],
          ['Tier B - Local', 'Local campus AD domain', 'frontdesk01@scqns.local', 'Restricted to the user home campus and blocked from logging into other campus workstations'],
          ['Privileged Admin', 'SCGLOBAL with RBAC and MFA', 'cloud-admin@summitcare.org', 'Uses least privilege, MFA, role separation, and audited administrative workflows'],
        ],
      },
      {
        kicker: 'Target Outcomes',
        title: 'What This Project Proves',
        kind: 'split',
        items: [
          {
            title: 'Technical Objectives',
            points: [
              'Establish SCGLOBAL.LOCAL in Azure as the central identity authority.',
              'Implement one-way trust relationships from every campus domain to SCGLOBAL.LOCAL.',
              'Allow Tier A global users to authenticate across approved campuses.',
              'Restrict Tier B local users to their own campus using AD design and GPO deny-local-logon controls.',
              'Create a secure hub-and-spoke VPN design using regional hubs and Azure VPN Gateway.',
              'Sync identity into Microsoft Entra ID for SSO, MFA, Conditional Access, password hash sync, and password writeback.',
            ],
          },
          {
            title: 'Operational Readiness',
            metrics: [
              { label: 'Global identity control', value: 94 },
              { label: 'Campus isolation', value: 91 },
              { label: 'HIPAA safeguard readiness', value: 88 },
              { label: 'Scalable network design', value: 86 },
            ],
          },
        ],
      },
    ],
  },
  objectives: {
    eyebrow: 'Section 1',
    heroTitle: 'Overview, Purpose & Master-Leaf Strategy',
    heroText:
      'This section defines Summit Care Medical Clinic as the mock organization, explains the master-leaf Active Directory model, separates global and local users, and frames Azure as the central identity and security control plane.',
    sections: [
      {
        title: 'Purpose',
        lead:
          'The purpose of this architecture is to centralize identity management while preserving local campus independence. Summit Care wants global staff to sign in anywhere they are authorized, but local campus users should not be able to roam into other campuses. Azure and Microsoft Entra ID provide the cloud control layer, while Active Directory trusts and VPN routing provide the private enterprise foundation.',
        kind: 'list',
        items: [
          'Centralize authentication for global staff and IT administrators.',
          'Maintain independent campus Active Directory domains for local staff, GPOs, and resources.',
          'Use one-way trusts so campuses trust the Azure-hosted master domain, but the master domain does not trust campus domains back.',
          'Avoid a full trust mesh between campuses, reducing lateral movement risk.',
          'Provide a private WAN-like path using Meraki VPN, regional hubs, and Azure VPN Gateway.',
          'Support cloud-based policy enforcement through Entra ID, MFA, Conditional Access, RBAC, SSO, and audit logs.',
        ],
      },
      {
        title: 'Mock Organization Naming',
        kind: 'table',
        columns: ['Design Item', 'Summit Care Value', 'Purpose'],
        rows: [
          ['Public cloud identity domain', 'summitcare.org', 'Verified Entra ID domain and user-facing UPN suffix'],
          ['Azure master AD domain', 'SCGLOBAL.LOCAL', 'Central identity authority for Tier A users and trust referrals'],
          ['East hub campus domain', 'SCQNS.LOCAL', 'Mock Queens regional hub and local campus AD domain'],
          ['West hub campus domain', 'SCPHX.LOCAL', 'Mock Phoenix regional hub and local campus AD domain'],
          ['Sample Tier A user', 'sdaniel@summitcare.org', 'Global user that can authenticate across approved campuses'],
        ],
      },
      {
        title: 'Master-Leaf Active Directory Model',
        kind: 'cards',
        items: [
          {
            title: 'Master Domain',
            body:
              'SCGLOBAL.LOCAL is hosted in Azure and functions as the root identity authority for Tier A users. It integrates with Microsoft Entra ID to support cloud authentication, MFA, Conditional Access, password writeback, and centralized audit visibility.',
          },
          {
            title: 'Leaf Domains',
            body:
              'Campus domains such as SCQNS.LOCAL, SCBKLYN.LOCAL, SCNWRK.LOCAL, SCPHX.LOCAL, SCDAL.LOCAL, and SCDEN.LOCAL operate independently. Each campus manages its own Tier B users, GPOs, devices, local resources, and day-to-day support.',
          },
          {
            title: 'No Campus Trust Mesh',
            body:
              'Campuses do not trust each other. A user from one campus cannot automatically authenticate into another campus unless that user is a Tier A identity from SCGLOBAL and has the proper authorization.',
          },
        ],
      },
      {
        title: 'One-Way Trust Behavior',
        kind: 'table',
        columns: ['Relationship', 'Trust Behavior', 'Security Meaning'],
        rows: [
          ['Campus -> SCGLOBAL', 'Campus domains trust SCGLOBAL.LOCAL', 'Campus domain controllers can forward Tier A authentication requests to Azure-hosted SCGLOBAL'],
          ['SCGLOBAL -> Campus', 'SCGLOBAL does not trust campus domains', 'Local campus identities cannot use the master domain as a bridge into other locations'],
          ['Campus <-> Campus', 'No direct trust', 'Prevents broad lateral movement and keeps campus identity boundaries intact'],
        ],
      },
      {
        title: 'Authentication Example',
        kind: 'timeline',
        items: [
          'A Tier A user signs in as sdaniel@summitcare.org at a workstation in the SCDAL.LOCAL Dallas campus.',
          'The Dallas domain controller checks the local domain and identifies that the user is not a local Dallas account.',
          'Because SCDAL.LOCAL trusts SCGLOBAL.LOCAL, the authentication request is referred across the private VPN path to the SCGLOBAL domain controller in Azure.',
          'SCGLOBAL validates the user credentials and returns the authentication result.',
          'The campus applies local authorization rules, device policies, and GPOs before allowing access to approved resources.',
        ],
      },
    ],
  },
  deploy: {
    eyebrow: 'Section 2',
    heroTitle: 'Architecture, IP Scheme, VPNs & Entra Sync Deployment',
    heroText:
      'This section documents the Azure central infrastructure, regional hub-and-spoke network, fresh Summit Care IP scheme, AD trust prerequisites, DNS forwarding, and Microsoft Entra hybrid identity sync deployment process.',
    sections: [
      {
        title: 'Fresh IP Addressing Plan',
        lead:
          'This mock Summit Care design uses a new private addressing model that is separate from the provided reference material. Azure owns the 10.90.0.0/16 backbone, the East region owns 10.91.0.0/16, and the West region owns 10.92.0.0/16.',
        kind: 'table',
        columns: ['Network Zone', 'CIDR', 'Example Systems'],
        rows: [
          ['Azure identity backbone', '10.90.0.0/16', 'SCGLOBAL domain controllers, Entra Connect server, management services, VPN gateway'],
          ['Azure identity subnet', '10.90.10.0/24', 'SCGLOBAL-DC01 10.90.10.10, SCGLOBAL-DC02 10.90.10.11, SC-SYNC01 10.90.10.20'],
          ['Azure VPN gateway subnet', '10.90.254.0/27', 'Azure VPN Gateway for hub-to-cloud tunnels'],
          ['East regional network', '10.91.0.0/16', 'Queens hub, Manhattan clinic, Brooklyn clinic, Newark clinic'],
          ['West regional network', '10.92.0.0/16', 'Phoenix hub, Dallas clinic, Denver clinic, Los Angeles clinic'],
        ],
      },
      {
        title: 'Regional Hub-and-Spoke VPN Design',
        kind: 'table',
        columns: ['Region', 'Hub', 'Spokes', 'VPN Path'],
        rows: [
          ['East', 'Queens Hub - 10.91.0.0/24', 'Manhattan 10.91.10.0/24, Brooklyn 10.91.20.0/24, Newark 10.91.30.0/24', 'Campus Meraki VPN -> Queens Hub -> Azure VPN Gateway'],
          ['West', 'Phoenix Hub - 10.92.0.0/24', 'Dallas 10.92.10.0/24, Denver 10.92.20.0/24, Los Angeles 10.92.30.0/24', 'Campus Meraki VPN -> Phoenix Hub -> Azure VPN Gateway'],
          ['Azure', 'SCGLOBAL Azure VNet - 10.90.0.0/16', 'Identity subnet, management subnet, gateway subnet', 'Regional hubs -> Azure VPN Gateway -> SCGLOBAL services'],
        ],
      },
      {
        title: 'Network Flow Rules',
        kind: 'cards',
        items: [
          {
            title: 'Campus To Hub',
            body:
              'Each campus establishes a Meraki site-to-site VPN to its regional hub. Spokes do not build direct tunnels to one another.',
          },
          {
            title: 'Hub To Azure',
            body:
              'Queens and Phoenix connect to Azure VPN Gateway. This gives each region a private path to SCGLOBAL domain controllers and the Entra hybrid identity services.',
          },
          {
            title: 'No Direct Campus Routing',
            body:
              'Manhattan cannot directly talk to Brooklyn, Dallas cannot directly talk to Denver, and East spokes cannot directly talk to West spokes. Traffic must follow controlled hub and Azure routes.',
          },
        ],
        callout:
          'End-to-end path: Campus -> Meraki VPN -> Regional Hub -> Azure VPN Gateway -> SCGLOBAL domain controller. This path enables Kerberos, LDAP, DNS, and trust validation without creating broad campus-to-campus trust.',
      },
      {
        title: 'AD Trust Prerequisites',
        kind: 'table',
        columns: ['Requirement', 'Summit Care Design', 'Reason'],
        rows: [
          ['DNS resolution', 'Conditional forwarders in every campus DNS server point SCGLOBAL.LOCAL to 10.90.10.10 and 10.90.10.11', 'Campus DCs must resolve the master domain before trust authentication can work'],
          ['Kerberos and LDAP reachability', 'VPN and firewall rules allow required AD traffic from campus DCs to SCGLOBAL DCs', 'Trust authentication depends on domain controller communication'],
          ['Time synchronization', 'Campus DCs and Azure DCs use reliable NTP hierarchy', 'Kerberos authentication is time-sensitive'],
          ['One-way trust creation', 'Each campus creates an outgoing trust to SCGLOBAL.LOCAL', 'Tier A users can authenticate at campuses without giving campus users global reach'],
          ['No campus trust', 'No direct trust between SCQNS, SCBKLYN, SCDAL, SCDEN, or other leaf domains', 'Maintains isolation and limits lateral movement'],
        ],
      },
      {
        title: 'Microsoft Entra Hybrid Sync Prerequisites',
        kind: 'table',
        columns: ['Area', 'Requirement', 'Validation'],
        rows: [
          ['Infrastructure', 'Active Directory 2016 or newer recommended, domain-joined Windows Server for sync, stable DNS', 'Confirm all domain controllers are reachable and healthy'],
          ['Accounts', 'Entra Global Administrator, on-prem Enterprise Admin, local admin on sync server', 'Use least privilege and remove temporary rights after deployment where possible'],
          ['Networking', 'Outbound HTTPS TCP 443 to Microsoft endpoints, no SSL inspection breaking sync traffic', 'Confirm the sync server can reach Microsoft cloud endpoints'],
          ['Identity design', 'UPN suffix matches verified summitcare.org domain, no duplicate UPN/proxyAddress/mail values', 'Run duplicate checks before initial sync'],
          ['Server placement', 'Dedicated domain-joined sync server SC-SYNC01 at 10.90.10.20 is preferred', 'A domain controller installation can work in a lab, but a dedicated member server is the stronger production pattern'],
        ],
      },
      {
        title: 'Pre-Deployment Health Checklist',
        kind: 'table',
        columns: ['Check', 'Command Or Location', 'Expected Result'],
        rows: [
          ['AD health', 'dcdiag /v', 'No critical domain controller, DNS, or replication failures'],
          ['Replication health', 'repadmin /replsummary', 'No failed replication partners or lingering replication issues'],
          ['Time sync', 'w32tm /query /status', 'Domain controllers use stable NTP and show accurate time'],
          ['Verified cloud domain', 'Microsoft Entra admin center -> Custom domain names', 'summitcare.org is verified through DNS TXT record'],
          ['UPN alignment', 'Active Directory Users and Computers or PowerShell', 'Users sign in as user@summitcare.org, not user@localdomain.local'],
          ['Clean attributes', 'AD attribute review', 'No duplicate UPN, mail, or proxyAddresses values'],
        ],
      },
      {
        title: 'Entra Connect Sync Implementation',
        kind: 'timeline',
        items: [
          'Prepare Active Directory by fixing dcdiag, repadmin, DNS, duplicate objects, and UPN suffix problems.',
          'Prepare the Microsoft Entra tenant by verifying summitcare.org, planning licenses, MFA, Conditional Access, SSPR, and group structure.',
          'Build or select the sync server. In this design SC-SYNC01 is domain joined, patched, assigned static IP 10.90.10.20, and dedicated to sync services.',
          'Download Microsoft Entra Connect Sync from the Microsoft Entra admin center and choose customized settings.',
          'Connect to the Microsoft tenant with the required Entra administrative role and connect to AD DS with the required on-prem permissions.',
          'Choose Password Hash Sync as the recommended authentication method. Seamless SSO and password writeback can be enabled when licensing and policy support them.',
          'Scope synchronization to approved OUs and filter out stale, service, test, or disabled objects that should not appear in the cloud.',
          'Run the initial sync and validate users, groups, UPNs, mail attributes, and sign-in behavior in Microsoft 365, Teams, Outlook, and Entra ID.',
        ],
      },
    ],
  },
  voip: {
    eyebrow: 'Section 3',
    heroTitle: 'Operations, GPO Isolation & Hybrid Identity Runbooks',
    heroText:
      'This section explains how Summit Care keeps sync healthy, prevents cross-campus local logon, validates GPO restrictions, and manages identity lifecycle operations without breaking administrative access.',
    sections: [
      {
        title: 'Sync Reliability Workflow',
        lead:
          'Hybrid identity only works if synchronization keeps running. Summit Care uses service startup controls, Task Scheduler recovery, PowerShell checks, and Entra validation to confirm that local identity changes reach the cloud.',
        kind: 'timeline',
        items: [
          'Set the Microsoft Entra Connect Sync service to automatic startup on SC-SYNC01.',
          'Create a Task Scheduler startup task that checks whether ADSync is running and starts it if it is stopped.',
          'Validate the sync scheduler and service state after server reboots, patching, or maintenance windows.',
          'Run Start-ADSyncSyncCycle -PolicyType Delta for urgent changes, and Start-ADSyncSyncCycle -PolicyType Initial after major scope changes.',
          'Review Synchronization Service Manager and Microsoft Entra sync status for errors, connector issues, or export failures.',
          'Keep evidence of sync status, service recovery, user change validation, MFA state, and audit activity for HIPAA-aligned documentation.',
        ],
      },
      {
        title: 'Local Logon Restriction Purpose',
        lead:
          'Group Policy logon restrictions provide an additional enforcement layer for Tier B local users. Even if a cross-domain path exists for trust testing or administration, local campus users should be denied interactive logon to workstations outside their assigned domain.',
      },
      {
        title: 'GPO Example: Block Queens Users From Brooklyn Workstations',
        kind: 'timeline',
        items: [
          'On the Brooklyn domain controller, open Active Directory Users and Computers.',
          'Create a global security group named Deny_SCQNS_Login in the SCBKLYN.LOCAL domain.',
          'Add the Queens campus Domain Users group from SCQNS.LOCAL as a member, using the trust-aware Locations selector.',
          'Open Group Policy Management and create a GPO named Deny SCQNS Logon To SCBKLYN.',
          'Edit the GPO at Computer Configuration -> Policies -> Windows Settings -> Security Settings -> Local Policies -> User Rights Assignment.',
          'Open Deny log on locally and add Deny_SCQNS_Login.',
          'Link the GPO to the Brooklyn workstation OU, such as SCBKLYN_Workstations.',
          'Run gpupdate /force on a Brooklyn workstation and test sign-in with a Queens Tier B account.',
          'Expected result: the user receives a message that the sign-in method is not allowed.',
        ],
      },
      {
        title: 'Reverse GPO Example: Block Brooklyn Users From Queens Workstations',
        kind: 'table',
        columns: ['Step', 'Queens Domain Action', 'Purpose'],
        rows: [
          ['Create group', 'Create Deny_SCBKLYN_Login in SCQNS.LOCAL', 'Defines the foreign users that should not log on locally to Queens devices'],
          ['Add members', 'Add SCBKLYN\\Domain Users or approved Brooklyn user group', 'Targets Brooklyn Tier B identities'],
          ['Create GPO', 'Create Deny SCBKLYN Logon To SCQNS', 'Keeps the restriction documented and reversible'],
          ['Set policy', 'Add Deny_SCBKLYN_Login to Deny log on locally', 'Blocks interactive local workstation sign-in'],
          ['Link policy', 'Link to SCQNS_Workstations OU', 'Applies only to target computers, not domain controllers'],
          ['Validate', 'Run gpupdate /force and test with a Brooklyn account', 'Confirms the restriction works before broad rollout'],
        ],
      },
      {
        title: 'Critical GPO Safety Rules',
        kind: 'list',
        items: [
          'Do not deny Domain Admins, Enterprise Admins, local Administrators, SYSTEM, or emergency break-glass accounts.',
          'Apply deny-logon GPOs to workstation OUs, not domain controller OUs.',
          'Test with a pilot OU before applying the restriction to all clinic devices.',
          'Document every denied group and the OU where the GPO is linked.',
          'Keep a rollback plan so administrators can unlink the GPO or remove the denied group if testing exposes an issue.',
        ],
      },
      {
        title: 'Ongoing Identity Operations',
        kind: 'table',
        columns: ['Workflow', 'Operational Action', 'Validation'],
        rows: [
          ['Tier A onboarding', 'Create user in SCGLOBAL, assign summitcare.org UPN, sync to Entra, assign MFA and licenses', 'User can sign into Microsoft 365 and authorized campus devices'],
          ['Tier B onboarding', 'Create user in local campus AD, sync lightweight cloud identity if required, restrict to campus OU and groups', 'User can access local campus only'],
          ['Password reset', 'Use Entra SSPR with password writeback where supported', 'Password works for cloud and applicable on-prem sign-in'],
          ['Offboarding', 'Disable or delete account, revoke sessions, remove groups, confirm sync to Entra', 'No lingering access to cloud apps or campus workstations'],
          ['Access review', 'Review MFA status, role assignments, group memberships, sign-in logs, and inactive users', 'Supports least privilege and HIPAA audit readiness'],
        ],
      },
    ],
  },
  hippa: {
    eyebrow: 'Section 4',
    heroTitle: 'HIPAA, Risk, Governance & Final Recommendations',
    heroText:
      'This closing section explains how Azure and Microsoft Entra improve HIPAA-aligned safeguards, identifies operational blockers, and summarizes the security advantages of the Summit Care centralized identity and hybrid network architecture.',
    sections: [
      {
        title: 'How Azure And Entra Improve HIPAA Readiness',
        kind: 'table',
        columns: ['Safeguard Area', 'Azure / Entra Control', 'Summit Care Value'],
        rows: [
          ['Unique user identification', 'UPN alignment, named accounts, Entra user inventory', 'Each user action can map back to an individual staff identity'],
          ['Person or entity authentication', 'MFA, Password Hash Sync, Conditional Access, password policy', 'Reduces risk from stolen passwords and weak sign-in behavior'],
          ['Access control', 'RBAC, groups, app assignment, Conditional Access', 'Limits access to authorized staff and least-privilege administrators'],
          ['Audit controls', 'Entra audit logs, sign-in logs, role assignment history', 'Supports review of who accessed systems and what identity changes occurred'],
          ['Access termination', 'Disable/delete workflow, session revocation, sync validation', 'Improves offboarding speed and reduces lingering access'],
        ],
      },
      {
        title: 'Security Advantages',
        kind: 'cards',
        items: [
          {
            title: 'Reduced Lateral Movement',
            body:
              'No campus-to-campus trust mesh means a compromised local campus identity should not automatically become useful across the entire organization.',
          },
          {
            title: 'Central Security Policy',
            body:
              'MFA, Conditional Access, RBAC, SSPR, password writeback, and cloud sign-in monitoring are managed from one Entra tenant.',
          },
          {
            title: 'Identity-Based Access',
            body:
              'The design relies on authenticated identity, role, group, device, and policy controls instead of assuming network access equals authorization.',
          },
          {
            title: 'Segmented Private Connectivity',
            body:
              'VPN routing lets trust traffic reach SCGLOBAL while preserving campus boundaries and avoiding direct spoke-to-spoke access.',
          },
        ],
      },
      {
        title: 'Potential Blockers And Mitigations',
        kind: 'table',
        columns: ['Blocker', 'Risk', 'Mitigation'],
        rows: [
          ['Regional hub failure', 'If Queens or Phoenix goes down, its spokes may lose the Azure path for Tier A authentication', 'Use HA Meraki pairs, redundant ISP links, and documented failover testing'],
          ['DNS resolution failure', 'Campus domains cannot locate SCGLOBAL.LOCAL domain controllers', 'Create conditional forwarders to 10.90.10.10 and 10.90.10.11 and monitor DNS health'],
          ['Azure VPN Gateway bandwidth', 'Hub-to-cloud tunnel becomes a bottleneck during authentication, file, or management traffic bursts', 'Choose the correct VPN Gateway SKU, monitor utilization, and separate heavy file workloads when possible'],
          ['Latency for remote regions', 'West region authentication may feel slow if Azure region placement is poor', 'Use an Azure region with balanced latency or deploy a second SCGLOBAL DC closer to the West hub'],
          ['Overly broad GPO deny policy', 'Admins can be locked out of workstations or support tools', 'Never deny administrators or SYSTEM, pilot test, and keep rollback steps'],
          ['Dirty AD before sync', 'Duplicate UPNs, mail attributes, or replication issues cause cloud sync failures', 'Run dcdiag, repadmin, duplicate checks, and UPN cleanup before initial sync'],
        ],
      },
      {
        title: 'Documentation Standards',
        kind: 'list',
        items: [
          'Record all domain names, UPN suffixes, trust directions, and DNS conditional forwarders.',
          'Maintain the IP scheme for Azure, regional hubs, and every campus subnet.',
          'Document every VPN tunnel, route, firewall rule, and allowed AD trust port path.',
          'Store screenshots or exports for Entra Connect configuration, sync scope, PHS, SSO, password writeback, MFA, Conditional Access, and RBAC.',
          'Document all deny-logon GPOs, denied groups, target OUs, pilot results, and rollback steps.',
          'Review sign-in logs, audit logs, disabled users, admin roles, and MFA coverage on a recurring schedule.',
        ],
      },
      {
        title: 'Final Summary',
        lead:
          'The final Summit Care design creates a secure, scalable, nationwide identity architecture without turning every campus into a fully trusted peer. SCGLOBAL.LOCAL in Azure acts as the master identity authority, summitcare.org in Microsoft Entra ID provides cloud identity governance, regional hubs provide private connectivity, campus domains keep local autonomy, and one-way trusts allow Tier A users to authenticate where they are authorized. Tier B users remain local through campus AD boundaries and GPO logon restrictions. Azure and Entra add SSO, MFA, Conditional Access, password hash sync, password writeback, RBAC, audit logs, and HIPAA-aligned access evidence. The result is centralized control, segmented network access, safer administration, and a model that can scale to many Summit Care clinic locations.',
      },
    ],
  },
};
