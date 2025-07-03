import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const [blueprintUrl, setBlueprintUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBlueprintUrl(url);
    setFileType(file.type);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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
          <input
            type="file"
            accept=".pdf,image/jpeg,image/png,image/jpg"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button onClick={handleUploadClick} style={{ marginBottom: 16 }}>
            Upload Blueprint
          </button>
          {blueprintUrl ? (
            fileType === 'application/pdf' ? (
              <iframe
                src={blueprintUrl}
                title="Blueprint PDF Preview"
                width="100%"
                height="500px"
                style={{ border: '1px solid #ccc', borderRadius: 4 }}
              />
            ) : (
              <img
                src={blueprintUrl}
                alt="Blueprint Preview"
                style={{ maxWidth: '100%', maxHeight: 500, border: '1px solid #ccc', borderRadius: 4 }}
              />
            )
          ) : (
            <p style={{ color: '#888' }}>No blueprint uploaded yet.</p>
          )}
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
