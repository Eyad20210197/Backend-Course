const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const target = req[source] ?? {};
    const { error, value } = schema.validate(target, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return next(error);
    }

    try {
      req[source] = value;
    } catch {
      Object.defineProperty(req, source, {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }

    next();
  };
};

export default validate;
