module.exports= function(sequelize, dataTypes) {

    const alias= "Pelicula"
    
    const cols= {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        /* created_at: {
          type: dataTypes.DATE
        },
        updated_at: {
          type: dataTypes.DATE
        }, */
        title: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        awards: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        },
        length: {
            type: dataTypes.INTEGER
        },
        genre_id: {
            type: dataTypes.INTEGER
        }
    }

    const config= {
        tableName: 'movies',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }

    const Pelicula = sequelize.define (alias, cols, config) 

    Pelicula.associate= (models) => {
        Pelicula.belongsTo(models.Genero, {
            as: 'genero',
            foreignKey: 'genre_id'
        }),
        Pelicula.belongsToMany(models.Actor, {
            as: 'actores',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false 
        })
    }

    return Pelicula
    
}

