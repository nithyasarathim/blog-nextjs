import SessionWrapper from "@/app/components/SessionWrapper";
import Header from "@/app/components/Header";
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body>
          <Header/>
          {children}
        </body>
      </SessionWrapper>
    </html>
  );
}
