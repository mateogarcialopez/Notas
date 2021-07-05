const verifyRol = (req, res, next) => {
    const { rol } = req.user

    if (rol === 'admin') {
        next()
    } else {
        return res.status(404).json({
            status: false,
            message: 'No tiene permisos para realizar esta acción'
        })
    }
}

module.exports = { verifyRol }