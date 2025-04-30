import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DataTable = ({ data }) => {
  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>County</th>
              <th>Age</th>
              <th>Date</th>
              <th>Perpetrator</th>
              <th>Weapon</th>
            </tr>
          </thead>
          <tbody>
            {data.map((caseItem) => (
              <tr key={caseItem.id}>
                <td>{caseItem.id}</td>
                <td>{caseItem.county}</td>
                <td>{caseItem.age}</td>
                <td>{caseItem.date}</td>
                <td>{caseItem.perpetrator}</td>
                <td>{caseItem.weapon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
