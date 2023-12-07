const Product = require("../models/Product");

/**
 * Product GET route handles product retrieving from the db
 * 
 */

module.exports.product_get = async (req, res) => {
    const { name } = req.body
    let product = null

    if (name) {
        product = await Product.find({ name: {$regex: `^${name}`, $options: "i"} });
    } else {
        product = await Product.find({})
    }

    res.send(product)

}

module.exports.product_post = async (req, res) => {
    const {
        name,
        kcal,
        carbs,
        protein,
        fat,
        gramInTableSpoon,
        gramInTeaSpoon,
        gramInItem
    } = req.body

    try {
        const product = await Product.create({
            name: name,
            kcal: kcal,
            carbs: carbs,
            protein: protein,
            fat: fat,
            gramInTableSpoon: gramInTableSpoon,
            gramInTeaSpoon: gramInTeaSpoon,
            gramInItem: gramInItem
        })

        res.status(201).send(`Product ${product.name} was created`)

    } catch (error) {
        res.status(400).json({"error": error.message})
    }
}


/**
 * Product POST route handles creating a new procuct and saving it into the db
 */