const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: 'd79e473f614c4fb3bec9633fa56ccfe9'
});

const handleApiCall = (req, res) => {
  app.models
    // This part has been updated with the recent Clarifai changes. Used to be:
    // .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .predict('a403429f2ddf4b49b307e318f00e528b', req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}