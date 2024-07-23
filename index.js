const express = require('express');
const app = express();
const port = 3200;
const routes = require('./Routes/UserRoute')
const cors = require('cors')

// Use middleware to parse JSON bodies
//add body-parser
app.use(express.json());

app.use(cors({
    origin:"*"   
}))

app.use('/pages', routes)

// Example route handling POST request
app.post('/submit', (req, res) => {
  console.log(req.body);
  res.send('Data received successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});