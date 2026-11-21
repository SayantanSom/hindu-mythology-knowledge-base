import Link from "next/link";
export default function EditorIndex(){return <main><h1>Editing pages</h1><p>The published site is static. Edit the JSON files in <code>content/pages</code> and <code>content/scriptures</code> in your GitHub repository, then commit the changes. GitHub Actions will publish the updated site.</p><p><Link href="/topics">Browse encyclopedia articles</Link></p></main>;}
