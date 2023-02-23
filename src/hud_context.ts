import React from "react";

export interface IHUDContext {
  rotation: number;
  setRotation: (id: number) => void;
}

const hudContext = React.createContext<IHUDContext>({
  rotation: 0,
  setRotation(id) {},
});

export default hudContext;
