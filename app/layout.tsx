import '@styles/globals.css';

import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Nav></Nav>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  )
}
