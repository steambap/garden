import { useContext } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { IPiece, IPlacedPiece } from "./piece";
import { getFillClass } from "./piece";
import { Hex } from "./hex";
import bgioContext from "./bgio_context";
import hudContext from "./hud_context";

interface props {
  p: IPiece;
}

const HandPiece = ({ p }: props) => {
  const { moves } = useContext(bgioContext)!;
  const { rotation } = useContext(hudContext);
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));
  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my], xy }) => {
    if (down) {
      api.start({ x: mx, y: my, immediate: true });
    } else {
      const nodes = document.elementsFromPoint(xy[0], xy[1]);
      const polygon = nodes.find((n) => n.classList.contains("slot"));
      if (polygon) {
        const data = (polygon.getAttribute("data-key") || "")
          .split(",")
          .map(Number);
        const newPiece: IPlacedPiece = {
          ...p,
          rotation,
          position: Hex.from(data[0], data[1], data[2]),
        };
        moves.addPiece(newPiece);
      }
      api.start({ x: 0, y: 0, immediate: false });
    }
  });

  return (
    <animated.svg
      {...bind()}
      style={{ x, y }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-72 -72 144 144"
      width="144"
      height="144"
      className="touch-none"
    >
      {p.colorList.map((color, idx) => {
        const hexPos = Hex.at(idx, rotation);
        const corners = Hex.polygonCorners(hexPos);
        const points: string[] = [];
        const fill = getFillClass(color);
        corners.forEach((point) => {
          points.push(`${point.x},${point.y}`);
        });

        return (
          <polygon
            key={idx}
            points={points.join(" ")}
            className={fill}
            stroke="black"
          />
        );
      })}
    </animated.svg>
  );
};

export default HandPiece;
