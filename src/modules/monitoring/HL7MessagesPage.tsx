import React, { useState } from 'react'

export const HL7MessagesPage = () => {
  const [messages] = useState([
    { id: 1, type: 'ADT', status: 'Sent', timestamp: '2024-01-15 10:30:00' },
    { id: 2, type: 'ORU', status: 'Received', timestamp: '2024-01-15 10:25:00' },
  ])

  return (
    <div className="page">
      <div className="page-header">
        <h1>HL7 Messages Monitoring</h1>
        <button className="btn-primary">Send Message</button>
      </div>
      <div className="page-content">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td>{message.id}</td>
                <td>{message.type}</td>
                <td>
                  <span className={`status-badge ${message.status.toLowerCase()}`}>
                    {message.status}
                  </span>
                </td>
                <td>{message.timestamp}</td>
                <td>
                  <button className="btn-secondary">View</button>
                  <button className="btn-danger">Resend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
