import type { Game, Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import {
  IPiece,
  IPlacedPiece,
  PieceSet,
  isInRange,
  getFruitMapping,
  isSameColor,
} from "./piece";
import { Hex, hexOrigin } from "./hex";

export interface IG {
  topPiece: IPlacedPiece[];
  handPiece: IPiece[];
}

const addPiece: Move<IG> = ({ G }, newPiece: IPlacedPiece) => {
  if (!isInRange(newPiece, G.topPiece)) {
    return INVALID_MOVE;
  }
  const fruitMap = getFruitMapping(G.topPiece);
  const { position, colorList, rotation } = newPiece;
  for (let i = 0; i < colorList.length; i++) {
    const color = colorList[i];
    if (color === "glade") {
      continue;
    }
    const hexPos = Hex.add(position, Hex.at(i, rotation));
    const hexStr = Hex.toStr(hexPos);
    if (
      fruitMap[hexStr] &&
      fruitMap[hexStr].color !== "glade" &&
      !isSameColor(fruitMap[hexStr].color, color)
    ) {
      return INVALID_MOVE;
    }
  }

  G.handPiece = G.handPiece.filter((p) => p.id !== newPiece.id);
  G.topPiece.push(newPiece);
};

export const gameConfig: Game<IG> = {
  setup: ({ random }) => {
    const pList = random.Shuffle(PieceSet.slice(0));
    const top = {
      ...pList[0],
      rotation: 0,
      position: hexOrigin,
    };

    return {
      topPiece: [top],
      handPiece: pList.slice(1, 9),
    };
  },
  moves: { addPiece },
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
  endIf: ({ G }) => {
    return G.handPiece.length === 0;
  },
};
