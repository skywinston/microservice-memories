var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = process.env.POSTGRES_SERVER;
var memoryFormatter = require('../../lib/memoryFormatter');

router.route('/')
.get(function(req, res){
  pg.connect(conString, function(err, client, done){
    client.query('SELECT * FROM memories', function(err, result){
      done();
      // build an object per the spec to send back via res.json
      var response = memoryFormatter.complete(result);
      res.json(response);
    });
  });
})
.post(function(req, res){
  var data = req.body.data.attributes;
  pg.connect(conString, function(err, client, done){
    client.query('INSERT INTO memories (old_days, these_days, year) values ($1, $2, $3)', [data.old_days, data.these_days, Number(data.year)], function(err, result){
      done();
      if(err){
        res.send("An error occurred: ", err)
      }
      // build an object per the spec to send back via res.json
      var response = memoryFormatter.complete(result);
      res.json(response);
    });
  });
});

router.get('/years', function(req, res){
  pg.connect(conString, function(err, client, done){
    client.query('SELECT year FROM memories', function(err, result){
      if(err){
        res.status(500).send("Error: ", err);
      }
      // build an object per the spec to send back via res.json
      var response = memoryFormatter.years(result);
      res.json(response);
    });
  });
});

router.get('/:year', function(req, res){
  pg.connect(conString, function(err, client, done){
    client.query('SELECT * FROM memories WHERE year=$1', [req.params.year], function(err, result){
      if(err){
        res.status(500).send("Error: ", err);
      }
      // build an object per the spec to send back via res.json
      var response = memoryFormatter.complete(result);
      res.json(response);
    });
  });
});




module.exports = router;
