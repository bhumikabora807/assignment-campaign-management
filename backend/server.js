const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/pages', require('./routes/pages.routes'));
app.use('/campaigns', require('./routes/campaign.routes'));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});