'use strict';

const config = require('../config');
const mongoose = require('mongoose');

// Connect to mongodb
mongoose.connect(config.mongo.connectionStr).catch((err) => {
    console.error('Error connecting to mongo:', err);
    throw new Error('Error connecting to mongo:', err);
});

// models
require('../models');