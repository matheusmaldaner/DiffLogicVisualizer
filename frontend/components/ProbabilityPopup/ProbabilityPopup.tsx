import { Anchor, Group, Progress, Table, Text } from '@mantine/core';
import classes from './ProbabilityPopup.module.css';


const data = [
  {
    gate: 'not',
    probability: 0.87,
  },
];

export function ProbabilityTable() {
  const rows = data.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>{row.gate}</Table.Td>
      <Table.Td>
        <Group justify="space-between">
          <Text fz="xs" c="teal" fw={700}>
            {(row.probability * 100).toFixed(0)}%
          </Text>
          <Text fz="xs" c="red" fw={700}>
            {((1 - row.probability) * 100).toFixed(0)}%
          </Text>
        </Group>
        <Progress.Root>
          <Progress.Section value={row.probability * 100} color="teal" />
          <Progress.Section value={(1 - row.probability) * 100} color="red" />
        </Progress.Root>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Gate</Table.Th>
            <Table.Th>Probability Distribution</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}