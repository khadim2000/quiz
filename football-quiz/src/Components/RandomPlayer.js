import React, { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';

const RandomPlayers = ({ players = [] }) => {
  const getRandomPlayer = (players) => {
    return players[Math.floor(Math.random() * players.length)];
  };

  const [randomPlayer, setRandomPlayer] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [userpost, setUserpost] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); 
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (players.length > 0) {
      setRandomPlayer(getRandomPlayer(players));
      setTimeLeft(30); // Réinitialisation du timer
    }
  }, [players]);

  // Démarrer le timer quand un joueur est affiché
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setMessage('⏳ Temps écoulé !');
      setTimeout(() => {
        setRandomPlayer(getRandomPlayer(players));
        setUserGuess('');
        setMessage('');
        setTimeLeft(30);
      }, 3000); // Passage au joueur suivant après 2 secondes
    }
  }, [timeLeft,players]);

  // Fonction pour supprimer les accents
  const removeAccents = (str) => {
    return str
      .normalize("NFD") // Décompose les accents
      .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
      .toLowerCase();
  };

  const checkGuess_nom = () => {
    if (!randomPlayer) return;

    // Vérification si l'input est vide
    if (userGuess.trim() === '') {
      setMessage('❌ Vous devez entrer un nom !');
      return;
    }
    

    const correctNames = [
      removeAccents(randomPlayer.name),
    ];

    if (correctNames.includes(removeAccents(userGuess))) {
      setScore(prevScore => prevScore + 1); 
      setMessage('✅ Bonne réponse !');

      setTimeout(() => {
        setRandomPlayer(getRandomPlayer(players));
        setUserGuess('');
        setMessage('');
        setTimeLeft(30);
      }, 2000); // Passage au joueur suivant après 2 secondes
    } else {
      setMessage('❌ Mauvaise réponse, réessayez !');
    }
  };
  const checkGuess_post = () => {
    if (!randomPlayer) return;

    // Vérification si l'input est vide
    if (userpost.trim() === '') {
      setMessage('❌ Vous devez entrer un nom !');
      return;
    }
    

    const correctPost = [
      removeAccents(randomPlayer.position),
    ];

    if (correctPost.includes(removeAccents(userpost))) {
      setScore(prevScore => prevScore + 1); 
      setMessage('✅ Bonne réponse !');

      setTimeout(() => {
        setRandomPlayer(getRandomPlayer(players));
        setUserpost('');
        setMessage('');
        setTimeLeft(30);
      }, 2000); // Passage au joueur suivant après 2 secondes
    } else {
      setMessage('❌ Mauvaise réponse, réessayez !');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      {randomPlayer ? (
        <div>
          <h3>Score : {score} Points</h3>
          <h4>⏳ Temps restant : {timeLeft} secondes</h4>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px 0'
          }}>
            <PlayerCard player={randomPlayer} />
          </div>

          {!revealed && (
            <>
              <input
                type="text"
                placeholder="Devinez son nom..."
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                style={{
                  marginTop: '15px',
                  padding: '15px',
                  marginLeft:'20px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  textAlign: 'center',
                }}
              />
              <button 
                onClick={() => {
                  checkGuess_nom();
                  checkGuess_post();
                }}
              
                style={{
                  marginLeft: '10px',
                  padding: '10px 15px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Vérifier
              </button>
            </>
          )}

          {message && <p style={{ marginTop: '10px', fontSize: '18px' }}>{message}</p>}
          <div>
          <button 
            onClick={() => {
              setRandomPlayer(getRandomPlayer(players));
              setUserGuess('');
              setUserpost('');
              setMessage('');
              setRevealed(false);
              setTimeLeft(30);
            }}
            style={{
              marginTop: '15px',
              padding: '10px 15px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#007BFF',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Suivant
          </button>
          </div>
        </div>
      ) : (
        <p style={{ fontSize: '16px', color: '#888' }}>Aucun joueur disponible</p>
      )}
    </div>
  );
};

export default RandomPlayers;
