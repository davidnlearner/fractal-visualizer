import { useContext } from 'react';
import { FractalContext } from "../FractalContext";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Control from './Control';

const ControlPanel = () => {
    const context = useContext(FractalContext);

    const fractals = ['tree', 'snowflake'];

    return (
        <div className="slide-container">
            <label htmlFor='fractal-type'>Fractal type:</label>
            <Dropdown options={fractals} onChange={(e) => context.setFractalType(e.value)} 
                value={context.fractalType} id='fractal-type-dropdown' name='fractal-type'/>

            <Control componentId='main-color' label='Main Color' value={context.mainColor} changeFunction={context.setMainColor} controlType="color" />
            <Control componentId='secondary-color' label='Secondary Color' value={context.secondaryColor} changeFunction={context.setSecondaryColor} controlType="color" />
            <Control componentId='edge-length' label='Edge Length' value={context.edgeLength} changeFunction={context.setEdgeLength} controlType="range" min='50' max='300' step='1' />
            <Control componentId='line-width' label='Line Width' value={context.lineWidth} changeFunction={context.setLineWidth} controlType="range" min='1' max='30' step='1' />
            <Control componentId='limit' label='Recursions' value={context.limit} changeFunction={context.setLimit} controlType="range" min='0' max='6' step='1' fractalTypes={['snowflake']}/>
            <Control componentId='left-length-multiplier' label='Left Length Multiplier' value={context.leftLengthMultiplier} changeFunction={context.setLeftLengthMultiplier} controlType="range" min='0.25' max='0.95' step='0.05' fractalTypes={['tree']}/>
            <Control componentId='right-length-multiplier' label='Right Length Multiplier' value={context.rightLengthMultiplier} changeFunction={context.setRightLengthMultiplier} controlType="range" min='0.25' max='0.95' step='0.05' fractalTypes={['tree']}/>
            <Control componentId='angle-increment' label='Angle Increment' value={context.angleIncrement} changeFunction={context.setAngleIncrement} controlType="range" min='1' max='45' step='1' fractalTypes={['tree']}/>

        </div>

    )
}

export default ControlPanel;


/**
 <Control componentId='secondary-color' label='Secondary Color' value= changeFunction, controlType, min=undefined, max=undefined />

 */