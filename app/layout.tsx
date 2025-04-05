import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Uptoskills - HR Management System',
  description: 'Modern HR Management System with digital onboarding, hierarchy management, and smart attendance features.',
};

import ClientLayout from '../app/client-layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}