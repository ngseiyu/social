/* const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose"); */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();

app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors());
// app.use(express.json());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 8080;

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("Connected to the database"));
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        });
    } catch (error) {
        console.log(error);
    }
};
start();

/* mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to the database"))
    .then(() => app.listen(PORT, () =>
        console.log(`Server listening on port ${PORT}`))
    )
    .catch((error) => console.log(error)); */