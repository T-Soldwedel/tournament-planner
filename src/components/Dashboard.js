"use client";

import React from 'react';
import './Dashboard.css';

export default function Dashboard({ onSelectTournament }) {
  return (
    <div className="dashboard-container">
      <section className="hero-section glass-panel slide-in-right">
        <h1 className="text-gradient">Tournament Hub</h1>
        <p>Organize, track, and manage your custom brackets with ease.</p>
        <button className="primary-btn" onClick={() => onSelectTournament('new')}>
          + Create Tournament
        </button>
      </section>
      
      <section className="active-tournaments slide-in-right" style={{ animationDelay: '0.1s' }}>
        <h2>Active Tournaments</h2>
        <div className="tournaments-grid">
          <div className="tournament-card glass-panel interactive-card" onClick={() => onSelectTournament('demo')}>
            <div className="card-header">
              <h3>Spring Championship</h3>
              <span className="status-badge">In Progress</span>
            </div>
            <p>13 Participants &bull; Round 2</p>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
