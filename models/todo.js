const mongoose = require('mongoose')

var schema = mongoose.Schema

var todoSchema = new schema({
    titre :{type: String, required :true},
     description: {type: String ,required :true}
   

})
module.exports = mongoose.model('todo',todoSchema);