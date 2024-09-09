import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { marked } from 'marked';
import toast from 'react-hot-toast';

const Remedies = () => {
  const [disease, setDisease] = useState('');
  const [remedies, setRemedies] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisease(e.target.value);
  };

  const handleButtonClick = async () => {
    const loading = toast.loading('Fetching Results');
    try {
      const response = await fetch(
        'https://lifebridge-sih.onrender.com/get_disease_info/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_disease: disease }),
        },
      );
      toast.dismiss(loading);
      if (!response.ok) {
        toast.error('Something Went Wrong');
        throw new Error('Failed to fetch recommendations');
      }
      const data = await response.json();
      console.log(data.output_text);
      setRemedies(data.output_text);
      toast.success('Success');
      setError(null);
    } catch (error: any) {
      console.error('Error fetching remedies:', error);
      setRemedies(null);
      setError(error.message);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="mt-12 max-w-lg flex items-center gap-8 justify-center">
        <Input
          className="w-full rounded-xl"
          variant="bordered"
          type="text"
          label="Enter Disease to get remedies"
          placeholder="ex. Malaria"
          value={disease}
          onChange={handleInputChange}
        />
        <Button color="primary" onClick={handleButtonClick}>
          Get Remedies
        </Button>
      </div>
      <div className="mt-8">
        {error && <div className="text-red-500">{error}</div>}
        {remedies ? (
          <div dangerouslySetInnerHTML={{ __html: marked(remedies) }} />
        ) : (
          <p className="text-gray-500">
            No remedies found. Please try another disease.
          </p>
        )}
      </div>
    </div>
  );
};

export default Remedies;
