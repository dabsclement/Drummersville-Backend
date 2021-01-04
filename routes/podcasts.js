const express = require('express');
const podcastModel = require('../models/podcast');
const podcast = require('../models/podcast');
const router = express.Router();

router.get('/podcasts', async (req, res) => {
  const podcasts = await podcastModel.find({});

  try {
    res.send(podcasts);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/podcast', async (req, res) => {
    const podcast = new PodcastModel(req.body);
  
    try {
      await podcast.save();
      res.send(podcast);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.delete('/podcast/:id', async (req, res) => {
    try {
      const podcast = await podcastModel.findByIdAndDelete(req.params.id)
  
      if (!podcast) res.status(404).send("No podcast found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  });

  router.patch('/podcast/:id', async (req, res) => {
    try {
      await podcastModel.findByIdAndUpdate(req.params.id, req.body)
      await podcastModel.save()
      res.send(podcast)
    } catch (err) {
      res.status(500).send(err)
    }
  });



module.exports = router;