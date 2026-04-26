# Summit Care Centralized Identity & Hybrid Network Architecture

React/Vite portfolio report for a mock Summit Care Medical Clinic Azure hybrid identity and network architecture project.

## Local Development

```bash
npm install
npm run dev
```

The React app runs through Vite. The local Express server is only for local contact/admin API testing and is not used on GitHub Pages.

## Build

```bash
npm run build
```

## GitHub Pages

This repository includes `.github/workflows/static.yml`.

On push to `main`, GitHub Actions will:

1. Install dependencies with `npm ci`
2. Build the Vite app into `dist`
3. Copy `dist/index.html` to `dist/404.html` for React Router fallback
4. Deploy `dist` to GitHub Pages

The Vite config automatically uses the GitHub repository name as the Pages base path during Actions builds.

## Master Report

The black-and-white master PDF is included as:

- `summit-care-master-report.pdf`
- `azure-hybrid-cloud-identity-master-report.pdf`

The editable HTML source is `summit-care-master-report.html`.
