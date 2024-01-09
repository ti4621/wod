"use client"

import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import NumberInputWithControls from '../InputWithButtons';
import MovementDropdown from '../movements/MovementDropdown';

interface AmrapProps {
  onDelete?: () => void;
}

const Amrap: React.FC<AmrapProps> = ({ onDelete }) => {
  const [numberOfMovements, setNumberOfMovements] = useState(1);
  const [view, setView] = React.useState<'setMovements' | 'chooseMovements'>('setMovements');
  const [dropdownStates, setDropdownStates] = useState<Record<string, string>>({});
  const [selectedCategories, setSelectedCategories] = useState<Record<string, string | null>>({});
  const [selectedMovements, setSelectedMovements] = useState<Record<string, string | null>>({});
  

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the event from bubbling up to parent elements
    if (onDelete) {
      onDelete();
    }
  };

  const handleInputChange = (newValue: number | '') => {
    if (typeof newValue === 'number') {
      setNumberOfMovements(newValue >= 0 ? newValue : 0);
    }
  }

  const handleSelectedMovements = () => { 
    if (numberOfMovements > 0) {
      setView('chooseMovements');
    }
  };

  const handleDropdownStateChange = (id: string, newState: string) => {
    setDropdownStates(prev => ({ ...prev, [id]: newState }));
  };

  const handleCategorySelect = (id: string, category: string | null) => {
        setSelectedCategories(prev => ({ ...prev, [id]: category }));
        setSelectedMovements(prev => ({ ...prev, [id]: null }));
        console.log(category)
        console.log(selectedCategories)
    };

    const handleMovementSelect = (id: string, movement: string | null) => {
        setSelectedMovements(prev => ({ ...prev, [id]: movement }));
        console.log(movement)
        console.log(selectedMovements)
    };



  return (
    <div className="flex flex-col p-4 my-4 border-2 border-gray-200 relative shadow-lg rounded-lg">
      {onDelete && (
        <div className="absolute top-0 right-0 m-2 cursor-pointer">
          <IoCloseOutline size={20} onClick={handleDeleteClick}/>
        </div> 
      )}
      <h2 className='mb-2 text-2xl text-center text-gray-800'>AMRAP</h2>
      
      {view === 'setMovements' && (<div className='flex flex-row-1 justify-around'>
        <label htmlFor="nbrOfMovements" className='p-1 m-1'>
          How many Movements?   
        </label>
        <NumberInputWithControls
          initialValue={1}
          onChange={handleInputChange}
          changeValue={1}/>
        <button
          className=''
          onClick={handleSelectedMovements}
          >
            add
        </button>
      </div>)}
      
      {view === 'chooseMovements' && (
        Array.from({ length: numberOfMovements }, (_, index) => {
          const movementId = `movement-${index}`;
          return (
            <MovementDropdown 
              key={movementId}
              id={movementId}
              dropdownState={dropdownStates[movementId] || 'none'}
              onStateChange={handleDropdownStateChange} 
              selectedMovement={selectedMovements[movementId]}
              selectedCategory={selectedCategories[movementId]}
              onCategorySelect={(category) => handleCategorySelect(movementId, category)}
              onMovementSelect={(movement) => handleMovementSelect(movementId, movement)}
              />
          );
        })
      )}

    </div>
  );
};

export default Amrap;
