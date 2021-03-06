import { useRef, useEffect, useContext } from 'react';
import { FractalContext } from "../FractalContext";

const drawTree = ({ ctx, startX = 300, startY = 220, edgeLength = 120, leftLengthMultiplier = 0.75, rightLengthMultiplier = 0.75, angle = 0, angleIncrement = 10, lineWidth = 2, mainColor = '#4e2b0f', secondaryColor = 'green', limit = 8, branchNumber = 2 }) => {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = mainColor;
  ctx.fillStyle = secondaryColor;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.shadowBlur = 2;
  ctx.shadowColor = 'white';
  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI / 180);
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -edgeLength / 2, 0, -edgeLength / 2, 0, -edgeLength)
  //const drawLength = stepCounter === 0 ? 0 : -edgeLength;
  ctx.lineTo(0, -edgeLength);
  ctx.stroke();

  if (edgeLength < 10 || limit === 0) {
    ctx.beginPath();
    ctx.arc(0, -edgeLength, 10, 0, Math.PI / 2);
    ctx.fill();
    ctx.restore();
    return;
  }
  else {
    limit -= 1;
    drawTree({ ctx, startX: 0, startY: -edgeLength, edgeLength: edgeLength * rightLengthMultiplier, leftLengthMultiplier, rightLengthMultiplier, angle: angle + angleIncrement, angleIncrement, lineWidth: lineWidth * 0.5, mainColor, secondaryColor, limit });
    drawTree({ ctx, startX: 0, startY: -edgeLength, edgeLength: edgeLength * leftLengthMultiplier, leftLengthMultiplier, rightLengthMultiplier, angle: angle - angleIncrement, angleIncrement, lineWidth: lineWidth * 0.5, mainColor, secondaryColor, limit });
  }
  ctx.restore();
}



function HTree() {
  const canvasElement = useRef(null);

  const { width, height, startX, startY, edgeLength, leftLengthMultiplier,
    rightLengthMultiplier, angleIncrement, lineWidth,
    mainColor, secondaryColor, backgroundColor } = useContext(FractalContext);

  useEffect(() => {
    const ctx = canvasElement.current.getContext('2d');

    ctx.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);
    drawTree({ ctx, startX, startY, edgeLength, leftLengthMultiplier, rightLengthMultiplier, angleIncrement: parseInt(angleIncrement), lineWidth, mainColor, secondaryColor });

  }, [startX, startY, edgeLength, leftLengthMultiplier, rightLengthMultiplier, angleIncrement, lineWidth, mainColor, secondaryColor])

  useEffect(() => {
      canvasElement.current.style.backgroundColor = backgroundColor;
  }, [backgroundColor])

  return (

    <div className="canvas-wrapper">
      <canvas width={width} height={height} ref={canvasElement}></canvas>
    </div>
  );
}

export default HTree;