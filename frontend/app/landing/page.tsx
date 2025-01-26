"use client";  // Ensure client-side rendering

import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Avatar,
  Card,
  Flex,
  Button,
} from "@mantine/core";
import LandingPageGif from "@/pics/landing-page.gif";
import MatheusImage from "@/pics/matheus.png";
import PranavImage from "@/pics/pranav.jpg";
import DanushImage from "@/pics/danush.png";
import KristianImage from "@/pics/kristian.png";
import AnimatedBackground from "@/components/AnimatedBackground";
import WhiteBackground from "@/pics/white-background.jpg";

export default function LandingPage() {
  // Mouse hover handlers
  const handleMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.style.transform = "scale(1.1)";
    target.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.style.transform = "scale(1)";
    target.style.boxShadow = "none";
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#f3f4f6" }}>
      {/* Animated Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <AnimatedBackground />
      </div>
      {/* FAQ Button (Fixed Top Right) */}
      <a
        href="https://colab.research.google.com/drive/1b1nHDy3Syzjcux9zhiz7pbG9ssiPnkuY?usp=sharing"
        target="_blank"
        style={{
          position: "fixed",
          top: "1.5rem",  // Adjust space from top
          right: "1.5rem",  // Adjust space from right
          backgroundColor: "red",
          color: "white",
          borderRadius: "50px",  // Make it pill-shaped
          padding: "10px 20px",  // Add padding to make it larger
          fontSize: "14px",  // Adjust font size for readability
          fontWeight: "600",  // Make the font slightly bolder for better emphasis
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s ease, transform 0.3s ease",
          textAlign: "center",
          whiteSpace: "nowrap",  // Prevent text from breaking into a new line
          textDecoration: "none",  // Remove underline
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e11d48"}  // Darker red on hover
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "red"}  // Default red
      >
        Need to train your model?
      </a>

      {/* Main Content */}
      <Container
        size="xl"
        style={{
          marginTop: "5rem",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        {/* Title */}
        <Title
          order={1}
          style={{
            fontSize: "4rem",
            fontWeight: 800,
            color: "#31d84c", // Bright green
            letterSpacing: "-0.03em",
            lineHeight: "1.2",
            marginBottom: "1rem",
            textShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          Neural Network Visualizer
        </Title>
        <Text
          size="lg"
          style={{
            color: "#4b5563", // Dark gray
            opacity: 0.7,
            marginBottom: "1rem",
            fontWeight: 400,
            letterSpacing: "0.02em",
            lineHeight: "1.5",
          }}
        >
          By Matheus Kunzler Maldaner, Kristian O’Connor, Danush Singla, and Pranav Bhargava
        </Text>

        {/* Author Section with Hover Effects */}
        <SimpleGrid
          cols={6}
          spacing="xs"  // Reduced spacing
          mt="lg"
          style={{
            textAlign: "center",
            justifyItems: "center",
            marginBottom: "1rem",
            justifyContent: "center", // Ensure center alignment
          }}
        >
          <Flex justify="center" gap="xs">  {/* Added gap for tighter spacing */}
            <Avatar
              radius="xl"
              size={120}
              alt="White-Background"
              src = {WhiteBackground.src}
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            />
          </Flex>
          <Flex justify="center" gap="xs">  {/* Added gap for tighter spacing */}
            <Avatar
              radius="xl"
              size={120}
              src={MatheusImage.src}
              alt="Matheus"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            />
          </Flex>
          <Flex justify="center" gap="xs">  {/* Added gap for tighter spacing */}
            <Avatar
              radius="xl"
              size={120}
              src={DanushImage.src}
              alt="Danush"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Flex>
          <Flex justify="center" gap="xs">  {/* Added gap for tighter spacing */}
            <Avatar
              radius="xl"
              size={120}
              src={KristianImage.src}
              alt="Kristian"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Flex>
          <Flex justify="center" gap="xs">  {/* Added gap for tighter spacing */}
            <Avatar
              radius="xl"
              size={120}
              src={PranavImage.src}
              alt="Pranav"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Flex>
        </SimpleGrid>

        {/* How to Use Section */}
        <Title order={2} style={{ fontSize: "2.5rem", color: "#198754", marginBottom: "1rem" }}>
          How to Use
        </Title>
        <SimpleGrid cols={1} spacing="lg" mt="lg">
          <Card
            shadow="lg"
            p="lg"
            radius="md"
            withBorder
            style={{ backgroundColor: "#ffffff", padding: "0.5rem" }}
          >
            <img
              src={LandingPageGif.src}  // Add the correct image path here
              alt="Tutorial or GIF"
              style={{
                width: "100%",  // Make the image responsive
                borderRadius: "8px",
                height: "fit",  // Optional: round the corners of the image
              }}
            />
          </Card>
        </SimpleGrid>

        {/* Start Button with Hover Effect */}
        <Flex align="center" gap="md" mt="xl" justify="center">
          <Button
            variant="filled"
            color="blue"
            size="lg"
            style={{
              transition: "transform 0.3s ease, background-color 0.3s ease",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              fontWeight: 600,
              borderRadius: "50px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Start
          </Button>
        </Flex>
      </Container>
    </div>
  );
}
