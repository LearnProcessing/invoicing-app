function errorHandler(err, req, res, next) {
    switch(err.name){
        case 'SequelizeValidationError':
            errors = err.errors.map(e => {
                return {
                    message: e.message
                }
            })
            res.status(400).json(errors)
            
            break
        default: 
            res.status(500).json(errors)

    }
}

module.exports = { errorHandler }