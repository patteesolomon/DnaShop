import express, { application } from "express";
import cors from 'cors';
import methodOverride from 'method-override';
import db from './db/index.js';
import dotenv from 'dotenv';
import { getDirName } from "./getDirName.js";
import validInfo from "./validInfo.js";
import bcrypt from 'bcrypt';
import { createClient } from 'redis';
// import jwtAuth from './JwtAuth.js'; these are unused - don't import them here.
// import jwtSeed from './JwtSeed.js'; 
const port = 3000;
const app = express();
const dirName = getDirName(import.meta.url);

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

// creates a new middle ware function to override
// the req method property with a new value
app.use(methodOverride("_method"));

//app.use('/public', express.static('public'));
app.use(express.static(dirName + '/public')); // Keep
app.use(cors());
app.use(express.json()); // serve files from public statically
//parsing incomming requests
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log("I run for all routes");
    next();
});

dotenv.config();
//induces order 
//use
//set 
//engine
//delete d
//put u
//post c
//get r
//listen
//

app.delete("/itemType/:id", async (req, res) => {
    try {
        const results = db.query("DELETE FROM product where id = $1", [
            req.params.id
        ]);
        res.status(204).json({
            status: "success",
        });
        console.log(results);
    } catch (err) {
        console.log(err);
    }
})

// deleting an item
app.delete('/cart/:id', async (req, res) => {
    try {
        const results = db.query("DELETE FROM users where id = $1", [
            req.params.id
        ]);
        res.status(204).json({
            status: "success",
        });
        console.log(results);
    } catch (err) {
        console.log(err);
    }
});

// 'add to cart'?????? // this could also 
app.put("/cart/:id", async (req, res) => {
    const { id } = req.params; // user id
    // find the order ids under user id
    const { us, ps, cartInv } = req.body;
    try {
        const results = await db.query(`UPDATE users SET us = $1, 
        ps = $2, cartInv = $3 WHERE id = $4`,
            [us, ps, cartInv, id]);
        console.log(results);
        console.log('====================================');
        res.json(results);
        console.log('====================================');
        console.log(res);
        console.log('====================================');
    } catch (error) {
        console.log(error);
    }
    // then it is the model of listing items 
    // out of sql
});

// update
// yes just because of this assignment
// but im using patch instead
// done
app.put("/itemType/:id", async (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        itemLocation,
        provider,
        likes,
        quantity,
        category_id,
        sku,
        sponsored,
        imageLink
    } = req.body;
    try {
        // the result data needs to be in the same order as the one in the braces.
        // that was probably the only issue.
        const results = await db.query('UPDATE product SET name = $1, description = $2, itemLocation = $3, provider = $3, likes = $4, quantity = $5, category_id = $6, sku = $7, sponsored = $8, imageLink = $9 WHERE id = $10',
            [
                name,
                description,
                itemLocation,
                provider,
                likes,
                quantity,
                category_id,
                sku,
                sponsored,
                imageLink,
                id
            ]);
        console.log(results);
        console.log('====================================');
        res.json(results);
        console.log('====================================');
        console.log(res);
        console.log('====================================');
    } catch (e) {
        console.log(e);
    }
});

// create a users

app.post("/signup", validInfo, async (req, res) => {
    // getting userdata from table
    // 
    try {
        const send = await db.query(`INSERT INTO users(id, us, ps, cartInv) values ($1, $2, $3, $4) returning *;`,
            [
                req.body.id, req.body.us,
                req.body.ps, req.body.cartInv
            ]
        );
        console.log(send);
        res.status(201).json({
            status: "success",
            data: {
                user: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
});

// create 
app.post("/invItem", async (req, res) => {
    try {
        const results = await db.query(`INSERT INTO product(id, name, price,
            description, image, quantity, category_id, sku)
            values ($1, $2, $3, $4, $5, $6, $7, $8) returning *;`,
            [
                req.body.id,
                req.body.name,
                req.body.price,
                req.body.description,
                req.body.image,
                req.body.quantity,
                req.body.category_id,
                req.body.sku
            ]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                item: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
})

// welcome
app.get('/', (req, res) => {
    res.send("hola");
})

app.get('/users', async (req, res) => {
    try {
        const userbase = await db.query('SELECT * FROM users');
        console.log('====================================');
        console.log(userbase);
        console.log('====================================');
        res.json(userbase.rows);
    } catch (error) {
        console.log(error);
    }
});

app.get("/users/:id", async (req, res) => {
    console.log(req.body);
    try {
        const results =
            await db.query(`SELECT * FROM users where id = $1`,
                [req.params.id]);
        console.log('====================================');
        console.log(results);
        console.log('====================================');
        res.status(200).json({
            status: "success",
            data: {
                user: results.rows[0]
            }
        });
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
})

// GET ALL\ items
app.get("/invItem/getAll", async (req, res) => {
    try {
        const itemas = await db.query('SELECT * FROM product');
        console.log(itemas);
        res.json(itemas.rows);
    } catch (error) { console.log(error); }
});

// Get one specific item
// show
app.get("/invItem/show/:id", async (req, res) => {
    console.log(req.body);
    try {
        const results =
            await db.query(`SELECT * FROM product WHERE id = $1`,
                [req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                item: results.rows[0]
            }
        });
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log
        (`server is up and listening on port ${port}`);
});