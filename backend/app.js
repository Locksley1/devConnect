const express = require('express');
const app = express();

const mongoose = require('mongoose');
const config = require('config');
const mongoDB = config.get('mongoDB');

const connectMongoDB = async () => {
    try 
    {
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    
        console.log('MongoDB Connected!');
    }
    catch (error)
    {
        console.error(error);
        process.exit(1);
    }    
}

connectMongoDB();

app.use(express.json({extended:false}));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API running');
});

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));
app.use('/posts', require('./routes/posts'));


app.listen(port, () => {
    console.log('Server running...');
});