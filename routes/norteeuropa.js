const express = require('express');
const router = express.Router();

const NorteEuropaController = require('../controllers/norteeuropa-controller');

router.get('/', NorteEuropaController.getNorteEuropa);
router.post('/', NorteEuropaController.postNorteEuropa);
router.get('/:id_userNorteEuropa', NorteEuropaController.getOneNorteEuropa);


module.exports = router; 