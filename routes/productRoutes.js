const { Router } = require('express');
const router = Router();
const productController = require('../controllers/productController');
const { requireAuth } = require('../middleware/authMiddleware');

/**
 * Product routes 
 * GET product - get products
 * POST product - create a new product
 
 * To keep logic separate from routes handlers are in a separate file (../controllers/).
 */


 // GET product
router.get('/', requireAuth, productController.product_get);

// POST login
router.post('/', requireAuth, productController.product_post);


module.exports = router;
