import { useContext, useState } from "react";
import { getScore } from "./piece";
import bgioContext from "./bgio_context";
import hudContext from "./hud_context";
import HandPiece from "./hand_piece";

const HUD = () => {
  const [rotation, setRotation] = useState(0);
  const { G, ctx, reset } = useContext(bgioContext)!;
  const hand = G.handPiece.slice(0, 2);
  const rotate = (dir: number) => {
    setRotation((rotation + dir) % 6);
  };
  const score = getScore(G.topPiece);

  return (
    <hudContext.Provider value={{ rotation, setRotation }}>
      <div className="fixed left-0 bottom-0 flex">
        {hand.map((p) => {
          return <HandPiece key={p.id} p={p} />;
        })}
      </div>
      <div className="fixed left-72 bottom-0 right-0 text-white">
        <div className="p-2 bg-gray-600 flex">
          <button className="mr-2 w-6" onClick={() => rotate(1)}>
            &#8634;
          </button>
          <button className="w-6" onClick={() => rotate(-1)}>
            &#8635;
          </button>
        </div>
      </div>
      {ctx.gameover && (
        <div className="fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center victory">
          <div className="text-center text-white rounded p-4 bg-gray-600">
            <div>{`Score: ${score}`}</div>
            <div className="mt-2">
              <button className="button px-4 py-0.5" onClick={() => reset()}>Restart</button>
            </div>
          </div>
        </div>
      )}
    </hudContext.Provider>
  );
};

export default HUD;
