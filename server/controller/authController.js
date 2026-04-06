const User = require('../model/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleLogin = async (res, req) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: 'Username and password is required' });
  }
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    return res.sendStatus(401);
  }
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const role = Object.value(foundUser.roles);
    //create Jwt
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: foundUser.username,
          role: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' },
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' },
    );
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None',
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
