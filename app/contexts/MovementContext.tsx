import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

export type UnitType = 'reps' | 'seconds' | 'meters' | 'kg';

export interface UnitDetail {
  type: UnitType;
  value: number;
}

export interface Movement {
  details: UnitDetail[];
}

interface Movements {
  [category: string]: Record<string, Movement>;
}


const initialMovements: Movements = {
  Barbell: {
    "Snatch": { details: [{ type: 'reps', value: 0 }, { type: 'kg', value: 0 }] },
    "Clean and Jerk": { details: [{ type: 'reps', value: 0 }, { type: 'kg', value: 0 }] },
    "Deadlift": { details: [{ type: 'reps', value: 0 }, { type: 'kg', value: 0 }] }
  },
  Dumbbell: {
    "Dumbbell Press": { details: [{ type: 'reps', value: 0 }] },
    "Dumbbell Row": { details: [{ type: 'reps', value: 0 }] },
    "Dumbbell Snatch": { details: [{ type: 'reps', value: 0 }] }
  },
  Bodyweight: {
    "Push-ups": { details: [{ type: 'reps', value: 0 }] },
    "Pull-ups": { details: [{ type: 'reps', value: 0 }] },
    "Squats": { details: [{ type: 'reps', value: 0 }] }
  },
  Gymnastics: {
    "Muscle Up": { details: [{ type: 'reps', value: 0 }] },
    "Handstand Push Up": { details: [{ type: 'reps', value: 0 }] },
    "Pistol Squat": { details: [{ type: 'reps', value: 0 }] }
  },
  Cardio: {
    "Running": { details: [{ type: 'meters', value: 0 }] },
    "Rowing": { details: [{ type: 'meters', value: 0 }] },
    "Plank": { details: [{ type: 'seconds', value: 0 }] }
  }
};


interface MovementsContextProps {
  movements: Movements;
  setMovements: React.Dispatch<React.SetStateAction<Movements>>;
}

const MovementsContext = createContext<MovementsContextProps | undefined>(undefined);

export const MovementsProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [movements, setMovements] = useState<Movements>(initialMovements);

  return (
    <MovementsContext.Provider value={{ movements, setMovements }}>
      {children}
    </MovementsContext.Provider>
  );
};

export const useMovements = () => {
  const context = useContext(MovementsContext);
  if (context === undefined) {
    throw new Error('useMovements must be used within a MovementsProvider');
  }
  return context;
};
