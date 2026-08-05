import React, { useState } from 'react';
import { Select } from '@mantine/core';

interface DropdownProps {
  onModelSelect: (value: string) => Promise<void> | void;
}

export function Dropdown({ onModelSelect }: DropdownProps) {
  const [loading, setLoading] = useState(false);

  // handle model selection from dropdown
  const handleModelSelect = async (value: string | null) => {
    if (!value) return; // if user clears the selection, do nothing

    setLoading(true);
    try {
      await onModelSelect(value);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '50px' }}>
      <Select
        label="Models library"
        placeholder="Pick a model"
        defaultValue="demo_model"
        data={[
          { value: 'demo_model', label: 'demo network (bundled)' },
          { value: 'model_001', label: 'model_001 (needs backend)' },
          { value: 'model_002', label: 'model_002 (needs backend)' },
          { value: 'model_003', label: 'model_003 (needs backend)' },
        ]}
        style={{ width: 250 }}
        onChange={(value) => handleModelSelect(value)}
        disabled={loading}
      />
    </div>
  );
}
