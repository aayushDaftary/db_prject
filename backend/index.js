import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"cityjail",
    port: '3306'
})

app.post('/api/signin', (req,res)=>{
    const {username, password} = req.body;
    const authorize = `SELECT * FROM Users WHERE username = '${username}' AND password = '${password}'`
    db.query(authorize, {username, password}, (err, data)=>{
        if (err) return res.json(err);
        if (data.length > 0) return res.send({authorization: true})
        else return res.send({authorization: false});
    })
})

app.post('/api/checkdup', (req, res) => {
    const { username } = req.body;
    const checkDuplicateQuery = `SELECT * FROM Users WHERE username = ?`;

    db.query(checkDuplicateQuery, [username], (err, data) => {
        if (err) {
            return res.json(err);
        }

        const isDuplicate = data.length > 0;
        return res.json({ duplicate: isDuplicate });
    });
});

app.post('/api/createacc', (req, res) => {
    const { username, password } = req.body;
    const createAccountQuery = `INSERT INTO Users (username, password) VALUES (?, ?)`;

    db.query(createAccountQuery, [username, password], (err, result) => {
        if (err) {
            return res.json(err);
        }

        return res.json({ success: true, insertedId: result.insertId });
    });
});

app.get('/api/criminal-data', (req, res)=>{
    const {ID, Name, Address, Phone} = req.body;
    const q = `SELECT Criminal_ID, 
               CONCAT(First, ' ', Last) AS Name, 
               CONCAT(Street, ', ', City, ', ', State, ', ', Zip) AS Address,
               Phone FROM Criminals;`
    db.query(q, {ID, Name, Address, Phone}, (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    }); 
})

app.get('/api/data', (req, res)=>{
    const values = [req.body.ID];
    const q = `SELECT * FROM Criminals;`
    db.query(q, [values], (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    }); 
})

// app.post('/cityjail', (req,res)=>{
//     const q = "INSERT INTO Users VALUES (?)"
//     const values = [req.body.username, req.body.password]
//     db.query(q, [values], (err, data)=>{
//         if (err) return res.json(err);
//         return res.json(data);
//     });
// })

app.listen(3300, ()=>{
    console.log("Connected to backend!")
    return true;
})
