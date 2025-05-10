import React from 'react';

const sendEmailNotification = (storeEmail, cartItems) => {
  // Example of sending an email notification to the store owner
  const emailBody = `Customer has placed an order. Cart Items: ${cartItems.map(
    (item) => `\n${item.name} - Quantity: ${item.quantity}`
  )}`;
  
  // This is just a simple alert to simulate sending an email.
  // Replace this with actual API call to send the email.
  alert(`Notification sent to ${storeEmail}:\n${emailBody}`);
};

// Call this function in your confirm order process:
const handleSendNotification = (cart, store) => {
  sendEmailNotification(store.email, cart);
};
