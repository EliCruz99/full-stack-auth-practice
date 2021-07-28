import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/user.js"

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 11
const TOKEN_KEY = process.env.TOKEN_KEY || "123456789"


const today = new Date()
const expiration = new Date(today)
expiration.setDate(today.getDate() + 14)

export const signUp = async (req, res) => {
  try {
    // res.send(req.body)
    const { userName, email, password } = req.body
    const password_digest = await bcrypt.hash(password.toString(), SALT_ROUNDS)

    const user = new User({
      email,
      userName,
      password_digest
    })

    await user.save()

    const payload = {
      id: user._id,
      userName: user.userName,
      email: user.email,
      exp: parseInt(expiration.getTime() / 1000)

    }
    const token = jwt.sign(payload, TOKEN_KEY)

    res.status(201).json({token})

  } catch (e) {
    res.status(400).json({error: e.message})
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select(
      "email userName password_digest"
    )

    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        userName: user.userName,
        email: user.email,
        exp: parseInt(expiration.getTime() / 1000)
      }
      const token = jwt.sign(payload, TOKEN_KEY)
      res.status(201).json({token})
    } else {
      res.status(401).json({error: "Invalid Credentials"})
    }
  } catch (e) {
    res.status(500).json({error: e.message})
  }
}

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, TOKEN_KEY)

    if (payload) {
      res.json(payload)
    }
  } catch (e) {
    console.log(e.message)
    res.status(401).json({error: "Not Authorized"})
  }
}