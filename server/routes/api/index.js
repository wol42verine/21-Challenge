const router = require('express').Router();
const userRoutes = require('./user-routes');
const { searchBooks } = require('../../controllers/book-controller');
const path = require('path');
// const apiRoutes = require('./api');

router.get('/search/:query', searchBooks);
router.use('/users', userRoutes);
// router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
  
module.exports = router;
