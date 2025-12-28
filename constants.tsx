
import React from 'react';

export const COLORS = {
  accent: '#c0392b',
  gold: '#d4af37',
  titanGreen: '#2ecc71',
  grittyBlack: '#0a0a0a',
};

export const WingsOfFreedom = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow-lg">
    <path 
      fill="white" 
      d="M20,30 C30,10 70,10 80,30 L80,70 C70,90 30,90 20,70 Z" 
      className="opacity-20"
    />
    {/* Blue Wing */}
    <path 
      fill="#2980b9" 
      d="M50,20 C40,25 35,40 35,55 C35,70 45,75 50,75 L50,65 C45,65 42,60 42,55 C42,45 45,35 50,30 Z" 
    />
    {/* White Wing */}
    <path 
      fill="white" 
      d="M50,20 C60,25 65,40 65,55 C65,70 55,75 50,75 L50,65 C55,65 58,60 58,55 C58,45 55,35 50,30 Z" 
    />
    {/* Outline details */}
    <path 
      stroke="black" 
      strokeWidth="1" 
      fill="none" 
      d="M50,20 L50,75 M35,40 L65,40 M35,55 L65,55 M35,70 L65,70" 
      opacity="0.3"
    />
  </svg>
);

export const JAPANESE_TEXT = {
  title: "進撃の巨人",
  subtitle: "自由への翼",
  motto: "心臓を捧げよ",
  eren: "エレン・イェーガー"
};
