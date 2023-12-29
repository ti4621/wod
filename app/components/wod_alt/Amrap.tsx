import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface AmrapProps {
  roundTime?: number;
  totalRounds?: number;
  onDelete?: () => void;
}

const Amrap: React.FC<AmrapProps> = ({ roundTime = 20, totalRounds = 2, onDelete }) => {
  return (
    <div>
      {onDelete && 
      <div onClick={onDelete}>
        <IoCloseOutline />
      </div> }
      <h2>AMRAP Workout</h2>
      <p>Total Duration: {roundTime} minutes</p>
      <p>Total Sets: {totalRounds}</p>
      {/* Add more details about the EMOM workout here, like exercises for each minute, etc. */}
    </div>
  );
};

export default Amrap;
