"use client";
import { useDropdown } from "../hooks/useDropdown";

interface Option {
  label: string;
  Component: React.FC<{ onDelete?: () => void}>; // or more specific type if you have common props
}

interface DropdownProps {
  placeholder: string;
  options: Option[];
}

const Dropdown: React.FC<DropdownProps> = ({ placeholder, options }) => {
  const {
    isOpen,
    toggleDropdown,
    inputValue,
    setInputValue,
    handleOptionClick,
    dropdownRef,
    selectedComponent: SelectedComponent,
    resetSelectedComponent,
  } = useDropdown({ options, initialValue: "" });

  const handleDeleteComponent = () => {
    resetSelectedComponent();
  };

  return (
    <>
    {inputValue === "" &&
      <div className="relative p-1 m-2" ref={dropdownRef}>
        <input
          className={inputFieldStyle}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={toggleDropdown}
          placeholder={placeholder}
        />
        {isOpen && (
          <div className={dropDownMenuStyle}>
            <div
              className="py-1 grid-flow-row divide-y-2 divide-slate-200"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {options.map((option, index) => (
                <a
                  key={index}
                  href="#"
                  className={dropdownClickStyle}
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOptionClick(option.label);
                  }}
                >
                  {option.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    }
    <div>
      {SelectedComponent && <SelectedComponent onDelete={handleDeleteComponent} />}
    </div>
    </>
  );
};

const inputFieldStyle = "p-2 m-1 w-full bg-white border-2 border-slate-300 rounded-lg focus:outline-black focus:bg-slate-100 ";
const dropDownMenuStyle = "absolute z-40 left-0 w-full rounded-md shadow-lg ring-2 bg-white ring-black ring-opacity-5 border-2 border-slate-100";
const dropdownClickStyle = "block px-4 py-2 text-sm text-black active:bg--200 active:ring-2 active:ring-slate-200"
export default Dropdown;
