import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Reading Record',
  description: '読んだ本の学びや感想を記録し、見返せるようにするアプリケーション',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='p-4 md:p-16'>
          <div className='md:w-4/5 mx-auto'>
            <div className='flex justify-between'>
              <h1 className='text-base md:text-3xl text-center'>
                <Link href={'/reading_records'}>Reading Records</Link>
              </h1>
              <div className='flex items-end'>
                <Link
                  href={'/reading_records'}
                  className='inline underline align-bottom text-xs md:text-sm'
                >
                  読書記録TOP
                </Link>
                <Link
                  href={'/reading_records/new'}
                  className='inline ml-4 underline align-bottom text-xs md:text-sm'
                >
                  読書記録登録
                </Link>
              </div>
            </div>

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
