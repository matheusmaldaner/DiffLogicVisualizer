import React from 'react';
import { Table, Progress, Text, Group } from '@mantine/core';

// Gate index → human-readable name
const GATE_NAMES = [
  '0: false',         // i=0
  '1: AND',
  '2: A AND NOT B',
  '3: A',
  '4: NOT A AND B',
  '5: B',
  '6: XOR',
  '7: OR',
  '8: NOR',
  '9: XNOR',
  '10: NOT B',
  '11: B → A',
  '12: NOT A',
  '13: A → B',
  '14: NAND',
  '15: true',         // i=15
];

export function NeuronGatesDistribution({ layerIndex, neuronIndex, gateProbs }) {
  /*
    gateProbs is an array of length 16, e.g. [0.05, 0.02, 0.12, 0.45, ... ] summing to ~1
  */

  return (
    <div style={{ marginBottom: '1rem' }}>
      <Text fw={600} mb={4}>
        Layer {layerIndex}, Neuron {neuronIndex}
      </Text>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Gate</Table.Th>
            <Table.Th>Probability</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {gateProbs.map((prob, i) => {
            const percentage = (prob * 100).toFixed(2);
            return (
              <Table.Tr key={i}>
                <Table.Td>{GATE_NAMES[i]}</Table.Td>
                <Table.Td>
                  <Group align="center" spacing="sm">
                    <Text size="xs" style={{ width: 40 }}>
                      {percentage}%
                    </Text>
                    <Progress
                      size="sm"
                      radius="xs"
                      value={Number(percentage)}
                      color="blue"
                      style={{ flex: 1 }}
                    />
                  </Group>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </div>
  );
}
