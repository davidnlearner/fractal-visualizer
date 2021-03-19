import logo from './logo.svg';
import './App.css';
import { useRef, useState, useEffect } from 'react';

const drawTree = ({ctx, startX=300, startY=520, edgeLength=120, lengthMulitplier=0.75, angle=0, angleIncrement=5, branchWidth=2, mainColor='rgb(78, 43, 15)', secondaryColor='green'}) => {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = mainColor;
  ctx.fillStyle = secondaryColor;
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI/180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -edgeLength);
  ctx.stroke();

  if (edgeLength < 10) {
      ctx.restore();
      return;
  } 
  else {
      drawTree({ctx, startX: 0, startY: -edgeLength, edgeLength: edgeLength * 0.75, lengthMulitplier, angle: angle + angleIncrement, angleIncrement, branchWidth, mainColor, secondaryColor});
      drawTree({ctx, startX: 0, startY: -edgeLength, edgeLength: edgeLength * 0.75, lengthMulitplier, angle: angle - angleIncrement, angleIncrement, branchWidth, mainColor, secondaryColor});

      ctx.restore();
  }

}


function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [startX, setStartX] = useState(window.innerWidth/2);
  const [startY, setStartY] = useState(window.innerHeight - 80);
  
  const [edgeLength, setEdgeLength] = useState(120);
  const [branchWidth, setBranchWidth] = useState(2);
  const [mainColor, setMainColor] = useState('#4e2b0f');

  const canvasElement = useRef(null);
  
  useEffect( () => {
    const ctx = canvasElement.current.getContext('2d');

    ctx.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);
    drawTree({ ctx, startX, startY, edgeLength, branchWidth, mainColor });

  }, [startX, startY, edgeLength, branchWidth, mainColor])


  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setStartX(window.innerWidth/2);
    setStartY(window.innerHeight - 80);
  });

  return (
    <div>
      <div className="slide-container">
        <label htmlFor='edge-length'>{edgeLength}</label>
        <input type="range" min="50" max="300" value={edgeLength} 
            onChange={(e) => setEdgeLength(e.target.value)} className="slider" id="edge-length-slider" name='edge-length'/>
        <label htmlFor='branch-width'>{branchWidth}</label>
        <input type="range" min="1" max="10" value={branchWidth} 
            onChange={(e) => setBranchWidth(e.target.value)} className="slider" id="branch-width-slider" name='branch-width'/>
        <label htmlFor='main-color'>{mainColor}</label>
        <input type="color" value={mainColor} 
                onChange={(e) => setMainColor(e.target.value)} className="slider" id="main-color-slider" name='main-color'/>
        

      </div>
      <div className="canvas-wrapper">
        <canvas width={width} height={height} ref={canvasElement}></canvas>
        <button className="generate-tree-button" onClick={() => drawTree({ ctx: canvasElement.current.getContext('2d'), startX, startY, edgeLength, branchWidth, mainColor })}>
          Generate Random Tree
        </button>
      </div>
    </div> 
  );
}

export default App;

