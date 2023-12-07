const productSchema = require("../model/product");
const userSchema=require('../model/user');
const mongoose = require('mongoose');

const getProduct=async(req,res)=>{
    const productData=await productSchema.find();
    if(!productData){
        res.status(500).json({ "Message": "No Data" });
    }
    res.status(200).json(productData);
}

const postProductData = async (req, res) => {
    let newProduct = new productSchema({
      name: req.body.name,
      imgUrl: req.body.imgUrl,
      price: req.body.price,
    });
    newProduct = await newProduct.save();
  
    if (!newProduct) return res.status(404).json({"message":"The user cannot be created"});
    res.status(200).json(newProduct);
};


const selectProduct = async (req, res) => {
    const productId = req.params.id;
    // console.log(req.body);
    const userId = req.body.userId; // Assuming userId is sent in the request body
    // console.log(userId);
    try {
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const product = await productSchema.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'No product found' });
        }

        let user = await userSchema.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isProductAlreadySelected = user.selectedProducts.includes(product._id);

        if (isProductAlreadySelected) {
            return res.status(400).json({ message: 'Product is already selected' });
        }
        // Assuming selectedProducts is an array of product IDs in the userSchema
        user.selectedProducts.push(product._id);

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const deselectProduct=async(req,res)=>{
    const productId = req.params.id;
    // console.log(req.body);
    const userId = req.body.userId;
    try {
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const product = await productSchema.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'No product found' });
        }

        let user = await userSchema.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isProductAlreadySelected = user.selectedProducts.includes(product._id);

        if (!isProductAlreadySelected) {
            return res.status(400).json({ message: 'User does not have selected product' });
        }

        const productObjectId = new mongoose.Types.ObjectId(productId);

        user.selectedProducts = user.selectedProducts.filter(productId => !productId.equals(productObjectId));

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



module.exports={getProduct,postProductData,selectProduct,deselectProduct};
