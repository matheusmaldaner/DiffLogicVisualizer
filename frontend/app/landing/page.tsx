"use client";
import { useState } from "react";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Avatar,
  Card,
  Flex,
  Select,
  FileInput,
  Button,
  Notification,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import MatheusImage from "@/pics/matheus.png"; // Adjust path as needed
import PranavImage from "@/pics/pranav.jpg";

export default function LandingPage() {

  return (
    <Container size="lg" style={{ marginTop: "2rem", textAlign: "center" }}>
      {/* Title */}
      <Title order={1}>Diff Logic Visualizer</Title>
      <Text size="lg" mt="sm">
        By Matheus Kunzler Maldaner, Kristian O’Connor, Danush Singla, and Pranav Bhargava
      </Text>

      {/* 4 Authors in a Grid */}
      <SimpleGrid cols={4} spacing="lg" mt="lg" style={{ textAlign: "center" }}>
        <Flex justify="center">
          <Avatar radius="xl" size={200} src={MatheusImage.src} alt="Matheus" />
        </Flex>
        <Flex justify="center">
          <Avatar radius="xl" size={200} src={null} alt="Author 2" />
        </Flex>
        <Flex justify="center">
          <Avatar radius="xl" size={200} src={null} alt="Author 3" />
        </Flex>
        <Flex justify="center">
          <Avatar radius="xl" size={200} src={PranavImage.src} alt="Author 4" />
        </Flex>
      </SimpleGrid>

      {/* How to Use Section */}
      <Title order={2} mt="lg">
        How to Use
      </Title>
      <SimpleGrid cols={1} spacing="lg" mt="lg">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text>Placeholder for GIF</Text>
        </Card>
      </SimpleGrid>

      {/* Bottom Right Dropdown and Next Button */}
      <Flex align="center" gap="md" mt="xl">

        <Button
          variant="filled"
          color="green"
          size="md"
        >
          Start
        </Button>
      </Flex>
    </Container>
  );
}