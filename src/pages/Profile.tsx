import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CoverOne from '../images/cover/cover-01.png';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface UserData {
  Name: string;
  email: string;
  phoneNumber: string;
  city: string;
  gender: string;
  organNeeded: string;
  medicalHistory: string;
}

const defaultUserData: UserData = {
  Name: 'N/A',
  email: 'N/A',
  phoneNumber: 'N/A',
  city: 'N/A',
  gender: 'N/A',
  organNeeded: 'N/A',
  medicalHistory: 'N/A',
};

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [loading, setLoading] = useState<boolean>(true);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const auth = getAuth();
  const { currentUser } = auth;

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
          } else {
            setUserNotFound(true);
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setUserNotFound(true);
        }
      } else {
        setUserNotFound(true);
      }
      setLoading(false);
    };
    fetchUserData();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Breadcrumb pageName="Profile" />
      {userNotFound && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          User not found. Displaying default information.
        </div>
      )}
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${
                  currentUser?.displayName || userData.Name
                }`}
                alt="profile"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {userData.Name}
            </h3>
            <p className="font-medium">{userData.email}</p>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {userData.phoneNumber}
                </span>
                <span className="text-sm">Phone</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {userData.city}
                </span>
                <span className="text-sm">City</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {userData.gender}
                </span>
                <span className="text-sm">Gender</span>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-center justify-center">
              <span className="font-semibold text-black dark:text-white">
                Organ Needed: {userData.organNeeded}
              </span>
            </div>
            <div className="mt-4 flex flex-col items-center justify-center">
              <span className="font-semibold text-black dark:text-white">
                Brief Medical History: {userData.medicalHistory}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
