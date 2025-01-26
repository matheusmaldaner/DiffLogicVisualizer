'use client';

  import {
    Box,
    Group,
  } from '@mantine/core';
  import classes from './HeaderMegaMenu.module.css';
  import Image from 'next/image';
import EmperorPenguinBabyImage from '../../pics/EmperorPenguinBaby.jpeg';
import SouthernRockhopperPenguinImage from '../../pics/SouthernRockhopperPenguin.jpg';
import GentooPenguin from '../../pics/GentooPenguin.jpg';
import {Main} from '../Main/Main.tsx';
import { useState } from 'react';
import { Dropdown } from "../Dropdown/Dropdown.tsx";
import axios from 'axios';

  
  export function HeaderMegaMenu() {
    
    const [image, setImage] = useState('/_next/static/media/EmperorPenguinBaby.7955bfc0.jpeg');

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [predictedClass, setPredictedClass] = useState<number | null>(null);
    const [modelChoice, setModelChoice] = useState<string>("model_001");

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
      setPredictedClass(response.data.predicted_class);

      setImage(response.data.image_url);

      console.log(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
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

        {image && <Main selectedImage={image} style={{ position: 'absolute', top: '100vh' }} />}

        <Dropdown />
      </Box>
    );
  }