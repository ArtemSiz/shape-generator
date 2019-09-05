import figuresModel from './appModel';

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

  _updateDisplay() {
    figuresModel[figuresModel.changeFigure()]();
    this.displayNumberOfFigures.value = figuresModel.figuresAmount;
    this.displayAreaOfAllFigures.value = figuresModel.areaOfAllFigures;
  }

  onSetInterval() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => this._updateDisplay(), this.generationRate);
  }

  loadGame() {
    this.createCanvas();
    figuresModel[figuresModel.changeFigure()]();
    this.onSetInterval();
    // figuresModel.app.ticker.elapsedMS = this.generationRate;

    figuresModel.app.ticker.add(() => {
      console.log('ticker 7');
      for (let i = 0; i < figuresModel.figuresAmount; i++) {
        figuresModel.figure[i].position.y += this.gravity;
      }
    });
  }
}

const figuresView: View = new View();

export default figuresView;