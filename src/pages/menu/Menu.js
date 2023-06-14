import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import globalProps, { utilsGlobalStyles } from '../../styles';
import optionsHeaderButtons from '../../components/options_header_buttons.js';

import ButtonStandard from '../../components/button_standard/ButtonStandard.js';
import GridPoolBall from '../../components/grid_pool_ball/GridPoolBall';
import PageContainer from '../../components/page_container/PageContainer.js';
import utils from '../../utils/utils';
import consts from '../../utils/constants';

/*
* AsyncStorage keys for the top, middle, and bottom balls.
*/
const lclStrgKeyBallsTop = "MenuBallsTop";
const lclStrgKeyBallsMid = "MenuBallsMid";
const lclStrgKeyBallsBottom = "MenuBallsBottom";

function Menu({}) 
{
    const navigate = useNavigate();

    const [ ballsTop, setBallsTop ] = useState(
        Array.from({ length: 15 }, () => { return 8 }).map(
            (num) =>
            {
                return { number: num, in: false, selected: false };
            }
        )
    );

    const [ ballsMid, setBallsMid ] = useState(
        Array.from({ length: 5 }, () => { return 8 }).map(
            (num) =>
            {
                return { number: num, in: false, selected: false };
            }
        )
    );

    const [ ballsBottom, setBallsBottom ] = useState(
        Array.from({ length: 15 }, () => { return 8 }).map(
            (num) =>
            {
                return { number: num, in: false, selected: false };
            }
        )
    );

    /*
    * Set the balls.
    */
    useEffect(
        () =>
        {
            const ballsTopSaved = utils.GetFromLocalStorage(lclStrgKeyBallsTop);
            const ballsMidSaved = utils.GetFromLocalStorage(lclStrgKeyBallsMid);
            const ballsBottomSaved = utils.GetFromLocalStorage(lclStrgKeyBallsBottom);

            const setList = [
                { balls: ballsTopSaved, setter: setBallsTop },
                { balls: ballsMidSaved, setter: setBallsMid },
                { balls: ballsBottomSaved, setter: setBallsBottom },
            ];

            for (const i of setList)
            {
                if (!i.balls)
                { continue; }

                i.setter(
                    (prev) => 
                    {
                        return prev.map(
                            (ball, index) => { return { ...ball, number: i.balls[index] } }
                        );
                    }
                );
            }
        },
        []
    );

    const setBallsUpdater = (prev, index, lclStrgKey) =>
    {
        const newBalls = prev.map(
            (ball, i) =>
            {
                if (i != index)
                {
                    return ball;
                }

                let ballNumberNext = (ball.number + 1) % (consts.numPoolBalls + 1);
                
                return { ...ball, number: ballNumberNext };
            }
        );

        utils.SetInLocalStorage(lclStrgKey, newBalls.map((ball) => { return ball.number; }));

        return newBalls;
    }

    const incrementBallNumberTop = (num, index) =>
    {
        setBallsTop(
            (prev) => setBallsUpdater(prev, index, lclStrgKeyBallsTop)
        );
    };

    const incrementBallNumberMid = (num, index) =>
    {
        setBallsMid(
            (prev) => setBallsUpdater(prev, index, lclStrgKeyBallsMid)
        );
    };

    const incrementBallNumberBottom = (num, index) =>
    {
        setBallsBottom(
            (prev) => setBallsUpdater(prev, index, lclStrgKeyBallsBottom)
        );
    };

    return ( 
        <PageContainer
            navigate = { navigate }
            optionsRightHeaderButtons = { [ optionsHeaderButtons.settings ] }
            style = {{ justifyContent: "space-between", alignItems: "center", rowGap: 10 }}
        >

            <GridPoolBall
                columns = { 5 }
                balls = { ballsTop }
                clickBall = { incrementBallNumberTop }
                width = { globalProps.widthGridPoolBall }
                showBorders
            />

            <ButtonStandard 
                text = "Play"
                sizeText = { 2 }
                isBold
                onPress = { () => { navigate("/gameParams"); } }
                style = {{ ...styles.btnMenu }}
            />

            <GridPoolBall
                columns = { 5 }
                balls = { ballsMid }
                clickBall = { incrementBallNumberMid }
                width = { globalProps.widthGridPoolBall }
                showBorders
            />

            <ButtonStandard 
                text = "How to Play"
                sizeText = { 2 }
                isBold
                onPress = { () => { navigate("/gameInfo"); } }
                style = {{ ...styles.btnMenu }}
            />

            <GridPoolBall
                columns = { 5 }
                balls = { ballsBottom }
                clickBall = { incrementBallNumberBottom }
                width = { globalProps.widthGridPoolBall }
                showBorders
            />
        {/* 
            {
                Array.from({ length: 5 }, () => { return 8 }).map(
                    (num) =>
                    {
                        return <div>num</div>;
                    }
                )
            } */}

        </PageContainer>
    );
}

const styles = 
{
    btnMenu: 
    {
        maxWidth: globalProps.widthGridPoolBall,
        width: window.innerWidth * 0.75,
        borderRadius: globalProps.borderRadiusStandard,
        paddingTop: 10,
        paddingBottom: 10,
        // borderWidth: 1
    }
};

export default Menu;