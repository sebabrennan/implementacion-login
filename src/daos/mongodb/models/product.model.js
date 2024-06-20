import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const productCollectionName = "products"

export const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: Array }
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model(
  productCollectionName,
  productSchema
);
