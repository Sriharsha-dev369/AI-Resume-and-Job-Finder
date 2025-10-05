import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function signup(req, res) {
  const { username, password } = req.body;
  const email = req.body.email.toLowerCase();

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "email already exists" });

    const hashedPassword = await bcrypt.hash(password, 7);

    const newUser = await User.create({
      name: username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, "SECRET", { expiresIn: "1d" });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: false (default) - OK for localhost HTTP
      // sameSite: "Lax" (default) - provides basic CSRF protection
    });

    res.status(201).json({ message: "signup successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch)
  return res.status(401).json({ error: "invalid credentials" });

    const token = jwt.sign({ id: user._id }, "SECRET", { expiresIn: "1d" });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: false (default) - OK for localhost HTTP
      // sameSite: "Lax" (default) - provides basic CSRF protection
    });

    res.status(200).json({ message: "login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { signup, login };
