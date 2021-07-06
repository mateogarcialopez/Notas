const pool = require('../db')

const addNota = async (req, res) => {

    try {
        const nota = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            descripcion: req.body.descripcion,
            foto: req.body.foto,
            id_usuario: req.body.id_usuario,
        }

        const noteAdded = await pool.query('INSERT INTO notas SET ?', [nota])

        return res.status(201).json({
            status: true,
            message: 'Nota agregada con exito'
        })
    } catch (error) {
        return res.status(409).json({
            status: false,
            error
        })
    }
}

const getNotas = async (req, res) => {
    try {
        const noteAdded = await pool.query('SELECT * FROM notas WHERE id_usuario = ?', [req.user.identificacion])

        if (noteAdded.length > 0) {
            return res.json({
                status: true,
                noteAdded
            })
        } else {
            return res.status(204).json({
                status: false,
                message: 'No existen notas del usurio'
            })
        }
    } catch (error) {
        return res.status(409).json({
            status: false,
            error
        })
    }
}

const editNotas = async (req, res) => {
    try {
        const { id } = req.params
        const nota = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            descripcion: req.body.descripcion,
            foto: req.body.foto
        }

        const notaEdited = await pool.query('UPDATE notas SET ? WHERE id = ?', [nota, id])

        return res.json({
            status: true,
            message: 'Nota editada con exito'
        })

    } catch (error) {
        return res.status(409).json({
            status: false,
            error
        })
    }
}

const deleteNota = async(req, res)=>{
    try {
        const {id} = req.params

        const notaDeleted = await pool.query('DELETE FROM notas WHERE id = ?', [id])

        return res.json({
            status: true,
            message: 'Nota eliminada con exito'
        })
    } catch (error) {
        return res.status(409).json({
            status: false,
            error
        })
    }
}

module.exports = {
    addNota,
    getNotas,
    editNotas,
    deleteNota
}