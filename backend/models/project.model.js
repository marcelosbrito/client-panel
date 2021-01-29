const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema ({
  clientname: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  project: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;