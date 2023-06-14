
import PropTypes from 'prop-types';
import { useContext } from "react";

import globalProps, { utilsGlobalStyles } from "../../styles.js";
import CheckBox from '../check_box/CheckBox.js';
import ThemeContext from "../../contexts/ThemeContext.js";
import TextStandard from '../text_standard/TextStandard.js';
import ButtonStandard from '../button_standard/ButtonStandard.js';

function PrevPlayerLabel({ name, isSelected, onSelect, onRemove })
{   
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    return (
        <div 
            style = {{ ...styles.conOuter, backgroundColor: theme.header }}
        >
            <CheckBox text = { name } isChecked = { isSelected } onPress = { onSelect } style = {{ flexGrow: 0, width: "50%" }} />

            <ButtonStandard 
                text = "—" 
                onPress = { onRemove } 
                size = { 3 } 
                isBold 
                style = { styles.btnRemove } 
                styleText = {{ color: "#ffffff" }} 
            />
        </div>
    );
}

const styles =
{
    conOuter:
    {
        flexShrink: 0,
        width: "90%",
        maxWidth: 500,
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        borderRadius: globalProps.fontSizeStandard * 0.5,
        overflow: "hidden"
    },

    conName:
    {
        alignSelf: "center", // Overrides 'alignItems' property of parent.
        marginLeft: globalProps.fontSizeStandard,
    },

    btnRemove:
    {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#b30202",
        width: 3 * globalProps.fontSizeStandard,
        paddingTop: 0.35 * globalProps.fontSizeStandard,
        paddingBottom: 0.35 * globalProps.fontSizeStandard,
    }
};

PrevPlayerLabel.propTypes =
{
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

PrevPlayerLabel.defaultProps =
{
    isSelected: false,
}

export default PrevPlayerLabel;