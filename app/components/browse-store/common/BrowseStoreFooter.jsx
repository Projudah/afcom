// // src/components/Footer.jsx
// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import '../../../styles/footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer mt-auto py-3">
//       <Container>
//         <Row>
//           <Col md={3}>
//             <h6 className="footer-title">ABOUT US</h6>
//             <ul className="list-unstyled">
//               <li className='footer-text'>About us</li>
//               <li className='footer-text'>Contact</li>
//               <li className='footer-text'>Store Owner Fees</li>
//             </ul>
//           </Col>
//           <Col md={3}>
//             <h6 className="footer-title">USEFUL LINKS</h6>
//             <ul className="list-unstyled">
//               <li className='footer-text'>Returns</li>
//               <li className='footer-text'>FAQs</li>
//             </ul>
//           </Col>
//           <Col md={3}>
//             <h6 className="footer-title">FOLLOW US</h6>
//             <ul className="list-unstyled">
//               <li className='footer-text'>Facebook</li>
//               <li className='footer-text'>Twitter</li>
//               <li className='footer-text'>Instagram</li>
//             </ul>
//           </Col>
//           {/* <Col md={3}>
//             <h6 className="footer-title">OTHER SITES</h6>
//             <ul className="list-unstyled">
//               <li>Etsy</li>
//               <li>Erivanacaketools</li>
//             </ul>
//           </Col> */}
//         </Row>
//         <Row className="border-top pt-3">
//           <Col md={6} className="text-left">
//             <p>© 2024 Company name. All Rights Reserved</p>
//           </Col>
//           {/* <Col md={6} className="text-right">
//             <img src="path/to/logo.png" alt="Logo" />
//           </Col> */}
//         </Row>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;


import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../styles/footer.css';

const Footer = () => {
  return (
    <footer 
      className="footer mt-auto py-3" 
      style={{
        background: 'linear-gradient(90deg, #0F1C3C, #2F61C2)',
        color: '#fff'
      }}
    >
      <Container>
        <Row>
          <Col md={3}>
            <h6 className="footer-title">ABOUT US</h6>
            <ul className="list-unstyled">
              <li className='footer-text'>About us</li>
              <li className='footer-text'>Disclaimer</li>
              <li className='footer-text'>Contact</li>
              <li className='footer-text'>Store Owner Fees</li>
            </ul>
          </Col>
          <Col md={3}>
            <h6 className="footer-title">USEFUL LINKS</h6>
            <ul className="list-unstyled">
            <li className='footer-text'>Terms and conditions</li>
              <li className='footer-text'>Returns</li>
              <li className='footer-text'>FAQs</li>
            </ul>
          </Col>
          <Col md={3}>
            <h6 className="footer-title">FOLLOW US</h6>
            <ul className="list-unstyled">
              <li className='footer-text'>Facebook</li>
              <li className='footer-text'>Twitter</li>
              <li className='footer-text'>Instagram</li>
            </ul>
          </Col>
        </Row>
        <Row className="border-top pt-3">
          <Col md={6} className="text-left">
            <p>© 2024 Company name. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
