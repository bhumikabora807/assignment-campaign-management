const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory pages (as per assignment)
const pages = [
  { id: '1', name: 'Facebook Page', category: 'Business' },
  { id: '2', name: 'Instagram Page', category: 'Community' },
  { id: '3', name: 'LinkedIn Page', category: 'Education' }
];

// GET all pages
router.get('/', (req, res) => {
  res.status(200).json(pages);
});

// CREATE page
router.post('/', (req, res) => {
  const { name, category } = req.body;

  if (!name || !category) {
    return res.status(400).json({ message: 'Invalid page data' });
  }

  const page = {
    id: uuidv4(),
    name,
    category
  };

  pages.push(page);
  res.status(201).json(page);
});

module.exports = router;