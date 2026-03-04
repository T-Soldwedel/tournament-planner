// src/lib/bracketLogic.js

export const mockParticipants = [
  { id: 1, name: "Alpha Team", seed: 1 },
  { id: 2, name: "Bravo Squad", seed: 2 },
  { id: 3, name: "Charlie Co", seed: 3 },
  { id: 4, name: "Delta Force", seed: 4 },
  { id: 5, name: "Echo Base", seed: 5 },
  { id: 6, name: "Foxtrot Unit", seed: 6 },
  { id: 7, name: "Golf Club", seed: 7 },
  { id: 8, name: "Hotel Crew", seed: 8 },
  { id: 9, name: "India Boys", seed: 9 },
  { id: 10, name: "Juliet Jems", seed: 10 },
  { id: 11, name: "Kilo Kings", seed: 11 },
  { id: 12, name: "Lima Legends", seed: 12 },
  { id: 13, name: "Mike Masters", seed: 13 }
];

const getNextPowerOfTwo = (num) => {
  return Math.pow(2, Math.ceil(Math.log2(num)));
};

export const generateInitialMatchups = (participants) => {
  const sorted = [...participants].sort((a, b) => a.seed - b.seed);
  const bracketSize = getNextPowerOfTwo(sorted.length);
  
  const getBracketOrder = (rounds) => {
    let order = [1];
    for (let r = 0; r < rounds; r++) {
      const currentSize = order.length;
      const sum = currentSize * 2 + 1;
      const nextOrder = [];
      for (let i = 0; i < order.length; i++) {
        nextOrder.push(order[i]);
        nextOrder.push(sum - order[i]);
      }
      order = nextOrder;
    }
    return order;
  };

  const rounds = Math.log2(bracketSize);
  const order = getBracketOrder(rounds);

  const matches = [];
  for (let i = 0; i < order.length; i += 2) {
    const seed1 = order[i];
    const seed2 = order[i + 1];

    const team1 = sorted.find(p => p.seed === seed1) || { id: `bye-${seed1}`, name: 'BYE', isBye: true };
    const team2 = sorted.find(p => p.seed === seed2) || { id: `bye-${seed2}`, name: 'BYE', isBye: true };

    matches.push({
      id: `match-r1-${i / 2}`,
      round: 1,
      team1,
      team2,
      score1: null,
      score2: null,
      winner: null
    });
  }

  matches.forEach(match => {
    if (match.team1.isBye) {
      match.winner = match.team2;
    } else if (match.team2.isBye) {
      match.winner = match.team1;
    }
  });

  return matches;
};

export const generateTournamentStructure = (initialMatches) => {
    const structure = [initialMatches];
    let currentRoundMatches = initialMatches;
    let roundNum = 2;

    while(currentRoundMatches.length > 1) {
        const nextRoundMatches = [];
        for (let i = 0; i < currentRoundMatches.length; i += 2) {
            nextRoundMatches.push({
                id: `match-r${roundNum}-${i/2}`,
                round: roundNum,
                team1: currentRoundMatches[i]?.winner || null,
                team2: currentRoundMatches[i+1]?.winner || null,
                score1: null,
                score2: null,
                winner: null
            });
        }
        structure.push(nextRoundMatches);
        currentRoundMatches = nextRoundMatches;
        roundNum++;
    }
    return structure;
};
