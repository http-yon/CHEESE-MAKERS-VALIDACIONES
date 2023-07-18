const Usuario = require("../models/Usuario.js")
const bcryptjs = require("bcryptjs")

const getUsers = (req,res)=>{
    res.json({
        "message":"homepage"
    })
}


const postUser = async (req,res)=>{
    

    const {nombre,email,password,rol} = req.body
    const usuarios = new Usuario({nombre,email,password,rol})
    
    //verificar si el correo ya existe(duplicado)
    const existeEmail =  await Usuario.findOne({email})
    if (existeEmail) {
        return res.status(400).json({
            msg: "Email is already registered"
        })
    }

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync()
    usuarios.password = bcryptjs.hashSync(password, salt)

    await usuarios.save()
    res.json({
        "message":"post api",
        usuarios
    })
}

const deleteUser = (req,res)=>{
    res.json({
        "message":"delete api"
    })
}

const putUser = (req,res)=>{
    res.json({
        "message":"put api"
    })
}

const patchUser = (req,res)=>{
    res.json({
        "message":"patch api"
    })

}


module.exports = {
    getUsers,
    postUser,
    deleteUser,
    putUser,
    patchUser
}
