const express = require('express');
const escolaController = require('../controllers/escolaController.js');
const verificarToken = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get("/escolas", verificarToken, escolaController.index);
router.get("/escolas/:id", verificarToken, escolaController.show);
router.post("/escolas", verificarToken, escolaController.store);
router.put("/escolas/:id", verificarToken, escolaController.update);
// router.delete("/escolas/:id", verificarToken, escolaController.destroy);

module.exports = router;