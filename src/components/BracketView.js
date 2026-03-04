"use client";

import React from 'react';
import MatchCard from './MatchCard';
import './BracketView.css';

export default function BracketView({ tournamentStruct, onMatchClick, onBack }) {
  if (!tournamentStruct || tournamentStruct.length === 0) return null;

  return (
    <div className="bracket-page slide-in-right">
      <div className="bracket-header glass-panel">
        <button className="back-btn" onClick={onBack}>&larr; Back to Dashboard</button>
        <h2 className="text-gradient">Tournament Bracket</h2>
      </div>

      <div className="bracket-canvas">
        {tournamentStruct.map((roundMatches, rIndex) => (
          <div key={`round-${rIndex}`} className="bracket-round">
            <h3 className="round-title">Round {rIndex + 1}</h3>
            <div className="matches-column">
              {roundMatches.map((match, mIndex) => (
                <div key={match.id} className="match-wrapper">
                  {rIndex > 0 && <div className="connector-in"></div>}
                  <MatchCard match={match} onMatchClick={onMatchClick} />
                  {rIndex < tournamentStruct.length - 1 && <div className="connector-out"></div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
