// // src/components/Sidebar.jsx
// app/components/store-owner/common/SideBar.jsx
'use client';

import React from 'react';
import { Offcanvas, Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './sidebar.module.css';

const menuItems = [
  { to: '/store-owner/dashboard', label: 'Dashboard' },
   { to: '/customer-enquiry',  label: 'Customer Enquiries' },
  { to: '/store-owner/my-store',  label: 'My Store' },
  //  { to: '/store-owner/edit-store', label: 'Edit Store Information' },  For security reasons, i have decided to remove this link in case a verified store owner wants to edit their store information without proper authentication.
  { to: '/store-owner/invoice',   label: 'My Invoice' },
  { to: '/store-owner/email-clients', label: 'Customer Emails' },
  { to: '/store-owner/store-products', label: 'Products' },
  { to: '/store-owner/store-settings', label: 'Settings' },
];

export default function Sidebar({ show, handleClose }) {
  const pathname = usePathname();

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="start"
      className={styles.myMaterialSidebar}
    >
      <Offcanvas.Header
        closeButton
        className={styles.myMaterialSidebarHeader}
      >
        <Offcanvas.Title className={styles.myMaterialSidebarTitle}>
          Menu
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className={styles.myMaterialSidebarBody}>
        <Nav className="flex-column">
          {menuItems.map(item => (
            <Nav.Link
              key={item.to}
              as={Link}
              href={item.to}
              className={
                styles.myMaterialNavLink +
                (pathname === item.to ? ` ${styles.active}` : '')
              }
              onClick={handleClose}
            >
              {item.label}
            </Nav.Link>
          ))}

          <div className="mt-auto">
            <Button
              as={Link}
              href="/"
              variant="outline-light"
              className={styles.myMaterialLogoutBtn}
              onClick={handleClose}
            >
              Logout
            </Button>
          </div>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

