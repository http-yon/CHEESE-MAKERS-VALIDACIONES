const {Schema,model} = require("mongoose")

const rolSchema = Schema({
    rol:{
        type:String,
        required:[true,"el rol es obligarotio"]
    }
})

module.exports = model("Role",rolSchema,"roles")