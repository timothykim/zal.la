const express = require('express');
const Link = require('../models/link');
const router = express.Router();
const pastHour = require('../modules/pastHour');

router.get('/links', (req, res) => {
  Link.find({}, (err, data) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true, data: data});
  });
});


router.get('/link/', (req, res) => {
  const {word} = req.body;
  Link.findOne({word: word}, (err, data) => {
    if (err) return res.json({success: false, error: err});
    if (pastHour(data.updatedAt)) {
      return res.json({success: false, error: "The word is expired"})
    }
    return res.json({success: true, updatedAt: data.updatedAt});
  })
});

const getLast24HoursQuery = (now) => (
  word: word,
  updatedAt: {
    $gt: new Date(now - 24*60*60 * 1000)
  }
});

const serveLink = (res, link) => res.status(200).json({success: true, ... link});
const serveBadRequest = (res) => res.status(400).json({success: false, error: "duplicate value"})
const serveServerError = (res) => res.status(500).json({success: false, error: err})

router.post('/link', (req, res) => {
  const {word, url} = req.body;
  const link = Link();

  const query = Link.findOne(getLast24HoursQuery(Date.now()).exec();
  query.then(link => link ? Promise.reject(link) : null) // if we find a link then it's error!
       .then(() => Link.findOneAndUpdate({word: word}, {word: word, url: url}, {upsert: true}).exec())
       .then(link => serveLink(res, link))
       .catch(error => if (error.word) serveBadRequest())
                       else serveServerError());
});

router.delete('/link', (req, res) => {
  const {word} = req.body;
  Link.deleteOne({word: word}, (err) => {
    if (err) {
      return res.send(err);
    }
    return res.json({success: true});
  });
});

module.exports = router;
