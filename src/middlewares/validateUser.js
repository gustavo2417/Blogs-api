const validationFields = (req, res, next) => {
  const { displayName, password } = req.body;
  
  if (!displayName || displayName.length < 8) {
    return res.status(400)
    .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  if (!password || password.length < 6) {
    return res.status(400)
    .json({ message: '"password" length must be at least 6 characters long' });
  }

  return next();
};

const validationEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  const testEmail = regex.test(req.body.email);
    
  if (!email || !testEmail) {
    return res.status(400).json({ message: '"email" must be a valid email' });
    }

  return next();
};
  
module.exports = {
  validationFields,
  validationEmail,
};