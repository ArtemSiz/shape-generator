import { Graphics } from 'pixi.js';

import figuresModel from './appModel';
import AbstractFigureClass from "./classes/abstractFigure.class";

class View implements PViewInterface {
  gravity: number;

  generationRate: number;

  displayNumberOfFigures: HTMLInputElement;

  displayAreaOfAllFigures: HTMLInputElement;

  interval: any;

  constructor() {
    this.gravity = 4;
    this.generationRate = 500;
    this.displayNumberOfFigures = <HTMLInputElement>document.getElementById('number-of-figures');
    this.displayAreaOfAllFigures = <HTMLInputElement>document.getElementById('total-area-of-figures');
    this.interval = null;
  }

  createCanvas() {
    document.querySelector<any>('.canvas-wrapper').appendChild(figuresModel.app.view);
  }

  updateDisplay() {
    const typeFigure = figuresModel.changeFigure();
    (this as any)[typeFigure]();
    this.displayNumberOfFigures.value = figuresModel.figuresAmount;
    this.displayAreaOfAllFigures.value = figuresModel.areaOfAllFigures;
  }

  onSetInterval() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => this.updateDisplay(), this.generationRate);
  }

  drawCircle(coord = {}) {
    const randColor = figuresModel.rand();
    const radius = 50;
    const newCoord = figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const circle = new AbstractFigureClass(x, y);
    const area = Math.floor(Math.PI * (radius ** 2));

    circle.lineStyle(0);
    circle.beginFill(figuresModel.colors[randColor], 1);
    circle.drawCircle(x, y, radius);
    circle.endFill();
    figuresModel.basicBehavior(circle);

    figuresModel.areaOfAllFigures += area;
  }

  drawSquare(coord = {}) {
    const randColor = figuresModel.rand();
    const newCoord = figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const rectangle = new AbstractFigureClass(x, y);
    const area = (100 ** 2);

    rectangle.beginFill(figuresModel.colors[randColor], 1);
    rectangle.drawRect(x, y, 100, 100);
    rectangle.endFill();
    figuresModel.basicBehavior(rectangle);
    figuresModel.areaOfAllFigures += area;
  }

  drawPolygon(coord = {}) {
    const randColor = figuresModel.rand();
    const newCoord = figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const polygon = new AbstractFigureClass(x, y);

    polygon.beginFill(figuresModel.colors[randColor], 1);
    polygon.drawPolygon([x, y, x + 100, y + 90, x + 180, y + 50,
      x + 130, y + 200, x - 10, y + 150]);
    polygon.endFill();
    figuresModel.basicBehavior(polygon);
  }

  drawPolygonSecond(coord = {}) {
    const randColor = figuresModel.rand();
    const newCoord = figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const polygon = new AbstractFigureClass(x, y);

    polygon.beginFill(figuresModel.colors[randColor], 1);
    polygon.drawPolygon([x, y, x + 100, y + 90, x + 180, y + 50,
      x + 130, y + 200, x + 70, y + 130, x - 10, y + 150]);
    polygon.endFill();
    figuresModel.basicBehavior(polygon);
  }

  drawEllipse(coord = {}) {
    const randColor = figuresModel.rand();
    const newCoord = figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const ellipse = new AbstractFigureClass(x, y);
    const area = Math.floor(Math.PI * 80 * 50);

    ellipse.beginFill(figuresModel.colors[randColor], 1);
    ellipse.drawEllipse(x, y, 80, 50);
    ellipse.endFill();
    figuresModel.basicBehavior(ellipse);

    figuresModel.areaOfAllFigures += area;
  }

  drawTriangle(coord = {}) {
    const randColor = figuresModel.rand();
    const newCoord = figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const triangle = new AbstractFigureClass(x, y);

    triangle.beginFill(figuresModel.colors[randColor], 1);
    triangle.moveTo(x, y);
    triangle.lineTo(x + 200, y);
    triangle.lineTo(x + 50, y + 50);
    triangle.lineTo(x, y);
    triangle.closePath();
    triangle.endFill();

    figuresModel.basicBehavior(triangle);
  }

  drawStar(coord = {}) {
    const randColor = figuresModel.rand();
    const newCoord = figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const star = new AbstractFigureClass(x, y);

    star.beginFill(figuresModel.colors[randColor], 1);
    star.drawStar(x, y, 5, 50);
    star.endFill();
    figuresModel.basicBehavior(star);
  }

  loadGame() {
    this.createCanvas();
    const typeFigure = figuresModel.changeFigure();
    (this as any)[typeFigure]();
    this.onSetInterval();
    // figuresModel.app.ticker.elapsedMS = this.generationRate;

    figuresModel.app.ticker.add(() => {
      for (let i = 0; i < figuresModel.figuresAmount; i++) {
        figuresModel.figure[i].position.y += this.gravity;
      }
    });
  }
}

const figuresView: View = new View();

export default figuresView;
