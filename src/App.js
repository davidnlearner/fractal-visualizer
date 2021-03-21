import './App.css';
import { useRef, useState, useEffect } from 'react';

const drawTree = ({ctx, startX=300, startY=520, edgeLength=120, leftLengthMultiplier=0.75, rightLengthMultiplier=0.75, angle=0, angleIncrement=10, branchWidth=2, mainColor='#4e2b0f', secondaryColor='green', stepCounter=0, branchNumber=2}) => {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = mainColor;
  ctx.fillStyle = secondaryColor;
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI/180);
  ctx.moveTo(0, 0);
  const drawLength = stepCounter === 0? 0 : -edgeLength;
  ctx.lineTo(0, drawLength);
  ctx.stroke();

  stepCounter += 1;
  if (edgeLength < 10 || stepCounter > 4) {
      ctx.restore();
      return;
  } 
  else {
    for (let i = -angleIncrement * (branchNumber-1)/2; i <= angleIncrement * (branchNumber-1)/2; i += angleIncrement) {
      drawTree({ctx, startX: 0, startY: -edgeLength, edgeLength: edgeLength * rightLengthMultiplier, leftLengthMultiplier, rightLengthMultiplier, angle: angle + i, angleIncrement, branchWidth, mainColor, secondaryColor, stepCounter, branchNumber});
    }
    //  drawTree({ctx, startX: 0, startY: -edgeLength, edgeLength: edgeLength * rightLengthMultiplier, leftLengthMultiplier, rightLengthMultiplier, angle: angle + angleIncrement, angleIncrement, branchWidth, mainColor, secondaryColor, stepCounter});
    //  drawTree({ctx, startX: 0, startY: -edgeLength, edgeLength: edgeLength * leftLengthMultiplier, leftLengthMultiplier, rightLengthMultiplier, angle: angle - angleIncrement, angleIncrement, branchWidth, mainColor, secondaryColor, stepCounter});

      ctx.restore();
  }

}


function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [startX, setStartX] = useState(window.innerWidth/2);
  const [startY, setStartY] = useState(window.innerHeight - 80);
  
  const [edgeLength, setEdgeLength] = useState(120);
  const [leftLengthMultiplier, setLeftLengthMultiplier] = useState(0.75);
  const [rightLengthMultiplier, setRightLengthMultiplier] = useState(0.75);
  const [angleIncrement, setAngleIncrement] = useState(5);
  const [branchWidth, setBranchWidth] = useState(2);
  const [mainColor, setMainColor] = useState('#4e2b0f');
  const [branchNumber, setBranchNumber] = useState(2);

  const canvasElement = useRef(null);
  
  useEffect( () => {
    const ctx = canvasElement.current.getContext('2d');

    ctx.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);
    drawTree({ ctx, startX, startY, edgeLength, leftLengthMultiplier, rightLengthMultiplier, angleIncrement: parseInt(angleIncrement), branchWidth, mainColor, branchNumber });

  }, [startX, startY, edgeLength, leftLengthMultiplier, rightLengthMultiplier, angleIncrement, branchWidth, mainColor, branchNumber])


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
        <label htmlFor='left-length-multiplier'>leftLengthMultiplier: {leftLengthMultiplier}</label>
        <input type="range" min="0.25" max="0.95" step="0.05" value={leftLengthMultiplier} 
                onChange={(e) => setLeftLengthMultiplier(e.target.value)} className="slider" 
                id="left-length-multiplier" name='left-length-multiplier'/>
        <label htmlFor='right-length-multiplier'>rightLengthMultiplier: {rightLengthMultiplier}</label>
        <input type="range" min="0.25" max="0.95" step="0.05" value={rightLengthMultiplier} 
                onChange={(e) => setRightLengthMultiplier(e.target.value)} className="slider" 
                id="right-length-multiplier" name='right-length-multiplier'/>
        <label htmlFor='angle-increment'>angleIncrement: {angleIncrement}</label>
        <input type="range" min="1" max="360" value={angleIncrement} 
            onChange={(e) => setAngleIncrement(e.target.value)} className="slider" 
            id="angle-increment-slider" name='angle-increment'/>
        <label htmlFor='branch-width'>branchWidth: {branchWidth}</label>
        <input type="range" min="1" max="10" value={branchWidth} 
            onChange={(e) => setBranchWidth(e.target.value)} className="slider" 
            id="branch-width-slider" name='branch-width'/>
        <label htmlFor='main-color'>mainColor: {mainColor}</label>
        <input type="color" value={mainColor} 
                onChange={(e) => setMainColor(e.target.value)} className="slider" 
                id="main-color-slider" name='main-color'/>
        <label htmlFor='branch-number'>Branch Number: {branchNumber}</label>
        <input type="range" min="2" max="10" value={branchNumber} 
                onChange={(e) => setBranchNumber(e.target.value)} className="slider" 
                id="branch-number-slider" name='branch-number'/>
        

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

