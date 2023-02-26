import { IHex, Hex } from "./hex";

export type PieceColor = "r1" | "r2" | "y1" | "y2" | "l1" | "l2" | "glade";

export function isSameColor(a: PieceColor, b: PieceColor): boolean {
  return a.charAt(0) === b.charAt(0);
}

export interface IPiece {
  id: number;
  colorList: PieceColor[];
}

export interface IFruit {
  score: number;
  color: PieceColor;
}

function stack(f: IFruit, color: PieceColor): number {
  if (!isSameColor(f.color, color)) {
    throw new Error("cannot stack different fruit");
  }
  const baseNum = f.score === 0 ? Number(f.color.charAt(1)) : f.score;
  const newScore = Number(color.charAt(1));
  if (baseNum >= 10) {
    return 15;
  } else if (baseNum >= 6) {
    return 10;
  } else if (baseNum >= 5) {
    return newScore === 2 ? 10 : 6;
  } else {
    return baseNum + newScore;
  }
}

export interface IPlacedPiece extends IPiece {
  rotation: number;
  position: IHex;
}

export const PieceSet: IPiece[] = [
  {
    id: 1,
    colorList: ["glade", "y2", "l1", "r2", "r1", "l1", "glade"],
  },
  {
    id: 2,
    colorList: ["r1", "l2", "glade", "l1", "y2", "r1", "glade"],
  },
  {
    id: 3,
    colorList: ["r2", "r1", "glade", "l2", "y1", "y1", "glade"],
  },
  {
    id: 4,
    colorList: ["y1", "glade", "y1", "l1", "r2", "l2", "glade"],
  },
  {
    id: 5,
    colorList: ["y1", "r2", "glade", "r1", "l2", "y1", "glade"],
  },
  {
    id: 6,
    colorList: ["r1", "l2", "r1", "glade", "y2", "l1", "glade"],
  },
  {
    id: 7,
    colorList: ["l1", "glade", "r2", "y2", "l1", "r1", "glade"],
  },
  {
    id: 8,
    colorList: ["l1", "y2", "glade", "y1", "r2", "l1", "glade"],
  },
  {
    id: 9,
    colorList: ["glade", "r2", "y1", "l2", "l1", "y1", "glade"],
  },
  {
    id: 10,
    colorList: ["glade", "r2", "y1", "l1", "y2", "l1", "glade"],
  },
  {
    id: 11,
    colorList: ["r2", "l1", "l1", "y2", "y1", "glade", "glade"],
  },
  {
    id: 12,
    colorList: ["r1", "y2", "r2", "l1", "glade", "l1", "glade"],
  },
  {
    id: 13,
    colorList: ["r1", "glade", "y2", "l2", "r1", "y1", "glade"],
  },
  {
    id: 14,
    colorList: ["r2", "y1", "l1", "y1", "glade", "l2", "glade"],
  },
  {
    id: 15,
    colorList: ["y1", "l2", "y2", "r1", "glade", "r1", "glade"],
  },
  {
    id: 16,
    colorList: ["y1", "r2", "y1", "glade", "l2", "r1", "glade"],
  },
  {
    id: 17,
    colorList: ["y2", "r1", "r1", "l2", "l1", "glade", "glade"],
  },
  {
    id: 18,
    colorList: ["glade", "l2", "r1", "y2", "y1", "r1", "glade"],
  },
];

// These two have to be repeated to not confuse tailwindcss
export function getStrokeClass(pieceColor: PieceColor): string {
  let cn = "stroke-gray-400";
  if (pieceColor.charAt(0) === "r") {
    cn = "stroke-red-400";
  } else if (pieceColor.charAt(0) === "y") {
    cn = "stroke-amber-400";
  } else if (pieceColor.charAt(0) === "l") {
    cn = "stroke-lime-400";
  }

  return cn;
}

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
        if (fruit.color !== "glade" && isSameColor(fruit.color, color)) {
          fruit.score = stack(fruit, color);
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

export function getScore(pieces: IPlacedPiece[]): number {
  const fruitMap = getFruitMapping(pieces);
  let score = 0;
  Object.values(fruitMap).forEach((fruit) => {
    score += fruit.score;
  });

  return score;
}
