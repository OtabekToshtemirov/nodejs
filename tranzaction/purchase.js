const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/mydb';


mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const productSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
});

const Product = mongoose.model('Product', productSchema);


async function purchaseProduct(productId, quantity) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find the product
        const product = await Product.findById(productId, { session });
        if (!product) {
            throw new Error('Product not found');
        }

        // Check if sufficient quantity available
        if (product.quantity < quantity) {
            throw new Error('Insufficient quantity available');
        }

        // Update product quantity
        await Product.findByIdAndUpdate(productId, { $inc: { quantity: -quantity } }, { session });

        // Create a purchase record
        await new Purchase({ productId, quantity }).save({ session });

        await session.commitTransaction();
        console.log('Product purchased successfully!');
    } catch (error) {
        await session.abortTransaction();
        console.error('Error during purchase: ', error.message);
    } finally {
        session.endSession();
    }
}

const Purchase = mongoose.model('Purchase', new mongoose.Schema({
    productId: String,
    quantity: Number
}));


module.exports = {
    purchaseProduct
};

