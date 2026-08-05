'use client';

  import {
    Box,
    Group,
    Text,
  } from '@mantine/core';
  import classes from './HeaderMegaMenu.module.css';
  import Image from 'next/image';
import EmperorPenguinBabyImage from '../../pics/EmperorPenguinBaby.jpeg';
import SouthernRockhopperPenguinImage from '../../pics/SouthernRockhopperPenguin.jpg';
import GentooPenguin from '../../pics/GentooPenguin.jpg';
import {Main} from '../Main/Main.tsx';
import { useEffect, useState } from 'react';
import { Dropdown } from "../Dropdown/Dropdown.tsx";
import axios from 'axios';


  export function HeaderMegaMenu() {

    const [image, setImage] = useState(EmperorPenguinBabyImage.src);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [predictedClass, setPredictedClass] = useState<number | null>(null);
    const [modelChoice, setModelChoice] = useState<string>("model_001");
    const [info, setInfo] = useState<any | null>(null);
    const [prediction, setPrediction] = useState<any | null>(null);
    const [connections, setConnections] = useState<any | null>(null);
    const [probabilities, setProbabilities] = useState<any | null>(null);
    const [demoName, setDemoName] = useState<string | null>(null);
    const [backendNotice, setBackendNotice] = useState<string | null>(null);

    // loads the bundled demo network so the visualizer works without the django backend
    const loadDemoModel = async () => {
      try {
        const response = await axios.get('./demo-model.json');
        setConnections(response.data.connections);
        setInfo(response.data.metadata);
        setDemoName(response.data.name);
        setBackendNotice(null);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading bundled demo model:', error);
        }
        setBackendNotice('could not load the bundled demo model.');
      }
    };

    useEffect(() => {
      loadDemoModel();
    }, []);

    // selecting one of the library models still goes through the local backend;
    // when it is unreachable we fall back to the bundled demo with a visible notice
    const handleModelSelect = async (value: string) => {
      if (value === 'demo_model') {
        loadDemoModel();
        return;
      }
      try {
        await axios.post('http://127.0.0.1:8000/api/difflogic-models/', {
          model_choice: value,
        });
        setBackendNotice(null);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading model:', error);
        }
        setBackendNotice(
          `${value} requires the local backend (django on 127.0.0.1:8000), which is not running. showing the bundled demo network instead.`
        );
      }
    };

    function onImageClick(src: string) {
      setImage(src)
    }

      // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      uploadImage(event.target.files[0]);
    }
  };

  // Upload image to the backend
  const uploadImage = async (file: File) => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('model_choice', modelChoice);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/difflogic-images/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponseMessage(response.data.message);
      setPrediction(response.data.predicted_class);
      setInfo(response.data.model_info);
      setConnections(response.data.connections);
      setProbabilities(response.data.probabilities);

      setImage(response.data.image_url);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error uploading image:", error);
      }
      setBackendNotice(
        'image upload runs inference through the local backend (django on 127.0.0.1:8000), which is not running. the bundled demo network stays on screen.'
      );
    }
  };

  
    return (
      <Box pb={120} style={{ position: 'relative' }}>
        <header className={classes.header}>
          <Group justify="center" h="100%">
  
            <Group h="100%" gap={10} visibleFrom="sm">
            <a href="#" className={classes.image}>
                <Image
                src={EmperorPenguinBabyImage.src} 
                alt="EmperorPenguinBaby" 
                className={classes.image} 
                width={500} 
                height={500} 
                onClick={() => onImageClick(EmperorPenguinBabyImage.src)}/>
            </a>

            <a href="#" className={classes.image}>
                <Image src={SouthernRockhopperPenguinImage.src} alt="SouthernRockhopperPenguin" className={classes.image} width={500} height={500} onClick={() => onImageClick(SouthernRockhopperPenguinImage.src)}/>
            </a>

            <a href="#" className={classes.image}>
                <Image src={GentooPenguin.src} alt="GentooPenguin" className={classes.image} width={500} height={500} onClick={() => onImageClick(GentooPenguin.src)}/>
            </a>

            {/* Custom Add Button */}
            <button
              type="button"
              onClick={() => document.getElementById('file-input')?.click()}
              style={{
                width: 45,
                height: 35,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px dashed #ccc',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                position: 'relative', // Allows inner content adjustment
              }}
            >
              <span
                style={{
                  fontSize: '40px',
                  fontWeight: 'bold',
                  color: '#888',
                  position: 'relative', // Enables relative movement
                  top: '-5px', // Adjust this value to lift the text
                }}
              >
                +
              </span>
            </button>

            <input
              type="file"
              id="file-input"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />

            </Group>
  
          </Group>
        </header>

        {demoName && (
          <Text size="sm" c="dimmed" ta="center" mt="xs">
            {demoName}, bundled with the site. the full visualizer with live inference needs the local
            backend from the{' '}
            <a
              href="https://github.com/matheusmaldaner/DiffLogicVisualizer"
              target="_blank"
              rel="noreferrer"
            >
              github repo
            </a>
            .
          </Text>
        )}

        {backendNotice && (
          <Text size="sm" c="orange" ta="center" mt="xs">
            {backendNotice}
          </Text>
        )}

        {image && <Main selectedImage={image} modelInfo={info} predClasses={prediction} connections={connections} probabilities={probabilities} />}

        <Dropdown onModelSelect={handleModelSelect} />
      </Box>
    );
  }