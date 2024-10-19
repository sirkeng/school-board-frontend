import { AuthProvider } from "./context/AuthContext";
import { Metadata } from "next";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | RIS Portal App",
    default: "RIS Portal App",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
