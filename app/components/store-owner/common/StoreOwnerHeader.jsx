// 'use client'
// import { Navbar, Container, Button, Badge, Dropdown } from 'react-bootstrap';
// import { FaBars, FaBell } from 'react-icons/fa';
// import Sidebar from './SideBar';
// import '../../../styles/storeOwnerHeader.css';

// const StoreOwnerNavbar = ({ ownerName }) => {
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false); // State to control notification dropdown
//   const [notifications] = useState([
//     'Order #1234 has been shipped',
//     'New message from customer',
//     'Weekly sales report is ready'
//   ]);

//   const handleShowSidebar = () => setShowSidebar(true);
//   const handleCloseSidebar = () => setShowSidebar(false);

//   // Toggle notifications dropdown
//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//   };

//   return (
//     <>
//       <Navbar bg="light" expand="lg" className="store-owner-navbar">
//         <Container fluid className="d-flex justify-content-between">
//           <Button variant="outline-primary" onClick={handleShowSidebar}>
//             <FaBars />
//           </Button>

//           <Navbar.Brand className="mx-auto">{ownerName}</Navbar.Brand>

//           {/* Notification Icon with Badge */}
//           <div className="notification-icon" onClick={toggleNotifications}>
//             <FaBell size={24} />
//             {notifications.length > 0 && (
//               <Badge pill variant="danger" className="notification-badge">
//                 {notifications.length}
//               </Badge>
//             )}
//           </div>
          
//           {/* Notification Dropdown */}
//           {showNotifications && (
//             <Dropdown.Menu show className="notification-dropdown">
//               {notifications.length > 0 ? (
//                 notifications.map((notification, index) => (
//                   <Dropdown.Item key={index}>
//                     {notification}
//                   </Dropdown.Item>
//                 ))
//               ) : (
//                 <Dropdown.Item>No new notifications</Dropdown.Item>
//               )}
//             </Dropdown.Menu>
//           )}
//         </Container>
//       </Navbar>

//       <Sidebar show={showSidebar} handleClose={handleCloseSidebar} />
//     </>
//   );
// };

// export default StoreOwnerNavbar;

'use client'
import React, { useState } from 'react';
import { Navbar, Container, Button, Badge, Dropdown } from 'react-bootstrap';
import { FaBars, FaBell } from 'react-icons/fa';
import Sidebar from './SideBar';
import '../../../styles/storeOwnerHeader.css';

const StoreOwnerNavbar = ({ ownerName }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    'Order #1234 has been shipped',
    'New message from customer',
    'Weekly sales report is ready'
  ]);

  const handleShowSidebar = () => setShowSidebar(true);
  const handleCloseSidebar = () => setShowSidebar(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <Navbar 
        expand="lg" 
        className="store-owner-navbar"
        style={{
          background: 'linear-gradient(90deg, #0F1C3C, #2F61C2)',
          color: '#fff'
        }}
      >
        <Container fluid className="d-flex justify-content-between align-items-center">
          <Button variant="outline-light" onClick={handleShowSidebar}>
            <FaBars />
          </Button>

          <Navbar.Brand style={{ color: '#fff', fontWeight: '600' }}>
            {ownerName}
          </Navbar.Brand>

          <div className="notification-icon" onClick={toggleNotifications} style={{ position: 'relative', cursor: 'pointer' }}>
            <FaBell size={24} style={{ color: '#fff' }} />
            {notifications.length > 0 && (
              <Badge pill variant="danger" className="notification-badge" style={{ position: 'absolute', top: '-5px', right: '-5px' }}>
                {notifications.length}
              </Badge>
            )}
          </div>
          
          {showNotifications && (
            <Dropdown.Menu show className="notification-dropdown" style={{ right: '10px', left: 'auto', background: '#fff', color: '#000' }}>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <Dropdown.Item key={index}>
                    {notification}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item>No new notifications</Dropdown.Item>
              )}
            </Dropdown.Menu>
          )}
        </Container>
      </Navbar>

      <Sidebar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};

export default StoreOwnerNavbar;
