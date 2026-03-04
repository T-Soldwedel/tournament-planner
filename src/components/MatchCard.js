"use client";

import React from 'react';
import './MatchCard.css';

export default function MatchCard({ match, onMatchClick }) {
  const isTeam1Winner = match.winner?.id === match.team1?.id;
  const isTeam2Winner = match.winner?.id === match.team2?.id;

  return (
    <div 
      className={`match-card glass-panel interactive-card ${match.winner ? 'completed' : ''}`}
      onClick={() => onMatchClick(match)}
    >
      <div className="match-header">
        <span className="match-id">Match {match.id.split('-').pop()}</span>
      </div>
      <div className="team-container">
        <div className={`team-row ${isTeam1Winner ? 'winner' : ''} ${match.team1?.isBye ? 'bye' : ''}`}>
          <span className="seed">{match.team1?.seed || '-'}</span>
          <span className="team-name">{match.team1?.name || 'TBD'}</span>
          <span className="score">{match.score1 !== null ? match.score1 : '-'}</span>
        </div>
        <div className="team-divider"></div>
        <div className={`team-row ${isTeam2Winner ? 'winner' : ''} ${match.team2?.isBye ? 'bye' : ''}`}>
          <span className="seed">{match.team2?.seed || '-'}</span>
          <span className="team-name">{match.team2?.name || 'TBD'}</span>
          <span className="score">{match.score2 !== null ? match.score2 : '-'}</span>
        </div>
      </div>
    </div>
  );
}
