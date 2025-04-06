import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#001f3f" }}
      className="text-white py-4 mt-auto"
    >
      <Container>
        <Row>
          {/* Summary Section */}
          <Col md={4} className="mb-4 mb-md-0 py-3">
            <h5 className="text-white">Femicide Tracker Kenya</h5>
            <p className="text-white py-2">
              Femicide Tracker Kenya is dedicated to monitoring and analyzing
              femicide cases to raise awareness and advocate for change against
              gender-based violence.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="text-white">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Dashboard"
                  className="text-white text-decoration-none"
                >
                  📊 Dashboard
                </Link>
              </li>
              <li>
                <Link to="/Help" className="text-white text-decoration-none">
                  ❓ Help
                </Link>
              </li>
            </ul>
          </Col>

          {/* Social Media Links */}
          <Col md={4}>
            <h5 className="text-white">Connect With Us</h5>
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

        <hr className="my-4 bg-white" />

        {/* Copyright */}
        <Row>
          <Col className="text-center">
            <small className="text-white">
              © {new Date().getFullYear()} Femicide Tracker Kenya. All rights
              reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
