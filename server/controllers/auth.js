import User from "../models/User.js ";
import bcrypt from "bcryptjs";
import { createError } from "../errors.js";
import jwt from "jsonwebtoken";
import session from "express-session";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));
    const options = { expiresIn: '1h' };
    if (user.fromGoogle) {
      if(user.password === req.body.password){
        const token = jwt.sign({ id: user._id }, process.env.JWT, options);

        const { password, ...others } = user._doc;
        req.session.user = user
        res
          .cookie("access_token", token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
          })
          .status(200)
          .json(others);
        
      }else{
        res.status(403).json({
            "msg": "password is incorrect!"
        })
      }
     
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT, options);

    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token,  {
        httpOnly: true,
        sameSite: 'none',
        secure: true
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const options = { expiresIn: '1h' };
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT, options);

      res
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: 'none',
          secure: true
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = await new User({
        ...req.body,
        fromGoogle: true,
      });

      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT, options);

      res
        .cookie("access_token", token, {
          sameSite: 'none',
          secure: true
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (error) {
    next(error);
  }
};
