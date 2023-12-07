const userSchema = require("../model/user");
const bcryptjs=require("bcryptjs");
const jwt=require('jsonwebtoken');

const getUserData=async (req,res)=>{
    const userData=await userSchema.find();
    if(!userData){
        res.status(500).json({ "Message": "No Data" });
    }
    res.status(200).json(userData);
}


const getSingleUser=async(req,res)=>{
    const id=req.params.id;
    const user=await userSchema.findById(id);
    if(!user){
        res.status(500).json({ "Message": "No Data" });
    }
    res.status(200).json(user);
}


const postUserData = async (req, res) => {
    let newUser = new userSchema({
      name: req.body.name,
      username: req.body.username,
      mobile: req.body.mobile,
      password: await bcryptjs.hash(req.body.password,10),
      dob: req.body.dob
    });
    newUser = await newUser.save();
  
    if (!newUser) return res.status(404).json({"message":"The user cannot be created"});
    res.status(200).json(newUser);
};


const loginUser=async(req,res)=>{
    try{
        const {username,password}=req.body;
        const secret=process.env.secret;
        if(!username || !password){
            return res.status(400).json({ message: 'Required fields are missing' });
        }
        const user=await userSchema.findOne({username});
        if(!user){
            return res.status(400).json({message:"User does not Exist"})
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid UserName or password.' });
        }
        const token = jwt.sign({ _id: user._id, name: user.name }, secret, { expiresIn: '2h' });
        res.status(200).json({ userdata: user,token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports={getUserData,postUserData,loginUser,getSingleUser};