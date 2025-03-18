import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RandomPlayers from './Components/RandomPlayer';

const App = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [competition, setCompetition] = useState('PL'); 

  // Liste des compétitions disponibles
  const competitions = [
    { code: 'PL', name: 'Premier League' },
    { code: 'PD', name: 'La Liga' },
    { code: 'FL1', name: 'Ligue 1' },
    { code: 'SA', name: 'Serie A' },
    { code: 'BL1', name: 'Bundesliga' },
    { code: 'WC', name: 'Coupe du Monde' }
  ];

  useEffect(() => {
    if (!competition) return;

    setTeams([]); // Vide l'état des équipes
    setLoading(true); // Déclenche le chargement

    // Appel à l'API pour récupérer les équipes
    axios.get(`/v4/competitions/${competition}/teams`, {
      headers: { 'X-Auth-Token': '192ceca6fc7247848c38a7416f91ae63' }
    })
      .then(response => {
        setTeams(response.data.teams);
        console.log(response.data.teams)  
        setLoading(false);              
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);              // Fin du chargement en cas d'erreur
      });

  }, [competition]); // Rechargement des données lorsque la compétition change

  if (loading) {
    return <div>Chargement des équipes et joueurs...</div>;
  }

  // Récupération de tous les joueurs de toutes les équipes
  const allPlayers = teams.flatMap(team => 
    team.squad ? team.squad.map(player => ({
      ...player,
      teamName: team.name,
      logo: team.crest,
      position: player.position,
      id: player.id,
      shortName:player.shortName
    })) : []
  );

  return (
    <div style={{
      maxWidth: '800px', 
      margin: 'auto', 
      padding: '20px',
      backgroundImage: 'url("https://img.freepik.com/photos-premium/stade-football-tribunes-pleines-fans-attendant-match-rendu-3d_207634-4954.jpg")',
      // Remplacez par votre propre URL d'image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
 
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    }}>
      <h1 style={{ textAlign: 'center', color: '#fff' }}>QUIZZ </h1>
      <h3 style={{ textAlign: 'center', color: '#fff' }}>Deviner le nom du joueur </h3>

      {/* Sélecteur de compétition */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label htmlFor="competition" style={{ fontSize: '16px', marginRight: '10px', color: ' #fff' }}>Choisir une compétition :</label>
        <select
          id="competition"
          value={competition}
          onChange={(e) => setCompetition(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
        >
          {competitions.map(comp => (
            <option key={comp.code} value={comp.code}>{comp.name}</option>
          ))}
        </select>
      </div>

      {/* Affichage des joueurs */}
      <RandomPlayers players={allPlayers}  />
    </div>
  );
};

export default App;
