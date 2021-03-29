import { useRef, useState, useEffect, useContext } from 'react';
import { FractalContext } from "../FractalContext";


const drawTree = ({ ctx, startX = 300, startY = 520, edgeLength = 120, leftLengthMultiplier = 0.75, rightLengthMultiplier = 0.75, angle = 0, angleIncrement = 10, lineWidth = 2, mainColor = '#4e2b0f', secondaryColor = 'green', stepCounter = 0, branchNumber = 2 }) => {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = mainColor;
  ctx.fillStyle = secondaryColor;
  ctx.lineWidth = lineWidth;
  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI / 180);
  ctx.moveTo(0, 0);
  const drawLength = stepCounter === 0 ? 0 : -edgeLength;
  ctx.lineTo(0, drawLength);
  ctx.stroke();

  stepCounter += 1;

  if (edgeLength < 10 || stepCounter > 8) {
    ctx.restore();
    return;
  }
  else {
    for (let i = -angleIncrement * (branchNumber - 1) / 2; i <= angleIncrement * (branchNumber - 1) / 2; i += angleIncrement) {
      drawTree({ ctx, startX: 0, startY: -edgeLength, edgeLength: edgeLength * rightLengthMultiplier, leftLengthMultiplier, rightLengthMultiplier, angle: angle + i, angleIncrement, lineWidth, mainColor, secondaryColor, stepCounter });
      //drawTree({ctx, startX: 0, startY: -edgeLength, edgeLength: edgeLength * leftLengthMultiplier, leftLengthMultiplier, rightLengthMultiplier, angle: angle - i, angleIncrement, lineWidth, mainColor, secondaryColor, stepCounter});
    }
    ctx.restore();
  }

}


function HTree() {
  /*
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [startX, setStartX] = useState(window.innerWidth/2);
  const [startY, setStartY] = useState(window.innerHeight - 80);
  
  const [edgeLength, setEdgeLength] = useState(120);
  const [leftLengthMultiplier, setLeftLengthMultiplier] = useState(0.75);
  const [rightLengthMultiplier, setRightLengthMultiplier] = useState(0.75);
  const [angleIncrement, setAngleIncrement] = useState(5);
  const [lineWidth, setlineWidth] = useState(2);
  const [mainColor, setMainColor] = useState('#4e2b0f');
  const [branchNumber, setBranchNumber] = useState(2);
  */

  const canvasElement = useRef(null);

  const { width, height, startX, startY, edgeLength, leftLengthMultiplier,
    rightLengthMultiplier, angleIncrement, lineWidth,
    mainColor, branchNumber } = useContext(FractalContext);

  useEffect(() => {
    const ctx = canvasElement.current.getContext('2d');

    ctx.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);
    drawTree({ ctx, startX, startY, edgeLength, leftLengthMultiplier, rightLengthMultiplier, angleIncrement: parseInt(angleIncrement), lineWidth, mainColor, branchNumber });

  }, [startX, startY, edgeLength, leftLengthMultiplier, rightLengthMultiplier, angleIncrement, lineWidth, mainColor, branchNumber])


  return (

    <div className="canvas-wrapper">
      <canvas width={width} height={height} ref={canvasElement}></canvas>
      <button className="generate-tree-button" onClick={() => drawTree({ ctx: canvasElement.current.getContext('2d'), startX, startY, edgeLength, lineWidth, mainColor })}>
        Generate Random Tree
        </button>
    </div>
  );
}

export default HTree;