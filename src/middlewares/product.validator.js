export const productValidator = (req, res, next) => {
    const product = {...req.body};
    if (!product.title, !product.description, !product.price, !product.code, !product.stock, !product.category) return res.status(404).json({msg: 'Faltan campos por completar'});
    else next();
}