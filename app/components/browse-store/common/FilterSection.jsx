// src/components/browse-store/FilterSection.jsx
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Typography, Slider, Checkbox, FormControlLabel } from '@mui/material';

const FilterSection = ({
  categoryStores,
  selectedCategories,
  priceRange,
  selectedRating,
  selectedLocation,
  handleCategoryChange,
  handlePriceChange,
  handleRatingChange,
  handleLocationChange,
  applyFilters,
}) => {
  return (
    <div className="filter-section">
      <Row>
        <Col md={3}>
          <Typography variant="h6">Categories</Typography>
          <Form>
            {categoryStores.map((category, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
                    name={category.name}
                  />
                }
                label={category.name}
                key={index}
              />
            ))}
          </Form>
        </Col>

        <Col md={3}>
          <Typography variant="h6">Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={100}
          />
        </Col>

        <Col md={3}>
          <Typography variant="h6">Rating</Typography>
          <Form>
            {[5, 4, 3, 2, 1].map((rating) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    name={`${rating} Stars`}
                  />
                }
                label={`${rating} Stars`}
                key={rating}
              />
            ))}
          </Form>
        </Col>

        <Col md={3}>
          <Typography variant="h6">Location</Typography>
          <Form.Control
            type="text"
            placeholder="Enter Location"
            value={selectedLocation}
            onChange={handleLocationChange}
          />
        </Col>
      </Row>

      <Button variant="primary" onClick={applyFilters} className="mt-3">
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSection;
