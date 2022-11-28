let mongoose = require("mongoose");
let AdministratorSchema = new mongoose.Schema({
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
    return mongoose.models[modelName] // Check if the model exists
      ? mongoose.model(modelName) // If true, only retrieve it
      : mongoose.model(modelName, modelSchema) // If false, define it
}
let Administrator = loadModel("Administrators", AdministratorSchema);
module.exports = Administrator
