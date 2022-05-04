import express from "express";
import mainController from '../controllers/main';
import areaController from '../controllers/area';
import cursoController from '../controllers/curso';
import authCheck from "../utils/authCheck";
const route = express.Router();

//MainController
route.get('/', authCheck, mainController.index);
route.get('/about', mainController.about);
route.get('/ui',  mainController.ui);
route.get('/game', authCheck, mainController.game);
route.get('/signup',  mainController.signup);
route.post('/signup', mainController.signup);
route.get('/login', mainController.login);
route.post('/login', mainController.login);
route.get('/logout', authCheck, mainController.logout);
//AreaController
route.get('/area',authCheck,  areaController.index);

//CursoController
route.get('/curso', authCheck, cursoController.index);
route.get('/curso/create', authCheck, cursoController.create);
route.post('/curso/create', cursoController.create);
route.get('/curso/update/:id', authCheck, cursoController.update);
route.post('/curso/update/:id', cursoController.update);
route.delete('/curso/:id', cursoController.remove);
route.get('/curso/:id', authCheck,cursoController.read);

export default route;