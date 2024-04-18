const express = require("express");
const cors = require("cors");

const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '15mb'}))

app.use(express.json());
app.use(cors());

const port = 5000;

app.listen(port,()=>{
    console.log("Servidor Express escuchando en el puerto "+port);
})

//--------------------------------------Metodos

const Router = require('./routers/routes');
app.use(Router); 
