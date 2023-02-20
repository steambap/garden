import React from 'react';
import { BoardProps } from 'boardgame.io/react';
import { IG } from "./config";

const bgioContext = React.createContext<BoardProps<IG> | null>(null);

export default bgioContext;
