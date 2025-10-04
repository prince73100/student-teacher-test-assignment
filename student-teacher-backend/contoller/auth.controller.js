import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';


// Helper to create token & cookie
const sendTokenAsCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

function generateAccessToken(data) {
  return jwt.sign(data, process.env.access_JWT_SECRET, { expiresIn: '5m' });
}

// Signup route
export const handleSignUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    sendTokenAsCookie(res, token);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const handleSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    sendTokenAsCookie(res, token);

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.token;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Refresh token missing" });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const accessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
    });
    console.log(accessToken)

    return res.status(200).json({ success: true, accessToken });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

export const getUserinfo = async (req, res) => {
  try {
    const allUser = await User.findById(req.user.id)
    return res.json({ allUser })
  } catch (error) {

  }
}