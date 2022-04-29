exports.checked = (curso, value) => {
    if(curso && curso.areaId == value){
        return "checked"
    }else{
        return "";
    }
}

exports.printError = (errors, campo) => {
    let mensage = "";
    if(typeof errors !== "undefined"){
        errors.errors.forEach(error => {
            if(error.path == campo){
                mensage = error.message;
                return mensage;
            }
        });
    }

    return mensage;
}


