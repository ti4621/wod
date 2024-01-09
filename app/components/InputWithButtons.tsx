import React, { useState } from 'react';

interface NumberInputWithControlsProps {
  initialValue: number;
  onChange: (newValue: number | '') => void;
  changeValue?: number;
}

const NumberInputWithControls: React.FC<NumberInputWithControlsProps> = ({
  initialValue,
  onChange,
  changeValue = 1
}) => {
  // Initialize with a number or an empty string if initialValue is 0
  const [value, setValue] = useState<number | ''>(initialValue === 0 ? '' : initialValue);

  const handleIncrement = () => {
    const newValue = (typeof value === 'number' ? value : 0) + changeValue;
    setValue(newValue);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = (typeof value === 'number' ? value : 0) - changeValue;
    setValue(newValue > 0 ? newValue : 0);
    onChange(newValue > 0 ? newValue : 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? '' : parseInt(e.target.value, 10);
    setValue(newValue);
    onChange(newValue);
  };

  const handleInputClick = () => {
    if (value === 0) {
      setValue('');
    }
  };

  return (
    <div className='flex items-center'>
      <button onClick={handleDecrement}>-</button>
      <input 
        type="number" 
        value={value} 
        onChange={handleInputChange} 
        onClick={handleInputClick}
        className="mx-2 p-1 w-16 text-center bg-white border-2 border-slate-300 rounded-lg focus:outline-slate-500 focus:bg-slate-50"
      />
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default NumberInputWithControls;
