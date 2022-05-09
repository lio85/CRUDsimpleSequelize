const express=require('express');
const app=express();
const path=require('path');

const moviesRoutes = require('./src/routes/moviesRoutes');

app.use(express.static(path.resolve(__dirname , './public')));

app.listen(3002,()=> console.log('El servidor está corriendo en el 3002'));

app.set('view engine', 'ejs');

/* configuracion para poder capturar toda la info que vernga de un formulario, en forma de objeto, y que pueda ser convertida a json */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* configuracion para poder capturar toda la info que vernga de un formulario, en forma de objeto, y que pueda ser convertida a json */

app.get('/', (req, res) => { res.render ('index')})
app.use('/movies', moviesRoutes);