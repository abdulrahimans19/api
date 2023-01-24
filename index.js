const express =require("express");
const app=express()
const  mongoose=require('./mongo')
app.use(express.json());
app.get('/users', (req, res) => {
    mongoose.find({}, (err, resources) => {
      if (err) return res.status(500).send(err);
      res.send(resources);
    });
  });
app.post('/users', (req, res) => {
    const user = new mongoose(req.body);
    user.save((err, resource) => {
      if (err) return res.status(500).send(err);
      res.send(resource);
    });
  });
app.get('/users/:id', (req, res) => {
    mongoose.findById(req.params.id, (err, resource) => {
      if (err) return res.status(500).send(err);
      if (!resource) return res.status(404).send('Resource not found');
      res.send(resource);
    });
  });
app.put('/users/:id', (req, res) => {
     mongoose.findByIdAndUpdate(req.params.id, req.body,(err, resource) => {
      if (err) return res.status(500).send(err);
      if (!resource) return res.status(404).send('Resource not found');
      res.send(resource);
    });
  });
app.delete('/users/:id', (req, res) => {
    mongoose.findByIdAndDelete(req.params.id,(err, resource) => {
      if (err) return res.status(500).send(err);
      if (!resource) return res.status(404).send('Resource not found');
      res.send('Resource deleted');
    });
  });
app.listen(3000,()=>{
    console.log('server runs');
})