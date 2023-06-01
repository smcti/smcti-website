import '@styles/globals.css';

import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

export const metadata = {
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: '/assets/icons/brasao.png'
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
        <Nav></Nav>
        <main className='bg-zircon-50 font-poppins'>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  )
}
