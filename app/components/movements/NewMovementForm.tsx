import React, { useState } from 'react';
import { useMovements } from '@/app/contexts/MovementContext';

interface NewMovementFormProps {
  category: string;
  onNewMovementSubmit: () => void;
}

const NewMovementForm: React.FC<NewMovementFormProps> = ({ category, onNewMovementSubmit }) => {
  const [newMovement, setNewMovement] = useState('');
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]); // To track selected detail types
  const { movements, setMovements } = useMovements();

  const detailOptions = ['reps', 'seconds', 'meters', 'kg']; // Possible detail options

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare details structure based on selected details
    const details = selectedDetails.map(detail => ({
      type: detail as 'reps' | 'seconds' | 'meters' | 'kg',
      value: 0
    }));

    setMovements(prevMovements => ({
      ...prevMovements,
      [category]: {
        ...prevMovements[category],
        [newMovement]: { details }
      }
    }));
    onNewMovementSubmit();
  };

  const handleDetailSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedDetails(selectedOptions);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Insert new movement:
          <input 
            type="text" 
            value={newMovement} 
            onChange={(e) => setNewMovement(e.target.value)} 
          />
        </label>
        <label>
          Select details:
          <select multiple value={selectedDetails} onChange={handleDetailSelection}>
            {detailOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewMovementForm;
