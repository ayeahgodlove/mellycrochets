"use client";
import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    background: "none",
    // border: "none",
    // boxShadow: "none",
  }),
  option: (styles, { isFocused, isSelected, isHovered }) => ({
    ...styles,
    backgroundColor: isSelected
      ? "#eb6753"
      : isHovered || isFocused
      ? "#eb675312"
      : undefined,
    color: isSelected ? "white" : "black",
  }),
};

const CrochetTypeSelect = ({
  crochetTypeId,
  setCrochetTypeId,
  loading,
  crochetTypes,
  isLoading,
}) => {
  const modelOptions =
    crochetTypes && crochetTypes.length
      ? crochetTypes.map((crochetType) => {
          return {
            value: crochetType.id,
            label: crochetType.name,
          };
        })
      : [];

  // Find the selected model from options
  const selectedModel =
    modelOptions.find((option) => option.value === crochetTypeId) || null;

  return (
    <Select
      defaultValue={modelOptions[0]}
      name="crochetTypeId"
      options={modelOptions}
      styles={customStyles}
      className="w-full text-start border-0 bg-none"
      classNamePrefix="select"
      value={selectedModel}
      onChange={(selected) => setCrochetTypeId(selected?.value || "")}
      isLoading={isLoading}
      isClearable={true}
      isDisabled={loading}
      placeholder="Select Crochet Designs"
    />
  );
};

export default CrochetTypeSelect;
