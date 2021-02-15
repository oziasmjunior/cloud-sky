function oracleJSON(data) {
    let jsonResponse = {
        head: [],
        body: [],
        status: null
    }

    if (data.rows !== undefined && data.metaData !== undefined) {
        for (let i = 0; i < data.metaData.length; i++) {
            jsonResponse.head.push(data.metaData[i].name);
        }

        for (let i = 0; i < data.rows.length; i++) {
            let row = {};
            for (let x = 0; x < data.rows[i].length; x++) {
                row[data.metaData[x].name] = data.rows[i][x];
            }
            jsonResponse.body.push(row);
        }

        jsonResponse.status = "success";
    }

    return (jsonResponse);
}

module.exports = oracleJSON;