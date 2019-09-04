import * as PIXI from 'pixi.js';

import figuresController from './appController';

class Model implements PModelInterface {

  width: number;
  height: number;
  app: PIXI.Application;
  background: PIXI.Sprite;
  colors: number[];
  typesFigures: string[];
  coordX: number;
  coordY: number;
  figure: PIXI.Graphics[];
  figuresAmount: number;
  areaOfAllFigures: number;

  constructor() {

    this.width = 800;
    this.height = 400;

    this.app = new PIXI.Application({
      width: this.width,
      height: this.height
    });

    this.background = new PIXI.Sprite();

    this.app.stage.addChild(this.background);
    this.background.width = this.app.screen.width;
    this.background.height = this.app.screen.height;
    this.app.stage.interactive = true;

    this.colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba];
    this.typesFigures = ['drawCircle', 'drawSquare', 'drawPolygon', 'drawPolygonSecond', 'drawEllipse', 'drawTriangle', 'drawStar'];
    this.coordX = this.width - 100;
    this.coordY = -200;
    this.figure = [];
    this.figuresAmount = -1;
    this.areaOfAllFigures = 0;
  }


  rand = () => Math.floor(Math.random() * this.colors.length);

  _basicBehavior(shape: any) {
    shape.interactive = true;
    shape.buttonMode = true;
    this.figuresAmount++;
    shape.num = this.figuresAmount;
    this.figure.push(shape);
    this.app.stage.addChild(shape);
    // shape.on('pointerdown', figuresController.clearFigure.bind(this));
    shape.on('pointerdown', () => shape.clear());
  }

  _checkedCoordinates = (coordinates: {}) => {
    let newCoord: any = {};

    if (Object.keys(coordinates).length === 0) {
      newCoord.x = Math.floor(Math.random() * this.coordX);
      newCoord.y = this.coordY;
      return newCoord;
    }

    newCoord = coordinates;
    return newCoord;

  };


  changeFigure = ():string => {
    return this.typesFigures[Math.floor(Math.random() * this.typesFigures.length)];
  };

  drawCircle(coord = {}) {
    let circle = new PIXI.Graphics();

    let randColor = this.rand();
    let radius = 50;

    let newCoord = this._checkedCoordinates(coord);
    let { x, y } = newCoord;

    circle.lineStyle(0);
    circle.beginFill(this.colors[randColor], 1);

    circle.drawCircle(x, y, radius);
    circle.endFill();
    this._basicBehavior(circle);
    let area = Math.floor(Math.PI * Math.pow(radius, 2));
    this.areaOfAllFigures += area;
  }
  drawSquare(coord = {}) {
    let rectangle = new PIXI.Graphics();
    let randColor = this.rand();

    let newCoord = this._checkedCoordinates(coord);
    let { x, y } = newCoord;

    rectangle.beginFill(this.colors[randColor], 1);
    rectangle.drawRect(x, y, 100, 100);
    rectangle.endFill();
    this._basicBehavior(rectangle);
    let area = Math.pow(100, 2);
    this.areaOfAllFigures += area;
  }
  drawPolygon(coord = {}) {
    let polygon = new PIXI.Graphics();
    let randColor = this.rand();

    let newCoord = this._checkedCoordinates(coord);
    let { x, y } = newCoord;

    polygon.beginFill(this.colors[randColor], 1);
    polygon.drawPolygon([x, y, x + 100, y + 90, x + 180, y + 50, x + 130, y + 200, x - 10, y + 150]);
    polygon.endFill();
    this._basicBehavior(polygon);
  }
  drawPolygonSecond(coord = {}) {
    let polygon = new PIXI.Graphics();
    let randColor = this.rand();

    let newCoord = this._checkedCoordinates(coord);
    let { x, y } = newCoord;

    polygon.beginFill(this.colors[randColor], 1);
    polygon.drawPolygon([x, y, x + 100, y + 90, x + 180, y + 50, x + 130, y + 200, x + 70, y + 130, x - 10, y + 150]);
    polygon.endFill();
    this._basicBehavior(polygon);
  }
  drawEllipse(coord = {}) {
    let ellipse = new PIXI.Graphics();
    let randColor = this.rand();


    let newCoord = this._checkedCoordinates(coord);
    let { x, y } = newCoord;

    ellipse.beginFill(this.colors[randColor], 1);
    ellipse.drawEllipse(x, y, 80, 50);
    ellipse.endFill();
    this._basicBehavior(ellipse);

    let area = Math.floor(Math.PI * 80 * 50);
    this.areaOfAllFigures += area;
  }
  drawTriangle(coord = {}) {
    let triangle = new PIXI.Graphics();
    let randColor = this.rand();

    let newCoord = this._checkedCoordinates(coord);
    let { x, y } = newCoord;

    triangle.beginFill(this.colors[randColor], 1);
    triangle.moveTo(x, y);
    triangle.lineTo(x + 200, y);
    triangle.lineTo(x + 50, y + 50);
    triangle.lineTo(x, y);
    triangle.closePath();
    triangle.endFill();

    this._basicBehavior(triangle);
  }
  drawStar(coord = {}) {
    let star = new PIXI.Graphics();
    let randColor = this.rand();

    let newCoord = this._checkedCoordinates(coord);
    let { x, y } = newCoord;

    star.beginFill(this.colors[randColor], 1);
    star.drawStar(x, y, 5, 50);
    star.endFill();
    this._basicBehavior(star);
  }
}

const figuresModel: any = new Model();

export default figuresModel;
