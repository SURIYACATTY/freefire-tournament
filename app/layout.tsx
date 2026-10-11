import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'BOOYAH ARENA | Free Fire Tournament', description: 'Register your squad for the next Free Fire tournament.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
