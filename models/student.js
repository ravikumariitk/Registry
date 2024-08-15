const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    Roll: String,
    Name: String,
    Programme: String,
    Branch: String,
    Location: String,
    User_ID: String,
    Hall: String,
    Gender: String,
    Blood_Group: String,
    Room: String,
});

module.exports = mongoose.model('StudentData', studentSchema);
