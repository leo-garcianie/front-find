import { Roboto_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export const metadata = {
  title: 'FrontFind',
  description: 'Looking for the best Frontend Framework? Let’s find it...',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} antialiased`}>
        {children}
        <Navbar />
      </body>
    </html>
  )
}
