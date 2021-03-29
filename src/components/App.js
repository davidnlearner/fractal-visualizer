import '../App.css';
import { useState } from 'react';

import HTree from "./HTree";
import KochSnowflake from "./KochSnowflake";
import ControlPanel from "./ControlPanel";
import { FractalContext } from "../FractalContext";

const App = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [startX, setStartX] = useState(window.innerWidth/3);
    const [startY, setStartY] = useState(window.innerHeight/2);

    const [drawX, setDrawX] = useState(window.innerWidth/3);
    const [drawY, setDrawY] = useState(window.innerHeight/2);

    const [edgeLength, setEdgeLength] = useState(120);
    const [leftLengthMultiplier, setLeftLengthMultiplier] = useState(0.75);
    const [rightLengthMultiplier, setRightLengthMultiplier] = useState(0.75);
    const [angleIncrement, setAngleIncrement] = useState(5);
    const [lineWidth, setLineWidth] = useState(2);
    const [mainColor, setMainColor] = useState('#4e2b0f');
    const [branchNumber, setBranchNumber] = useState(2);


    
    window.addEventListener('resize', () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        setStartX(window.innerWidth/2);
        setStartY(window.innerHeight - 80);  //when screen resized it works for snowflake at -800 

    });

    let mode = "not tree"

    return (
        <div>
            <FractalContext.Provider value={{width, height, startX, startY, edgeLength, leftLengthMultiplier, 
                rightLengthMultiplier, angleIncrement, lineWidth, mainColor, branchNumber, drawX, drawY,
                setEdgeLength, setLeftLengthMultiplier, setRightLengthMultiplier, setAngleIncrement, 
                setLineWidth, setMainColor, setBranchNumber }}>
                <ControlPanel />
                { mode === 'tree' ? <HTree /> : <KochSnowflake />}
            </FractalContext.Provider>
        </div>
    )
}

export default App;