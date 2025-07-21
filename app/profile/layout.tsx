import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - Metal Forge',
  description: 'Your Underground Metal Profile',
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
