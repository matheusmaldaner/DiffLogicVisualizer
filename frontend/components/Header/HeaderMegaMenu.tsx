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

            </Group>
  
          </Group>
        </header>

        {image && <Main selectedImage={image} style={{ position: 'absolute', top: '100vh' }} />}

        <Dropdown />
      </Box>
    );
  }