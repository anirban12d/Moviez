import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "../redux/providers";

import Header from '../components/header/header'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Moviez",
  description: "Get the details of latest movies and tv shows",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
    <head>
    <link rel="icon" href="/favicon.png" sizes="any" />
    </head>
      <body className={inter.className}>
      <Providers>
      <Header/>
        {children}
      </Providers>
      </body>
    </html>
  );
}
