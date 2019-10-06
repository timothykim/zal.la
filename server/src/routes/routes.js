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

router.post('/link', (req, res) => {
  const {word, url} = req.body;
  const link = Link({word: word, url: url});

  Link.findOne({word: word}, (err, data) => {
    if (data) {
      if (pastHour(data.updatedAt)) {
        Link.update({_id: data._id}, {$set: {url: link.url}}, {upsert: true}, err => {
          if (err) {
            return res.status(500).json({success: false, error: err});
          }
          return res.status(200).json({success: true, word: word, url: url, updatedAt: data.updatedAt});
        });
      } else {
        return res.status(500).json({success: false, error: "duplicate value"});
      }
    } else {
      link.save(err => {
        if (err) {
          return res.status(500).json({success: false, error: err});
        }
        return res.status(200).json({success: true, word: word, url: url, updatedAt: Date.now()});
      });
    }
  });
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
