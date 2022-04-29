import express from "express";
import mainController from '../controllers/main';
import areaController from '../controllers/area';
import cursoController from '../controllers/curso';
const route = express.Router();

//MainController
route.get('/', mainController.index);
route.get('/about', mainController.about);
route.get('/ui', mainController.ui);
route.get('/game', mainController.game);

//AreaController
route.get('/area', areaController.index);

//CursoController
route.get('/curso', cursoController.index);
route.get('/curso/create', cursoController.create);
route.post('/curso/create', cursoController.create);
route.get('/curso/update/:id', cursoController.update);
route.post('/curso/update/:id', cursoController.update);
route.delete('/curso/:id', cursoController.remove);
route.get('/curso/:id', cursoController.read);

export default route;