import React, { useState } from 'react'

export const InstrumentLogsPage = () => {
  const [logs] = useState([
    { id: 1, instrument: 'Analyzer A', event: 'Calibration', timestamp: '2024-01-15 09:00:00' },
    { id: 2, instrument: 'Analyzer B', event: 'Maintenance', timestamp: '2024-01-15 08:30:00' },
  ])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Instrument Logs</h1>
        <button className="btn-primary">Export Logs</button>
      </div>
      <div className="page-content">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Instrument</th>
              <th>Event</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.instrument}</td>
                <td>{log.event}</td>
                <td>{log.timestamp}</td>
                <td>
                  <button className="btn-secondary">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
