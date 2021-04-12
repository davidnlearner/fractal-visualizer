import { useContext } from 'react';
import { FractalContext } from "../FractalContext";

const randomInRange = (min, max, isInt) => {
    let range = max - min;
    let randomValue = Math.random() * range + min;
    return isInt ? Math.round(randomValue) : Math.round(randomValue * 100) / 100;
}

const randomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

const randomize = (context) => {    
    context.setEdgeLength(randomInRange(50, context.fractalType === 'tree' ? 200 : 350, true));
    context.setLineWidth(randomInRange(1, 30, true));
    context.setMainColor(randomColor());
    context.setSecondaryColor(randomColor());
    context.setLeftLengthMultiplier(randomInRange(0.25, 0.95, false));
    context.setRightLengthMultiplier(randomInRange(0.25, 0.95, false));
    context.setAngleIncrement(randomInRange(1, 45, true));
    context.setLimit(randomInRange(0, 6, true));
    
}

function RandomButton() {
    const context = useContext(FractalContext);

    return (
        <button className="randomize-button" onClick={() => randomize(context)}>
            Randomize
        </button>
    )
}

export default RandomButton;