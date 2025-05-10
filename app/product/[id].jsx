'use client'
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import BrowseNavbar from '../components/browse-store/common/BrowseStoreHeader'; 
import Footer from '../components/browse-store/common/BrowseStoreFooter';
import '../styles/productDetail.css';

const ProductDetail = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]); // Related products
  const reviews = []; // Example reviews

  useEffect(() => {
    // Fetch the product details based on the productId
    const allProducts = [
      { id: 1, name: 'Chewing Sticks', price: '$4.2', description: 'Authentic African chewing sticks.', image: 'path/to/chewing-sticks.png', details: 'These chewing sticks are natural and sourced directly from African forests.' },
      // Add more products as needed
    ];

    const selectedProduct = allProducts.find(prod => prod.id === parseInt(productId));
    setProduct(selectedProduct);
    setRelatedProducts(allProducts.filter(prod => prod.id !== parseInt(productId))); // Example related products
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <BrowseNavbar />
      <Container className="fade-in product-detail-container">
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/browse-stores">Home</Link></li>
            {/* <li className="breadcrumb-item"><Link to={`/store/${storeId}`}>{storeName}</Link></li> */}
            <li className="active breadcrumb-item" aria-current="page">{product.name}</li>
          </ol>
        </nav>
        <Row>
          <Col md={6}>
            <div className="product-image-gallery">
              <img src={product.image} alt={product.name} className="product-image-large" />
            </div>
          </Col>
          <Col md={6}>
            <h2 className="product-title">{product.name}</h2>
            <p className="product-price">{product.price}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-details">{product.details}</p>
            <Button variant="primary" className="btn-add-to-cart mt-3">Chat Now</Button>
          </Col>
        </Row>
        <div className="mt-5 related-products">
          <h3>Related Products</h3>
          <Row>
            {relatedProducts.map(product => (
              <Col md={3} key={product.id}>
                <Card>
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Button variant="primary"  to={`/product/${product.id}`}>View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <div className="mt-5 product-reviews">
          <h3>Customer Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="review-item">
                <p><strong>Rating:</strong> {review.rating} stars</p>
                <p>{review.comment}</p>
                {review.image && <img src={review.image} alt="Review" className="review-image" />}
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
        <div className="mt-3 social-sharing">
          <Button variant="outline-primary" className="mr-2">Share on Facebook</Button>
          <Button variant="outline-info">Share on Twitter</Button>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default ProductDetail;
