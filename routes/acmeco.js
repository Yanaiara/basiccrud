const express = require('express');
const router = express.Router();

const AcmeCoController = require('../controllers/acmeco-controllers');

router.get('/', AcmeCoController.getAcmeCo);
router.post('/', AcmeCoController.postAcmeCo);
router.get('/:id_acmeco', AcmeCoController.getOneAcmeCo);
router.delete('/:id_acmeco', AcmeCoController.deleteAcmeCo);

module.exports = router;