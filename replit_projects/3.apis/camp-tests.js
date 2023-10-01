const { Router } = require('express');
const campTests = Router();

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const tendedResponse = (res) => {
  res.json({
    unix: time.getTime(),
    utc: `${daysOfWeek[time.getDay()]}, ${time.getUTCDate() < 10 ?
    '0' + time.getUTCDate() : time.getUTCDate()} ${months[time.getUTCMonth()]} ${time.getUTCFullYear()} ${time.getUTCHours() < 10 ?
    '0' + time.getUTCHours() : time.getUTCHours()}:${time.getUTCMinutes() < 10 ?
    '0' + time.getUTCMinutes() : time.getUTCMinutes()}:${time.getUTCSeconds() < 10 ?
    '0' + time.getUTCSeconds() : time.getUTCSeconds()} GMT`,// Fri, 25 Dec 2015 00:00:00 GMT
  })
}

const UTCTimingAPI = (req, res) => {
  let strDate = req.params.date;

  if (isNaN(Number(strDate))) {//2015-12-25
    let testTime = new Date(strDate)
    if (testTime.toDateString() === 'Invalid Date') return res.json({ error: "Invalid Date" })


    numDate = strDate.toLocaleString('UTC')
    time = new Date(numDate)
    return tendedResponse(res)
  }
  else if (!isNaN(Number(strDate))) {//1451001600000
    numDate = Number(strDate);
    time = new Date(numDate)
    return tendedResponse(res)
  }
};

const UTCTimingAPICurrent = (req, res) => {
  let strDate = new Date().getTime();
  numDate = Number(strDate);
  time = new Date(numDate)
  return tendedResponse(res)
};

campTests.route('/').get(UTCTimingAPICurrent);
campTests.route('/:date').get(UTCTimingAPI);
module.exports = campTests;