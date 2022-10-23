var Administrator = require("../models/Users/Administrator");

async function authenticateUser (body){
    const docs=await Administrator.find({}).exec();
    print(docs)
}

module.exports= {authenticateUser};