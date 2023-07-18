const express = require('express')
const cors = require('cors');
const router = require('../routes/usuario.routes');
const {dbConection} = require("../database/config.js")

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = "/api/usuarios"
        //conectar a base de datos mongoDB
        this.connectDB()
        //MIDDLEWARE
        this.middlewares()

        //ROUTING
        this.routes();
    }

    async connectDB(){
        await dbConection()
    }

    middlewares(){
        //cors
        this.app.use(cors())
        //public directory
        this.app.use(express.static("public"));
        //leer y parsear json
        this.app.use(express.json())
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuario.routes.js'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`server runing on port ${this.port}`);
        })
    }



}


module.exports = Server
