export default class Controller implements PControllerInterface {
  figuresModel: any;

  figuresView: any;

  controlPanel: HTMLDivElement;

  constructor(model?: any, view?: any) {
    this.figuresModel = model;
    this.figuresView = view;
    this.controlPanel = <HTMLDivElement>document.querySelector('.control-panel-wrapper');
    this.controlPanel.addEventListener('click', (e: MouseEvent) => this.onClick(e));
  }

  onCreateFigure(e: any) {
    console.log('click 7777');
    console.log('e', e);
    // this.figuresModel.newPosition = true;
    const typeFigure = this.figuresModel.changeFigure();
    (this.figuresView as any)[typeFigure](e.data.global);
  }

  reduceGenerationRate() {
    this.figuresView.generationRate += 100;
    this.figuresView.onSetInterval();
  }

  increaseGenerationRate() {
    this.figuresView.generationRate -= 100;
    if (this.figuresView.generationRate <= 0) this.figuresView.generationRate = 0;
    this.figuresView.onSetInterval();
  }

  reduceGravity() {
    this.figuresView.gravity -= 1;
  }

  increaseGravity() {
    this.figuresView.gravity += 1;
  }

  onClick = (event: MouseEvent) => {
    const { action } = (event.target as HTMLElement).dataset;
    if (action) {
      (this as any)[action]();
    }
  };
}
