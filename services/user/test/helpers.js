const User = require('../models/User');

module.exports = {
  /**
   * Clear each collection of all data.
   */
  async clearDatabase() {
    await User.deleteMany();
  },

  /**
   * Create initial parameters that mimic a route handler
   */
  initRouteParams() {
    return {
      req: {},
      res: {
        json(data) {
          return data;
        },
      },
      next() {},
    };
  },
};
