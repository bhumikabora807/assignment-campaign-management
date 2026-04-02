const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const campaigns = [];

function calculateStatus(startDate, endDate) {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today < start) return 'Upcoming';
  if (today > end) return 'Completed';
  return 'Active';
}

// CREATE
router.post('/', (req, res) => {
  const { pageId, name, budget, startDate, endDate } = req.body;

  if (!pageId || !name || budget <= 0 || !startDate || !endDate) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const campaign = {
    id: uuidv4(),
    pageId,
    name,
    budget,
    startDate,
    endDate,
    status: calculateStatus(startDate, endDate)
  };

  campaigns.push(campaign);
  res.status(201).json(campaign);
});

// READ
router.get('/', (req, res) => {
  res.json(
    campaigns.map(c => ({
      ...c,
      status: calculateStatus(c.startDate, c.endDate)
    }))
  );
});

// UPDATE
router.put('/:id', (req, res) => {
  const index = campaigns.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  campaigns[index] = {
    ...campaigns[index],
    ...req.body,
    status: calculateStatus(
      req.body.startDate || campaigns[index].startDate,
      req.body.endDate || campaigns[index].endDate
    )
  };

  res.json(campaigns[index]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const index = campaigns.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  campaigns.splice(index, 1);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;