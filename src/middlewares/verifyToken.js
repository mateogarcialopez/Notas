const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;
    jwt.verify(token, 'claveSecreta', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: false,
                message: 'Token invalido'
            })
        }

        if (decoded) {
            req.user = decoded.user[0];
        }
    })
    console.log(req.user)
    next()
}


const verifyRol = (req, res) => {
    const rol = req.user.rol
    
    console.log(rol)
}

module.exports = {
    verifyToken,
    verifyRol
}