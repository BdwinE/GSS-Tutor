const db = require('../db');

module.exports = {
  /**
   * Global teardown for mocha tests.
   */
  async mochaGlobalTeardown() {
    await db.close();
    await this.mongoServer.stop();
  },
};
