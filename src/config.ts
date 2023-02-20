import type { Game, Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { IPiece, IPlacedPiece, PieceSet, isInRange } from "./piece";
import { hexOrigin } from "./hex";

export interface IG {
  topPiece: IPlacedPiece[];
  handPiece: IPiece[];
}

const addPiece: Move<IG> = ({ G }, newPiece: IPlacedPiece) => {
  if (!isInRange(newPiece, G.topPiece)) {
    return INVALID_MOVE;
  }
  G.handPiece = G.handPiece.filter((p) => p.id !== newPiece.id);
  G.topPiece.push(newPiece);
};

const rotateHand: Move<IG> = ({ G }, num: number) => {
  const p1 = G.handPiece[0];
  if (p1) {
    p1.rotation += num;
  }
  const p2 = G.handPiece[1];
  if (p2) {
    p2.rotation += num;
  }
};

export const gameConfig: Game<IG> = {
  setup: ({ random }) => {
    const pList = random.Shuffle(PieceSet.slice(0));
    const top = {
      ...pList[0],
      position: hexOrigin,
    };

    return {
      topPiece: [top],
      handPiece: pList.slice(1, 9),
    };
  },
  moves: { addPiece, rotateHand },
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
  endIf: ({ G }) => {
    return G.handPiece.length === 0;
  },
};
