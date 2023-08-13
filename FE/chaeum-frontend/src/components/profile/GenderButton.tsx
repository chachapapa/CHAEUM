// Button.tsx
import { Button } from '@material-tailwind/react';
import React from 'react';

interface ButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const GenderButton: React.FC<ButtonProps> = ({
  label,
  isSelected,
  onClick,
}) => {
  const baseClasses = 'p-2 border-2 cursor-pointer w-40';
  const selectedClasses = isSelected
    ? 'bg-blue-500 text-white'
    : 'bg-gray-300 text-gray-700';

  return (
    <Button className={`${baseClasses} ${selectedClasses}`} onClick={onClick}>
      {label}
    </Button>
  );
};

export default GenderButton;
