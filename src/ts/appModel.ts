import { Application, Graphics, Sprite } from 'pixi.js';
import CustomGraficsClass from './classes/customGrafics.class';

// class CustomGraficsClass extends Graphics {
//   num?: number;
// }

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

  basicBehavior(shape: CustomGraficsClass) {
    shape.interactive = true;
    shape.buttonMode = true;
    this.figuresAmount++;
    shape.num = this.figuresAmount;
    this.figure.push(shape);
    this.app.stage.addChild(shape);
    // shape.on('pointerdown', figuresController.clearFigure.bind(this));
    shape.on('pointerdown', () => shape.clear());
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


  changeFigure = ():string => {
    const typeFigure = this.typesFigures[Math.floor(Math.random() * this.typesFigures.length)];
    return typeFigure;
  };

  drawCircle(coord = {}) {
    const circle = new Graphics();

    const randColor = this.rand();
    const radius = 50;

    const newCoord = this.checkedCoordinates(coord);
    const { x, y } = newCoord;

    circle.lineStyle(0);
    circle.beginFill(this.colors[randColor], 1);

    circle.drawCircle(x, y, radius);
    circle.endFill();
    this.basicBehavior(circle);
    const area = Math.floor(Math.PI * (radius ** 2));
    this.areaOfAllFigures += area;
  }

  drawSquare(coord = {}) {
    const rectangle = new Graphics();
    const randColor = this.rand();

    const newCoord = this.checkedCoordinates(coord);
    const { x, y } = newCoord;

    rectangle.beginFill(this.colors[randColor], 1);
    rectangle.drawRect(x, y, 100, 100);
    rectangle.endFill();
    this.basicBehavior(rectangle);
    const area = (100 ** 2);
    this.areaOfAllFigures += area;
  }

  drawPolygon(coord = {}) {
    const polygon = new Graphics();
    const randColor = this.rand();

    const newCoord = this.checkedCoordinates(coord);
    const { x, y } = newCoord;

    polygon.beginFill(this.colors[randColor], 1);
    polygon.drawPolygon([x, y, x + 100, y + 90, x + 180, y + 50,
      x + 130, y + 200, x - 10, y + 150]);
    polygon.endFill();
    this.basicBehavior(polygon);
  }

  drawPolygonSecond(coord = {}) {
    const polygon = new Graphics();
    const randColor = this.rand();

    const newCoord = this.checkedCoordinates(coord);
    const { x, y } = newCoord;

    polygon.beginFill(this.colors[randColor], 1);
    polygon.drawPolygon([x, y, x + 100, y + 90, x + 180, y + 50,
      x + 130, y + 200, x + 70, y + 130, x - 10, y + 150]);
    polygon.endFill();
    this.basicBehavior(polygon);
  }

  drawEllipse(coord = {}) {
    const ellipse = new Graphics();
    const randColor = this.rand();


    const newCoord = this.checkedCoordinates(coord);
    const { x, y } = newCoord;

    ellipse.beginFill(this.colors[randColor], 1);
    ellipse.drawEllipse(x, y, 80, 50);
    ellipse.endFill();
    this.basicBehavior(ellipse);

    const area = Math.floor(Math.PI * 80 * 50);
    this.areaOfAllFigures += area;
  }

  drawTriangle(coord = {}) {
    const triangle = new Graphics();
    const randColor = this.rand();
    const newCoord = this.checkedCoordinates(coord);
    const { x, y } = newCoord;

    triangle.beginFill(this.colors[randColor], 1);
    triangle.moveTo(x, y);
    triangle.lineTo(x + 200, y);
    triangle.lineTo(x + 50, y + 50);
    triangle.lineTo(x, y);
    triangle.closePath();
    triangle.endFill();

    this.basicBehavior(triangle);
  }

  drawStar(coord = {}) {
    const star = new Graphics();
    const randColor = this.rand();

    const newCoord = this.checkedCoordinates(coord);
    const { x, y } = newCoord;

    star.beginFill(this.colors[randColor], 1);
    star.drawStar(x, y, 5, 50);
    star.endFill();
    this.basicBehavior(star);
  }
}

const figuresModel: any = new Model();

export default figuresModel;
