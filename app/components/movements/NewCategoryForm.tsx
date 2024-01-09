"use client"

import React, { useState } from 'react';
import { useMovements } from '@/app/contexts/MovementContext';

interface NewCategoryFormProps {
  onCategorySubmit: () => void; 
}

const NewCategoryForm: React.FC<NewCategoryFormProps> = ({onCategorySubmit}) => {
  const [newCategory, setNewCategory] = useState('');
  const { setMovements } = useMovements();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMovements(prevMovements => ({
      ...prevMovements,
      [newCategory]: {}
    }));
    onCategorySubmit();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Insert new category:
          <input 
            type="text" 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)} 
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewCategoryForm;
