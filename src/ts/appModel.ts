import { Application, Graphics, Sprite } from 'pixi.js';
import AbstractFigureClass from './classes/abstractFigure.class';

class Model implements PModelInterface {
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

  constructor() {
    this.width = 800;
    this.height = 400;

    this.app = new Application({
      width: this.width,
      height: this.height,
    });

    this.background = new Sprite();

    this.app.stage.addChild(this.background);
    this.background.width = this.app.screen.width;
    this.background.height = this.app.screen.height;
    this.app.stage.interactive = true;

    this.colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375,
      0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba];
    this.typesFigures = ['drawCircle', 'drawSquare', 'drawPolygon', 'drawPolygonSecond', 'drawEllipse', 'drawTriangle', 'drawStar'];
    this.coordX = this.width - 100;
    this.coordY = -200;
    this.figure = [];
    this.figuresAmount = -1;
    this.areaOfAllFigures = 0;
  }


  rand = () => Math.floor(Math.random() * this.colors.length);

  basicBehavior(shape: AbstractFigureClass) {
    const newShape = shape;
    this.figuresAmount += 1;
    newShape.num = this.figuresAmount;
    this.figure.push(newShape);
    this.app.stage.addChild(newShape);
  }

  checkedCoordinates = (coordinates: {}) => {
    let newCoord: any = {};

    if (Object.keys(coordinates).length === 0) {
      newCoord.x = Math.floor(Math.random() * this.coordX);
      newCoord.y = this.coordY;
      return newCoord;
    }

    newCoord = coordinates;
    return newCoord;
  };


  changeFigure = () => {
    const typeFigure = this.typesFigures[Math.floor(Math.random() * this.typesFigures.length)];
    return typeFigure;
  };
}

const figuresModel: any = new Model();

export default figuresModel;
