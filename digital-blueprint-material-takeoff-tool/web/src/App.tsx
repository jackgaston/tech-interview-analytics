import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Sidebar for material selection */}
      <aside className="sidebar">
        <h2>Materials</h2>
        <div className="material-list">
          {/* Placeholder: Material options will go here */}
          <p>Select material type, size, and color</p>
        </div>
      </aside>

      {/* Main content area */}
      <main className="main-content">
        {/* Calibration bar */}
        <div className="calibration-bar">
          <h3>Calibration</h3>
          {/* Placeholder: Calibration controls will go here */}
        </div>

        {/* Blueprint upload and viewer */}
        <div className="blueprint-viewer">
          <h3>Blueprint Viewer</h3>
          {/* Placeholder: Upload and interactive viewer will go here */}
          <button>Upload Blueprint</button>
        </div>

        {/* Takeoff table */}
        <div className="takeoff-table">
          <h3>Takeoff Table</h3>
          {/* Placeholder: Table of measured runs and export options */}
        </div>
      </main>
    </div>
  );
}

export default App;
