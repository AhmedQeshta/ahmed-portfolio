import '@/app/globals.css';

import { metadata, viewport } from '@/features/shard/utils/metadata';

export { metadata, viewport };

export default function OfflineLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
