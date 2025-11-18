import React, { useState } from 'react'

export const FlaggingRulesPage = () => {
  const [rules] = useState([
    { id: 1, name: 'Critical High', condition: '> 10', action: 'Alert' },
    { id: 2, name: 'Critical Low', condition: '< 2', action: 'Alert' },
  ])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Flagging Rules Management</h1>
        <button className="btn-primary">Add Rule</button>
      </div>
      <div className="page-content">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Condition</th>
              <th>Action</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td>{rule.id}</td>
                <td>{rule.name}</td>
                <td>{rule.condition}</td>
                <td>{rule.action}</td>
                <td>
                  <button className="btn-secondary">Edit</button>
                  <button className="btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
