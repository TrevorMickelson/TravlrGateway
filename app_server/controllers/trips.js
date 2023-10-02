const mongoose = require('mongoose'); // (a)
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips (b)
const tripsList = async (req, res) => {
  Model
    .find({}) // empty filter for all (c)
    .exec((err, trips) => {
      if (trips) { // (d)
        return res
          .status(404)
          .json({ "message": "trips not found" });
      } else if (err) {
        return res
          .status(404)
          .json(err);
      } else {
        return res // (e)
          .status(200)
          .json(trips);
      }
    });
};

// GET: /trips/:tripCode - returns a single trip (f)
const tripsFindByCode = async (req, res) => {
  Model
    .find({ 'code': req.params.tripCode }) // (g)
    .exec((err, trip) => {
      if (!trip) {
        return res
          .status(404)
          .json({ "message": "trip not found" });
      } else if (err) {
        return res
          .status(404)
          .json(err);
      } else {
        return res
          .status(200)
          .json(trip);
      }
    });
};

module.exports = {
  tripsList,
  tripsFindByCode
};
