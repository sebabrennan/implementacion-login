import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {

    async getAll(page = 1, limit = 10, name, sort) {
        try {
            const filter = name ? { "name" : name } : {};
            let sortOrder = {};
            if(sort) sortOrder.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
            return await ProductModel.paginate(filter, {page, limit, sort: sortOrder });
        } catch (error) {
          throw new Error(error);
        }
    }
    
    async create(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async getById(id) {
        try {
            const response = await ProductModel.findById(id);
            if(response){
                console.log(`Usuario encontrado: ${response}`);
                return response
            } else {
                console.log("Usuario no encontrado");
            }
        } catch (error) {
            throw new Error(`Error al buscar el usuario: ${error}`);
        }
    }
    
    async update(id, obj) {
        try {
            const response = await ProductModel.findByIdAndUpdate(id, obj, {
                new: true,
              });
            return response;
        } catch (error){
            throw new Error(error);
        }
    }
    
    async delete(id) {
        try{
            const response = await ProductModel.findByIdAndDelete(id);
            return response;   
        }catch (error){
            throw new Error(error);
        }
    }
}