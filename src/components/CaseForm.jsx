import React, { useState, useEffect } from 'react';
import { addFemicide, getMetadata } from '../api/api';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

const CaseForm = ({ userId, onCaseAdded }) => {
  const [formData, setFormData] = useState({
    county: '',
    age: '',
    date: '',
    perpetrator: '',
    weapon: '',
    description: ''
  });
  
  const [metadata, setMetadata] = useState({
    counties: [],
    perpetrators: [],
    weapons: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await getMetadata();
        setMetadata(data);
      } catch (err) {
        setError('Failed to load form options');
      } finally {
        setLoading(false);
      }
    };
    fetchMetadata();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['county', 'age', 'date', 'perpetrator', 'weapon'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      setLoading(true);
      await addFemicide({
        county: formData.county,
        age: Number(formData.age), // Convert to number
        date: formData.date,
        perpetrator: formData.perpetrator,
        weapon: formData.weapon,
        description: formData.description
      }, userId);
      
      onCaseAdded();
      setFormData({
        county: '',
        age: '',
        date: '',
        perpetrator: '',
        weapon: '',
        description: ''
      });
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.county) return <Spinner animation="border" />;

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      {/* County Field */}
      <Form.Group className="mb-3">
        <Form.Label>County *</Form.Label>
        <Form.Select 
          name="county" 
          value={formData.county} 
          onChange={handleChange}
          required
        >
          <option value="">Select County</option>
          {metadata.counties.map(county => (
            <option key={county} value={county}>{county}</option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Age Field */}
      <Form.Group className="mb-3">
        <Form.Label>Age *</Form.Label>
        <Form.Control
          type="number"
          name="age"
          min="1"
          max="120"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Date Field */}
      <Form.Group className="mb-3">
        <Form.Label>Date *</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Perpetrator Field */}
      <Form.Group className="mb-3">
        <Form.Label>Perpetrator *</Form.Label>
        <Form.Select
          name="perpetrator"
          value={formData.perpetrator}
          onChange={handleChange}
          required
        >
          <option value="">Select Perpetrator</option>
          {metadata.perpetrators.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Weapon Field */}
      <Form.Group className="mb-3">
        <Form.Label>Weapon *</Form.Label>
        <Form.Select
          name="weapon"
          value={formData.weapon}
          onChange={handleChange}
          required
        >
          <option value="">Select Weapon</option>
          {metadata.weapons.map(weapon => (
            <option key={weapon} value={weapon}>{weapon}</option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Description Field (Optional) */}
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" disabled={loading}>
        {loading ? <Spinner size="sm" /> : 'Add Case'}
      </Button>
    </Form>
  );
};

export default CaseForm;