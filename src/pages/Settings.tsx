import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { toast } from 'react-hot-toast';

const Settings = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    emailAddress: '',
    phoneNumber: '',
    organNeeded: '',
    gender: '',
    medicalHistory: '',
    bloodType: '',
  });

  const auth = getAuth();
  const userId = auth.currentUser?.uid; // Assuming you have user ID

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const docRef = doc(db, 'users', userId); // Assuming 'patients' is your collection
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setFormData(docSnap.data() as any); // Assuming your document structure matches the state
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      };

      fetchData();
    }
  }, [userId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error('User not logged in!');
      console.error('User not logged in');
      return;
    }

    const toastId = toast.loading('Updating...');
    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, formData);
      toast.dismiss(toastId);
      toast.success('Information updated');
      console.log('Document successfully updated');
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Error updating document');
      console.error('Error updating document:', error);
    }
  };

  // Array of blood types
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Patient Onboarding" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Patient Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="dateOfBirth"
                      >
                        Date of Birth
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email Address
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      placeholder="johndoe@example.com"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Organ Needed */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Delhi"
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="organNeeded"
                    >
                      Organ Needed
                    </label>
                    <select
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="organNeeded"
                      id="organNeeded"
                      value={formData.organNeeded}
                      onChange={handleInputChange}
                    >
                      <option value="">Select organ</option>
                      <option value="kidney">Kidney</option>
                      <option value="liver">Liver</option>
                      <option value="heart">Heart</option>
                      <option value="lung">Lung</option>
                    </select>
                  </div>

                  {/* Gender */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <select
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="gender"
                      id="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  {/* Medical History */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="medicalHistory"
                    >
                      Brief Medical History
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="medicalHistory"
                      id="medicalHistory"
                      rows={4}
                      placeholder="Please provide a brief overview of your medical history relevant to the transplant"
                      value={formData.medicalHistory}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  {/* Blood Type */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Blood Type
                    </label>
                    <div className="grid grid-cols-4 gap-4">
                      {bloodTypes.map((type) => (
                        <label key={type}>
                          <input
                            type="radio"
                            name="bloodType"
                            value={type}
                            checked={formData.bloodType === type}
                            onChange={handleInputChange}
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full rounded bg-primary py-3 px-4 text-center text-base font-medium text-white transition hover:bg-opacity-90"
                  >
                    Update Information
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
