import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Femicide Tracker Kenya</h5>
            <p className="text-muted">
              Monitoring and analyzing femicide cases to end gender-based violence.
            </p>
          </Col>
          
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
              <li><Link to="/dashboard" className="text-decoration-none text-muted">Dashboard</Link></li>
              <li><Link to="/help" className="text-decoration-none text-muted">Help</Link></li>
            </ul>
          </Col>
          
          <Col md={4}>
            <h5>Connect With Us</h5>
            <div className="d-flex">
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-instagram fs-4"></i>
              </a>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4 bg-secondary" />
        
        <Row>
          <Col className="text-center text-muted">
            <small>© {new Date().getFullYear()} Femicide Tracker Kenya. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;