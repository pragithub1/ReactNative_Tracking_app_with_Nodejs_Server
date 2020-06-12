const mongoose = require('mongoose');
const express = require('express');
const requireAuth  = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
    try{
        const tracks = await Track.find({ userId : req.user._id });
        res.send(tracks);
    }catch (e){
        res.status('422').send({ error : e.message });
    }
})

router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;

    if( !name || !locations ){
        res.status(422).send({ error : 'Must have name and locations' });
    }

    try{
        const track = new Track({ userId : req.user._id, name : name, locations : locations});
        await track.save();
        res.send(track);
    }catch(e){
        res.status(422).send({ error : err.message });
    }
})



router.delete('/tracks/:id', function (req, res) {
    var id = req.params.id;
    console.log('start delete')

    Track.findByIdAndRemove(id, function (err, track) {  //track here is the deleted one
      if (err) {
        res.status(422).send({ error : err.message });
      }
      res.send(track);
      console.log('success')
    })
  })

// app.delete('/people/:id', function(req, res){
// Person.findByIdAndRemove(req.params.id, function(err, response){
//     if(err) res.json({message: "Error in deleting record id " + req.params.id});
//     else res.json({message: "Person with id " + req.params.id + " removed."});
// });

module.exports = router;