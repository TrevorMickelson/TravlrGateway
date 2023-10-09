var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));
const request = require('request');
const apiOptions = {
 server: 'http://localhost:3000'
}

/* GET travel list view */
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'GET',
      json: {}
    };
    console.info('>> travelController.travelList calling ' + requestOptions.url);
    
    request(requestOptions, (err, { statusCode }, body) => {
      if (err) {
        console.error(err);
      }
      renderTravelList(req, res, body);
    });
  };

  /* internal method to render the travel list */
const renderTravelList = (req, res, responseBody) => {
  let message = null;
  let pageTitle = process.env.npm_package_description + ' - Travel';
  
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No trips exist in our database!';
    }
  }
  
  res.render('travel', {
    title: pageTitle,
    trips: responseBody,
    message: message
  });
};


/* GET travel view */
const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways', trips});
};

const tripsAddTrip = async (req, res) => {
  model
    .create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    },
    (err, trip) => {
      if (err) {
        return res
          .status(400) // bad request, invalid content
          .json(err);
      } else {
        return res
          .status(201) // created
          .json(trip);
      }
    });
}

const tripsUpdateTrip = async (req, res) => {
  console.log(req.body);
  model
 56
  .findOneAndUpdate({ 'code': req.params.tripCode }, {
  code: req.body.code,
  name: req.body.name,
  length: req.body.length,
  start: req.body.start,
  resort: req.body.resort,
  perPerson: req.body.perPerson,
  image: req.body.image,
  description: req.body.description
  }, { new: true })
  .then(trip => {
  if (!trip) {
  return res
  .status(404)
 .send({
  message: "Trip not found with code "
 + req.params.tripCode
  });
  }
  res.send(trip);
  }).catch(err => {
  if (err.kind === 'ObjectId') {
  return res
  .status(404)
  .send({
  message: "Trip not found with code "
 + req.params.tripCode
  });
  }
  return res
  .status(500) // server error
  .json(err);
  });
 }

module.exports = {
    travel,
    travelList,
    renderTravelList,
    tripsAddTrip,
    tripsUpdateTrip
};
