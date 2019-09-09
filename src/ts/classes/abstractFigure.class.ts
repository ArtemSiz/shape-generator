import { Graphics } from 'pixi.js';

export default class AbstractFigureClass extends Graphics {
  coordX: number;

  coordY: number;

  num?: number;

  constructor(coordX: number, coordY: number) {
    super();
    this.coordX = coordX;
    this.coordY = coordY;
    this.on('pointerdown', () => this.clear());
  }
}
