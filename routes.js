const ObjectID = require('mongodb').ObjectID;

module.exports = (app, client) => {
  const db = client.db('node_exercise_13');
  const collection = db.collection('contacts');

  app.get('/contacts/', (req, res) => {
    collection.find({}).toArray((err, result) => {
      if (err || !result) {
        res.status(400).json({ 'error': 'An error has occurred' });
      } else {
        res.json(result);
      }
    });
  });

  // {"first": "Alex", "last": "Belousov", "phone": "+79817017655"}
  app.post('/contacts/', (req, res) => {
    const newContact = { first: req.body.first, last: req.body.last, phone: req.body.phone };

    collection.insert(newContact, (err, result) => {
      if (err || !result) {
        res.status(400).json({ 'error': 'An error has occurred' });
      } else {
        res.json(result.ops[0]);
      }
    });
  });

  app.delete('/contacts/:id', (req, res) => {
    const id = req.params.id;
    collection.remove({ '_id': new ObjectID(id) }, (err, result) => {
      if (err || !result) {
        res.status(400).json({ 'error': 'An error has occurred' });
      } else {
        res.json({ result: result.result.n + ' document(s) deleted' });
      }
    });
  });

  app.get('/contacts/:id', (req, res) => {
    const id = req.params.id ;
    collection.findOne({ '_id': new ObjectID(id) }, (err, result) => {
      if (err || !result) {
        res.status(400).json({ 'error': 'An error has occurred' });
      } else {
        res.json(result);
      }
    });
  });

  app.put('/contacts/:id', (req, res) => {
    const id = req.params.id;
    const newContact = { first: req.body.first, last: req.body.last, phone: req.body.phone };
    collection.update({ '_id': new ObjectID(id) }, newContact, (err, result) => {
      if (err || !result) {
        res.status(400).json({ 'error': 'An error has occurred' });
      } else {
        res.json({ result: result.result.nModified + ' document(s) updated' });
      }
    });
  });

  app.get('/contacts/search/:query', (req, res) => {
    const query = req.params.query;
    collection.find({ $or: [ { first: query }, { last: query }, { phone: query } ] }).toArray((err, result) => {
      if (err || !result) {
        res.status(400).json({ 'error': 'An error has occurred' });
      } else {
        res.json(result);
      }
    });
  });
}
