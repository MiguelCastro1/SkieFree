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
    res.render("main/game",); 
}

  