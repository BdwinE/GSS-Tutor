module.exports = (app) => {
  // Connect routes
  app.use('/', require('../routes'));

  // Error handler
  app.use((err, req, res, next) => {
    // Handle mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors);
      const message = `Invalid field${errors.length > 1 ? 's' : ''}.`;

      const fields = {};
      for (const error of errors) {
        fields[error.path] = error.kind;
      }

      return res.status(400).json({ error: { message, fields } });
    }

    // Handle internally created errors
    if (err.name === 'ApplicationError') {
      return res.status(err.statusCode).json({ error: { message: err.message } });
    }

    // Last line of defense
    res.status(500).json({ error: { message: 'An unknown error occurred.' } });
  });
};
