"use client";

import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import BracketView from '../components/BracketView';
import ScoreReporter from '../components/ScoreReporter';
import CreateTournament from '../components/CreateTournament';
import { mockParticipants, generateInitialMatchups, generateTournamentStructure } from '../lib/bracketLogic';

export default function Home() {
  const [view, setView] = useState('dashboard');
  const [tournamentStruct, setTournamentStruct] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const initialMatches = generateInitialMatchups(mockParticipants);
    const structure = generateTournamentStructure(initialMatches);
    setTournamentStruct(structure);
  }, []);

  const handleSelectTournament = (id) => {
    if (id === 'new') {
      setView('create');
    } else {
      const initialMatches = generateInitialMatchups(mockParticipants);
      const structure = generateTournamentStructure(initialMatches);
      setTournamentStruct(structure);
      setView('bracket');
    }
  };

  const handleCreateTournament = (participants) => {
    const initialMatches = generateInitialMatchups(participants);
    const structure = generateTournamentStructure(initialMatches);
    setTournamentStruct(structure);
    setView('bracket');
  };

  const handleMatchClick = (match) => {
    if (!match.winner && !match.team1?.isBye && !match.team2?.isBye) {
      if (match.team1 && match.team2) {
        setSelectedMatch(match);
      }
    }
  };

  const handleSaveScore = (matchId, score1, score2, winner) => {
    const newStruct = tournamentStruct.map(round => round.map(m => {
      if (m.id === matchId) {
        return { ...m, score1, score2, winner };
      }
      return m;
    }));

    for (let r = 0; r < newStruct.length - 1; r++) {
      for (let m = 0; m < newStruct[r].length; m++) {
        const currentMatch = newStruct[r][m];
        if (currentMatch.winner) {
          const nextRound = newStruct[r + 1];
          const nextMatchIndex = Math.floor(m / 2);
          const nextMatch = nextRound[nextMatchIndex];
          
          if (m % 2 === 0) {
            nextMatch.team1 = currentMatch.winner;
          } else {
            nextMatch.team2 = currentMatch.winner;
          }
        }
      }
    }

    setTournamentStruct([...newStruct]);
    setSelectedMatch(null);
  };

  return (
    <main>
      {view === 'dashboard' && (
        <Dashboard onSelectTournament={handleSelectTournament} />
      )}
      
      {view === 'create' && (
        <CreateTournament 
          onCreate={handleCreateTournament} 
          onCancel={() => setView('dashboard')} 
        />
      )}
      
      {view === 'bracket' && (
        <BracketView 
          tournamentStruct={tournamentStruct} 
          onMatchClick={handleMatchClick}
          onBack={() => setView('dashboard')}
        />
      )}

      {selectedMatch && (
        <ScoreReporter 
          match={selectedMatch} 
          onClose={() => setSelectedMatch(null)}
          onSave={handleSaveScore}
        />
      )}
    </main>
  );
}
