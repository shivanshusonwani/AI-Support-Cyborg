import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;

		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ error: "User already exists" });
		}

		const user = await User.create({
			name,
			email,
			password,
			role: role || "user",
		});

		const token = jwt.sign(
			{ id: user._id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "7d" },
		);

		res.status(201).json({
			message: "User registered successfully",
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		const token = jwt.sign(
			{ id: user._id, email: user.email, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" },
		);
		res.json({
			token,
			userId: user.id,
			name: user.name,
			role: user.role,
		});
	} else {
		res.status(401).json({ error: "Invalid credentials" });
	}
};
