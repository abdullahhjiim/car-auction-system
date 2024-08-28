import ProfileComponent from '@/components/admin/ProfileComponent';
import { Suspense } from 'react';

const Profile = () => {  

  return (
    <>
      <div className="py-4 sm:ml-64">
        <Suspense fallback={<p>Loading...</p>}>
          <ProfileComponent />
        </Suspense>
      </div>
    </>
  );
};

export default Profile;
