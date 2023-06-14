import Menu from "./menu/Menu";
import Settings from "./settings/Settings";
import SettingsThemes from "./settings_theme/SettingsTheme";
import GameInfo from "./game_info/GameInfo";
import GameParams from "./game_params/GameParams";
import PrevNames from "./prev_names/PrevNames";
import PlayerNames from "./player_names/PlayerNames";
import Game from "./game/Game";

const pages = 
{
    root: Menu,
    settings: Settings,
    settingsThemes: SettingsThemes,
    gameInfo: GameInfo,
    gameParams: GameParams,
    prevNames: PrevNames,
    playerNames: PlayerNames,
    game: Game
};

export default pages;