const db= require("../database/models");
const Op= db.Sequelize.Op;

const moviesController = {




    all:  (req, res) => {
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
                genreList.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });
                res.render('createMovie', {genreList})
            })
    },
    
    
    
    create:  (req, res) => {
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
        db.Pelicula.findByPk(req.params.id, {include: [{association: 'genero'}, {association: 'actores'}] } )
        .then(function(pelicula){
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
    
    
    
    
    
    genre:  (req, res) => {
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
        db.Pelicula.findOne({ 
                                where: {
                                    title: "buscando a nemo"
                                } 
                            })
            .then((result) =>{
                return res.send(result)
            });
    },






}

module.exports= moviesController;