"use client";

import React, { useState } from "react";
// Removed unused react-select import to reduce bundle size

const industryOptions = [
  { value: "Accounting", label: "Accounting" },
  { value: "Advertising", label: "Advertising" },
  { value: "Aerospace", label: "Aerospace" },
  { value: "Agriculture", label: "Agriculture" },
  { value: "Automotive", label: "Automotive" },
  { value: "Banking", label: "Banking" },
  { value: "Biotechnology", label: "Biotechnology" },
  { value: "Construction", label: "Construction" },
  { value: "Consulting", label: "Consulting" },
  { value: "Education", label: "Education" },
  { value: "Finance", label: "Finance" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Hospitality", label: "Hospitality" },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Legal", label: "Legal" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Media", label: "Media" },
  { value: "Nonprofit", label: "Nonprofit" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Retail", label: "Retail" },
  { value: "Software", label: "Software" },
  { value: "Technology", label: "Technology" },
  { value: "Telecommunications", label: "Telecommunications" },
  { value: "Transportation", label: "Transportation" },
  { value: "Other", label: "Other" },
];

const IndustrySelect = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="w-full">
      <label className="block text-sm text-white font-semibold mb-1 ml-3">
        Industry
      </label>
      {/* <Select
        options={industryOptions}
        value={industryOptions.find((opt) => opt.value === selected)}
        onChange={(opt) => setSelected(opt?.value)}
        placeholder="Select an industry..."
        isSearchable
        className="text-black"
      /> */}
      {/* Hidden input to submit with form */}
      <input type="hidden" name="industry" value={selected || ""} />
    </div>
  );
};

export default IndustrySelect;
