const express = require('express');
const conectarDB = require('../config/db');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

//enlazar conexion con la base de datos
conectarDB();
app.use(cors());

app.use(express.json({extended: true}));
app.use('/api/clientes', require('../routes/cliente'));
app.use('/api/proveedores', require('../routes/proveedor'));
app.use('/api/auth', require('../routes/auth'));
app.use('/api/usuarios', require('../routes/rutaUsuarios'));


app.get('/', (req, res) => {
    res.send('--- Bienvenido, estamos desde el navegador! ---')
})

app.listen(port, () => console.log('Esta conectado el servidor por el puerto ', port));