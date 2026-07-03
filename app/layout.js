import "./globals.css";

export const metadata = {
  title: "Hassan Abdullah — Junior Full-Stack Developer | PERN Stack",
  description:
    "Junior Full-Stack Developer with a PERN stack focus (PostgreSQL, Express.js, React.js, Node.js). A year of hands-on experience building and deploying live web platforms. Based in Lahore, open to on-site and remote roles.",
  openGraph: {
    title: "Hassan Abdullah — Junior Full-Stack Developer",
    description: "PERN stack developer building and deploying real web applications.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
