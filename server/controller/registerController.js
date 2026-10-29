const User = require('../model/user');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword)
    return res
      .status(400)
      .json({ message: 'Email, password, and confirm password are required' });

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  //check for duplicate email in the db
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create and store the new user
    const result = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: `New user ${email} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
