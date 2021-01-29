const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema ({
  clientname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3 
  },
}, {
  timestamps: true
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;