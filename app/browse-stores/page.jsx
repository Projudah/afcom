// src/pages/BrowseStores.jsx
'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button } from '@mui/material';
import Header from '../components/browse-store/common/BrowseStoreHeader';
import Footer from '../components/browse-store/common/BrowseStoreFooter';
import LatestStoresCarousel from '../components/browse-store/homepage/LatestStoresCarousel';
import PopularStores from '../components/browse-store/homepage/PopularStores';
import CategoryPopularStores from '../components/browse-store/homepage/CategoryPopularStores';
import FeaturedProduct from '../components/browse-store/homepage/FeaturedProduct';
import TopRatedStores from '../components/browse-store/homepage/TopRatedStore';
import PromotionalBanner from '../components/browse-store/homepage/PromotionalBanner';
import StoreStatistics from '../components/browse-store/homepage/StoreStatistics';
import { motion } from 'framer-motion';


// import StoreList from '../components/StoreList';

const BrowseStores = () => {
  const [latestStores, setLatestStores] = useState([]);
  const [popularStores, setPopularStores] = useState([]);
  const [categoryStores, setCategoryStores] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [topRatedStores, setTopRatedStores] = useState([]);
  const [allStores, setAllStores] = useState([]);  // New state to hold all stores
  const [storeStats, setStoreStats] = useState({ totalStores: 0, totalCategories: 0, totalUsers: 0 });

  const router = useRouter();
  // const [stores, setStores] = useState([]);


  useEffect(() => {
    // Fetch stores from the backend or define them statically
    setLatestStores([
      { id: 1, name: 'New African Restaurant', description: 'Authentic African cuisine.', image: 'path/to/african-restaurant.jpg' },
      { id: 2, name: 'New African Hair Salon', description: 'Traditional African hairstyles.', image: 'path/to/african-hair-salon.jpg' },
    ]);

    setPopularStores([
      { id: 3, name: 'Popular African Clothing Store', description: 'Beautiful African fashion.', image: 'path/to/african-clothing-store.jpg' },
      { id: 4, name: 'Popular African Market', description: 'Fresh produce and groceries.', image: 'path/to/african-market.jpg' },
      { id: 5, name: 'Popular African Clothing Store', description: 'Beautiful African fashion.', image: 'path/to/african-clothing-store.jpg' },
      { id: 6, name: 'Popular African Market', description: 'Fresh produce and groceries.', image: 'path/to/african-market.jpg' },
      { id: 7, name: 'Popular African Clothing Store', description: 'Beautiful African fashion.', image: 'path/to/african-clothing-store.jpg' },
      { id: 8, name: 'Popular African Market', description: 'Fresh produce and groceries.', image: 'path/to/african-market.jpg' },
      { id: 9, name: 'Popular African Clothing Store', description: 'Beautiful African fashion.', image: 'path/to/african-clothing-store.jpg' },
      { id: 10, name: 'Popular African Market', description: 'Fresh produce and groceries.', image: 'path/to/african-market.jpg' },
      
      
    ]);


    setFeaturedProduct([
        { id: 11, name: 'African Black Soap', price: '$10.00', storeName: 'African Market', image: 'path/to/black-soap.jpg' },
        { id: 12, name: 'Kente Cloth', price: '$25.00', storeName: 'African Clothing Store', image: 'path/to/kente-cloth.jpg' },
        { id: 13, name: 'Shea Butter', price: '$8.00', storeName: 'African Market', image: 'path/to/shea-butter.jpg' },
        { id: 14, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 15, name: 'Kente Cloth', price: '$25.00', storeName: 'African Clothing Store', image: 'path/to/kente-cloth.jpg' },
        { id: 16, name: 'Shea Butter', price: '$8.00', storeName: 'African Market', image: 'path/to/shea-butter.jpg' },
        { id: 17, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 18, name: 'Kente Cloth', price: '$25.00', storeName: 'African Clothing Store', image: 'path/to/kente-cloth.jpg' },
        { id: 19, name: 'Shea Butter', price: '$8.00', storeName: 'African Market', image: 'path/to/shea-butter.jpg' },
        { id: 20, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 21, name: 'Kente Cloth', price: '$25.00', storeName: 'African Clothing Store', image: 'path/to/kente-cloth.jpg' },
        { id: 22, name: 'Shea Butter', price: '$8.00', storeName: 'African Market', image: 'path/to/shea-butter.jpg' },
        { id: 23, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 14, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 15, name: 'Money making', price: '$25.00', storeName: 'African Clothing Store', image: 'path/to/kente-cloth.jpg' },
        { id: 16, name: 'Shea Butter', price: '$8.00', storeName: 'African Market', image: 'path/to/shea-butter.jpg' },
        { id: 17, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 18, name: 'Kente Cloth', price: '$25.00', storeName: 'African Clothing Store', image: 'path/to/kente-cloth.jpg' },
        { id: 19, name: 'Shea Butter', price: '$8.00', storeName: 'African Market', image: 'path/to/shea-butter.jpg' },
        { id: 20, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 21, name: 'Kente Cloth', price: '$25.00', storeName: 'African Clothing Store', image: 'path/to/kente-cloth.jpg' },
        { id: 22, name: 'Shea Butter', price: '$8.00', storeName: 'African Market', image: 'path/to/shea-butter.jpg' },
        { id: 23, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 14, name: 'Money making', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 15, name: 'Kente Cloth', price: '$25.00', storeName: 'African Clothing Store', image: 'path/to/kente-cloth.jpg' },
        { id: 16, name: 'babylove', price: '$8.00', storeName: 'African Market', image: 'path/to/shea-butter.jpg' },
        { id: 17, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 18, name: 'Money making', price: '$25.00', storeName: 'African Clothing Store', image: 'path/to/kente-cloth.jpg' },
        { id: 19, name: 'Shea Butter', price: '$8.00', storeName: 'African Market', image: 'path/to/shea-butter.jpg' },
        { id: 20, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 21, name: 'Kente Cloth', price: '$25.00', storeName: 'African Clothing Store', image: 'path/to/kente-cloth.jpg' },
        { id: 22, name: 'Shea Butter', price: '$8.00', storeName: 'African Market', image: 'path/to/shea-butter.jpg' },
        { id: 23, name: 'Money making', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 14, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 15, name: 'Money making', price: '$25.00', storeName: 'African Clothing Store', image: 'path/to/kente-cloth.jpg' },
        { id: 16, name: 'Shea Butter', price: '$8.00', storeName: 'African Market', image: 'path/to/shea-butter.jpg' },
        { id: 17, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 18, name: 'Money making', price: '$25.00', storeName: 'African Clothing Store', image: 'path/to/kente-cloth.jpg' },
        { id: 19, name: 'Shea Butter', price: '$8.00', storeName: 'African Market', image: 'path/to/shea-butter.jpg' },
        { id: 20, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        { id: 21, name: 'Kente Cloth', price: '$25.00', storeName: 'African Clothing Store', image: 'path/to/kente-cloth.jpg' },
        { id: 22, name: 'Money making', price: '$8.00', storeName: 'African Market', image: 'path/to/shea-butter.jpg' },
        { id: 23, name: 'Beaded Necklace', price: '$15.00', storeName: 'African Jewelry', image: 'path/to/beaded-necklace.jpg' },
        
    ]);

    setCategoryStores([
      { name: 'Restaurants', image: 'path/to/restaurants.jpg' },
      { name: 'Salons', image: 'path/to/salons.jpg' },
      { name: 'Markets', image: 'path/to/markets.jpg' },
      { name: 'Grocery', image: 'path/to/restaurants.jpg' },
      { name: 'Money', image: 'path/to/salons.jpg' },
      { name: 'Financial', image: 'path/to/markets.jpg' },
      { name: 'Love', image: 'path/to/restaurants.jpg' },
      { name: 'testing', image: 'path/to/salons.jpg' },
      { name: 'testing 2', image: 'path/to/markets.jpg' },
    ]);

    setTopRatedStores([
      {
        id: 1,
        name: "Suya bistro",
        category: "Restaurant",
        image: 'path/to/toprated1.jpg',
        rating: 4.5,
        ratingCount: 123,
       
      },
      {
        id: 1,
        name: "Suya bistro",
        category: "Restaurant",
        image: 'path/to/toprated1.jpg',
        rating: 4.5,
        ratingCount: 123,
       
      },
      {
        id: 1,
        name: "Suya bistro",
        category: "Restaurant",
        image: 'path/to/toprated1.jpg',
        rating: 4.5,
        ratingCount: 123,
       
      },
      {
        id: 1,
        name: "Suyaaaa",
        category: "Restaurant",
        image: 'path/to/toprated1.jpg',
        rating: 4.5,
        ratingCount: 123,
       
      },
      {
        id: 1,
        name: "Suya",
        category: "Restaurant",
        image: 'path/to/toprated1.jpg',
        rating: 4.5,
        ratingCount: 123,
       
      },
      {
        id: 1,
        name: "bistro",
        category: "Restaurant",
        image: 'path/to/toprated1.jpg',
        rating: 4.5,
        ratingCount: 123,
       
      }
      
      // { id: 1, name: 'Top Rated Store 1', description: 'Customers love this store',  },
      // More stores...
    ]);
    // Combine all stores into a single array
          setAllStores([
            { id: 3, name: 'New African Restaurant', description: 'Authentic African cuisine.', image: 'path/to/african-restaurant.jpg' },
            { id: 4, name: 'New African Hair Salon', description: 'Traditional African hairstyles.', image: 'path/to/african-hair-salon.jpg' },
            { id: 5, name: 'Popular African Clothing Store', description: 'Beautiful African fashion.', image: 'path/to/african-clothing-store.jpg' },
            { id: 6, name: 'Popular African Market', description: 'Fresh produce and groceries.', image: 'path/to/african-market.jpg' },
          ]);

    // setStores([
    //   { id: 1, name: 'African Restaurant', type: 'Restaurant', description: 'Authentic African cuisine.' },
    //   { id: 2, name: 'African Hair Salon', type: 'Salon', description: 'Traditional African hairstyles.' },
    // ]);
    setStoreStats({ totalStores: 100, totalCategories: 10, totalUsers: 1000 });

  }, []);
  return (
    <div className="page-container" style={{ 
      background: 'linear-gradient(to bottom, #f7f9fc, #e9eff5)',
      minHeight: '100vh'
    }}  // Beware, this is the only new changes added to the code, if you want to reverse to the old code, simply remove the style from here
    >
      <div className="content-wrap">
        <Header />
        <Container>
          {/* <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PromotionalBanner />
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <LatestStoresCarousel stores={latestStores} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PopularStores stores={popularStores} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FeaturedProduct products={featuredProduct} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TopRatedStores stores={topRatedStores} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CategoryPopularStores categories={categoryStores} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <StoreStatistics stats={storeStats} />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
          >
            {/* <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/browse-stores/all-stores', { state: { stores: allStores } })}
          >
            View All Stores
          </Button> */}
          <Button
              variant="contained"
              style={{
                backgroundColor: '#007bff' ,
                borderRadius: '25px',
                padding: '10px 20px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
              }}
              onClick={() => router.push('/browse-stores/all-stores', { state: { stores: allStores } })}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              View All Stores
            </Button>
          </motion.div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseStores;



//           <Typography variant="h5" gutterBottom>
//             All Stores
//           </Typography>
//           <StoreList stores={stores} /> 