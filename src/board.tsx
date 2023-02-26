import { useContext } from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/web";
import bgioContext from "./bgio_context";
import { getFruitMapping, getFillClass, getStrokeClass, IFruit } from "./piece";
import { Hex, hexMap, hexOrigin } from "./hex";
import Citrus from "./citrus";

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
    <div className="h-screen overflow-hidden bg-stone-600">
      <svg
        className="w-full h-full touch-none"
        xmlns="http://www.w3.org/2000/svg"
        {...bind()}
      >
        <animated.g style={{ x, y }}>
          {hexMap.map((hex) => {
            const center = Hex.toPixel(hex);
            const translateX = center.x + innerWidth * 0.5;
            const translateY = center.y + innerHeight * 0.5 - 200;
            const corners = Hex.polygonCorners(hexOrigin);
            const points: string[] = [];
            corners.forEach((point) => {
              points.push(`${point.x},${point.y}`);
            });
            let scoreText = "";
            const fruit: IFruit | undefined = fruitMap[Hex.toStr(hex)];
            if (fruit) {
              if (fruit.score > 0) {
                scoreText = fruit.score.toString();
              }
            }

            return (
              <g
                transform={`translate(${translateX},${translateY})`}
                key={Hex.toStr(hex)}
              >
                <polygon
                  data-key={Hex.toStr(hex)}
                  points={points.join(" ")}
                  className={`fill-transparent slot stroke-gray-300`}
                />
                {fruit && !scoreText && <Citrus color={fruit.color} />}
                {fruit && scoreText && (
                  <rect
                    x={-12}
                    y={-12}
                    width={24}
                    height={24}
                    rx={4}
                    className={`fill-transparent ${getStrokeClass(
                      fruit.color
                    )}`}
                  />
                )}
                {fruit && (
                  <text
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className={`${getFillClass(fruit.color)}`}
                  >
                    {scoreText}
                  </text>
                )}
              </g>
            );
          })}
        </animated.g>
      </svg>
    </div>
  );
};

export default Board;
