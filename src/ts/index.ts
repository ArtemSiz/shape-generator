import figuresModel from './appModel';
import figuresView from './appView';
import figuresController from './appController';

figuresModel.app.stage.on('pointerdown', figuresController.onCreateFigure);

figuresView.loadGame();
