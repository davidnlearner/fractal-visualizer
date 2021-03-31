import { useContext } from 'react';
import { FractalContext } from "../FractalContext";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const ControlPanel = () => {
    const context = useContext(FractalContext);

    const fractals = ['tree', 'snowflake'];

    return (
        <div className="slide-container">
            <label htmlFor='fractal-type'>Fractal type:</label>
            <Dropdown options={fractals} onChange={(e) => context.setFractalType(e.value)} 
                value={context.fractalType} id='fractal-type-dropdown' name='fractal-type'/>

            <label htmlFor='main-color'>mainColor: {context.mainColor}</label>
            <input type="color" value={context.mainColor}
                onChange={(e) => context.setMainColor(e.target.value)} className="slider"
                id="main-color-slider" name='main-color' />
            <label htmlFor='edge-length'>edgeLength: {context.edgeLength}</label>
            <input type="range" min="50" max="300" value={context.edgeLength}
                onChange={(e) => context.setEdgeLength(e.target.value)} className="slider"
                id="edge-length-slider" name='edge-length' />
            <label htmlFor='line-width'>Line Width: {context.lineWidth}</label>
            <input type="range" min="1" max="30" value={context.lineWidth}
                onChange={(e) => context.setLineWidth(e.target.value)} className="slider"
                id="line-width-slider" name='line-width' />
            <label htmlFor='limit'>Recursions: {context.limit}</label>
            <input type="range" min="0" max="6" value={context.limit}
                onChange={(e) => context.setLimit(e.target.value)} className="slider"
                id="limit-slider" name='limit' />

            { context.fractalType === 'tree' &&
                <>
                    <label htmlFor='left-length-multiplier'>leftLengthMultiplier: {context.leftLengthMultiplier}</label>
                    <input type="range" min="0.25" max="0.95" step="0.05" value={context.leftLengthMultiplier}
                        onChange={(e) => context.setLeftLengthMultiplier(e.target.value)} className="slider"
                        id="left-length-multiplier" name='left-length-multiplier' />
                    <label htmlFor='right-length-multiplier'>rightLengthMultiplier: {context.rightLengthMultiplier}</label>
                    <input type="range" min="0.25" max="0.95" step="0.05" value={context.rightLengthMultiplier}
                        onChange={(e) => context.setRightLengthMultiplier(e.target.value)} className="slider"
                        id="right-length-multiplier" name='right-length-multiplier' />
                    <label htmlFor='angle-increment'>angleIncrement: {context.angleIncrement}</label>
                    <input type="range" min="1" max="180" value={context.angleIncrement}
                        onChange={(e) => context.setAngleIncrement(e.target.value)} className="slider"
                        id="angle-increment-slider" name='angle-increment' />
                    
                </>
            }



        </div>

    )
}

export default ControlPanel;


/**
 <label htmlFor='drawX'>draw X: {context.drawX}</label>
 <input type="range" min="-800" max="800" value={context.drawX}
     onChange={(e) => context.setDrawX(e.target.value)} className="slider"
     id="drawX-slider" name='drawX' />

 <label htmlFor='drawY'>draw Y: {context.drawY}</label>
 <input type="range" min="-800" max="800" value={context.drawY}
     onChange={(e) => context.setDrawY(e.target.value)} className="slider"
     id="drawY-slider" name='drawY' />
 */