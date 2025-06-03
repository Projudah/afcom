// import { Modal, Grid, Card, CardContent, Typography } from '@mui/material';
// import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
// import { Button } from 'react-bootstrap';
// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import '../../../styles/modal.css'; // Import the CSS file

// const ShowAllItemsModal = ({ show, handleClose, items, title, type }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 16; // Maximum items per page

//   // Calculate the range of items for the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

//   // Handle next and previous page buttons
//   const handleNextPage = () => {
//     if (currentPage * itemsPerPage < items.length) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   // Function to render item-specific details
//   const renderItemContent = (item) => {
//     switch (type) {
//       case 'popular-store':
//         return (
//           <>
//             <Typography variant="h6">{item.name}</Typography>
//             <Typography variant="body2" color="textSecondary">
//               {item.category || item.description}
//             </Typography>
//             <Button variant="primary"  to={`/store/${item.id}`} sx={{ mt: 2 }}>
//               Visit Store
//             </Button>
//           </>
//         );
//       case 'product':
//         return (
//           <>
//             <Typography variant="h6">{item.name}</Typography>
//             <Typography variant="body2" color="textSecondary">
//               {item.storeName}
//             </Typography>
//             <Typography variant="body1">{item.price}</Typography>
//             <Button variant="primary"  to={`/product/${item.id}`} sx={{ mt: 2 }}>
//               View Product
//             </Button>
//           </>
//         );
//         case 'top-rated':
//             return (
//                 <>
//                   <Typography className="featured-body-text" variant="h6">{item.name}</Typography>
//                   <Typography className="featured-body-text" variant="body2" color="textSecondary">
//                     {item.category}
//                   </Typography>
//                   <div className="featured-body-text">
//                   <div className="star-rating-container">
//                         <div className="star-rating">
//                             {/* Display stars and ratings */}
//                             {[...Array(Math.floor(item.rating))].map((_, index) => (
//                             <FaStar key={`full-${index}`} style={{ color: '#ffc107' }} />
//                             ))}
//                             {item.rating % 1 !== 0 && <FaStarHalfAlt style={{ color: '#ffc107' }} />}
//                             {[...Array(5 - Math.ceil(item.rating))].map((_, index) => (
//                             <FaRegStar key={`empty-${index}`} style={{ color: '#ffc107' }} />
//                             ))}
//                         </div>
//                         <div className="featured-body-text">
//                             <div className="rating-count">{item.ratingCount} ratings</div>
//                         </div>
//                     </div>
//                  </div>
//                   <Button variant="primary"  to={`/store/${item.id}`} sx={{ mt: 2 }}>
//                     Visit Store
//                   </Button>
//               </>
//             );
//       case 'category':
//         return (
//           <>
//             <Typography variant="h6">{item.name}</Typography>
//             <Button variant="primary" href={`/category/${item.name.toLowerCase()}`} sx={{ mt: 2 }}>
//               Visit {item.name}
//             </Button>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Modal
//       open={show}
//       onClose={handleClose}
//       aria-labelledby="show-all-items-modal"
//       centered
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <div className="modal-container">
//         <h2 className="modal-title">{title}</h2>
//         <Grid container spacing={3} className="modal-grid">
//           {currentItems.map((item, index) => (
//             <Grid item xs={12} sm={6} md={3} key={item.name || item.id}>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.5 }}
//               >
//                 <Card className="popular-product-card">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="popular-product-image"
//                   />
//                   <CardContent>{renderItemContent(item)}</CardContent>
//                 </Card>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Pagination controls */}
//         <div className="pagination-controls">
//           <Button
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//             className="pagination-button"
//           >
//             Previous
//           </Button>
//           <span className="page-number">{`Page ${currentPage} of ${Math.ceil(items.length / itemsPerPage)}`}</span>
//           <Button
//             onClick={handleNextPage}
//             disabled={currentPage * itemsPerPage >= items.length}
//             className="pagination-button"
//           >
//             Next
//           </Button>
//         </div>

//         <Button
//           onClick={handleClose}
//           variant="secondary"
//           className="modal-close-button"
//         >
//           Close
//         </Button>
//       </div>
//     </Modal>
//   );
// };

// export default ShowAllItemsModal;


'use client'
import React, { useState } from 'react';
import { Modal, Grid, Card, CardContent, Typography } from '@mui/material';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Link from 'next/link';
import '../../../styles/modal.css'; // Import the CSS file
// import '../../../styles/scopedShowAllItemsModal.css'; // Scoped styles for the modal

const ShowAllItemsModal = ({ show, handleClose, items, title, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // Maximum items per page

  // Calculate the range of items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Handle next and previous page buttons
  const handleNextPage = () => {
    if (currentPage * itemsPerPage < items.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Function to render item-specific details
  const renderItemContent = (item) => {
    switch (type) {
      case 'popular-store':
        return (
          <>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {item.category || item.description}
            </Typography>
            <Button variant="primary"  href={`/store/${item.id}`} sx={{ mt: 2 }}>
              Visit Store
            </Button>
          </>
        );
      case 'product':
        return (
          <>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {item.storeName}
            </Typography>
            <Typography variant="body1">{item.price}</Typography>
            <Button variant="primary"  href={`/product/${item.id}`} sx={{ mt: 2 }}>
              View Product
            </Button>
          </>
        );
      case 'top-rated':
        return (
          <>
            <Typography className="featured-body-text" variant="h6">{item.name}</Typography>
            <Typography className="featured-body-text" variant="body2" color="textSecondary">
              {item.category}
            </Typography>
            <div className="featured-body-text">
              <div className="star-rating-container">
                <div className="star-rating">
                  {[...Array(Math.floor(item.rating))].map((_, index) => (
                    <FaStar key={`full-${index}`} style={{ color: '#ffc107' }} />
                  ))}
                  {item.rating % 1 !== 0 && <FaStarHalfAlt style={{ color: '#ffc107' }} />}
                  {[...Array(5 - Math.ceil(item.rating))].map((_, index) => (
                    <FaRegStar key={`empty-${index}`} style={{ color: '#ffc107' }} />
                  ))}
                </div>
                <div className="featured-body-text">
                  <div className="rating-count">{item.ratingCount} ratings</div>
                </div>
              </div>
            </div>
            <Button variant="primary"  href={`/store/${item.id}`} sx={{ mt: 2 }}>
              Visit Store
            </Button>
          </>
        );
      case 'category':
        return (
          <>
            <Typography variant="h6">{item.name}</Typography>
            <Button variant="primary" href={`/category/${item.name.toLowerCase()}`} sx={{ mt: 2 }}>
              Visit {item.name}
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="show-all-items-modal"
      centered
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div 
        className="modal-container"
        style={{
          background: 'linear-gradient(135deg, #ffffff, #f7f9fc)', // Subtle light gradient
          borderRadius: '8px',
          padding: '2rem',
          color: '#000', // Dark text for contrast
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 className="modal-title" style={{ color: '#000' }}>{title}</h2>
        <Grid container spacing={3} className="modal-grid">
          {currentItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={item.name || item.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="popular-product-card" sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="popular-product-image"
                  />
                  <CardContent>{renderItemContent(item)}</CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Pagination controls */}
        <div className="pagination-controls" style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="pagination-button"
            style={{ marginRight: '1rem' }}
          >
            Previous
          </Button>
          <span className="page-number">{`Page ${currentPage} of ${Math.ceil(items.length / itemsPerPage)}`}</span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage * itemsPerPage >= items.length}
            className="pagination-button"
            style={{ marginLeft: '1rem' }}
          >
            Next
          </Button>
        </div>

        <Button
          onClick={handleClose}
          variant="secondary"
          className="modal-close-button"
          style={{ marginTop: '1rem' }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ShowAllItemsModal;
