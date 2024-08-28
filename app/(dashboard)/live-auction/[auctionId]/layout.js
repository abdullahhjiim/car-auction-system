import LayoutWrap from '@/components/common/LayoutWrap';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>{children}</body>
    </html>
  );
}
