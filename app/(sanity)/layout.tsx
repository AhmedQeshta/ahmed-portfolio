import '@/app/globals.css';
import OrbBackground from '@/components/OrbBackground';

export { metadata, viewport } from '@/utils/metaData';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OrbBackground />

        {children}
      </body>
    </html>
  );
}
