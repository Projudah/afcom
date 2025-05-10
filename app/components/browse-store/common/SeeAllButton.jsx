// src/components/CustomButton.jsx
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import '../../../styles/SeeAllButton.css'; // Create a CSS file for custom styles if needed

const ViewAllButton = ({ label, destination }) => {
  const router = useRouter();

  return (
    <Button
      className="custom-see-all-btn"
      variant="contained"
      onClick={() => router.push(destination)}
    >
      {label}
    </Button>
  );
};

export default ViewAllButton;
