const mysql2 = require('mysql2/promise');

async function mysql(sql, credentials) {
    let connection, data, result;

    try {
        connection = mysql2.createPool({
            host: credentials.conn.host,
            user: credentials.user,
            password: credentials.pass,
            database: credentials.conn.database
        });

        data = await connection.execute(sql);
    } catch (error) {
        data = {
            code: 'CONN_MYSQL',
            message: {
                code: error.code,
                code_number: error.errno,
                message: error.message
            }
        }
        console.log(error)
        return data
    }

    try {
        let res = new standard("mysql", data);
        result = res;
    } catch (error) {
        result = { code: 1, message: 'Falha interna ao realizar sua consulta' }
        console.error(error)
    } finally {
        return result;
    }
}

module.exports = mysql;

class standard {
    constructor(db = null, data = null) {
        this.jsonResponse = {
            head: [],
            body: [],
            status: "success"
        }

        if (db === null || data === null) {
            throw "Parametros db e data devem ser informados para a função standard"
        } else if (db === 'mysql') {
            this.mysql(data)
        } else {
            throw "O parametro db deve ser uma das previamente cadastradas"
        }

        console.log(this.jsonResponse)
        return this.jsonResponse
    }
    mysql(data) {
        let [rows, fields] = data;

        try {
            fields.forEach((field, index) => {
                this.jsonResponse.head.push({
                    key: index,
                    name: field.name,
                    fieldName: field.name,
                    minWidth: 100,
                    maxWidth: 200,
                    isResizable: true
                })
            });

            rows.forEach((row, index) => {
                row['key'] = index;
                this.jsonResponse.body.push(row);
            });
        } catch (error) {
            this.jsonResponse.status = `Standard MySQL: ${error.name} -> ${error.message}`
            console.log(error.name)
            console.log(error.message)
        }

    }
}