import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
    
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        width: '100vw',
        height: '100vh',
        marginLeft: '-450px',
       
      }}
    >
      {/* Overlay */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          minHeight: '100vh',
          width: '100%',
          marginRight: '450px',
        }}
      >
        <Container fluid className="text-white text-center py-5">
          {/* Hero Section */}
          <h1 className="display-4 fw-bold mb-3">
            Femicide Data Management and Tracking System
          </h1>
          <p className="lead mb-4">
            Monitoring and analyzing femicide cases in Kenya
          </p>
          {user && (
            <div className="alert alert-light d-inline-block" style={{ border: 'none' }}>
              Welcome back, <strong>{user.name}</strong>
            </div>
          )}

          {/* About Section */}
          <Row className="justify-content-center my-5">
            <Col lg={8}>
              <h2 className="fw-bold mb-4">About the System</h2>
              <p className="fs-5">
                This platform tracks and analyzes femicide cases across Kenya to provide 
                data-driven insights for policymakers, researchers, and activists working 
                to end gender-based violence.
              </p>
            </Col>
          </Row>

          {/* Features Section */}
          <h2 className="fw-bold mb-4">Key Features</h2>
          <Row className="g-4 justify-content-center">
            {[
              {
                icon: 'bi-database',
                title: 'Data Collection',
                description: 'Systematic recording of femicide cases nationwide with verified sources',
              },
              {
                icon: 'bi-graph-up',
                title: 'Analysis',
                description: 'Advanced trend analysis and visualization tools for identifying patterns',
              },
              {
                icon: 'bi-file-earmark-text',
                title: 'Reporting',
                description: 'Generate comprehensive reports for advocacy and policy development',
              },
            ].map((feature, index) => (
              <Col md={4} key={index}>
                <Card
                  className="h-100 shadow-sm"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    padding: '20px',
                  }}
                >
                  <Card.Body className="text-center">
                    <div className="bg-light p-3 rounded-circle d-inline-block mb-3">
                      <i className={`bi ${feature.icon} fs-1 text-primary`}></i>
                    </div>
                    <Card.Title className="fw-bold">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Call to Action */}
          <div className="mt-5 py-4" style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
            <h3 className="fw-bold mb-4">Join the Fight Against Gender-Based Violence</h3>
            <Button variant="primary" size="lg" className="px-4 me-2" onClick={handleGetStarted}>
              Get Started
            </Button>
            
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
