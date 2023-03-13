
// Use HashRouter instead of BrowserRouter to prevent sending the urls to the server, which results in 404.
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import GameParams from './pages/game_params/GameParams.js';
import Game from './pages/game/Game.js';
import PlayerNames from './pages/player_names/PlayerNames.js';
import PrevNames from './pages/prev_names/PrevNames.js';

function App() 
{
  return (
    
    <Router>
        <Routes>
            <Route path = "/" element = { <GameParams /> } />
            <Route path = "/prev-names" element = { <PrevNames /> } />
            <Route path = "/names" element = { <PlayerNames /> } />
            <Route path = "/game" element = { <Game /> } />
        </Routes>
    </Router>

  );

}

export default App;
