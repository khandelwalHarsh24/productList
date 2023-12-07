const express=require('express');
const router=express.Router();

const {getUserData,postUserData,loginUser,getSingleUser}=require('../controller/userData');

router.route('/getuser').get(getUserData);

router.route('/postuser').post(postUserData);

router.route('/login').post(loginUser)

router.route('/user/:id').get(getSingleUser);

module.exports=router;