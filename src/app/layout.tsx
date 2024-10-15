import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Providers from '@/provider/QueryProvider';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
  title: '구단주주총회',
  description: '피파온라인 API를 활용한 전적 확인 사이트입니다.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>
          <Providers>
            <Header />
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
