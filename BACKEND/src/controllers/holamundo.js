
function hello(req,res){

    res.json(
        {
            mensaje: "Este es mensaje JSON"
        }
    )
}



module.exports = {
    hello
}