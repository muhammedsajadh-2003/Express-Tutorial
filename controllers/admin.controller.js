import Product from "../models/product.model.js"

export const addProduct = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.json({ sucess: false, message: "you cant access this API" })
        }
        const { name, price, description, category } = req.body
        if (!name || !price || !description || !category) {
            return res
                .status(400)
                .json({ success: false, message: 'all fields are required' })
        }
        const newProduct = new Product({
            name,
            description,
            price,
            category,
        })
        await newProduct.save();
        return res.json({
            sucess: true,
            message: 'poduct Addess successfully',
            newProduct,
        })
    } catch (error) {
        return res.json({ error: error.message })
    }
}