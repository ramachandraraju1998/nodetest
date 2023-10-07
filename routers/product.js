const express = require("express");
const Product = require("../models/product");
const router = new express.Router();
const auth = require("../middleware/auth");


router.get("/products", auth, async (req, res) => {

    try {
        let productdata = await Product.find({});
        if (!productdata) {
            return res.status(200).json({
                status: "error",
                message: "No Data"
            })
        } else {

             res.status(200).json({
                status: "success",
                data: productdata
            })
        }

    } catch (e) {
        console.log(e)
         res.status(500).json({
            status: "error",
            message: e.message
        })
    }

});


router.post("/product/addProduct", auth, (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            status: "error",
            message: "Product required"
        })
    }
    if (!req.body.quantity) {
        return res.status(400).json({
            status: "error",
            message: "Quantity requried"
        })
    }
    try {
        const product = new Product(req.body)
        product.save();

        if (!product) {
            return res.status(400).json({
                status: "error",
                message: "Something went wrong!"
            })
        }

         res.status(200).json({
            status: "success",
            message: "Product created successfully"
        })

    } catch (e) {
        return res.status(500).json({
            status: "error",
            message: e.message
        })
    }

});

router.put('/product/:id', auth, async (req, res) => {
    const productId = req.params.id;
    const updatedProductData = req.body;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({
            status: "error",
            message: "Product Not Found"
        })
      }
       res.status(200).json({
        status: "success",
        message: "Product updated successfully"
    })
      res.json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
         res.status(500).json({
            status: "error",
            message: error.message
        })
    }
});
  
router.delete('/product/:id', auth,async (req, res) => {
    const productId = req.params.id;
    try {
      const deletedProduct = await Product.findByIdAndRemove(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({
            status: "error",
            message: "Product Not Found"
        })
      }
       res.status(200).json({
        status: "success",
        message: "Product Deleted Successfully"
    })
    } catch (error) {
         res.status(500).json({
            status: "error",
            message: error.message
        })
    }
    
});
module.exports = router;