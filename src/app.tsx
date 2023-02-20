import { useEffect, useRef, useState, useCallback } from "react";
import { Client as RawClient } from "boardgame.io/client";
import { IG, gameConfig } from "./config";
import Board from "./board";
import HUD from "./hud";
import bgioContext from "./bgio_context";

const createNewObject = () => ({});

function useForceUpdate() {
  const [, setValue] = useState(createNewObject);

  return useCallback((): void => {
    setValue(createNewObject());
  }, []);
}

function App() {
  // _ClientImpl<G> in the original boardgame.io react client
  const client = useRef<ReturnType<typeof RawClient<IG>> | null>(null);
  const forceUpdate = useForceUpdate();
  const state = client.current?.getState?.();

  useEffect(() => {
    if (client.current === null) {
      client.current = RawClient({
        game: gameConfig,
        numPlayers: 1,
      });
    }
    const unsubscribe = client.current.subscribe(() => forceUpdate());
    client.current.start();

    return () => {
      if (client.current === null) {
        return;
      }
      client.current.stop();
      unsubscribe();
    };
  }, []);

  if (state == null) {
    return <div>Loading...</div>;
  }

  const value = {
    ...state,
    isMultiplayer: false,
    moves: client.current?.moves!,
    events: client.current?.events!,
    matchID: client.current?.matchID!,
    playerID: client.current?.playerID!,
    reset: client.current?.reset!,
    undo: client.current?.undo!,
    redo: client.current?.redo!,
    log: client.current?.log!,
    matchData: client.current?.matchData!,
    sendChatMessage: client.current?.sendChatMessage!,
    chatMessages: client.current?.chatMessages!,
  };

  return (
    <div className="App">
      <bgioContext.Provider value={value}>
        <Board />
        <HUD />
      </bgioContext.Provider>
    </div>
  );
}

export default App;
