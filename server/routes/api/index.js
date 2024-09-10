const router = require('express').Router();
const userRoutes = require('./user-routes');
const { searchBooks } = require('../../controllers/book-controller');

router.get('/search/:query', searchBooks);
router.use('/users', userRoutes);

module.exports = router;
