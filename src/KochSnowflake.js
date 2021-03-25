import './App.css';
import { useRef, useState, useEffect } from 'react';

const drawSnowflake = ({ctx, startX=200, startY=520, edgeLength=120, angle=0, lineWidth=2, mainColor='#4e2b0f', secondaryColor='green', stepCounter=0}) => {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = mainColor;
  ctx.fillStyle = secondaryColor;
  ctx.lineWidth = lineWidth;
  ctx.translate(startX, startY);
  ctx.moveTo(0, 0);
  ctx.rotate(angle * Math.PI/180);

  if (edgeLength < 18 || stepCounter > 2) {
    ctx.lineTo(edgeLength / 3, 0);
    ctx.stroke();
    ctx.restore();
    return;
  }
  //ctx.lineTo(edgeLength/3, 0);
  drawSnowflake({ ctx, startX, startY, edgeLength: edgeLength / 3, angle, lineWidth, mainColor, secondaryColor, stepCounter });

  ctx.translate(edgeLength/3, 0);
  ctx.rotate(angle + 60 * Math.PI/180);
  //ctx.lineTo(edgeLength/3, 0);
  drawSnowflake({ ctx, startX, startY, edgeLength: edgeLength / 3, angle, lineWidth, mainColor, secondaryColor, stepCounter });

  ctx.translate(edgeLength/3, 0);
  ctx.rotate(angle - 120 * Math.PI/180);
  //ctx.lineTo(edgeLength/3, 0);
  drawSnowflake({ ctx, startX, startY, edgeLength: edgeLength / 3, angle, lineWidth, mainColor, secondaryColor, stepCounter });


  ctx.translate(edgeLength/3, 0);
  ctx.rotate(angle + 60 * Math.PI/180);
  //ctx.lineTo(edgeLength/3, 0);
  drawSnowflake({ ctx, startX, startY, edgeLength: edgeLength / 3, angle, lineWidth, mainColor, secondaryColor, stepCounter });

  ctx.stroke();
  ctx.restore();
  stepCounter += 1;

}


function Snowflake() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [startX, setStartX] = useState(window.innerWidth/2);
  const [startY, setStartY] = useState(window.innerHeight - 200);
  
  const [edgeLength, setEdgeLength] = useState(120);
  const [lineWidth, setlineWidth] = useState(2);
  const [mainColor, setMainColor] = useState('#4e2b0f');

  const canvasElement = useRef(null);
  
  useEffect( () => {
    const ctx = canvasElement.current.getContext('2d');

    ctx.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);
    drawSnowflake({ ctx, startX: startX - edgeLength, startY, edgeLength, lineWidth, mainColor });
    //drawSnowflake({ctx, startX, startY, angle: angle - 150, lineWidth, mainColor})
    //drawSnowflake({ctx, startX: startX - edgeLength, startY, edgeLength, angle: angle - 60, lineWidth, mainColor})

  }, [startX, startY, edgeLength, lineWidth, mainColor])


  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setStartX(window.innerWidth/2);
    setStartY(window.innerHeight - 80);
  });

  return (
    <div>
      <div className="slide-container">
        <label htmlFor='edge-length'>edgeLength: {edgeLength}</label>
        <input type="range" min="50" max="300" value={edgeLength} 
            onChange={(e) => setEdgeLength(e.target.value)} className="slider" 
            id="edge-length-slider" name='edge-length'/>
        <label htmlFor='line-width'>lineWidth: {lineWidth}</label>
        <input type="range" min="1" max="10" value={lineWidth} 
            onChange={(e) => setlineWidth(e.target.value)} className="slider" 
            id="branch-width-slider" name='branch-width'/>
        <label htmlFor='main-color'>mainColor: {mainColor}</label>
        <input type="color" value={mainColor} 
                onChange={(e) => setMainColor(e.target.value)} className="slider"
                id="main-color-slider" name='main-color'/>
        
      </div>
      <div className="canvas-wrapper">
        <canvas width={width} height={height} ref={canvasElement}></canvas>
        <button className="generate-tree-button" onClick={() => drawSnowflake({ ctx: canvasElement.current.getContext('2d'), startX, startY, edgeLength, lineWidth, mainColor })}>
          Generate Random Fractal
        </button>
      </div>
    </div> 
  );
}

export default Snowflake;