var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = process.env.POSTGRES_SERVER;

router.route('/')
.get(function(req, res){

})
.post(function(req, res){
  pg.connect(conString, function(err, client, done){
    client.query('INSERT INTO memories (old_days, these_days, year) values ($1, $2, $3)', [req.body.old_days, req.body.these_days, req.body.year], function(err, result){
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
