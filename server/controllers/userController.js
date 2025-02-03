const User = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'User created successfully !!',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser };
