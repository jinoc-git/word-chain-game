import UIProvider from '@/providers/UIProvider';

import type { Metadata } from 'next';

import '../style/globals.css';

export const metadata: Metadata = {
  title: 'Word Chain Game',
  description: '끝말잇기 게임',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <body>
        <UIProvider>
          <main className=" w-screen h-screen flex-box">{children}</main>
        </UIProvider>
      </body>
    </html>
  );
}
