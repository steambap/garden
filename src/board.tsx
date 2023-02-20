import { useContext, useEffect, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/web";
import bgioContext from "./bgio_context";
import { getFillClass, getFruitMapping } from "./piece";
import { Hex, hexMap } from "./hex";

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

const Board = () => {
  const { G } = useContext(bgioContext)!;
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));
  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, offset: [mx, my] }) => {
    api.start({ x: mx, y: my, immediate: down });
  });
  const fruitMap = getFruitMapping(G.topPiece);

  return (
    <div className="h-screen overflow-hidden">
      <animated.div
        className="touch-none p-8 relative"
        {...bind()}
        style={{ x, y }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-480 -480 960 960" width="960" height="960">
          {hexMap.map((hex) => {
            const corners = Hex.polygonCorners(hex);
            const points: string[] = [];
            corners.forEach((point) => {
              points.push(`${point.x},${point.y}`);
            });
            let fill = "fill-transparent";
            if (fruitMap[Hex.toStr(hex)]) {
              const fruit = fruitMap[Hex.toStr(hex)];
              fill = getFillClass(fruit.color);
            }

            return (
              <polygon
                key={Hex.toStr(hex)}
                data-key={Hex.toStr(hex)}
                points={points.join(" ")}
                className={`${fill} slot`}
                stroke="black"
              />
            );
          })}
        </svg>
      </animated.div>
    </div>
  );
};

export default Board;
