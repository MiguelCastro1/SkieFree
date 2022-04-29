const models = require('../models/index');
const Sequelize = require('sequelize');
const Curso = models.Curso;
const Area = models.Area;
const Op = Sequelize.Op;

exports.index = async(req,res) => {
    const cursos = await Curso.findAll({});
    res.render("curso/index",{
        cursos: cursos.map(curso => curso.toJSON())
    });
};

exports.create = async(req,res) => {
    if(req.route.methods.get){
        res.render("curso/create", {curso: {sigla:'sigla', nome:'nome', areaId:1}, erro:"nome"});
    }else{
        try{
            await Curso.create({
                sigla: req.body.sigla,
                nome: req.body.nome,
                descricao: req.body.descricao,
                areaId: req.body.areaId,
            });
            res.redirect("/curso");
        }catch(e){
            console.log(e.errors)
            res.render("curso/create",{ curso: req.body, error: e});
        }
    }
};

exports.read = async(req,res) => {
    const {id} = req.params;
    try{
        const curso = await Curso.findByPk(id, {include: Area});
        res.render("curso/read", {curso: curso.toJSON()});
    }catch(e){
        console.log(e)
    }
};

exports.update = async(req,res) => {
    const curso = await Curso.findOne({where : {id: req.params.id}});
    if(req.route.methods.get){
      
        res.render("curso/update", 
            {curso: curso.toJSON()
        });
    }else{
        try{
            await Curso.update({
                sigla: req.body.sigla,
                nome: req.body.nome,
                descricao: req.body.descricao,
                areaId: req.body.areaId,
            }, {where : {id: req.params.id}}
            );
           
            res.redirect(`/curso/${req.body.id}`);
        }catch(e){
            console.log(e.errors);
            res.render(`curso/update`,{ curso: req.body, error: e});
        }
    }
};

exports.remove = async(req,res) => {
   const {id} = req.params;
   try{
        await Curso.destroy({where: {id: id}});
        res.send('Curso removido com sucesso!');  
   }catch(e){
       console.log(e);
       res.status(500).send(e)
   }
};