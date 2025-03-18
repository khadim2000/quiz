import React from 'react';
import PlayerCard from './PlayerCard';

const PlayerList = ({ team }) => (
  <div style={{ 
    marginBottom: '20px', 
    padding: '15px', 
    border: '1px solid #ddd', 
    borderRadius: '10px', 
    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
  }}>
    <h2 style={{ color: '#007BFF' }}>{team.teamName}</h2>
    <h3 style={{ color: '#555' }}>Joueurs :</h3>

    {team.players.length > 0 ? (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {team.players.map((player, index) => (
          <PlayerCard key={index} player={player} />
        ))}
      </div>
    ) : (
      <p>Aucun joueur disponible pour cette équipe.</p>
    )}
  </div>
);

export default PlayerList;
