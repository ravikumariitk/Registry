const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb+srv://Ravi_Kumar:Ravi%40123@cluster0.bnkfpnx.mongodb.net/?retryWrites=true", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

let isAuthenticate = 0;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

const studentRoutes = require('./routes/student');

app.use('/', studentRoutes);

app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`);
});
