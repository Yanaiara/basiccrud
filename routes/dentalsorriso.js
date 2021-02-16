const express = require('express');
const router = express.Router();

const DentalSorrisoController = require('../controllers/dentalssoriso-controller');

router.get('/', DentalSorrisoController.getDentalSorriso);
router.post('/', DentalSorrisoController.postDentalSorriso);
router.get('/:id_userDentalSorriso', DentalSorrisoController.getOneDentalSorriso);


module.exports = router; 