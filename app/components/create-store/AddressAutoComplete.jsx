// src/components/AddressAutocomplete.jsx
import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

const AddressAutocomplete = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce: track the search input with a local state
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!open) {
      setOptions([]);
      return;
    }
    if (inputValue === '') {
      setOptions([]);
      return;
    }

    setLoading(true);
    // Replace the URL with your API endpoint
    axios
    .get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(inputValue)}&key=YOUR_GOOGLE_API_KEY`
    )
    .then((res) => {
      // You'll need to adjust based on the API's response structure
      setOptions(res.data.predictions || []);
    })
    .catch((err) => {
      console.error(err);
      setOptions([]);
    })
    .finally(() => setLoading(false));
  }, [open, inputValue]);

  return (
    <Autocomplete
      freeSolo
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Store Address"
          placeholder="3401 Dufferin St, North York, ON M6A 2T9"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AddressAutocomplete;
