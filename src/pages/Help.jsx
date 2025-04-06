import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

const Help = () => {
  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="display-4 fw-bold text-primary">Help & Resources</h1>
          <p className="lead">
            Find assistance and information about our system
          </p>
        </Col>
      </Row>

      {/* FAQ Section */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="mb-4 fw-bold border-bottom pb-2">
                Frequently Asked Questions
              </h2>

              <div className="mb-4">
                <h4 className="text-primary">
                  How do I report a femicide case?
                </h4>
                <p className="text-muted">
                  Only authorized personnel can add cases to the system. If you
                  need to report a case, please contact the nearest police
                  station or gender violence recovery center.
                </p>
              </div>

              <div>
                <h4 className="text-primary">How often is the data updated?</h4>
                <p className="text-muted">
                  The data is updated weekly as new cases are verified and added
                  to the system.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Emergency Contacts */}
      <Row className="mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h2 className="mb-4 fw-bold border-bottom pb-2">
                Emergency Contacts
              </h2>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>National GBV Hotline:</span>
                  <span className="badge bg-danger rounded-pill">1195</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Childline Kenya:</span>
                  <span className="badge bg-danger rounded-pill">116</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Police Emergency:</span>
                  <div>
                    <span className="badge bg-danger rounded-pill me-2">
                      999
                    </span>
                    <span className="badge bg-danger rounded-pill">112</span>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Support Section */}
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h2 className="mb-4 fw-bold border-bottom pb-2">
                Need Further Assistance?
              </h2>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-envelope-fill fs-3 text-primary me-3"></i>
                <div>
                  <h5 className="mb-0">Email Support</h5>
                  <a
                    href="mailto:support@femicidetracker.or.ke"
                    className="text-decoration-none"
                  >
                    support@femicidetracker.or.ke
                  </a>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-telephone-fill fs-3 text-primary me-3"></i>
                <div>
                  <h5 className="mb-0">Phone Support</h5>
                  <p className="mb-0">+254 700 000000</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Help;
