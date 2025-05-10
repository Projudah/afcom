// src/pages/StoreDetail.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import BrowseNavbar from '../components/browse-store/common/BrowseStoreHeader';
import StoreDetailHeader from '../components/browse-store/store/StoreDetailHeader';
import SubNavbar from '../components/browse-store/store/StoreNavBar';
import ReviewForm from '../components/browse-store/store/navBar-items/ReviewForm';
import ReviewList from '../components/browse-store/store/navBar-items/ReviewList';
import AddProductForm from '../components/browse-store/store/navBar-items/AddProductForm';
import EditAboutUsForm from '../components/browse-store/store/navBar-items/AddAboutUsForm';
import EditPoliciesForm from '../components/browse-store/store/navBar-items/AddPoliciesForm';
import AddDiscountForm from '../components/browse-store/store/navBar-items/AddDiscountForm'; // New component
import DiscountDetailModal from '../components/browse-store/store/navBar-items/DiscountDetailModal';
import logo from '../assets/company-logos/logo.png';
import '../styles/storeDetails.css';

const StoreDetail = () => {
    const router = useRouter();
    const { id } = router.query;
  const [store, setStore] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [cartItems, setCartItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [productModalShow, setProductModalShow] = useState(false);
  const [aboutModalShow, setAboutModalShow] = useState(false);
  const [policiesModalShow, setPoliciesModalShow] = useState(false);
  const [discountModalShow, setDiscountModalShow] = useState(false); // New state for discount modal
  const [discountDetailModalShow, setDiscountDetailModalShow] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  useEffect(() => {
    // Fetch store details from the backend using id
    setStore({
      id: id,
      name: 'KENOS AFRICAN SHOP',
      logo: logo,
      location: 'Kasapa, New Bortianor, Accra, Greater Accra, Ghana',
      phone: ['+233 55 415 5415', '+233 20 123 4567'],
      email: 'poweronchristway@gmail.com',
      website: 'http://www.kenosafricanshop.com',
      type: 'Physical Products Shop',
      description: 'Authentic African cuisine and products.',
      about: {
        history: 'Founded in 2001, KENOS AFRICAN SHOP has been providing authentic African products for over two decades.',
        mission: 'Our mission is to bring the richness and diversity of African culture to the world through our products.',
        vision: 'To be the leading provider of authentic African products worldwide.',
        team: 'Our team consists of passionate individuals dedicated to providing the best service and products to our customers.',
      },
      policies: {
        returnPolicy: 'You can return any item within 30 days of purchase for a full refund.',
        shippingPolicy: 'We offer free shipping on orders over $50. Standard shipping rates apply for orders under $50.',
        privacyPolicy: 'We respect your privacy and will not share your information with third parties.',
      },
      reviews: 120,
      products: [
        { id: 1, name: 'Chewing Sticks', price: '$4.2', description: 'Authentic African chewing sticks.', image: 'path/to/chewing-sticks.png' },
        { id: 2, name: 'Natural Chewing Sponge', price: '$13.9', description: 'Raw African black soap.', image: 'path/to/chewing-sponge.png' },
        { id: 3, name: 'Natural Raw African Black Soap', price: '$13.9', description: 'Natural African chewing sponge.', image: 'path/to/black-soap.png' },
        { id: 4, name: 'Neem Leaf Powder 16 oz', price: '$27.7', description: 'Authentic African chewing sticks.', image: 'path/to/neem-leaf-powder.png' },
        { id: 5, name: 'Chewing Sticks', price: '$4.2', description: 'Authentic African chewing sticks.', image: 'path/to/chewing-sticks.png' },
        { id: 6, name: 'Natural Chewing Sponge', price: '$13.9', description: 'Natural African chewing sponge.', image: 'path/to/chewing-sponge.png' },
        { id: 7, name: 'Natural Raw African Black Soap', price: '$13.9', description: 'Raw African black soap.', image: 'path/to/black-soap.png' },
      ],
      services: [
        { id: 1, name: 'Hair Braiding', price: '$50', description: 'Professional hair braiding services.' },
        { id: 2, name: 'African Massage', price: '$70', description: 'Traditional African massage therapy.' },
        { id: 3, name: 'Custom Tailoring', price: '$100', description: 'Custom African clothing tailoring services.' },
      ],
      discounts: [
        { id: 1, title: 'Summer Sale', description: 'Enjoy 20% off on all summer items.', percentage: '20', products: [1, 2], services: [] },
        { id: 2, title: 'New User Discount', description: 'Get 15% off on your first purchase.', percentage: '15', products: [], services: [1] },
      ],
    });

    // Example reviews
    setReviews([
      {
        id: 1,
        rating: 5,
        comment: 'Great products and excellent customer service!',
        image: 'path/to/example-image1.png',
      },
      {
        id: 2,
        rating: 4,
        comment: 'Loved the quality of the products, will definitely buy again.',
        image: 'path/to/example-image2.png',
      },
      {
        id: 3,
        rating: 3,
        comment: 'Good products but the delivery took longer than expected.',
        image: null,
      },
    ]);
  }, [id]);

  // Functions for products, about, policies, reviews (omitted for brevity)
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    alert(`${product.name} added to cart!`);
  };

  const addProduct = (product) => {
    setStore(prevStore => ({
      ...prevStore,
      products: [...prevStore.products, product]
    }));
  };

  const deleteProduct = (productId) => {
    setStore(prevStore => ({
      ...prevStore,
      products: prevStore.products.filter(product => product.id !== productId)
    }));
  };

  const markAsSoldOut = (productId) => {
    setStore(prevStore => ({
      ...prevStore,
      products: prevStore.products.map(product =>
        product.id === productId ? { ...product, soldOut: true } : product
      )
    }));
  };

  const updateAbout = (about) => {
    setStore(prevStore => ({
      ...prevStore,
      about
    }));
  };

  const updatePolicies = (policies) => {
    setStore(prevStore => ({
      ...prevStore,
      policies
    }));
  };

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  const deleteReview = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  // New function to add a discount
  const addDiscount = (discount) => {
    setStore(prevStore => ({
      ...prevStore,
      discounts: [...prevStore.discounts, discount]
    }));
  };

  if (!store) return <div>Loading...</div>;

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <div className="product-list">
            <h4 className="subNavBar-header">Products</h4>
            <Button variant="primary" onClick={() => setProductModalShow(true)} className="mb-3">
              Add Product
            </Button>
            <Row>
              <AnimatePresence>
                {store.products.map(product => (
                  <Col md={3} key={product.id} className="product-card">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={product.image} alt={product.name} className="product-image" />
                      <h5>{product.name}</h5>
                      <p>{product.price}</p>
                      <p>{product.description}</p>
                      <Button variant="link"  to={`/product/${product.id}`}>
                        View Details
                      </Button>
                      <Button variant="success" onClick={() => addToCart(product)}>Add to Cart</Button>
                      {product.soldOut && <span className="sold-out-tag">Sold Out</span>}
                      <div className="product-actions">
                        <Button className="markSoldOut-edit" variant="danger" onClick={() => deleteProduct(product.id)}>
                          <FaTrash />
                        </Button>
                        {!product.soldOut && (
                          <Button variant="warning" onClick={() => markAsSoldOut(product.id)}>
                            <FaExclamationTriangle /> Mark as Sold Out
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </AnimatePresence>
            </Row>
          </div>
        );

      case 'about':
        return (
          <div>
            <h4 className="subNavBar-header">About Us</h4>
            <Button variant="primary" onClick={() => setAboutModalShow(true)} className="mb-3">
              Edit About Us
            </Button>
            <p><strong>History:</strong> {store.about.history}</p>
            <p><strong>Mission:</strong> {store.about.mission}</p>
            <p><strong>Vision:</strong> {store.about.vision}</p>
            <p><strong>Our Team:</strong> {store.about.team}</p>
          </div>
        );

      case 'policies':
        return (
          <div>
            <h4 className="subNavBar-header">Policies</h4>
            <Button variant="primary" onClick={() => setPoliciesModalShow(true)} className="mb-3">
              Edit Policies
            </Button>
            <p><strong>Return Policy:</strong> {store.policies.returnPolicy}</p>
            <p><strong>Shipping Policy:</strong> {store.policies.shippingPolicy}</p>
            <p><strong>Privacy Policy:</strong> {store.policies.privacyPolicy}</p>
          </div>
        );

      case 'reviews':
        return (
          <div>
            <h4 className="subNavBar-header">Reviews</h4>
            <ReviewForm addReview={addReview} />
            <ReviewList reviews={reviews} deleteReview={deleteReview} />
          </div>
        );

      case 'services':
        return (
          <div className="service-list">
            <h4 className="subNavBar-header">Services</h4>
            <Row className="services-row-container">
              <AnimatePresence>
                {store.services.map(service => (
                  <Col md={4} key={service.id} className="service-card">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h5>{service.name}</h5>
                      <p>{service.description}</p>
                      <p><strong>Price:</strong> {service.price}</p>
                    </motion.div>
                  </Col>
                ))}
              </AnimatePresence>
            </Row>
          </div>
        );

      case 'discounts':
  return (
    <div className="discount-list">
      <h4 className="subNavBar-header">Discounts</h4>
      <Button variant="primary" onClick={() => setDiscountModalShow(true)} className="mb-3">
        Add Discount
      </Button>
      <Row>
        <AnimatePresence>
          {store.discounts.map(discount => (
            <Col md={4} key={discount.id} className="discount-card">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h5>{discount.title}</h5>
                <p>{discount.description}</p>
                <p><strong>Discount:</strong> {discount.percentage}%</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelectedDiscount(discount);
                    setDiscountDetailModalShow(true);
                  }}
                >
                  View Details
                </Button>
              </motion.div>
            </Col>
          ))}
        </AnimatePresence>
      </Row>
    </div>
  );

      default:
        return null;
    }
  };

  return (
    <div>
      <BrowseNavbar />
      <Container className="store-detail-container">
        <StoreDetailHeader store={store} />
        <SubNavbar activeKey={activeTab} onSelect={(k) => setActiveTab(k)} />
        <Row>
          <Col md={3}>
            <div className="sidebar">
              <h5>Search</h5>
              <input type="text" placeholder="Search" className="form-control mb-3" />
              <Button variant="secondary">Search</Button>
              <h5 className="mt-4">Recent Posts</h5>
              <ul>
                <li>Hello world!</li>
              </ul>
              <h5 className="mt-4">Recent Comments</h5>
              <ul>
                <li>A WordPress Commenter on Hello world!</li>
              </ul>
            </div>
          </Col>
          <Col md={9}>
            {renderContent()}
          </Col>
        </Row>
        <AddProductForm show={productModalShow} handleClose={() => setProductModalShow(false)} addProduct={addProduct} />
        <EditAboutUsForm show={aboutModalShow} handleClose={() => setAboutModalShow(false)} about={store.about} updateAbout={updateAbout} />
        <EditPoliciesForm show={policiesModalShow} handleClose={() => setPoliciesModalShow(false)} policies={store.policies} updatePolicies={updatePolicies} />
        <AddDiscountForm show={discountModalShow} handleClose={() => setDiscountModalShow(false)} addDiscount={addDiscount} products={store.products} services={store.services} />
        <DiscountDetailModal show={discountDetailModalShow} handleClose={() => setDiscountDetailModalShow(false)} discount={selectedDiscount} products={store.products} services={store.services} addToCart={addToCart}/>
      </Container>
    </div>
  );
};

export default StoreDetail;
