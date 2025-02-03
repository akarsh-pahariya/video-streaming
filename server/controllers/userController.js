const User = require('../models/userModel');

const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'User created successfully !!',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser };
