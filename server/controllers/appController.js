import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Imports
import { pool } from "../db.js";

// Helpers
function signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "1d" });
}

/* POST Route Controllers */

// Controller for registered users - POST
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body || {};

        // Basic validation
        if (!name || name.trim().length < 2) {
            return res.status(422).json({ message: "Name is required (2+ chars)" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(422).json({ message: "Valid email is required" });
        }
        if (!password || password.length < 6) {
            return res.status(422).json({ message: "Password must be 6+ characters" });
        }

        // Check existing
        const [exists] = await pool.query("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
        if (exists.length) {
            return res.status(409).json({ message: "Email already registered" });
        }

        // Hash + insert
        const password_hash = await bcrypt.hash(password, 12);
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name.trim(), email.toLowerCase(), password_hash]
        );

        const user = { id: result.insertId, name: name.trim(), email: email.toLowerCase() };
        const token = signToken({ id: user.id });

        res.status(201).json({ user, token });
    } catch (err) {
        console.error("registerUser error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Controller for login users - POST
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(422).json({ message: "Email and password are required" });
        }

        const [rows] = await pool.query(
            "SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1",
            [email.toLowerCase()]
        );

        if (!rows.length) return res.status(401).json({ message: "Invalid credentials" });

        const user = rows[0];

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: "Invalid credentials" });

        const token = signToken({ id: user.id });
        res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (err) {
        console.error("loginUser error:", err);
        res.status(500).json({ message: "Server error" });
    }
};