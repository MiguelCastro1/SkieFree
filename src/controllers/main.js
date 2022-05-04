const models = require('../models/index');
const Curso = models.Curso;
const User = models.User;
const bcrypt = require('bcryptjs');

exports.about = (req,res) => {
    res.render('main/about');
};

exports.index = (req,res) => {
    res.render('main/index');
}

exports.ui = (req,res) =>{
    res.render("main/ui");
}

exports.game = (req,res) => {
    res.render("main/game"); 
}

exports.login = async(req,res) => {
    if(req.route.methods.get){
        res.render("main/login", {
            csrf: req.csrfToken()
        });
    }else{
        try{
            const user = await User.findOne({where: {email: req.body.email}});
    
            if(!user){
                throw new Error('Usuário não encontrado');
            }
            const isMatch = await bcrypt.compare(req.body.senha, user.senha);
            console.log(req.body)
            if(!isMatch){
                throw new Error('Senha incorreta');
            }

            req.session.uid = user.id;
            res.redirect('/');
        }catch(e){
            console.log(e);
            res.render("main/login", {
                user: req.body,
                error: e,
                csrf: req.csrfToken()
            });
        }
    }
}

exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/');
}


exports.signup = async(req,res) => {
    const cursos = await Curso.findAll({});
    
    if(req.route.methods.get){
        res.render("main/signup", { 
            cursos: cursos.map(curso => curso.toJSON()),
            csrf: req.csrfToken()
        });
    }else{
        if(req.body.senha !== req.body.confirm_password){
            res.render("main/signup",{ cursos: cursos.map(curso => curso.toJSON()), csrf: req.csrfToken(), user: req.body, confirm:'As Senha não conferem'});
        }else if(req.body.termos !== 'on'){
            res.render("main/signup",{ cursos: cursos.map(curso => curso.toJSON()), csrf: req.csrfToken(), user: req.body, termos:'Você deve aceitar os termos de uso'});
        }else{
            try{
                bcrypt.genSalt(10 , (err,salt) => {
                    bcrypt.hash(req.body.senha, salt, async (err,hash) => {
                        await User.create({
                            nome: req.body.nome,
                            email: req.body.email,
                            senha: hash,
                            cursoId: req.body.cursoId,
                    });
                    res.redirect('/');
                });
            });
            }catch(e){
                res.render("main/signup",{ cursos: cursos.map(curso => curso.toJSON()), csrf: req.csrfToken(), user: req.body, error: e});
            }
        }
    }
};

  