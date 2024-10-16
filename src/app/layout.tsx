import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Providers from '@/provider/QueryProvider';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: '구단주주총회',
  description: '피파온라인 API를 활용한 전적 확인 사이트입니다.',
  icons: {
    icon: '/img/favicon.png'
  }
};

const myFont = localFont({
  src: '/fonts/NEXON-Football-Gothic-L.otf',
  display: 'swap'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`text-white ${myFont.className}`}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),
        url(/img/homeBackgroundImage.jpg)`
        }}
      >
        <Providers>
          <Header />
          <main className="pt-24">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
