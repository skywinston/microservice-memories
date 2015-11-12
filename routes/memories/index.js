var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = process.env.POSTGRES_SERVER;

router.route('/')
.get(function(req, res){
  pg.connect(conString, function(err, client, done){
    client.query('SELECT * FROM memories', function(err, result){
      done();
      res.send(result);
    });
  });
})
.post(function(req, res){
  var data = req.body.data.attributes;
  pg.connect(conString, function(err, client, done){
    client.query('INSERT INTO memories (old_days, these_days, year) values ($1, $2, $3)', [data.old_days, data.these_days, data.year], function(err, result){
      done();
      if(err){
        res.send("An error occurred: ", err)
      }
      res.send(result);
    });
  });
});

router.get('/:year', function(req, res){

});

router.get('/years', function(req, res){

});



module.exports = router;
