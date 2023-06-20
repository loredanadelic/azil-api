import User from "../models/user.js";
import bcrypt from "bcryptjs";
export const postSignUp = async (req, res, next) => {
  const { email, name, password } =  req.body;
  const existingUser = await User.findOne({where:{ email: email }});
  if (existingUser) {
    next()
    return;
  }
  console.log(name);
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email: email,
    name: name,
    password: hashedPassword,
  });
  res.status(200).json(user);
};

export const postLoginIn = async (req, res, next) => {
  const {email, password}= req.body
  const user=await User.findOne({where:{email:email}})
  if(!user){
    return res.status(400).json('wrong email')
  }
  const isCorrect=bcrypt.compareSync(password, user.password)
  if(!isCorrect){
    return res.status(400).json('wrong password')
  }
  req.session.isLoggedIn=true
  req.session.user=user
  req.session.save()
  res.status(200).json('loged in')
};

export const postLogout=async(req, res, next) => {
    await req.session.destroy(err => {
      console.log(err);
    });
    res.status(200).json('Logout')
}
  
