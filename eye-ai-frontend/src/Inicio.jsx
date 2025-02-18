import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { NavBar } from './NavBar';
import { Camera } from './Camera';
import { Gallery } from './Gallery';




export function Inicio() {

  
  return (
    <>
    <NavBar />
    <div class="mainContent">
    <Gallery />
    <Camera />
    </div>
    </>
  )
}