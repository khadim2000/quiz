import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlayerCard = ({ player }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/player-image/${(player.name)}`)
      .then(response => {
        if (response.data.image) {
          setImageUrl(response.data.image);
        }
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de l'image :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [player.name]);

  if (loading) return null; // Attendre le chargement avant d'afficher quelque chose
  if (!imageUrl) return null; // Ne pas afficher si l'image n'existe pas

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center', 
      width: '120px', 
      textAlign: 'center' 
    }}>
      <p style={{ fontSize: '15px', color: '#fff', textAlign: 'center', marginBottom: '10px' }}>
        {player.name}
      </p>
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px',
          textAlign: 'center',
         
          padding: '10px',
         
        }}
      >
        <img 
          src={imageUrl} 
          alt={player.name} 
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '10px'
          }} 
        />
        <p style={{ fontSize: '14px', marginTop: '5px', fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>
          <strong>{player.teamName}{player.position}</strong>
        </p>
      </div>
    </div>
  );
};

export default PlayerCard;
