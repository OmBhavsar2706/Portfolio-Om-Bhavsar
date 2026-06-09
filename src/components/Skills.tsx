import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowLeftRight, 
  Palette, 
  Binary, 
  Cpu, 
  UserCheck, 
  Brain, 
  Network, 
  CheckSquare 
} from 'lucide-react';
import { skillCategories } from '../data/portfolio';

// Custom original logo SVG paths for strict match to official design specifications
function getBrandLogoSvg(name: string) {
  const norm = name.toLowerCase();
  
  if (norm === 'javascript' || norm === 'js') {
    return (
      <svg className="w-5 h-5 rounded select-none flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#F7DF1E"/>
        <path d="M42.2 73.5c0 8.6-4.5 13.1-12 13.1-4.7 0-8.2-2.1-10.1-5.1l5.4-4.8c1.3 1.9 2.9 3 4.7 3 2.9 0 3.9-1.9 3.9-5.1V51.7h8.1v21.8zm29.3 5c0 6.6-4.2 10.9-11.4 10.9-4.9 0-8.8-2.3-10.9-5.1l5.1-4.8c1.3 1.9 3.3 3.1 5.8 3.1 3 0 4.4-1.4 4.4-3.5 0-6.1-17.9-2.9-17.9-15.6 0-6.1 4.3-10.2 10.8-10.2 4.3 0 7.5 1.7 9.6 4.1l-4.2 4.3c-1.4-1.5-3.1-2.2-5-2.2-2.6 0-3.7 1.2-3.7 2.8 0 5.6 17.4 1.8 17.4 14.5v1.8z" fill="#000" />
      </svg>
    );
  }
  
  if (norm === 'typescript' || norm === 'ts') {
    return (
      <svg className="w-5 h-5 rounded select-none flex-shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fff" d="M22.67 47h99.67v73.67H22.67z"/>
        <path d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z" fill="#007acc"/>
      </svg>
    );
  }

  if (norm === 'react') {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0 animate-[spin_12s_linear_infinite]" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }

  if (norm.includes('tailwind')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 25C39.6 25 33.3 29.2 31.3 37.5C34.4 31.3 38.1 29.2 42.2 31.3C44.6 32.5 46.3 34.2 48.1 36.1C51.2 39.2 54.8 42.9 62.5 42.9C72.9 42.9 79.2 38.8 81.3 30.4C78.1 36.7 74.4 38.8 70.3 36.7C67.9 35.4 66.2 33.8 64.4 31.9C61.3 28.8 57.7 25 50 25ZM31.3 42.9C20.8 42.9 14.6 47.1 12.5 55.4C15.6 49.2 19.3 47.1 23.4 49.2C25.8 50.4 27.5 52.1 29.3 54C32.4 57.1 36 60.8 43.8 60.8C54.2 60.8 60.4 56.7 62.5 48.3C59.4 54.6 55.7 56.7 51.6 54.6C49.2 53.3 47.5 51.7 45.7 49.8C42.6 46.7 39 42.9 31.3 42.9Z" fill="#38BDF8" />
      </svg>
    );
  }

  if (norm.includes('html & css') || norm === 'html' || norm === 'css') {
    return (
      <div className="flex -space-x-1.5 justify-center items-center select-none flex-shrink-0">
        {/* HTML5 Shield */}
        <svg className="w-4 h-4" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M71.5 0h369l-33.6 378.4L256 512 106.1 378.4 71.5 0z" fill="#E34F26" />
          <path d="M256 476.9V34.5h154.4l-27.4 309.4L256 476.9z" fill="#F06529" />
          <path d="M256 220.5H171.7l-5.9-66.3H256V87.9H100l17.7 198.8H256v-66.2zm0 102.4l-.3.1-38.3-10.3-2.4-27.4h-66.2l4.8 54 102.4 28.4V322.9z" fill="#EAEAEA" />
          <path d="M256 220.5h90.3L337.8 317l-81.8 22.7V220.5zm0-132.6h150.3l-5.9 66.3H256V87.9z" fill="#FFFFFF" />
        </svg>
        {/* CSS3 Shield */}
        <svg className="w-4 h-4" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M71.5 0h369l-33.6 378.4L256 512 106.1 378.4 71.5 0z" fill="#1572B6" />
          <path d="M256 476.9V34.5h154.4l-27.4 309.4L256 476.9z" fill="#33A9DC" />
          <path d="M256 220.5h-84.3l-5.9-66.3H256V87.9H100l17.7 198.8H256v-66.2zM256 322.9l-.3.1-38.3-10.3-2.4-27.4h-66.2l4.8 54 102.4 28.4v-44.8z" fill="#EAEAEA" />
          <path d="M256 220.5h90.3l-8.5 96.6-81.8 22.7V220.5zM256 87.9h150.3l-5.9 66.3H256V87.9z" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  if (norm === 'node.js' || norm === 'nodejs') {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M222.1 63.8l-84.3-48.7c-6.1-3.5-13.5-3.5-19.6 0L33.9 63.8C27.8 67.3 24 73.8 24 80.9v97.4c0 7.1 3.8 13.6 9.9 17.1l84.3 48.7c6.1 3.5 13.5 3.5 19.6 0l84.3-48.7c6.1-3.5 9.9-10 9.9-17.1V80.9c0-7.1-3.8-13.6-9.9-17.1z" fill="#339933" />
        <path d="M128 190l55-31.7V93.7L128 62v128z" fill="#66CC33" />
        <path d="M128 190l-55-31.7V93.7L128 62v128z" fill="#43853D" />
      </svg>
    );
  }

  if (norm.includes('python')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="python-grad-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
            <stop offset="0" stopColor="#5A9FD4"/>
            <stop offset="1" stopColor="#306998"/>
          </linearGradient>
          <linearGradient id="python-grad-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
            <stop offset="0" stopColor="#FFD43B"/>
            <stop offset="1" stopColor="#FFE873"/>
          </linearGradient>
        </defs>
        <path fill="url(#python-grad-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"/>
        <path fill="url(#python-grad-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"/>
      </svg>
    );
  }

  if (norm === 'java') {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
        <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
        <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
        <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
        <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
      </svg>
    );
  }

  if (norm.includes('firebase')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.89 19.53L1.03 14a.8.8 0 01.12-.9l8.6-8.77a.8.8 0 011.14 0l2 2-8 13.2z" fill="#FFC24C" />
        <path d="M15.44 6.74l-.94-2.84a.8.8 0 00-1.52 0L1.13 14l14.31-7.26z" fill="#FFA611" />
        <path d="M12 24c3.31 0 6.46-1.54 8.44-4.14l-4.1-10.22L12 24z" fill="#F44336" />
      </svg>
    );
  }

  if (norm.includes('supabase')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M112.5 53.4c-1.3-1.6-3.3-2.5-5.5-2.5H74.3l12.7-34.9c.9-2.5.3-5.3-1.5-7.2s-4.6-2.5-7.1-1.6L20.4 28.5c-2.4.9-4.1 3-4.4 5.6-.4 2.6.7 5.1 2.8 6.7l32.1 24.6h-34.1c-2.4 0-4.6 1.3-5.8 3.5-1.2 2.2-1.1 4.8.2 6.9l58.1 91c1.3 2.1 3.7 3.2 6.1 3.2 1.1 0 2.2-.2 3.2-.8 2.4-1.3 3.7-3.9 3.2-6.6l-11.4-59.3h39.7c2.4 0 4.6-1.3 5.8-3.5 1.2-2.1 1.1-4.8-.2-6.9z" fill="#3ECF8E" />
      </svg>
    );
  }

  if (norm.includes('mysql')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.11 2C6.94 2 2.73 6.08 2.73 11.1c0 2.9 1.4 5.5 3.56 7.15L5 21.2a.5.5 0 00.77.56l3-2.11A11 11 0 0012.11 20c5.17 0 9.38-4.08 9.38-9.1C21.49 6.08 17.28 2 12.11 2zm3.68 13.06c-1.2-1.3-4.3-2-6.5-.4a10.2 10.2 0 01-1.8-6.1c0-2 2-3.6 4.5-3.6s4.5 1.6 4.5 3.6c0 2-2.1 4-4.5 4.5 2.1-1.1 4-1.2 4.9.4.9 1.6-.3 3.6-1.1 4.6z" fill="#00758F" />
        <path d="M13.5 10.5c-.8.8-1.8 1.1-2.5 1-.4 0-.8-.2-1-.5-.5-.8-.1-2.1.8-3 .9-.9 2.1-.9 2.6-.1.2.3.2.7.1 1.1V10c0 .2 0 .4 0 .5z" fill="#F29111" />
      </svg>
    );
  }

  if (norm.includes('oracle')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 120 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 0C26.8 0 0 9.5 0 21s26.8 21 60 21 60-9.5 60-21S93.2 0 60 0zm0 32.5c-17.7 0-32-5.1-32-11.5S42.3 9.5 60 9.5s32 5.1 32 11.5-14.3 11.5-32 11.5z" fill="#F80000" />
      </svg>
    );
  }

  if (norm.includes('git')) {
    if (norm.includes('github')) {
      return (
        <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M494.6 226.7L285.3 17.5c-23.3-23.3-61.1-23.3-84.4 0L17.5 200.9s0 0 0 0c-23.3 23.3-23.3 61.1 0 84.4l209.3 209.3c23.3 23.3 61.1 23.3 84.4 0L494.6 311c23.3-23.4 23.3-61.1 0-84.3z" fill="#F05032" />
        <path d="M228.4 179.9c0-14.4-11.6-26-26-26s-26 11.6-26 26c0 10.7 6.4 19.9 15.6 23.9v104.5c-9.2 4-15.6 13.2-15.6 23.9 0 14.4 11.6 26 26 26s26-11.6 26-26c0-10.7-6.4-19.9-15.6-23.9V203.8c9.2-4 15.6-13.2 15.6-23.9zM202.4 340.5c-5.7 0-10.2-4.6-10.2-10.2s4.6-10.2 10.2-10.2 10.2 4.6 10.2 10.2-4.6 10.2-10.2 10.2zm0-160.6c-5.7 0-10.2-4.6-10.2-10.2s4.6-10.2 10.2-10.2 10.2 4.6 10.2 10.2-4.6 10.2-10.2 10.2zm112.5 106.6c0-14.4-11.6-26-26-26s-26 11.6-26 26c0 10.7 6.4 19.9 15.6 23.9v27.2c-9.2 4-15.6 13.2-15.6 23.9 0 14.4 11.6 26 26 26s26-11.6 26-26c0-10.7-6.4-19.9-15.6-23.9v-27.2c9.2-4 15.6-13.2 15.6-23.9zm-26 26c-5.7 0-10.2-4.6-10.2-10.2s4.6-10.2 10.2-10.2 10.2 4.6 10.2 10.2-4.6 10.2-10.2 10.2zm0 106.6c-5.7 0-10.2-4.6-10.2-10.2s4.6-10.2 10.2-10.2 10.2 4.6 10.2 10.2-4.6 10.2-10.2 10.2z" fill="#FFFFFF" fillRule="evenodd" />
      </svg>
    );
  }

  if (norm.includes('claude')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2.5l1.6 4.9 4.9 1.6-4.9 1.6-1.6 4.9-1.6-4.9-4.9-1.6 4.9-1.6z" fill="#CC9F72" />
        <path d="M26 10.5l1.2 3.8 3.8 1.2-3.8 1.2-1.2 3.8-1.2-3.8-3.8-1.2 3.8-1.2z" fill="#CC9F72" opacity="0.85" />
        <path d="M6 10.5l1.2 3.8 3.8 1.2-3.8 1.2-1.2 3.8-1.2-3.8-3.8-1.2 3.8-1.2z" fill="#CC9F72" opacity="0.85" />
      </svg>
    );
  }

  if (norm.includes('vs code') || norm.includes('vscode')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="vscode-mask" width="128" height="128" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
          <path fill="#fff" fillRule="evenodd" d="M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z" clipRule="evenodd"/>
        </mask>
        <g mask="url(#vscode-mask)">
          <path fill="#0065A9" d="M123.471 13.82 97.097 1.12A7.973 7.973 0 0 0 88 2.668L1.662 81.387a5.333 5.333 0 0 0 .006 7.887l7.052 6.411a5.333 5.333 0 0 0 6.811.303l103.971-78.875c3.488-2.646 8.498-.158 8.498 4.22v-.306a8.001 8.001 0 0 0-4.529-7.208Z"/>
          <g filter="url(#vscode-blur-b)">
            <path fill="#007ACC" d="m123.471 114.181-26.374 12.698A7.973 7.973 0 0 1 88 125.333L1.662 46.613a5.333 5.333 0 0 1 .006-7.887l7.052-6.411a5.333 5.333 0 0 1 6.811-.303l103.971 78.874c3.488 2.647 8.498.159 8.498-4.219v.306a8.001 8.001 0 0 1-4.529 7.208Z"/>
          </g>
          <g filter="url(#vscode-blur-c)">
            <path fill="#1F9CF0" d="M97.098 126.882A7.977 7.977 0 0 1 88 125.333c2.952 2.952 8 .861 8-3.314V5.98c0-4.175-5.048-6.266-8-3.313a7.977 7.977 0 0 1 9.098-1.549L123.467 13.8A8 8 0 0 1 128 21.01v85.982a8 8 0 0 1-4.533 7.21l-26.369 12.681Z"/>
          </g>
          <path fill="url(#vscode-grad-d)" fillRule="evenodd" d="M90.69 127.126a7.968 7.968 0 0 0 6.349-.244l26.353-12.681a8 8 0 0 0 4.53-7.21V21.009a8 8 0 0 0-4.53-7.21L97.039 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026-21.974-16.68a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.336 5.336 0 0 0-.006 7.888L20.718 64 1.662 81.386a5.335 5.335 0 0 0 .006 7.888l7.048 6.411a5.328 5.328 0 0 0 6.807.303l21.975-16.681 50.45 46.026a7.959 7.959 0 0 0 2.742 1.793Zm5.252-92.184L57.662 64l38.28 29.057V34.943Z" clipRule="evenodd" opacity="0.25" style={{ mixBlendMode: "overlay" }}/>
        </g>
        <defs>
          <filter id="vscode-blur-b" width="144.744" height="113.408" x="-8.41115" y="22.5944" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="4.16667"/>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow_1_36"/>
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_36" result="shape"/>
          </filter>
          <filter id="vscode-blur-c" width="56.6667" height="144.007" x="79.6667" y="-8.0035" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="4.16667"/>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow_1_36"/>
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_36" result="shape"/>
          </filter>
          <linearGradient id="vscode-grad-d" x1="63.9222" x2="63.9222" y1="0.329902" y2="127.67" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff"/>
            <stop offset="1" stopColor="#fff" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm.includes('c++')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#00599c" d="M118.766 95.82c.89-1.543 1.441-3.28 1.441-4.843V36.78c0-1.558-.55-3.297-1.441-4.84l-55.32 31.94Z"/>
        <path fill="#004482" d="m68.36 126.586 46.933-27.094c1.352-.781 2.582-2.129 3.473-3.672l-55.32-31.94L8.12 95.82c.89 1.543 2.121 2.89 3.473 3.672l46.933 27.094c2.703 1.562 7.13 1.562 9.832 0Z"/>
        <path fill="#659ad2" d="M118.766 31.941c-.891-1.546-2.121-2.894-3.473-3.671L68.359 1.172c-2.703-1.563-7.129-1.563-9.832 0L11.594 28.27C8.89 29.828 6.68 33.66 6.68 36.78v54.196c0 1.562.55 3.3 1.441 4.843L63.445 63.88Z"/>
        <path fill="#fff" d="M63.445 26.035c-20.867 0-37.843 16.977-37.843 37.844s16.976 37.844 37.843 37.844c13.465 0 26.024-7.247 32.77-18.91L79.84 73.335c-3.38 5.84-9.66 9.465-16.395 9.465-10.433 0-18.922-8.488-18.922-18.922 0-10.434 8.49-18.922 18.922-18.922 6.73 0 13.017 3.629 16.39 9.465l16.38-9.477c-6.75-11.664-19.305-18.91-32.77-18.91zM92.88 57.57v4.207h-4.207v4.203h4.207v4.207h4.203V65.98h4.203v-4.203h-4.203V57.57H92.88zm15.766 0v4.207h-4.204v4.203h4.204v4.207h4.207V65.98h4.203v-4.203h-4.203V57.57h-4.207z"/>
      </svg>
    );
  }

  if (norm === 'c') {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M71.5 0h369l-33.6 378.4L256 512 106.1 378.4 71.5 0z" fill="#3949AB" />
        <path d="M256 80c-75.1 0-136 60.9-136 136s60.9 136 136 136c34.7 0 66.3-13 90.5-34.3l47 47C351 398.2 306 418 256 418 144.4 418 54 327.6 54 216S144.4 14 256 14c50 0 95 19.8 137.5 53.3l-47 47C322.3 93 290.7 80 256 80z" fill="#FFFFFF" />
      </svg>
    );
  }

  // FIGMA original design vector layout for UI/UX
  if (norm.includes('ui/ux')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 45C30 69.8528 50.1472 90 75 90C75 90 120 90 120 90V45C120 20.1472 99.8528 0 75 0C50.1472 0 30 20.1472 30 45Z" fill="#F24E1E"/>
        <path d="M30 135C30 110.147 50.1472 90 75 90V180C50.1472 180 30 159.853 30 135Z" fill="#1ABC9C"/>
        <path d="M120 135C120 159.853 99.8528 180 75 180C50.1472 180 30 159.853 30 135C30 110.147 50.1472 90 75 90C99.8528 90 120 110.147 120 135Z" fill="#0ACF83"/>
        <path d="M120 90V135H75C50.1472 135 30 114.853 30 90H120Z" fill="#A259FF"/>
        <path d="M120 45V90H75C50.1472 90 30 69.8528 30 45C30 20.1472 50.1472 0 75 0C99.8528 0 120 20.1472 120 45H75z" fill="#FF7262"/>
      </svg>
    );
  }

  // REST APIs -> Postman Orange Spaceship
  if (norm.includes('api')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="128" cy="128" r="120" fill="#FF6C37" />
        <path d="M190.1 76.9c-2.4-2.4-5.9-3.2-9-2L103.7 105c-3.1 1.2-5.1 4.2-5.1 7.6v23.2l-21.7 5c-3.3.8-5.7 3.7-5.7 7.1v24.4c0 1.2.6 2.3 1.6 3l11.4 7.7c1.3.9 3.1.6 4-.7l13.6-20.2 20.3 13.6c1.3.9 3 .6 3.9-.7l7.7-11.4c.7-1 1.8-1.6 3-1.6h24.4s3.3-2.4 4.1-5.7l5-21.7h23.2c3.4 0 6.4-2 7.6-5.1l30.1-77.4c1.2-3.1.4-6.6-2-9z" fill="#FFFFFF" />
        <path d="M103.7 105c2-2 4.9-3 7.7-2l77.4 30.1c4.1 1.6 4.1 7.4 0 9l-23.2 5-5 21.7c-.8 3.3-3.7 5.7-7.1 5.7H130l-13.6-20.3-20.3 13.6v-24.4s.8-3.3 2.4-5l5-21.7-23.2-5c-3.1-1.2-5.1-4.2-5.1-7.6zM77 168.3v5.6c0 4.1 3.3 7.4 7.4 7.4h5.6c4.1 0 7.4-3.3 7.4-7.4v-5.6h-13c-4.1.1-7.4-3.2-7.4-7.4z" fill="#FFF" opacity="0.35" fillRule="evenodd" clipRule="evenodd" />
      </svg>
    );
  }

  // Specialized four-point spark vector for Prompts and Generative AI
  if (norm.includes('prompt') || norm.includes('generative ai') || norm.includes('llm')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9BC5FF" />
            <stop offset="50%" stopColor="#2F66FF" />
            <stop offset="100%" stopColor="#FF9B9B" />
          </linearGradient>
        </defs>
        <path d="M50 0c0 27.6 22.4 50 50 50-27.6 0-50 22.4-50 50 0-27.6-22.4-50-50-50 27.6 0 50-22.4 50-50z" fill="url(#sparkGrad)" />
      </svg>
    );
  }

  // Version Control -> GIT
  if (norm.includes('version control')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M494.6 226.7L285.3 17.5c-23.3-23.3-61.1-23.3-84.4 0L17.5 200.9s0 0 0 0c-23.3 23.3-23.3 61.1 0 84.4l209.3 209.3c23.3 23.3 61.1 23.3 84.4 0L494.6 311c23.3-23.4 23.3-61.1 0-84.3z" fill="#F05032" />
        <path d="M228.4 179.9c0-14.4-11.6-26-26-26s-26 11.6-26 26c0 10.7 6.4 19.9 15.6 23.9v104.5c-9.2 4-15.6 13.2-15.6 23.9 0 14.4 11.6 26 26 26s26-11.6 26-26c0-10.7-6.4-19.9-15.6-23.9V203.8c9.2-4 15.6-13.2 15.6-23.9zM202.4 340.5c-5.7 0-10.2-4.6-10.2-10.2s4.6-10.2 10.2-10.2 10.2 4.6 10.2 10.2-4.6 10.2-10.2 10.2zm0-160.6c-5.7 0-10.2-4.6-10.2-10.2s4.6-10.2 10.2-10.2 10.2 4.6 10.2 10.2-4.6 10.2-10.2 10.2zm112.5 106.6c0-14.4-11.6-26-26-26s-26 11.6-26 26c0 10.7 6.4 19.9 15.6 23.9v27.2c-9.2 4-15.6 13.2-15.6 23.9 0 14.4 11.6 26 26 26s26-11.6 26-26c0-10.7-6.4-19.9-15.6-23.9v-27.2c9.2-4 15.6-13.2 15.6-23.9zm-26 26c-5.7 0-10.2-4.6-10.2-10.2s4.6-10.2 10.2-10.2 10.2 4.6 10.2 10.2-4.6 10.2-10.2 10.2zm0 106.6c-5.7 0-10.2-4.6-10.2-10.2s4.6-10.2 10.2-10.2 10.2 4.6 10.2 10.2-4.6 10.2-10.2 10.2z" fill="#FFFFFF" fillRule="evenodd" />
      </svg>
    );
  }

  // Production Deployment -> DOCKER Whale & Stacked Containers
  if (norm.includes('production deployment')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="52" y="104" width="24" height="16" rx="2" fill="#2496ED" />
        <rect x="80" y="104" width="24" height="16" rx="2" fill="#2496ED" />
        <rect x="108" y="104" width="24" height="16" rx="2" fill="#2496ED" />
        <rect x="66" y="84" width="24" height="16" rx="2" fill="#2496ED" />
        <rect x="94" y="84" width="24" height="16" rx="2" fill="#2496ED" />
        <rect x="80" y="64" width="24" height="16" rx="2" fill="#2496ED" />
        <path d="M236.4 133.4c-4.4-1.2-12.8-2.4-23.2-.8-1.6-4.8-4.8-13.6-11.2-17.6-.8-.4-1.6-.4-2-.4-.8 0-1.6.4-1.6 1.2v17.2c-5.6 1.2-12 3.6-17.6 6.8V126c0-.8-.8-1.6-1.6-1.6h-14.8c-.8 0-1.6.8-1.6 1.6v19.2c-7.2 5.2-13.6 11.6-16 15.6l-20.8-7.2c-.8-.4-1.8-.4-2.4 0H94.4l-11.6 12H61.6c-.8 0-1.6.8-1.6 1.6v23.2h-12c-.8 0-1.6.8-1.6 1.6v9.2c0 24.8 19.6 44.8 44 44.8s44-20 44-44.8c0-3.6-.4-7.2-1.2-10.4l34-11.6 22-7.6h4.8c12.4 0 24.8-12 30-22 4.4-8.8 8.4-18.4 13.6-25.2.8-1.2 2-2 3.6-2 1.6 0 3.2.4 4.8.8 2 .4 4.4.8 6.4.8.8 0 1.6-.8 1.6-1.6v-.4c0-.4-.4-.8-.8-.8z" fill="#2496ED" />
      </svg>
    );
  }

  // Efficient Debugging -> Interactive shell terminal
  if (norm.includes('debugging')) {
    return (
      <svg className="w-5 h-5 select-none flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#1E1E1E" />
        <path d="M6 8l4 4-4 4M12 16h6" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Binary Structures for DSA
  if (norm.includes('dsa') || norm.includes('data structure')) {
    return <Binary className="w-4.5 h-4.5 text-teal-400 flex-shrink-0" />;
  }

  // Soft/workflow fallbacks
  if (norm.includes('collaboration') || norm.includes('mentorship')) {
    return <UserCheck className="w-4.5 h-4.5 text-amber-400 flex-shrink-0" />;
  }

  if (norm.includes('problem-solving')) {
    return <Brain className="w-4.5 h-4.5 text-indigo-400 flex-shrink-0" />;
  }

  if (norm.includes('task management') || norm.includes('deadlines') || norm.includes('communication')) {
    return <CheckSquare className="w-4.5 h-4.5 text-[#B497CF] flex-shrink-0" />;
  }
  
  return <CheckSquare className="w-4.5 h-4.5 text-[#B497CF] flex-shrink-0" />;
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'technical' | 'tools' | 'soft'>('all');

  // Extract a flattened list of all specific skills (excluding Python Backend from earlier)
  const allFlattenedSkills: any[] = [];
  skillCategories.forEach(cat => {
    const catNameNorm = cat.category.toLowerCase();
    let group = 'technical';
    if (catNameNorm.includes('tools') || catNameNorm.includes('core technical')) group = 'tools';
    else if (catNameNorm.includes('soft') || catNameNorm.includes('workflow')) group = 'soft';

    cat.skills.forEach(sk => {
      // Avoid duplicate display entries of the exact same skill if declared twice
      const alreadyExists = allFlattenedSkills.some(
        exist => exist.name.toLowerCase() === sk.name.toLowerCase()
      );
      if (!alreadyExists) {
        allFlattenedSkills.push({
          ...sk,
          category: cat.category,
          group
        });
      }
    });
  });

  const filteredFlattened = allFlattenedSkills.filter(sk => {
    if (activeFilter === 'all') return true;
    return sk.group === activeFilter;
  });

  return (
    <section id="skills" className="py-24 bg-[#FCFDFE] dark:bg-[#050505] text-neutral-900 dark:text-white border-t border-b border-neutral-200/40 dark:border-neutral-900/40 relative overflow-hidden transition-all duration-500">
      
      {/* Decorative High Fidelity Ambient Radial Gradients (Teal + Purple Glow matching full screen theme) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[200px] h-[200px] bg-[#B497CF]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left space-y-4 mb-16 max-w-3xl border-l-[3px] border-[#B497CF] pl-5">
          <span className="text-xs font-mono font-bold tracking-widest text-[#B497CF] uppercase block">
            Core Competencies
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white mb-2" id="skills-title">
            My <span className="font-display italic font-medium text-gradient-cosmic">Skillsets</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base font-medium max-w-xl font-sans leading-relaxed">
            Beautifully aggregated catalog of programming languages, modern stacks, cloud servers, AI tools, and core system paradigms.
          </p>
        </div>

        {/* Dynamic Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12" id="skills-filter-tabs">
          {[
            { id: 'all', label: 'All Skillsets' },
            { id: 'technical', label: 'Core Technical Stacks' },
            { id: 'tools', label: 'Tools & Workflows' },
            { id: 'soft', label: 'Soft Skills & Systems' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4.5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-200 border ${
                activeFilter === tab.id
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-[#090D1A] border-neutral-900 dark:border-white shadow-lg shadow-neutral-900/10 dark:shadow-white/10 scale-105'
                  : 'bg-white dark:bg-neutral-900/65 text-neutral-500 dark:text-neutral-400 border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* High Fidelity Circular Bubble/Capsule Layout Cloud matching user requirements */}
        <div className="relative min-h-[300px]">
          <motion.div 
            layout
            className="flex flex-wrap gap-3.5 justify-center md:justify-start items-center p-8 bg-white/70 dark:bg-neutral-950/40 backdrop-blur-md rounded-2xl border border-neutral-200/50 dark:border-neutral-800/60 shadow-2xl relative"
            id="skills-ambient-cloud-container"
          >
            {/* Soft backdrop inner border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/5 via-transparent to-purple-500/5 pointer-events-none opacity-40" />

            <AnimatePresence mode="popLayout">
              {filteredFlattened.map((skill, skIdx) => {
                const icon = getBrandLogoSvg(skill.name);
                return (
                  <motion.div
                    key={`${skill.category}-${skill.name}`}
                    layout
                    initial={{ opacity: 0, scale: 0.85, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -15 }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 140,
                      damping: 18,
                      delay: Math.min(skIdx * 0.015, 0.25)
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -3,
                      boxShadow: "0 12px 24px -10px rgba(180, 151, 207, 0.3)"
                    }}
                    className="flex items-center gap-3 px-5 py-3.5 bg-white dark:bg-neutral-900/80 hover:bg-neutral-50 dark:hover:bg-[#121A2E]/95 border border-neutral-200 dark:border-neutral-800/70 hover:border-[#B497CF]/40 dark:hover:border-[#B497CF]/40 rounded-full shadow-sm hover:shadow-md transition-colors duration-200 cursor-default group"
                    id={`skill-bubble-${skill.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  >
                    {/* The left aligned original logo SVG */}
                    <div className="flex items-center justify-center transition-transform group-hover:scale-110">
                      {icon}
                    </div>

                    {/* Skill title label - styled beautifully with light/dark adaptive text */}
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-200 group-hover:text-neutral-955 dark:group-hover:text-white transition-colors tracking-wide font-sans leading-none">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
