
const { User } = require('../models');

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user || !user.checkPassword(req.body.password)) {
      return res.status(400).send('Invalid credentials');
    }
    req.session.user_id = user.id;
    req.session.username = user.username;
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

module.exports = { loginUser, logoutUser };
