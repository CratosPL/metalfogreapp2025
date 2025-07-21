import UserProfile from '@/components/UserProfile';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <UserProfile />
    </div>
  );
}

export const metadata = {
  title: 'Profile - Metal Forge',
  description: 'Your Metal Forge profile and underground legacy'
};
