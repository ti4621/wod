import { useState, useRef, useEffect, useCallback } from 'react';

interface Option {
  label: string;
  Component: React.FC;
}

interface UseDropdownArgs {
  options: Option[];
  initialValue?: string;
}

interface UseDropdownReturn {
  isOpen: boolean;
  toggleDropdown: () => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  handleOptionClick: (option: string) => void;
  selectedComponent: React.FC<{ onDelete?: () => void}> | null;
  resetSelectedComponent: () => void;
}

export const useDropdown = ({ options, initialValue = "" }: UseDropdownArgs): UseDropdownReturn => {
  const [selectedComponent, setSelectedComponent] = useState<React.FC | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleOptionClick = useCallback((optionLabel: string) => {
    const option = options.find(opt => opt.label === optionLabel);
    if(option) {
      setSelectedComponent(() => option.Component);
      setInputValue(option.label);
      setIsOpen(false);
    }
  }, [options]);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }
  }, [isOpen]);

  const resetSelectedComponent = () => {
    setSelectedComponent(null);
  }
  

  return {
    isOpen,
    toggleDropdown,
    inputValue,
    setInputValue,
    dropdownRef,
    handleOptionClick,
    selectedComponent,
    resetSelectedComponent, // Include the missing property
  };
};
