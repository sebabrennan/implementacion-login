export const errorHandler = (error, req, res, next) => {
    console.log( `error ${error}`) 
    const status = error.status || 400
    res.status(status).send({msg: error})
}