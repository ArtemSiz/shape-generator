import { Application, Graphics, Sprite } from 'pixi.js';

export default interface PModelInterface {
  width: number;
  height: number;
  app: Application;
  background: Sprite;
  colors: number[];
  typesFigures: string[];
  coordX: number;
  coordY: number;
  figure: Graphics[];
  figuresAmount: number;
  areaOfAllFigures: number;
  gravity: number;
  // generationRate: number;
}
