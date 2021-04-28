const express = require('express');
const app = express();

const mongoose = require('mongoose');
const config = require('config');
const mongoDB = config.get('mongoDB');

const path = require('path');

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

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));
app.use('/posts', require('./routes/posts'));

if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve('../frontend', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log('Server running...');
});