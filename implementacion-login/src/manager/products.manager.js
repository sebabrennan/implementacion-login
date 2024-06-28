import { ProductModel } from "../daos/mongodb/models/product.model.js";

export default class ProductManager {
  
    async getProducts() {
      try {
        return await ProductModel.find({});
      } catch (error) {
        throw new Error(error)
      }
    }
  
    async addProduct(obj) {
      try {
        return ProductModel.create(obj);
      } catch (error) {
        throw new Error(error)
      }
    }
  
    async getProductById(productId) {
      try {
        const products = await this.getProducts();
        const checkId = products.find((product) => product.id === productId);
        if (!checkId) return false;
        else return checkId;
      } catch (error) {
        throw new Error(error);
      }
    }
  
    async updateProduct(productId, updateData) {
      try {
        const products = await this.getProducts();
        let product = await this.getProductById(productId);
        if (product) {
          const productIndex = products.findIndex(
            (product) => product.id === productId
          );
          const finalProduct = { ...product, ...updateData };
          products.splice(productIndex, 1, finalProduct);
          await fs.promises.writeFile(this.path, JSON.stringify(products));
          return finalProduct;
        } else {
            return null
        }
      } catch (error){
        throw new Error(error);
      }
    }
  
    async deleteProduct(productId) {
      try{
        const products = await this.getProducts();
        const productsFilter = products.filter((product) => product.id !== (productId));
        if(productsFilter){
            await fs.promises.writeFile(this.path, JSON.stringify(productsFilter));
            return true
        }
        else return null
      } catch (error){
        throw new Error(error);
      }
    }
}