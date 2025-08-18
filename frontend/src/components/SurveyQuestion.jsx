import { useEffect, useState } from 'react';

const SurveyQuestion = ({
  options = [],
  currentAnswer,
  onAnswerChange = () => {},
  multiSelect = false,
  maxSelections = 1,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(
    currentAnswer
      ? Array.isArray(currentAnswer)
        ? currentAnswer
        : [currentAnswer]
      : []
  );

  useEffect(() => {
    if (currentAnswer) {
      setSelectedOptions(
        Array.isArray(currentAnswer) ? currentAnswer : [currentAnswer]
      );
    } else {
      setSelectedOptions([]);
    }
  }, [currentAnswer]);

  const handleOptionSelect = (optionId) => {
    let newSelected;

    if (multiSelect) {
      if (selectedOptions.includes(optionId)) {
        // Deselect if already selected
        newSelected = selectedOptions.filter((id) => id !== optionId);
      } else {
        // Verify selection limit
        if (selectedOptions.length < maxSelections) {
          newSelected = [...selectedOptions, optionId];
        } else {
          // Replace the first selection with the new one
          newSelected = [...selectedOptions.slice(1), optionId];
        }
      }
    } else {
      // Unique option
      newSelected = [optionId];
    }

    setSelectedOptions(newSelected);
    onAnswerChange(multiSelect ? newSelected : optionId);
  };

  return (
    <div className="flex flex-col gap-1 md:gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          className={`px-3 py-1.5 text-base md:text-lg lg:text-xl text-left text-white rounded-full hover:bg-[#f3f4f6]/8 hover:cursor-pointer ${
            selectedOptions.includes(option.id)
              ? 'text-black border border-[#E6FF79]'
              : 'border border-transparent'
          }`}
          onClick={() => handleOptionSelect(option.id)}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default SurveyQuestion;
