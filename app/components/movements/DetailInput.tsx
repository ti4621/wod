import React from 'react';
import NumberInputWithControls from '../InputWithButtons';

interface DetailInputProps {
  type: string;
  value: number;
  onChange: (newValue: number) => void;
}

const DetailInput: React.FC<DetailInputProps> = ({ type, value, onChange }) => {

  const handleTypeChange = (newValue: number | '') => {
    if (typeof newValue === 'number') {
      onChange(newValue);
    }
  }

  return (
    <div className='flex'>
      <div className='m-1'>
        <NumberInputWithControls
        initialValue={value}
        onChange={handleTypeChange}
        changeValue={1}/>
      </div>
      <div className='m-1'>
        {type}
      </div>
    </div>
  );
};

export default DetailInput;
