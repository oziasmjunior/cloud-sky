const oracledb = require('oracledb');
const OracleJSON = require('../../utils/OracleJSON');

try {
    oracledb.initOracleClient({ libDir: 'C:\\OracleHome11g\\product\\11.2.0\\client_1\\BIN' });
} catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
}

async function connection(sql, credentials) {
    let conn;

    try {
        conn = await oracledb.getConnection({
            user: credentials.user,
            password: credentials.pass,
            connectString: credentials.conn
        });

        let result = await conn.execute(sql);
        return OracleJSON(result)
    } catch (err) {
        return ({
            code: err.errorNum,
            message: err.message,
            position: err.offset
        })
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

module.exports = connection;