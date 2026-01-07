import React, { useState } from 'react';
import { Select } from '@mantine/core';
import axios from 'axios';

export function Dropdown() {
  const [loading, setLoading] = useState(false);

  // Handle model selection from dropdown
  const handleModelSelect = async (value: string | null) => {
    if (!value) return; // If user clears the selection, do nothing

    setLoading(true);
    try {
      // IMPORTANT: use the correct endpoint from your Django urls.py:
      // path('difflogic-models/', ModelAPIView.as_view(), ...)
      await axios.post('http://127.0.0.1:8000/api/difflogic-models/', {
        model_choice: value,
      });
    } catch (error: any) {
      // Log errors for debugging in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading model:', error.response?.data || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '50px' }}>
      <Select
        label="Models library"
        placeholder="Pick a model"
        data={['model_001', 'model_002', 'model_003']} // Hard-coded example
        style={{ width: 250 }}
        onChange={(value) => handleModelSelect(value)}
        disabled={loading}
      />
    </div>
  );
}