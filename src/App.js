
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import GameParams from './pages/game_params/GameParams.js';
import Game from './pages/game/Game.js';
import PlayerNames from './pages/player_names/PlayerNames.js';

function App() 
{
  return (
    
    <Router>
        <Routes>
            <Route path = "/" element = { <GameParams />} />
            <Route path = "/names" element = { <PlayerNames />} />
            <Route path = "/game" element = { <Game />} />
        </Routes>
    </Router>

  );

}

export default App;
