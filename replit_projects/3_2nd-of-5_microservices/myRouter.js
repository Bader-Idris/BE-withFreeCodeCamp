const router = require('express').Router();

const myRouter = (req, res) => {
  const reqLang = req.get('Accept-Language')
  const preferredLang = reqLang.split(',')[0] + ',' + reqLang.split(',')[1];

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  userAgent = req.get('User-Agent')
  res.json({
    ipaddress: ip.split(',')[0],
    language: preferredLang,
    software: userAgent
  });
};
router.get('/whoami', myRouter)

module.exports = router;