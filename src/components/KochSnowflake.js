import { useRef, useEffect, useContext } from 'react';
import { FractalContext } from "../FractalContext"

//https://gist.github.com/BrianDGLS/cb2809febca2cb33a701781be041583f

const drawSnowflake = ({ ctx, startPoint, endPoint, lineWidth = 2, mainColor = '#4e2b0f', secondaryColor = 'green', limit = 1 }) => {

  //a = start point   b = end point
  let [dx, dy] = [endPoint.x - startPoint.x, endPoint.y - startPoint.y]
  let dist = Math.sqrt(dx * dx + dy * dy)
  let unit = dist / 3
  let angle = Math.atan2(dy, dx)

  //This will be the triangular shape that makes the 'points' on the snowflake
  let p1 = {
    x: startPoint.x + dx / 3,
    y: startPoint.y + dy / 3
  }

  let p3 = {
    x: endPoint.x - dx / 3,
    y: endPoint.y - dy / 3
  }

  let p2 = {
    x: p1.x + Math.cos(angle - Math.PI / 3) * unit,
    y: p1.y + Math.sin(angle - Math.PI / 3) * unit
  }

  if (limit > 0) {
    // Decrease limit each time it's called
    limit -= 1;
    drawSnowflake({ctx, startPoint, endPoint: p1, lineWidth, mainColor, secondaryColor, limit});
    drawSnowflake({ctx, startPoint: p1, endPoint: p2, lineWidth, mainColor, secondaryColor, limit});
    drawSnowflake({ctx, startPoint: p2, endPoint: p3, lineWidth, mainColor, secondaryColor, limit});
    drawSnowflake({ctx, startPoint: p3, endPoint, lineWidth, mainColor, secondaryColor, limit});
  } else {
    ctx.beginPath()
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.lineTo(p3.x, p3.y)
    ctx.lineTo(endPoint.x, endPoint.y)
    ctx.stroke()
  }
}

function KochSnowflake() {
  const canvasElement = useRef(null);

  
  const { width, height, startX, startY, edgeLength, lineWidth,
    mainColor, limit } = useContext(FractalContext);
  

  let startingPoints = {
    p1: {
      x: 0,
      y: -edgeLength
    },
    p2: {
      x: edgeLength,
      y: 2 * edgeLength / 3
    },
    p3: {
      x: - edgeLength,
      y: 2 * edgeLength / 3
    }
  }


  useEffect(() => {
    const ctx = canvasElement.current.getContext('2d');
    
    const bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
                    };

    startingPoints = {
      p1: {
        x: 0,
        y: - edgeLength
      },
      p2: {
        x: edgeLength,
        y: 2 * edgeLength / 3
      },
      p3: {
        x: -edgeLength,
        y: 2 * edgeLength / 3
      }
    }

    ctx.restore();
    ctx.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = mainColor;
    //ctx.fillStyle = secondaryColor;
    ctx.lineWidth = lineWidth;
    ctx.translate(startX, startY);
    ctx.moveTo(0, 0);

    drawSnowflake({ctx, startPoint: startingPoints.p1, endPoint: startingPoints.p2, lineWidth, mainColor, limit})
    drawSnowflake({ctx, startPoint: startingPoints.p2, endPoint: startingPoints.p3, lineWidth, mainColor, limit})
    drawSnowflake({ctx, startPoint: startingPoints.p3, endPoint: startingPoints.p1, lineWidth, mainColor, limit})

  }, [startX, startY, edgeLength, lineWidth, mainColor, limit])

  return (
    <div className="canvas-wrapper">
      <canvas width={width} height={height} ref={canvasElement}></canvas>
    </div>
  );
}

export default KochSnowflake;

//style={{backgroundColor: '#'+(Math.random()*0xFFFFFF<<0).toString(16)}}