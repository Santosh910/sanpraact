import { mongoose, Schema } from "mongoose";

const product = new Schema({
    name: String,
    price: Number,
    category: { type: String },
    image: String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
export default mongoose.model('product', product)