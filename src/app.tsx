import { useEffect, useRef } from "react";
import Konva from "konva";
import { Stage, Layer, RegularPolygon } from "react-konva";
import HUD from "./hud";

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

function App() {
  const stage = useRef<Konva.Stage | null>(null);
  useEffect(() => {
    stage.current?.to({
      x: innerWidth * 0.5,
      y: innerHeight * 0.5,
    });
  }, []);

  return (
    <div className="App">
      <Stage
        draggable
        width={innerWidth}
        height={innerHeight}
        ref={stage}
      >
        <Layer>
          <RegularPolygon sides={6} radius={24} fill="#7f7f7f" stroke="black" />
        </Layer>
      </Stage>
      <HUD />
    </div>
  );
}

export default App;
