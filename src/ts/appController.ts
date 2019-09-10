import PControllerInterface from './interfaces/pController.interface';

export default class Controller implements PControllerInterface {
  figuresModel: any;

  figuresView: any;

  controlPanel: HTMLDivElement;

  constructor(model: any, view?: any) {
    this.figuresModel = model;
    this.figuresView = view;
    this.controlPanel = <HTMLDivElement>document.querySelector('.control-panel-wrapper');
    this.controlPanel.addEventListener('click', (e: MouseEvent) => this.onClick(e));

    this.figuresModel.app.stage.on('pointerdown', (e: MouseEvent) => this.onCreateFigure(e));
  }

  onCreateFigure(e: any) {
    const typeFigure = this.figuresModel.changeFigure();
    (this.figuresView as any)[typeFigure](e.data.global);
  }


  onReduceGenerationRate() {
    this.figuresModel.reduceGenerationRate();
    this.figuresView.onSetInterval();
  }

  onIncreaseGenerationRate() {
    this.figuresModel.increaseGenerationRate();
    this.figuresView.onSetInterval();
  }

  onReduceGravity() {
    this.figuresModel.reduceGravity();
  }

  onIncreaseGravity() {
    this.figuresModel.increaseGravity();
  }

  onClick = (event: MouseEvent) => {
    const { action } = (event.target as HTMLElement).dataset;
    if (action) {
      (this as any)[action]();
    }
  };
}
