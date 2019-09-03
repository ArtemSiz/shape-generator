import figuresModel from './appModel'
import figuresView from "./appView";

class Controller {

  constructor() {
    // this.figuresModel = figuresModel;
  }

  clearFigure() {
    this.clear();
  }

  onCreateFigure(e) {
    figuresModel.newPosition = true;
    figuresModel[figuresModel.changeFigure()](e.data.global);
  }

  reduceGenerationRate() {
    figuresView.generationRate += 100;
    figuresView.onSetInterval();
  }

  increaseGenerationRate() {
    figuresView.generationRate -= 100;
    if (figuresView.generationRate <= 0) figuresView.generationRate = 0;
    figuresView.onSetInterval();
  }

  reduceGravity() {
    figuresView.gravity--;
  }

  increaseGravity() {
    figuresView.gravity++;
  }

  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action]();
    }
  }
}

const figuresController = new Controller();

const controlPanel = document.querySelector('.control-panel-wrapper');
controlPanel.addEventListener('click', (e) => figuresController.onClick(e));

export default figuresController;