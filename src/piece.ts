import { IHex, Hex } from "./hex";

export type PieceColor = "r1" | "r2" | "y1" | "y2" | "l1" | "l2" | "glade";

export interface IPiece {
  id: number;
  rotation: number;
  colorList: PieceColor[];
}

export interface IFruit {
  score: number;
  color: PieceColor;
}

export interface IPlacedPiece extends IPiece {
  position: IHex;
}

export const PieceSet: IPiece[] = [
  {
    id: 1,
    rotation: 0,
    colorList: ["glade", "y2", "l1", "r2", "r1", "l1", "glade"],
  },
  {
    id: 2,
    rotation: 0,
    colorList: ["r1", "l2", "glade", "l1", "y2", "r1", "glade"],
  },
  {
    id: 3,
    rotation: 0,
    colorList: ["r2", "r1", "glade", "l2", "y1", "y1", "glade"],
  },
];

// For debug
export function getFillClass(pieceColor: PieceColor): string {
  let fill = "fill-gray-400";
  if (pieceColor.charAt(0) === "r") {
    fill = "fill-red-400";
  } else if (pieceColor.charAt(0) === "y") {
    fill = "fill-amber-400";
  } else if (pieceColor.charAt(0) === "l") {
    fill = "fill-lime-400";
  }

  return fill;
}

export function isInRange(
  newPiece: IPlacedPiece,
  existing: IPlacedPiece[]
): boolean {
  for (let i = 0; i < existing.length; i++) {
    if (Hex.distance(newPiece.position, existing[i].position) < 3) {
      return true;
    }
  }

  return false;
}

export function getFruitMapping(
  pieces: IPlacedPiece[]
): Record<string, IFruit> {
  const ret: Record<string, IFruit> = {};
  pieces.forEach((p) => {
    const centerPos = p.position;

    p.colorList.forEach((color, idx) => {
      const hexPos = Hex.add(centerPos, Hex.at(idx, p.rotation));
      const hexStr = Hex.toStr(hexPos);

      if (ret[hexStr]) {
        const fruit = ret[hexStr];
        if (
          fruit.color !== "glade" &&
          fruit.color.charAt(0) === color.charAt(0)
        ) {
          const baseNum =
            fruit.score === 0 ? Number(fruit.color.charAt(1)) : fruit.score;
          fruit.score += Number(color.charAt(1));
        } else {
          // Different fruit or glade in previous slot
          ret[hexStr] = {
            score: 0,
            color,
          };
        }
      } else {
        // No previous fruit
        ret[hexStr] = {
          score: 0,
          color,
        };
      }
    });
  });

  return ret;
}
