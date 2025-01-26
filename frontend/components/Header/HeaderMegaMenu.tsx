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
  
  export function HeaderMegaMenu() {
    
    const [image, setImage] = useState('../../pics/EmperorPenguinBaby.jpeg');

    function onImageClick(src: string) {
      setImage(src)
    }
  
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
              onClick={() => alert("Add Image functionality to be implemented")}
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

            </Group>
  
          </Group>
        </header>

        {image && <Main selectedImage={image} style={{ position: 'absolute', top: '100vh' }} />}

        <Dropdown />
      </Box>
    );
  }