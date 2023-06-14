
// Use HashRouter instead of BrowserRouter to prevent sending the urls to the server, which results in 404.
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import ThemeContext from './contexts/ThemeContext';

import './App.css';
import pages from './pages/pages';
import utils from './utils/utils';
import globalProps, { utilsGlobalStyles } from './styles';
// import GameParams from './pages/game_params/GameParams.js';
// import Game from './pages/game/Game.js';
// import PlayerNames from './pages/player_names/PlayerNames.js';
// import PrevNames from './pages/prev_names/PrevNames.js';

/*
* A localStorage key whose value is a string that corresponding to the app's current theme.
*/
const lclStrgKeyThemeName = "themeName";

function App() 
{
    // Global theme variable.
    const [ themeName, setThemeName ] = useState(globalProps.themeDefault);
    let theme = globalProps.themes[themeName];

    /*
    * Updates the themeName.

    * Parameters:
        > newThemeName: the name of the theme that will be set.
    */
    const updateTheme = (newThemeName) =>
    {
        if (!newThemeName)
        {
            console.log("No theme name provided!");
            return;
        }

        setThemeName(newThemeName);

        /*
        * Set the background colour of the root view. The root view is generally not visible, but can appear when 
        opening the keyboard. It's white by default, which might be jarring if the theme is black.
        */
        //SystemUI.setBackgroundColorAsync(globalProps.themes[newThemeName].content);

        // Locally store the new theme's name.
        utils.SetInLocalStorage(lclStrgKeyThemeName, newThemeName);
    };

    /*
    * Set the theme to the one stored locally on the user's device; if there isn't a stored theme, the default is used.
    * This function is called only once at start-up to set the app's theme.
    */
    useEffect(
        () =>
        {
            // A function that retrieves the stored theme and then updates themeName.
            const storedThemeName = utils.GetFromLocalStorage(lclStrgKeyThemeName, globalProps.themeDefault);
            console.log(globalProps.themeDefault);

            setThemeName(storedThemeName);

            // localStorage.removeItem("MenuBallsTop");
            // localStorage.removeItem("MenuBallsBottom");
            // localStorage.removeItem("MenuBallsMid");
        },
        []
    );

  return (
    <ThemeContext.Provider value = {{ themeName, updateTheme }}>
        <Router>
            <Routes>
                {/* 
                * This context gives each child component (incl. their descendants) access to the themeName variable.
                */}
                {
                    Object.keys(pages).map(
                        (pageName, index) => 
                        {
                            const path = (pageName == "root") ? "/" : `/${pageName}`;

                            const PageComponent = pages[pageName]

                            return (
                                <Route
                                    path = { path }
                                    element = {<PageComponent />}
                                    key = { index }
                                />
                            );
                        }
                    )
                }
                {/* <Route path = "/" element = { <GameParams /> } />
                <Route path = "/prev-names" element = { <PrevNames /> } />
                <Route path = "/names" element = { <PlayerNames /> } />
                <Route path = "/game" element = { <Game /> } /> */}
            </Routes>
        </Router>
    </ThemeContext.Provider>

  );

}

export default App;
