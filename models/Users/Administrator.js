var mongoose = require("mongoose");
var AdministratorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

function loadModel(modelName, modelSchema) {
    return mongoose.models[modelName]
      ? mongoose.model(modelName)
      : mongoose.model(modelName, modelSchema)
  }

module.exports = () => loadModel('Administrator', AdministratorSchema)