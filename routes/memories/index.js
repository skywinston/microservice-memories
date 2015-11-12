var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = process.env.POSTGRES_SERVER;

router.route('/')
.get(function(req, res){
  pg.connect(conString, function(err, client, done){
    client.query('SELECT * FROM memories', function(err, result){
      done();
      // build an object per the spec to send back via res.json
      var response = {
        links: {},
        data: []
      };
      result.rows.forEach(function(row){
        var obj = {};
        obj.type = "memory";
        obj.id = row.id;
        obj.attributes = {};
        obj.attributes.old_days = row.old_days;
        obj.attributes.these_days = row.these_days;
        obj.attributes.year = Number(row.year);
        obj.links = {};
        response.data.push(obj);
      });
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
      res.json(result);
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
      res.json(result);
    })
  })
});

router.get('/years', function(req, res){

});



module.exports = router;
