import React, { useState } from 'react'

export const QuarantinePage = () => {
  const [quarantineItems] = useState([
    { id: 1, sampleId: 'S001', reason: 'Contamination', date: '2024-01-15' },
    { id: 2, sampleId: 'S002', reason: 'Temperature Issue', date: '2024-01-14' },
  ])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Quarantine Management</h1>
        <button className="btn-primary">Add to Quarantine</button>
      </div>
      <div className="page-content">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sample ID</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quarantineItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.sampleId}</td>
                <td>{item.reason}</td>
                <td>{item.date}</td>
                <td>
                  <button className="btn-secondary">Review</button>
                  <button className="btn-success">Release</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
