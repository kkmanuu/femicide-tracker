import React, { useState } from "react";
import axios from "axios";

const CaseForm = ({ userId, onCaseAdded }) => {
  const [caseData, setCaseData] = useState({
    county: "",
    age: "",
    date: "",
    perpetrator: "",
    weapon: "",
    description: "",
  });

  const handleChange = (e) => {
    setCaseData({
      ...caseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim spaces from all fields
    const trimmedData = {
      county: caseData.county.trim(),
      age: caseData.age.trim(),
      date: caseData.date.trim(),
      perpetrator: caseData.perpetrator.trim(),
      weapon: caseData.weapon.trim(),
      description: caseData.description.trim(),
    };

    console.log("Trimmed Form Data Before Submit:", trimmedData); // Debug log

    if (
      !trimmedData.county ||
      !trimmedData.age ||
      !trimmedData.date ||
      !trimmedData.perpetrator ||
      !trimmedData.weapon ||
      !trimmedData.description
    ) {
      console.log("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/femicides", {
        ...trimmedData,
        user_id: userId,
      });

      if (response.status === 201) {
        onCaseAdded();
        setCaseData({
          county: "",
          age: "",
          date: "",
          perpetrator: "",
          weapon: "",
          description: "",
        });
      }
    } catch (error) {
      console.error(
        "Error adding femicide case:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Femicide Case</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">County</label>
          <input
            type="text"
            name="county"
            className="form-control"
            value={caseData.county}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            name="age"
            className="form-control"
            value={caseData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={caseData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Perpetrator</label>
          <input
            type="text"
            name="perpetrator"
            className="form-control"
            value={caseData.perpetrator}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Weapon</label>
          <input
            type="text"
            name="weapon"
            className="form-control"
            value={caseData.weapon}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={caseData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Case
        </button>
      </form>
    </div>
  );
};

export default CaseForm;
