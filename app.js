require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_CONNECT_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));


const app = express();

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use('/login', require('./routs/login'));
app.use('/', require('./routs/login'));


app.use('/quiz', require('./routs/quiz'));
app.use('/quizScore', require('./routs/quizScore'));


app.use('/registration', require('./routs/registration'));
app.use('/stock', require('./routs/stock'));
app.use('/admin', require('./routs/admin'));
app.use('/adminUpdate', require('./routs/adminUpdate'));
app.use('/adminDelete', require('./routs/adminDelete'));
app.use('/admin_main', require('./routs/admin_main'));
app.use('/admin_edit', require('./routs/admin_edit'));
app.use('/coin', require('./routs/coin'));
app.use('/history', require('./routs/history'));
app.use('/pdfSave', require('./routs/pdfSave'));

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
});

