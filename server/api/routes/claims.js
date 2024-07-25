const express = require('express');
const router = express.Router();

// Example route for claims
router.get('/', (req, res) => {
  res.send('Claims route');
});

module.exports = router;
