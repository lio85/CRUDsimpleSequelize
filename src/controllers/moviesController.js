const db= require("../database/models"); // conexion a la base de datos
const movie_releaseDate= require("../functions/releaseDate"); // conexion a la base de datos
/* 
CURSO DE ACCES (SIMIL BASE DE DATOS)
https://www.youtube.com/watch?v=Rx0e5foTnYE&list=RDCMUCfFT6jJx6khLYjibRwKODhA&index=8
*/
const Op= db.Sequelize.Op;

const moviesController = {
    all:  (req, res) => {
        /* 
        SELECT * FROM movies_db.movies 
        */
        db.Pelicula.findAll()
            .then ((peliculas) => {
                
                res.render('moviesList', {peliculas})
            })
    },


    new:  (req, res) => {
        db.Genero.findAll()
            .then ((result) => {
                let genreList= []
                for (genero of result) {
                    genreList.push({id: genero.id, name: genero.name})
                }
                /* este bloque de codigo ordena el array genreList alfabeticamente tomando como parametro la propiedad name de cada uno de los elementos (pendiente comprender funcionamiento!!) 
                https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort 
                */
                genreList.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });
                /* ------------------------------------------------------------------------------------ */
                // console.log(genreList);
                res.render('createMovie', {genreList})
            })
    },
    create:  (req, res) => {
        /* 
        req.body (es la informacion que viene del formulario cuando se submitea)
        {
            "title": "Corazon Valiente",
            "rating": "8",
            "awards": "14",
            "length": "175",
            "release_date": "1998-04-23",
            "genre": "4"
        } 
        */
        db.Pelicula.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.length,
            release_date: req.body.release_date,
            genre_id: req.body.genre,
        }) 
        res.redirect('/movies');
    },


    detail:  (req, res) => {
        /*
        SELECT * FROM movies WHERE id = req.params.id;
        */
        db.Pelicula.findByPk(req.params.id, {include: [{association: 'genero'}, {association: 'actores'}] } )
        .then(function(pelicula){
            /* 
            let actorObject= {};
            actorObject.firstName= pelicula.actores[1].first_name;
            actorObject.surname= pelicula.actores[1].last_name;
            console.log(actorObject); 
            */
            let actorList= [];
            for (actor of pelicula.actores) {
                actorList.push(`${actor.first_name} ${actor.last_name}`)
            }
            const object= {
                id: pelicula.id,
                pelicula: pelicula.title,
                genero: pelicula.genero.name,
                actores: actorList
            }
            res.render('detail', {object})
        })
    },
    
    edit:  (req, res) => {
        // res.send(`Se que estás ahí movie ${req.params.id}, y te voy a editar...`)
        let movieToEdit= db.Pelicula.findByPk(req.params.id)
        let genres= db.Genero.findAll()

        Promise.all([movieToEdit, genres])
            .then(function([movie, genres]){
                let genreList= []
                for (genre of genres) {
                    genreList.push({id: genre.id, name: genre.name})
                }
                genreList.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });
                /* 
                genreList vvv
                
                { id: 4, name: 'Accion' }
                { id: 7, name: 'Animacion' }
                { id: 8, name: 'Aventuras' }
                { id: 5, name: 'Ciencia Ficcion' }
                { id: 1, name: 'Comedia' }
                { id: 9, name: 'Documental' }
                { id: 3, name: 'Drama' }
                { id: 11, name: 'Fantasia' }
                { id: 10, name: 'Infantiles' }
                { id: 12, name: 'Musical' }
                { id: 6, name: 'Suspenso' }
                { id: 2, name: 'Terror' } 
                */
                movie_releaseDate(movie.release_date)
                res.render('editMovie', {movie, genreList, releaseDate:movie_releaseDate(movie.release_date)});
            })
    },
    update:  (req, res) => {
        db.Pelicula.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            genre_id: req.body.genre,
            length: req.body.length,
        }, {
            where:{
                id:req.params.id
            }
        });  
        res.redirect('/movies');
    },
    delete:  (req, res) => {
        db.Pelicula.destroy({
            where: {
                id: req.params.id
            }
        })
        // aca faltaria configurar que si en la pelicula hay actuaciones, primero hay que borrar las actuaciones
        res.redirect('/movies');
    },
    
    genre:  (req, res) => {
        /* 
        SELECT * FROM movies_db.movies 
        where genre_id= 3 
        limit 1; 
        */
        db.Genero.findAll()
            .then ((result) => {
                let genresList= []
                for (genre of result) {
                    genresList.push(genre.name)
                }
                res.render('by-genre', {genresList})
            })
    },
    actors:  (req, res) => {
        db.Actor.findAll()
            .then ((actors) => {
                res.render('actors', {actors})
            })
    },
    nemo: (req, res) => {
        /* 
        SELECT * FROM movies_db.movies 
        where genre_id= 3 
        limit 1; 
        */
        db.Pelicula.findOne({ 
                                where: {
                                    title: "buscando a nemo"
                                    // genre_id: '7'
                                } 
                            })
            .then((result) =>{
                return res.send(result)
            });
    },
}

module.exports= moviesController;

/* Op= {
        eq: Symbol(eq),
        ne: Symbol(ne),
        gte: Symbol(gte),
        gt: Symbol(gt),
        lte: Symbol(lte),
        lt: Symbol(lt),
        not: Symbol(not),
        is: Symbol(is),
        in: Symbol(in),
        notIn: Symbol(notIn),
        like: Symbol(like),
        notLike: Symbol(notLike),
        iLike: Symbol(iLike),
        notILike: Symbol(notILike),
        startsWith: Symbol(startsWith),
        endsWith: Symbol(endsWith),
        substring: Symbol(substring),
        regexp: Symbol(regexp),
        notRegexp: Symbol(notRegexp),
        iRegexp: Symbol(iRegexp),
        notIRegexp: Symbol(notIRegexp),
        between: Symbol(between),
        notBetween: Symbol(notBetween),
        overlap: Symbol(overlap),
        contains: Symbol(contains),
        contained: Symbol(contained),
        adjacent: Symbol(adjacent),
        strictLeft: Symbol(strictLeft),
        strictRight: Symbol(strictRight),
        noExtendRight: Symbol(noExtendRight),
        noExtendLeft: Symbol(noExtendLeft),
        and: Symbol(and),
        or: Symbol(or),
        any: Symbol(any),
        all: Symbol(all),
        values: Symbol(values),
        col: Symbol(col),
        placeholder: Symbol(placeholder),
        join: Symbol(join),
        match: Symbol(match)
  } */

