const { Router } = require('express');
const {
  createUser,
  createUserId,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const router = Router();

/**
 * POST /
 * Create new user
 */
router.post('/', createUser);

/**
 * POST /
 * Create new user given an auth0's Id
 */
 router.post('/:id', createUserId);

/**
 * GET /
 * Get all users
 */
router.get('/', getAllUsers);

/**
 * GET /:id
 * Get a user by id
 */
router.get('/:id', getUser);

/**
 * PUT /:id
 * Update a user by id
 */
router.put('/:id', updateUser);

/**
 * DELETE /:id
 * Delete a user by id
 */
router.delete('/:id', deleteUser);

module.exports = router;
