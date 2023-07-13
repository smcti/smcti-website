import '@styles/globals.css';

import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Script from 'next/script';

export const metadata = {
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: '/assets/icons/brasao.png',
      // media: '(prefers-color-scheme: dark)'
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex flex-col min-h-[100dvh]'>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-8HJYXM0G6L" />
        <Script
          id='google-analytics'
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-8HJYXM0G6L');
            `,
          }} />
        <Nav></Nav>
        <main className='bg-zircon-50 font-poppins'>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  )
}
