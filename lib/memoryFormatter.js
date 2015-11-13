module.exports = {
  complete: function(dbResponse){
    console.log('DB Response in complete method:', dbResponse);
    var response = {
      links: {},
      data: []
    };
    dbResponse.rows.forEach(function(row){
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
    return response;
  },

  years: function(dbResponse){
    var response = {
      links: {},
      data: []
    };
    dbResponse.rows.forEach(function(row){
      response.data.push(Number(row.year));
    });
    return response;
  },

  validate: function(reqBody){
    var data = reqBody.data.attributes;
    var response = {
      "error": []
    }
    var currentYear = new Date().getFullYear();
    function ValidationError(title, details){
      this.status = 400;
      this.source = {
        pointer: ""
      };
      this.title = title;
      this.details = details;
    }
    if(data.old_days === '' || data.old_days === null){
      var err = new ValidationError('Missing field old_days', 'old_days must be provided as a string');
      response.error.push(err);
    }
    if (data.these_days === '' || data.these_days === null){
      var err = new ValidationError('Missing field these_days', 'these_days must be provided as a string');
      response.error.push(err);
    }
    if (data.year === '' || data.year === null){
      var err = new ValidationError('Missing field year', 'year must be provided as a number');
      response.error.push(err);
    }
    if (Number(data.year) === NaN){
      var err = new ValidationError('Invalid input', 'Year must be provided as a number');
      response.error.push(err);
    }
    if (Number(data.year) > currentYear){
      var err = new ValidationError('Invalid input', 'Year cannot be a date in the future');
      response.error.push(err);
    }
    return response;
  }
}
