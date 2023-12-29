"use client";

import React, { useState } from 'react';
import Dropdown from '@/app/components/dropdown';
import Emom from '@/app/components/wod_alt/Emom';
import Amrap from '@/app/components/wod_alt/Amrap';

const Wod: React.FC = () => {
  const [dropdowns, setDropdowns] = useState<number[]>([]);

  const placeholder = "Select an option";


  const options = [
    { label: 'EMOM', Component: Emom},
    { label: 'AMRAP', Component: Amrap},
  ];

  const addDropdown = () => {
    setDropdowns(prevDropdowns => [...prevDropdowns, prevDropdowns.length]);
  };

  return (
    <div className='border p-4 m-2'>
      {dropdowns.map((dropdownId) => (
        <Dropdown key={dropdownId} options={options} placeholder={placeholder} />
      ))}
      <div className='flex justify-center'>
        <button 
          onClick={addDropdown} 
          className={buttonStyle}
        >
          Create Block
        </button>
      </div>
      
    </div>
  );
};

const buttonStyle = "bg-white border-2 border-black text-black text-md font-bold py-2 px-4 rounded-lg active:bg-slate-200 active:ring-2 active:ring-slate-200";

export default Wod;
