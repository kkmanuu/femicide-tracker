import React, { useState, useEffect } from "react";
import { getFemicides } from "../api/api";
import FemicideChart from "../components/FemicideChart";
import DataTable from "../components/DataTable";
import CaseForm from "../components/CaseForm";
import { Spinner, Alert } from "react-bootstrap";

const Dashboard = ({ user }) => {
  const [femicides, setFemicides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getFemicides();
        setFemicides(data);
      } catch (err) {
        setError("Failed to load data");
        console.error("Error fetching femicides:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCaseAdded = () => {
    // Refresh data after adding new case
    getFemicides().then((data) => setFemicides(data));
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="dashboard">
      <h1>Femicide Data Dashboard</h1>

      <div className="row">
        <div className="col-md-6">
          <CaseForm userId={user.id} onCaseAdded={handleCaseAdded} />
        </div>
        <div className="col-md-6">
          <FemicideChart data={femicides} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <DataTable data={femicides} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
