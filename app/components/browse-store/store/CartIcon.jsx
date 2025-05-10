// src/components/CartIcon.jsx
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import '../../../styles/cartIcon.css'; // Import the CSS file for styling

const CartIcon = ({ onClick, itemCount }) => {
  return (
    <div className="cart-icon" onClick={onClick}>
      <FaShoppingCart className="cart-icon__image" />
      {itemCount > 0 && <span className="cart-icon__count">{itemCount}</span>}
    </div>
  );
};

export default CartIcon;
