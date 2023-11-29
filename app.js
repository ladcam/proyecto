const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
require('dotenv').config()  

const pool = new Pool({
    user: 'default',
    host: 'ep-calm-mud-47680676-pooler.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'pGSy1kb6vYUP',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});

//"postgres://default:pGSy1kb6vYUP@ep-calm-mud-47680676.us-east-1.postgres.vercel-storage.com:5432/verceldb"

app.get('/consulta', function (req, res) {
    const listUsersQuery = `SELECT * FROM historiaclinica;`;
    pool.query(listUsersQuery)
        .then(data => {
            console.log("List consultas: ", data.rows);
            return res.send(data.rows);
        })
        .catch(err => {
            console.error(err);
        });
});

app.get('/consulta/:id', function (req, res) {
    const listUsersQuery = `SELECT * FROM historiaclinica WHERE id = ${req.params.id};`;
    pool.query(listUsersQuery)
        .then(data => {
            console.log("List consultas: ", data.rows);
            return res.send(data.rows);
        })
        .catch(err => {
            console.error(err);
        });
});

app.post('/consulta', function (req, res) {
    const listUsersQuery = `
    INSERT INTO historiaclinica(id, Nombre, Fecha, MotivoConsulta, Doctor, Notas, Imagen) VALUES
    (${req.body.id}, '${req.body.Nombre}', '${req.body.Fecha}', '${req.body.MotivoConsulta}', '${req.body.Doctor}', '${req.body.Notas}', '${req.body.Imagen}');
`;
    pool.query(listUsersQuery)
        .then(data => {
            console.log("List consulta: ", data.rows);
            return res.send(data.rows);
        })
        .catch(err => {
            console.error(err);
        });

    return res.send('consulta creada');
})

app.put('/consulta/:id', function (req, res) {
    const listUsersQuery = `
    UPDATE historiaclinica SET Nombre= '${req.body.Nombre}', Fecha= '${req.body.Fecha}', MotivoConsulta= '${req.body.MotivoConsulta}', Doctor= '${req.body.Doctor}', Notas= '${req.body.Notas}', Imagen= '${req.body.Imagen}' WHERE id = ${req.params.id};`;
    console.log(listUsersQuery)
    pool.query(listUsersQuery)
        .then(data => {
            console.log("List consulta: ", data.rows);
            return res.send(data.rows);
        })
        .catch(err => {
            console.error(err);
        });

    return res.send('Consulta Modificada');
})

app.delete('/consulta/:id', function (req, res) {
    const deleteQuery = `
    DELETE FROM historiaclinica WHERE id = ${req.params.id};`;
    pool.query(deleteQuery)
        .then(data => {
            console.log(data.rows);
            return res.send(data);
        })

        .catch(err => {
            console.error(err)
            res.satatus(400)
            res.send("hubo un error")
        });

})



app.listen(port, () => {
    console.log('the app is runnig');
})
