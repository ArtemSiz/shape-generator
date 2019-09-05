import figuresModel from './appModel'
import figuresView from "./appView";

class Controller implements PControllerInterface {

  // clearFigure() {
  //   this.clear();
  //   // console.log('clearFigure()');
  // }

  onCreateFigure(e: any) {
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

  onClick = (event: MouseEvent) => {
    let action = (event.target as HTMLElement).dataset.action;
    if (action) {
    (this as any)[action]();
    }
  }
}

const figuresController: any = new Controller();

const controlPanel: HTMLDivElement = <HTMLDivElement>document.querySelector('.control-panel-wrapper');
controlPanel.addEventListener('click', (e) => figuresController.onClick(e));

export default figuresController;