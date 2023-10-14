const router = require('express').Router();
const { postFile, getFileData } = require('../controllers/fileApi');

// router.route('/fileanalyse').get(getUserLogs).post(postFile)
router.route('/fileanalyse').get(getFileData).post(postFile)
module.exports = router;