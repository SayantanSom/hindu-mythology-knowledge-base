import type {Metadata} from "next";
import Link from "next/link";
import "./globals.css";
export const metadata:Metadata={title:"Hindu Mythology | Encyclopedia",description:"A readable, scripture-referenced Hindu mythology encyclopedia"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
 return <html lang="en"><body><header className="site-header"><div className="container header-inner"><Link href="/" className="brand">Hindu Mythology <span>Encyclopedia</span></Link><nav><Link href="/topics">Explore topics</Link><Link href="/articles/33-vedic-deities">33 Vedic Deities</Link><Link href="/scriptures">Scriptures</Link></nav></div></header><main className="container">{children}</main><footer className="container footer">English explanations · Traceable scriptural references</footer></body></html>;
}
