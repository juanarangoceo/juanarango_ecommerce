import type {Metadata} from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const merriweather = Merriweather({ weight: ['300', '400', '700', '900'], subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Guía Claude Code | De 0 a Experto',
  description: 'La guía más completa sobre Claude Code en internet.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${inter.variable} ${merriweather.variable} scroll-smooth`}>
      <body className="font-sans bg-[#FAF9F6] text-[#2D2D2D] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
