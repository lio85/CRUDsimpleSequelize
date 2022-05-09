const express=require('express');
const router= express.Router();
const moviesController= require('../controllers/moviesController');

router.get('/', moviesController.all)
router.get('/new', moviesController.new)
router.post('/create', moviesController.create)
/* router.get('/buscando-a-nemo', moviesController.nemo)
router.get('/genre', moviesController.genre)
router.get('/actors', moviesController.actors) */
router.get('/:id', moviesController.detail)
router.get('/:id/edit', moviesController.edit)
router.post('/:id/update', moviesController.update)
router.post('/:id/delete', moviesController.delete);



module.exports= router;