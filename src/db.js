const mysql = require('mysql')
const { promisify } = require('util')


/*
consola: mysql -h bkfgmuyo1sgakmoyrpf1-mysql.services.clever-cloud.com -P 3306 -u uc2mtsdfeac3vtud -p bkfgmuyo1sgakmoyrpf1
CleverCloud
host: bkfgmuyo1sgakmoyrpf1-mysql.services.clever-cloud.com
db name: bkfgmuyo1sgakmoyrpf1
user: uc2mtsdfeac3vtud
password: L3FIXE03Av6wjfFbPosQ
port: 3306
*/
const config = {
    host: 'bkfgmuyo1sgakmoyrpf1-mysql.services.clever-cloud.com',
    user: 'uc2mtsdfeac3vtud',
    password: 'L3FIXE03Av6wjfFbPosQ',
    database: 'bkfgmuyo1sgakmoyrpf1'
}

const pool = mysql.createPool(config)

pool.getConnection((err, con) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('CONNECTION DATABASE WAS CLOSED');
        }

        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS MANY CONNECTIONS');
        }

        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNETION WAS REFUSED');
        }
    }

    if (con) con.release()
    console.log('Conexión con la base de datos')
    return
})

pool.query = promisify(pool.query)

module.exports = pool