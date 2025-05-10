// src/pages/StoreOwnerDashboard.jsx
'use client'
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import StoreOwnerNavbar from '../../components/store-owner/common/StoreOwnerHeader';
import StoreList from '../../components/StoreList';
import StoreStatistics from '../../components/browse-store/homepage/StoreStatistics';
// import '../../styles/storeOwnerNavBar.css';

// import Footer from '../components/browse-store/BrowseStoreFooter';


const StoreOwnerDashboard = () => {
  
  const router = useRouter();
  const [stores, setStores] = useState([]);
  const [storeStats, setStoreStats] = useState({ totalStores: 0, totalCategories: 0, totalUsers: 0 });
  const ownerName = "John Doe"; // Replace with dynamic owner name

  useEffect(() => {
    // Fetch stores from the backend
    setStores([
      { id: 1, name: 'African Restaurant', type: 'Restaurant', description: 'Authentic African cuisine.' },
      { id: 2, name: 'African Hair Salon', type: 'Salon', description: 'Traditional African hairstyles.' },
      { id: 2, name: 'African Hair Salon', type: 'Salon', description: 'Traditional African hairstyles.' },
    ]);

    setStoreStats({ totalStores: 100, totalCategories: 10, totalUsers: 1000 });

  }, []);

  const handleCreateStore = () => {
    router.push('/create-store');
  };

  const deleteStore = (storeId) => {
    // Remove the store with the given id from the stores array
    setStores(stores.filter(store => store.id !== storeId));
  };
  return (
    <div className="page-container">
      <StoreOwnerNavbar ownerName={ownerName} />
      <div className="content-wrap">
        <Container>
        <div className="d-flex justify-content-between align-items-center my-4">
            <h4 className="mb-0">My Stores</h4>
            <button className="btn btn-primary" onClick={handleCreateStore}>
              Create Store
            </button>
          </div>
          <StoreList stores={stores} deleteStore={deleteStore} />
          <StoreStatistics stats={storeStats} />
        </Container>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default StoreOwnerDashboard;
