import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
import MovementDropdown from '../movements/MovementDropdown';

interface EmomProps {
  roundTime?: number;
  totalRounds?: number;
  onDelete?: () => void;
}

const Emom: React.FC<EmomProps> = ({ roundTime = 60, totalRounds = 2, onDelete }) => {
  return (
    <div className='flex flex-col p-2 m-2 border-2 border-black relative'>
      {onDelete && 
        <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={onDelete}>
          <IoCloseOutline size={20}/>
        </div> 
      }
      <h2 className='text-xl text-center'>EMOM</h2>
      <div>
        <label htmlFor="time">
          Time (Seconds per round): <input type="text" name="time" defaultValue={roundTime} className='w-8'/>
        </label>
      </div>
      <div>
        <label htmlFor="rounds">
          Total rounds: <input type="text" name="rounds" defaultValue={totalRounds} className='w-8'/>
        </label>
      </div>
      <MovementDropdown />
    </div>
  );
};

export default Emom;
