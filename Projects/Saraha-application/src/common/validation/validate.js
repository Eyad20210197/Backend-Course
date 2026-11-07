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

    req[source] = value;

    next();
  };
};

export default validate;
