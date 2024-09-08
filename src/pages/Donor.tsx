import { useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
const Donor = () => {
  const [formData, setFormData] = useState({
    organ: '',
    city: '',
  });

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
  
    // if (!userId) {
    //   toast.error('User not logged in!');
    //   console.error('User not logged in');
    //   return;
    // }
  
    const patientsCollectionRef = collection(db, 'users'); 
    const querySnapshot = await getDocs(patientsCollectionRef);
  
    // Create a dictionary of dictionaries for patients
    const patientsDict = querySnapshot.docs
      .map(doc => doc.data())
      .filter(patient => 
        patient.organNeeded === formData.organ && patient.city === formData.city
      )
      .reduce((acc, patient, index) => {
        acc[index + 1] = {
          emailAddress: patient.emailAddress || 'N/A',
          dateOfBirth: patient.dateOfBirth || 'N/A',
          gender: patient.gender || 'N/A',
          conditions: {
            heartAttack: patient.conditions?.heartAttack || 0,
            heartValve: patient.conditions?.heartValve || 0,
            heartDefectAtBirth: patient.conditions?.heartDefectAtBirth || 0,
            cardiomyopathy: patient.conditions?.cardiomyopathy || 0,
            severeCysticFibrosis: patient.conditions?.severeCysticFibrosis || 0,
            copd: patient.conditions?.copd || 0,
            repeatedUrinaryInfections: patient.conditions?.repeatedUrinaryInfections || 0,
            diabetes: patient.conditions?.diabetes || 0,
            kidneyStones: patient.conditions?.kidneyStones || 0,
            urinaryTractInfection: patient.conditions?.urinaryTractInfection || 0
          },
          organNeeded: patient.organNeeded || 'N/A'
        };
        return acc;
      }, {});
  
    console.log('Dictionary of Patients:', patientsDict); 
  };
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     const patientsCollectionRef = collection(db, 'users'); 
//     const querySnapshot = await getDocs(patientsCollectionRef);
  
//     // Filter patients based on organ and city
//     const patientsList = querySnapshot.docs
//       .map(doc => doc.data())
//       .filter(patient => 
//         patient.organNeeded === formData.organ && patient.city === formData.city
//       );
  
//     console.log('Filtered Patients:', patientsList); // Display filtered patients
//   };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Donor Updation" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Donor Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>

                  {/* Organ Donated */}
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
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="organ"
                    >
                      Organ
                    </label>
                    <select
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="organ"
                      id="organ"
                      value={formData.organ}
                      onChange={handleInputChange}
                    >
                      <option value="">Select organ</option>
                      <option value="kidney">Kidney</option>
                      <option value="liver">Liver</option>
                      <option value="heart">Heart</option>
                      <option value="lung">Lung</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full rounded bg-primary py-3 px-4 text-center text-base font-medium text-white transition hover:bg-opacity-90"
                  >
                    Generate List
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

export default Donor;