require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes  = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json()); //use to convert json to object
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://prakash1:prakash1@cluster0-kwbtu.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true,
    useFindAndModify : false,
})

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo instance', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is ${req.user.email}`);
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
});