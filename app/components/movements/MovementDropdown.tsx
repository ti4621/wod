import React, { useState, useRef } from 'react';
import { useMovements } from '@/app/contexts/MovementContext';
import NewCategoryForm from './NewCategoryForm';
import NewMovementForm from './NewMovementForm';
import DetailInput from './DetailInput';
import { UnitType, UnitDetail } from '@/app/contexts/MovementContext';

interface WorkoutDetails {
  [movementName: string]: UnitDetail[];
}

interface MovementDropdownProps {
    id: string;
    dropdownState: string;
    onStateChange: (id: string, newState: string) => void;
    selectedCategory: string | null;
    onCategorySelect: (category: string | null) => void;
    selectedMovement: string | null;
    onMovementSelect: (movement: string | null) => void;
}

const MovementDropdown: React.FC<MovementDropdownProps> = ({
    id, dropdownState, onStateChange, 
    selectedCategory, onCategorySelect,
    selectedMovement, onMovementSelect
}) => {
  const dropdownListRef = useRef<HTMLUListElement>(null); // Reference for the dropdown list
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutDetails>({} as WorkoutDetails);
  const { movements, setMovements } = useMovements();

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    if (category === "new_category") {
     onStateChange(id, 'none');
    } else {
     onStateChange(id, 'movement');
    }
  };

const handleMovementClick = (movement: string) => {
  onMovementSelect(movement);
  if (movement !== "new_movement") {
    if (selectedCategory && movements[selectedCategory][movement]) {
      setCurrentWorkout({
        ...currentWorkout,
        [movement]: movements[selectedCategory][movement].details
      });
     onStateChange(id, 'selectedMovement');
    }
  }
};


  const handleNewCategorySubmit = () => {
   onStateChange(id, 'category');
   onCategorySelect(null);
  };

  const handleNewMovementSubmit = () => {
   onStateChange(id, 'movement');
   onMovementSelect(null);
  };

const handleDetailChange = (movementName: string, detailType: UnitType, newValue: number) => {
  setCurrentWorkout(currentWorkout => {
    const updatedWorkout = { ...currentWorkout };
    const details = updatedWorkout[movementName] ? [...updatedWorkout[movementName]] : [];

    const detailIndex = details.findIndex(detail => detail.type === detailType);
    if (detailIndex !== -1) {
      details[detailIndex] = { ...details[detailIndex], value: newValue };
    } else {
      // If detail type doesn't exist, add it
      details.push({ type: detailType, value: newValue });
    }

    updatedWorkout[movementName] = details;
    return updatedWorkout;
  });
};



  const handleSelectedDetails = () => {
   onStateChange(id, 'selectedDetails');
  }

  const handleChangeMovement = () => {  
   onStateChange(id, 'selectedMovement');
    console.log(currentWorkout)
  };

  return (
    <div className="flex flex-col">
      
      {dropdownState === 'none' && (
        <div className='border-2 border-gray-200 shadow-lg rounded-lg p-2 m-2' onClick={() => onStateChange(id, 'category')}>
          Pick movement
        </div>
      )}

      {dropdownState === 'category' && (
        <ul className={listDesign} ref={dropdownListRef}>
          <li onClick={() => onStateChange(id, 'none')}>Go back ICON</li>
          {Object.keys(movements).map((category, index) => (
            <li 
              className={listItemDesign}
              key={index} 
              onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          ))}
          <li onClick={() => handleCategoryClick("new_category")}>
            Add new category
          </li>
        </ul>
      )}
      {selectedCategory === "new_category" && <NewCategoryForm onCategorySubmit={handleNewCategorySubmit} />}

      {dropdownState === 'movement' && (
        <ul className={listDesign} ref={dropdownListRef}>
          <li onClick={() => onStateChange(id, 'category')}>Go back</li>
          {Object.keys(movements[selectedCategory!]).map((movement, index) => (
            <li 
            className={listItemDesign} 
            key={index} 
            onClick={() => handleMovementClick(movement)}>
              {movement}
            </li>
          ))}
          <li onClick={() => handleMovementClick("new_movement")}>
            Add new movement
          </li>
        </ul>
      )}
      {selectedMovement === "new_movement" && <NewMovementForm category={ selectedCategory || ""} onNewMovementSubmit={handleNewMovementSubmit} />}
      
      {dropdownState === 'selectedMovement' && selectedCategory && selectedMovement && (
        <div>
              <ul className="border-2 border-gray-300 shadow-lg rounded-lg p-2 m-2">
                {selectedMovement}
                {movements[selectedCategory!][selectedMovement].details.map((detail, index) => (
                  <li key={index}>
                    <DetailInput
                      type={detail.type}
                      value={detail.value}
                      onChange={(newValue) => handleDetailChange(selectedMovement, detail.type, newValue)}
                    />
                  </li>
                ))}
                <button onClick={handleSelectedDetails}>
                Add to workout
              </button>
              </ul>
              
          </div>
        )}

      {dropdownState === 'selectedDetails' && (
        <div className="flex flex-row-1 justify-between mx-2 px-2" onClick={handleChangeMovement}>
          <div className='pr-2'>
            {selectedMovement}
          </div>
          <div className='flex flex-row-1 justify-between'>
            {selectedMovement && currentWorkout[selectedMovement]?.map((detail, index) => (
            <div key={index} className='pr-2'>
              {detail.value} {detail.type}
            </div>
          ))}      
          </div>    
        </div>
      )}
    </div>
  );
};

const listDesign = "border-2 border-gray-300 shadow-lg rounded-lg p-2 m-2 divide-y-2 divide-gray-200";
const listItemDesign = "p-1 m-1";

export default MovementDropdown;
