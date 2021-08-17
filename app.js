const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactdance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 8000;


// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());
// app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const con = " this is best website ever  i had built:";
    const params = {};
    res.status(200).render('welcome.pug', params);

});

app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug');
});
app.post('/contact', (req, res) => {
    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("DATA SUCCESSFULLY SAVED TO THE DATABASE!!")
    }).catch(() => {
        res.status(400).send("SORRY....!!!DATA UNABLE TO SAVE IN DATABASE")
    })
});



app.get('/about', (req, res) => {
    const params = {};
    res.status(200).render('about.pug');
});
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('welcome.pug');
});
app.get('/home', (req, res) => {
    const params = {};
    res.status(200).render('home.pug');
});
app.get('/classinfo', (req, res) => {
    const params = {};
    res.status(200).render('classinfo.pug');
});
app.get('/services', (req, res) => {
    const params = {};
    res.status(200).render('services.pug');
});

app.listen(port, () => {
    console.log(`the server is succesfullybrunning on the port ${port}`);

});