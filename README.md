# Hindu Mythology Encyclopedia

A file-based, English-first encyclopedia of Hindu scriptures, people, deities and concepts, deployed as a static Next.js site to GitHub Pages.

## Run locally

```powershell
npm install
npm run dev
```

No database or Docker required. Open http://localhost:3000.

## Publish

The workflow in `.github/workflows/pages.yml` builds and deploys when `main` changes. In the GitHub repository, open **Settings → Pages → Build and deployment** and choose **GitHub Actions** as the source. The expected address is https://sayantansom.github.io/hindu-mythology-knowledge-base/ once deployment succeeds and Pages is enabled.

## Content

- `content/pages/*.json`: wiki pages, stable IDs, Markdown, source accounts and links.
- `content/scriptures/*.json`: scripture pages and chapter outlines.

The original `/articles/33-vedic-deities` is preserved. The published site is read-only; edit JSON files in GitHub or locally and commit. A server-side browser editor is not supported by GitHub Pages.

The former PostgreSQL/Prisma application has been removed; historical code is retained in Git history. Local DB volumes are not deleted.
