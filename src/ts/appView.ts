import AbstractFigureClass from './classes/abstractFigure.class';

export default class View implements PViewInterface {
  gravity: number;

  generationRate: number;

  displayNumberOfFigures: HTMLInputElement;

  displayAreaOfAllFigures: HTMLInputElement;

  interval: any;

  figuresModel: any;

  constructor(model: any) {
    this.figuresModel = model;
    this.gravity = 4;
    this.generationRate = 500;
    this.displayNumberOfFigures = <HTMLInputElement>document.getElementById('number-of-figures');
    this.displayAreaOfAllFigures = <HTMLInputElement>document.getElementById('total-area-of-figures');
    this.interval = null;

    this.loadGame();
  }

  createCanvas() {
    document.querySelector<any>('.canvas-wrapper').appendChild(this.figuresModel.app.view);
  }

  updateDisplay() {
    const typeFigure = this.figuresModel.changeFigure();
    (this as any)[typeFigure]();
    this.displayNumberOfFigures.value = this.figuresModel.figuresAmount;
    this.displayAreaOfAllFigures.value = this.figuresModel.areaOfAllFigures;
  }

  onSetInterval() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => this.updateDisplay(), this.generationRate);
  }

  drawCircle(coord = {}) {
    const randColor = this.figuresModel.rand();
    const radius = 50;
    const newCoord = this.figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const circle = new AbstractFigureClass(x, y);
    const area = Math.floor(Math.PI * (radius ** 2));

    circle.lineStyle(0);
    circle.beginFill(this.figuresModel.colors[randColor], 1);
    circle.drawCircle(x, y, radius);
    circle.endFill();
    this.figuresModel.basicBehavior(circle);

    this.figuresModel.areaOfAllFigures += area;
  }

  drawSquare(coord = {}) {
    const randColor = this.figuresModel.rand();
    const newCoord = this.figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const rectangle = new AbstractFigureClass(x, y);
    const area = (100 ** 2);

    rectangle.beginFill(this.figuresModel.colors[randColor], 1);
    rectangle.drawRect(x, y, 100, 100);
    rectangle.endFill();
    this.figuresModel.basicBehavior(rectangle);
    this.figuresModel.areaOfAllFigures += area;
  }

  drawPolygon(coord = {}) {
    const randColor = this.figuresModel.rand();
    const newCoord = this.figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const polygon = new AbstractFigureClass(x, y);

    polygon.beginFill(this.figuresModel.colors[randColor], 1);
    polygon.drawPolygon([x, y, x + 100, y + 90, x + 180, y + 50,
      x + 130, y + 200, x - 10, y + 150]);
    polygon.endFill();
    this.figuresModel.basicBehavior(polygon);
  }

  drawPolygonSecond(coord = {}) {
    const randColor = this.figuresModel.rand();
    const newCoord = this.figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const polygon = new AbstractFigureClass(x, y);

    polygon.beginFill(this.figuresModel.colors[randColor], 1);
    polygon.drawPolygon([x, y, x + 100, y + 90, x + 180, y + 50,
      x + 130, y + 200, x + 70, y + 130, x - 10, y + 150]);
    polygon.endFill();
    this.figuresModel.basicBehavior(polygon);
  }

  drawEllipse(coord = {}) {
    const randColor = this.figuresModel.rand();
    const newCoord = this.figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const ellipse = new AbstractFigureClass(x, y);
    const area = Math.floor(Math.PI * 80 * 50);

    ellipse.beginFill(this.figuresModel.colors[randColor], 1);
    ellipse.drawEllipse(x, y, 80, 50);
    ellipse.endFill();
    this.figuresModel.basicBehavior(ellipse);

    this.figuresModel.areaOfAllFigures += area;
  }

  drawTriangle(coord = {}) {
    const randColor = this.figuresModel.rand();
    const newCoord = this.figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const triangle = new AbstractFigureClass(x, y);

    triangle.beginFill(this.figuresModel.colors[randColor], 1);
    triangle.moveTo(x, y);
    triangle.lineTo(x + 200, y);
    triangle.lineTo(x + 50, y + 50);
    triangle.lineTo(x, y);
    triangle.closePath();
    triangle.endFill();

    this.figuresModel.basicBehavior(triangle);
  }

  drawStar(coord = {}) {
    const randColor = this.figuresModel.rand();
    const newCoord = this.figuresModel.checkedCoordinates(coord);
    const { x, y } = newCoord;
    const star = new AbstractFigureClass(x, y);

    star.beginFill(this.figuresModel.colors[randColor], 1);
    star.drawStar(x, y, 5, 50);
    star.endFill();
    this.figuresModel.basicBehavior(star);
  }

  loadGame() {
    this.createCanvas();
    const typeFigure = this.figuresModel.changeFigure();
    (this as any)[typeFigure]();
    this.onSetInterval();

    this.figuresModel.app.ticker.add(() => {
      for (let i = 0; i < this.figuresModel.figuresAmount; i++) {
        this.figuresModel.figure[i].position.y += this.gravity;
      }
    });
  }
}
