"use client";

import React, { useState, useEffect } from 'react';
import './ScoreReporter.css';

export default function ScoreReporter({ match, onClose, onSave }) {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  useEffect(() => {
    if (match) {
      setScore1(match.score1 || 0);
      setScore2(match.score2 || 0);
    }
  }, [match]);

  if (!match) return null;

  const handleSave = () => {
    let winner = null;
    if (score1 > score2) winner = match.team1;
    else if (score2 > score1) winner = match.team2;
    onSave(match.id, score1, score2, winner);
  };

  return (
    <div className="score-reporter-overlay" onClick={onClose}>
      <div className="score-reporter-panel glass-panel slide-in-right" onClick={e => e.stopPropagation()}>
        <div className="reporter-header">
          <h3>Report Score - Match {match.id.split('-').pop()}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="reporter-body">
          <div className="team-score-input">
            <span className="team-name">{match.team1?.name}</span>
            <div className="score-controls">
              <button onClick={() => setScore1(Math.max(0, score1 - 1))}>-</button>
              <input type="number" value={score1} readOnly />
              <button onClick={() => setScore1(score1 + 1)}>+</button>
            </div>
          </div>
          
          <div className="vs-divider">VS</div>
          
          <div className="team-score-input">
            <span className="team-name">{match.team2?.name}</span>
            <div className="score-controls">
              <button onClick={() => setScore2(Math.max(0, score2 - 1))}>-</button>
              <input type="number" value={score2} readOnly />
              <button onClick={() => setScore2(score2 + 1)}>+</button>
            </div>
          </div>
        </div>

        <div className="reporter-footer">
          <button className="primary-btn full-width" onClick={handleSave}>Save Result</button>
        </div>
      </div>
    </div>
  );
}
