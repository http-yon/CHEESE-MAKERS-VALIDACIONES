const {Router} = require('express')
const {getUsers,postUser,putUser,patchUser,deleteUser} = require("../controllers/usuario.controllers.js")
const {check} = require("express-validator");
const { validateDocuments } = require('../middlewares/validate.documents.js');
const Rol = require("../models/Rol.js")

const router = Router();




router.get("/",getUsers)

router.post("/",[

    check('nombre','nombre no valido').not().isEmpty(),
    check('email','el correo no es valido').isEmail(),
    check('password','el password debe ser de minimo 6 caracteres').isLength({min:6}),
    //check('rol','no es un rol valido').isIn(["ADMIN","USER"]),
    check("rol").custom(async(rol = "")=>{
        const existeRol = await Rol.findOne({rol})
        if (!existeRol) {
            throw new Error(`el rol ${rol} no esta registrado en la base de datos`)
        }
    }),

    validateDocuments


    
], postUser)

router.delete("/",deleteUser)

router.put("/",putUser)

router.patch("/",patchUser)




module.exports = router