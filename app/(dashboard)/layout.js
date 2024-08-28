import LayoutWrap from '@/components/common/LayoutWrap';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function layout({ children }) {
  return (
    <>
      <body className={`${inter.className} relative`}>
        <LayoutWrap>{children}</LayoutWrap>
      </body>
    </>
  );
}
