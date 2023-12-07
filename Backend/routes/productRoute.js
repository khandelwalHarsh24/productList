const express=require('express');
const router=express.Router();


const {getProduct,postProductData,selectProduct,deselectProduct}=require('../controller/productData');

router.route('/getProduct').get(getProduct);
router.route('/postProduct').post(postProductData);
router.route('/product/:id').post(selectProduct)
router.route('/deselect/:id').post(deselectProduct);


module.exports=router   