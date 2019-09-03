import figuresModel from './appModel';

class View {
  constructor() {
    // this.figuresModel = figuresModel;

    this.gravity = 4;
    this.generationRate = 500;
    this.displayNumberOfFigures = document.getElementById('number-of-figures');
    this.displayAreaOfAllFigures = document.getElementById('total-area-of-figures');
    this.interval = null;
  }

  createCanvas() {
    console.log('figuresModel.app.view=', figuresModel);
    document.querySelector('.canvas-wrapper').appendChild(figuresModel.app.view);
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
    console.log('loadGame 7');
    this.createCanvas();
    figuresModel[figuresModel.changeFigure()]();
    this.onSetInterval();

    figuresModel.app.ticker.add(() => {
      for (let i = 0; i < figuresModel.figuresAmount; i++) {
        figuresModel.figure[i].position.y += this.gravity;
      }
    });
  }
}

const figuresView = new View();

export default figuresView;