function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    try {
      const maybePromise = fn(req, res, next);
      if (maybePromise && typeof maybePromise.then === 'function') {
        maybePromise.catch(next);
      }
    } catch (err) {
      setImmediate(() => next(err));
      next(err);
    }
  };
}

module.exports = { asyncHandler };


