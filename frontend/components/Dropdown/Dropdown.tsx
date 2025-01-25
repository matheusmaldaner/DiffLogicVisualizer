import { Select } from '@mantine/core';

export function Dropdown() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '50px' }}>
    <Select
      label="Models library"
      placeholder="Pick a model"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      style={{ width: 250 }}
    />
    </div>
  );
}