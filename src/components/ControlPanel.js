import { useContext } from 'react';
import { FractalContext } from "../FractalContext";

const ControlPanel = () => {
    const mode = " not tree";

    const context = useContext(FractalContext);

    return (
        <div className="slide-container">

            <label htmlFor='main-color'>mainColor: {context.mainColor}</label>
            <input type="color" value={context.mainColor}
                onChange={(e) => context.setMainColor(e.target.value)} className="slider"
                id="main-color-slider" name='main-color' />
            <label htmlFor='edge-length'>edgeLength: {context.edgeLength}</label>
            <input type="range" min="50" max="300" value={context.edgeLength}
                onChange={(e) => context.setEdgeLength(e.target.value)} className="slider"
                id="edge-length-slider" name='edge-length' />
            <label htmlFor='line-width'>Line Width: {context.lineWidth}</label>
            <input type="range" min="1" max="10" value={context.lineWidth}
                onChange={(e) => context.setLineWidth(e.target.value)} className="slider"
                id="line-width-slider" name='line-width' />

            { mode === 'tree' &&
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
    
                <label htmlFor='branch-number'>Branch Number: {context.branchNumber}</label>
                <input type="range" min="2" max="10" value={context.branchNumber}
                    onChange={(e) => context.setBranchNumber(e.target.value)} className="slider"
                    id="branch-number-slider" name='branch-number' />
                </>
            }

           

        </div>

    )
}

export default ControlPanel;