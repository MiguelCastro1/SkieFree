import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import router from "./src/router/router";
import sass from 'node-sass-middleware';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import {v4 as uuidv4} from 'uuid';
// Arquivo app.js
import session from 'express-session';

//dotenv.config();
const app = express();



const PORT = process.env.PORT || 3030;

app.engine('handlebars', engine({
    helpers: require(`${__dirname}/src/views/helpers/helpers`),
    layoutsDir: `${__dirname}/src/views/layouts`,
    defaultLayout : 'main',
}));

app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/src/views`);
app.use(sass({
    src: `${__dirname}/public/scss`,
    dest: `${__dirname}/public/css`,
    outputStyle: 'compressed',
    prefix: '/css'
}));

app.use("/img", express.static(`${__dirname}/public/img`));
app.use("/css", express.static(`${__dirname}/public/css`));
//app.use("/webfonts", express.static(`${__dirname}/node_modules/@fontawesome/fontawesome-free/webfonts`));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use("/js", [
    express.static(`${__dirname}/public/js`),
    express.static(`${__dirname}/node_modules/bootstrap/dist/js/`)
   // express.static(`${__dirname}/node_modules/@popperjs/core/dist/umd/`)
]);

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(csurf({ cookie: true }));

app.use(session({
    genid: (req) => {
        return uuidv4() // usamos UUIDs para gerar os SESSID
    },
        secret: 'Hi9Cf#mK98',
        resave: false,
        saveUninitialized: true
    })
);

app.use((req, res, next) => {
    res.locals.isLogged = 'uid' in req.session;
    next();
});

app.use(morgan('combined'));
app.use(router);
app.use((req,res) => {
    res.status(404).send('Erro 404 Not Found');
});

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
//CREATE USER 'skiefree'@'localhost' IDENTIFIED BY  'Senha@123456';