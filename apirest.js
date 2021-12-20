console.clear();
const mysql = require("mysql2");
const express = require("express");
const app = express();
const cors = require("cors");

let connection = mysql.createConnection
    (
        {
            host: "localhost",
            user: "root",
            password: "1234567",
            database: "codenotch"
        }
    );

connection.connect(function (error) {
    if (error)
        console.log(error);
    else
        console.log("Conexion correcta")
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/student',
    function (req, res) {
        let sql;
        if (req.query.student_id == null) {
            sql = 'SELECT * FROM student';
        } else {
            sql = 'SELECT * FROM student WHERE student_id = \'' + req.query.student_id + '\'';
        };
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            }
        });
    }
);

app.post('/student',
    function (req, res) {
        console.log(req.body);
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const edad = parseInt(req.body.edad);
        const group_id = parseInt(req.body.group_id);
        const ingreso = req.body.ingreso;
        let sql = 'INSERT INTO student (nombre, apellido, edad, group_id, ingreso) VALUES (\''
            + nombre + '\', \''
            + apellido + '\', '
            + edad + ', '
            + group_id + ', \''
            + ingreso + '\')';
        console.log(sql);
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                if (result.insertId) {
                    res.send(String(result.insertId));
                }
                else {
                    res.send('-1');
                };
            };
        });
    }
);

app.put("/student",
    function (req, res) {
        console.log(req.body);
        let params = [req.body.nombre,
        req.body.apellido,
        req.body.edad,
        req.body.group_id,
        req.body.ingreso,
        req.body.student_id]

        let sql = 'UPDATE student SET nombre = COALESCE(?, nombre) , ' +
            'apellido = COALESCE(?, apellido) , ' +
            'edad = COALESCE(?, edad) , ' +
            'group_id = COALESCE(?, group_id) , ' +
            'ingreso = COALESCE(?, ingreso)  WHERE student_id = COALESCE(?, student_id)';
        console.log(sql);
        connection.query(sql, params, function (err, result) {
            if (err)
                console.log(err);
            else {
                res.send(result);
            }
        })
    }
);

app.delete("/student",
    function (req, res) {
        console.log(req.body);
        let sql = "DELETE FROM student WHERE student_id = '" + req.body.student_id + "'";
        console.log(sql);
        connection.query(sql, function (err, result) {
            if (err)
                console.log(err);
            else {
                res.send(result);
            }
        })
    }
);


app.listen(3000);
console.log('Escuchando en el puerto 3000');