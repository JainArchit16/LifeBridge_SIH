import { useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import toast from 'react-hot-toast';
const Donor = () => {
  const [formData, setFormData] = useState({
    organ: '',
    city: '',
  });
  const [patientsList, setPatientsList] = useState<
    { emailAddress: string; priority: number }[]
  >([]);
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
    console.log(querySnapshot.docs[0].data());
    // Create a dictionary of dictionaries for patients
    const patientsDict = querySnapshot.docs
      .map((doc) => doc.data())
      .filter((patient) => patient.organNeeded === formData.organ)
      .reduce((acc, patient, index) => {
        acc[index + 1] = {
          emailAddress: patient.email || 'N/A',
          dateOfBirth: patient.dateOfBirth || 'N/A',
          gender: patient.gender
            ? patient.gender.charAt(0).toUpperCase() +
              patient.gender.slice(1).toLowerCase()
            : 'N/A',
          conditions: {
            heartAttack: patient.conditions?.heartAttack || 0,
            heartValve: patient.conditions?.heartValve || 0,
            heartDefectAtBirth: patient.conditions?.heartDefectAtBirth || 0,
            cardiomyopathy: patient.conditions?.cardiomyopathy || 0,
            severeCysticFibrosis: patient.conditions?.severeCysticFibrosis || 0,
            copd: patient.conditions?.copd || 0,
            repeatedUrinaryInfections:
              patient.conditions?.repeatedUrinaryInfections || 0,
            diabities: patient.conditions?.diabetes || 0,
            kidneyStones: patient.conditions?.kidneyStones || 0,
            urinaryTractInfection:
              patient.conditions?.urinaryTractInfection || 0,
          },
          organNeeded: patient.organNeeded || 'N/A',
        };
        return acc;
      }, {});

    console.log('Dictionary of Patients:', patientsDict);
    const loading = toast.loading('Fetching results');
    try {
      const response = await fetch(
        'https://lifebridge-sih.onrender.com/priority',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(patientsDict),
        },
      );

      const result = await response.json();
      toast.dismiss(loading);
      if (response.ok) {
        // Assuming the response contains a list of patients with email and priority
        toast.success('List Generated');
        const formattedResult = result.map(
          ([emailAddress, priority]: [string, number]) => ({
            emailAddress,
            priority,
          }),
        );
        setPatientsList(formattedResult);
      } else {
        toast.error('Something Went Wrong');
        console.error('Error fetching patients:', result.message);
      }
    } catch (error) {
      toast.dismiss(loading);
      toast.error('Some Error Occured');
      console.error('Error:', error);
    }
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
                {/* Display the patients list */}
                {/* Display the patients list */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Patients List
                  </h4>
                  <ul className="mt-4 space-y-4">
                    {patientsList.length > 0 ? (
                      patientsList.map((patient, index) => (
                        <li
                          key={index}
                          className="p-4 border border-gray-300 rounded-lg bg-gray-50"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-700">
                                <span className="font-semibold">Email:</span>{' '}
                                {patient.emailAddress}
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                <span className="font-semibold">Priority:</span>{' '}
                                {patient.priority}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No patients found</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donor;
