const models = require('../models/index');
const Sequelize = require('sequelize');
const Area = models.Area;
const Op = Sequelize.Op;

exports.index = async(req,res) => {
    const areas = await Area.findAll();
    res.render("area/index",  {
        areas: areas.map(area => area.toJSON())
    });
};