import { Button } from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaTimes } from 'react-icons/fa'; // Import icons from react-icons

interface SelectedItems {
  [key: string]: number;
}

const Diagnosis = () => {
  const [availableItems, setAvailableItems] = useState<string[]>([
    'itching',
    'nodal_skin_eruptions',
    'chills',
    'stomach_pain',
    'muscle_wasting',
    'vomiting',
    'spotting_ urination',
    'fatigue',
    'weight_loss',
    'breathlessness',
    'dark_urine',
    'pain_behind_the_eyes',
    'constipation',
    'abdominal_pain',
    'diarrhoea',
    'yellowing_of_eyes',
    'chest_pain',
    'fast_heart_rate',
    'dizziness',
    'excessive_hunger',
    'slurred_speech',
    'knee_pain',
    'muscle_weakness',
    'unsteadiness',
    'bladder_discomfort',
    'internal_itching',
    'muscle_pain',
    'altered_sensorium',
    'red_spots_over_body',
    'abnormal_menstruation',
    'increased_appetite',
    'lack_of_concentration',
    'receiving_blood_transfusion',
    'stomach_bleeding',
    'distention_of_abdomen',
    'blood_in_sputum',
    'prominent_veins_on_calf',
    'blackheads',
    'small_dents_in_nails',
    'blister',
  ]);

  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (item: string) => {
    setAvailableItems(availableItems.filter((i) => i !== item));
    setSelectedItems({ ...selectedItems, [item]: 1 });
  };

  const handleRemove = (item: string) => {
    const { [item]: _, ...rest } = selectedItems;
    setSelectedItems(rest);
    setAvailableItems([...availableItems, item]);
  };

  const handleClick = async () => {
    const loading = toast.loading('Fetching results');
    try {
      console.log(selectedItems);
      const response = await fetch(
        'https://lifebridge-sih.onrender.com/predict',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedItems),
        },
      );

      toast.dismiss(loading);
      if (!response.ok) {
        toast.error('Something Went Wrong');
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      toast.success('Result Fetched');
      setDiagnosis(data.prediction);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setDiagnosis(null);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-center gap-10 p-2 w-full">
        <div className="w-1/2 border-2 p-2 rounded-md">
          <h3 className="text-lg font-bold mb-4">Select your symptoms</h3>
          <ul className="flex flex-wrap gap-2">
            {availableItems.map((item) => (
              <li
                key={item}
                className="flex justify-between items-center p-1 text-gray-600 bg-gray-100 rounded-lg shadow gap-2"
              >
                {item}
                <button
                  onClick={() => handleSelect(item)}
                  className="text-green-500 hover:text-green-700"
                >
                  <FaPlus />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 border-2 rounded-md p-2">
          <h3 className="text-lg font-bold mb-4">Selected Symptoms</h3>
          <ul className="flex flex-wrap gap-2">
            {Object.keys(selectedItems).map((item) => (
              <li
                key={item}
                className="flex justify-between items-center p-1 text-gray-600 bg-gray-100 rounded-lg shadow"
              >
                {item}
                <button
                  onClick={() => handleRemove(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-2">
        <Button
          color="primary"
          isDisabled={Object.keys(selectedItems).length === 0}
          onClick={handleClick}
        >
          Perform Diagnosis
        </Button>
      </div>

      <div className="mt-2 p-4">
        {error && <div className="text-red-500">{error}</div>}
        {diagnosis && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Results:</h3>
            <h2>
              According to Diagnosis you have a high chance of {diagnosis}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diagnosis;
