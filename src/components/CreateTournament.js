import React, { useState } from 'react';
import './CreateTournament.css';

export default function CreateTournament({ onCreate, onCancel }) {
  const [participantsText, setParticipantsText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const names = participantsText.split('\n').map(n => n.trim()).filter(n => n);
    
    if (names.length < 2) {
      setError('Please enter at least 2 participants');
      return;
    }
    if (names.length > 64) {
      setError('Maximum 64 participants allowed');
      return;
    }
    
    setError('');
    const participantsList = names.map((name, index) => ({
      id: index + 1,
      name,
      seed: index + 1
    }));
    
    onCreate(participantsList);
  };

  return (
    <div className="create-tournament-container slide-in-right">
      <div className="glass-panel form-panel">
        <h2>Create New Tournament</h2>
        <p className="form-description">Enter the names of the participants. One per line. They will be seeded in the order they are entered.</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              value={participantsText}
              onChange={(e) => setParticipantsText(e.target.value)}
              placeholder="Team Alpha&#10;Team Bravo&#10;Team Charlie&#10;Team Delta"
              rows={12}
              className="participants-textarea"
            />
          </div>
          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="primary-btn">Generate Bracket</button>
          </div>
        </form>
      </div>
    </div>
  );
}
