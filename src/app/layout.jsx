import React from 'react';
import Header from './components/header';
import './globals.css';

export const metadata = {
  title: {
    default: 'Brav3 Market - Retro Electronics',
    template: '%s | Brav3 Market'
  },
  description: 'Your one-stop shop for retro electronics and gaming gear',
  keywords: ['retro electronics', 'gaming', 'vintage tech', 'campaign products'],
  icons: {
    icon: '/chewed-heart.svg',
    shortcut: '/chewed-heart.svg',
    apple: '/chewed-heart.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brav3-market.com',
    siteName: 'Brav3 Market',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brav3 Market'
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black font-vt323 text-green-500">
        <div className="fixed top-0 left-0 right-0 z-50 bg-black">
          <Header />
        </div>
        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}