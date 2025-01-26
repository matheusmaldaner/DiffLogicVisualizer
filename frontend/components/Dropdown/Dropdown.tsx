import { Select } from '@mantine/core';
import axios from 'axios';

export function Dropdown() {
  const handleModelSelect = async (value: string) => {

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/model/', {
        model_choice: value, // Send the selected model choice
      });
      console.log('Response from API:', response.data);
    } catch (error) {
      console.error('Error loading model:', error.response?.data || error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '50px' }}>
    <Select
      label="Models library"
      placeholder="Pick a model"
      data={['model_001', 'model_002', 'model_003']}
      style={{ width: 250 }}
      // @ts-ignore
      onChange={(value) => handleModelSelect(value)}
    />
    </div>
  );
}