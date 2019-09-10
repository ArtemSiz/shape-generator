import Controller from './appController';
import Model from './appModel';
import View from './appView';

const model = new Model();
const view = new View(model);

const figuresController: any = new Controller(model, view);
