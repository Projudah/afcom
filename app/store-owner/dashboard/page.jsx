// src/components/Dashboard.jsx
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

import StoreOwnerNavbar from './common/StoreOwnerHeader';

import '../../styles/dashboard.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const ownerName = "John Doe"; // Replace with dynamic owner name

  // Sample data for charts
  const visitsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Store Visits',
        data: [50, 100, 75, 125, 150, 175],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderWidth: 2,
        fill: true,
      }
    ],
  };

  const clicksData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product D', 'Product D', 'Product D', 'Product D', 'Product D'],
    datasets: [
      {
        label: 'Product Clicks',
        data: [300, 150, 250, 400, 500, 600, 585, 982, 45, 56],
        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
      }
    ],
  };

  const reviewsData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Customer Reviews',
        data: [65, 20, 15],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
      }
    ],
  };

  const conversionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: [2.5, 3.0, 4.0, 3.5, 5.0, 4.8],
        borderColor: '#17a2b8',
        backgroundColor: 'rgba(23, 162, 184, 0.2)',
      }
    ],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (in $)',
        data: [1000, 1200, 1300, 1100, 1500, 1700],
        borderColor: '#ffc107',
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
      }
    ],
  };
  
  const avgOrderValueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Order Value ($)',
        data: [50, 55, 52, 60, 65, 70],
        borderColor: '#6f42c1',
        backgroundColor: 'rgba(111, 66, 193, 0.2)',
      }
    ],
  };
  
  const returningCustomersData = {
    labels: ['First-Time Customers', 'Returning Customers'],
    datasets: [
      {
        label: 'Customer Type',
        data: [70, 30],
        backgroundColor: ['#ffc107', '#28a745'],
      }
    ],
  };
  
  const abandonedCartsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Abandoned Carts',
        data: [50, 30, 40, 35, 45, 50],
        borderColor: '#dc3545',
        backgroundColor: 'rgba(220, 53, 69, 0.2)',
      }
    ],
  };
  
  
  return (
    <div className="page-container">
    <StoreOwnerNavbar ownerName={ownerName} />
    <Container className='dashboard-main-container'>
      <Row>
        <Col md={12}>
          <Card className='dashboard-card'>
            <Card.Body>
              <Card.Title>Store Visits</Card.Title>
              <Line data={visitsData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className='dashboard-card'>
            <Card.Body>
              <Card.Title>Product Clicks</Card.Title>
              <Bar data={clicksData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='dashboard-card'>
            <Card.Body>
              <Card.Title>Returning Customer Data</Card.Title>
              <Doughnut data={returningCustomersData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card className='dashboard-card'>
            <Card.Body>
              <Card.Title>Customer Reviews</Card.Title>
              <Doughnut data={reviewsData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='dashboard-card'>
            <Card.Body>
              <Card.Title>Conversion Data</Card.Title>
              <Bar data={conversionData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='dashboard-card'>
            <Card.Body>
              <Card.Title>Revenue Data</Card.Title>
              <Bar data={revenueData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='dashboard-card'>
            <Card.Body>
              <Card.Title>Average Order Data</Card.Title>
              <Bar data={avgOrderValueData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='dashboard-card'>
            <Card.Body>
              <Card.Title>Abandoned Cart Data</Card.Title>
              <Line data={abandonedCartsData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Dashboard;
