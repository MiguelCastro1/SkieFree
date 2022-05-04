  
function apagarCurso(id){

    $.ajax({
        url: `/curso/${id}`,
        type: 'DELETE',

    })
    .done(function (msg) {
        console.log(msg);
        window.location.href='/curso';
    })
    .fail(function (msg){
        console.log(msg);
    })
}