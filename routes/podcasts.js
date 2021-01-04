const express = require("express");
const PodcastModel = require("../models/podcast");
const {checkAdmin} = require("../config/auth");
const router = express.Router();

router.get("/podcasts", async (req, res) => {
  const podcasts = await PodcastModel.find({});

  try {
    res.send(podcasts);
  } catch (err) { 
    res.status(500).send(err);
  }
});

router.post("/podcast", checkAdmin, async (req, res) => {
  const podcast = new PodcastModel(req.body);

  try {
    await podcast.save();
    res.send(podcast);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/podcast/:id", checkAdmin, async (req, res) => {
  try {
    const podcast = await PodcastModel.findByIdAndDelete(req.params.id);

    if (!podcast) res.status(404).send("No podcast found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/podcast/:id", checkAdmin, async (req, res) => {
  try {
    await PodcastModel.findByIdAndUpdate(req.params.id, req.body);
    await PodcastModel.save();
    res.send(podcast);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
