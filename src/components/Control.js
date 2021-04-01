import { tree } from 'd3-hierarchy';
import { useEffect, useContext } from 'react';
import { FractalContext } from "../FractalContext";

const Control = ({componentId, label, value, changeFunction, controlType, min=undefined, max=undefined, step=undefined, fractalTypes=['tree', 'snowflake'] }) => {
    const {fractalType} = useContext(FractalContext);
    const show = fractalTypes.includes(fractalType) ? 'block' : 'none';
    return (
        <div className="slider" style={{display: show}}>
            <label htmlFor={componentId}>{label}: {value}</label>
            <input type={controlType} min={min} max={max} step={step} value={value}
                onChange={(e) => changeFunction(e.target.value)}
                id={`${componentId}-slider`} name={componentId} className='control'/>
        </div>
    )

}

export default Control;