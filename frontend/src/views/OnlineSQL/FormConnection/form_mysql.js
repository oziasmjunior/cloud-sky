import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

function FormMysql(props) {
    const [connection, setConnection] = useState({
        user: '',
        pass: '',
        conn: {
            host: '',
            database: ''
        }
    });

    const onChange = (event, value) => {
        let temp = connection;
        let name = event.target.name;

        if(name === 'host' || name === 'database'){
            temp.conn[event.target.name] = value;
        }else{
            temp[event.target.name] = value;
        }

        setConnection(temp)
        props.setConnection(temp)
    }

    return (

        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" >
            <Grid item xs={3}>
                <TextField id="sql-user" name="user" label="Usuario" onChange={(event, value) => { onChange(event, value) }} />
            </Grid>
            <Grid item xs={3}>
                <TextField id="sql-pass" name="pass" label="Senha" onChange={(event, value) => { onChange(event, value) }} />
            </Grid>
            <Grid item xs={3}>
                <TextField id="sql-conn-host" name="host" label="Servidor" onChange={(event, value) => { onChange(event, value) }} />
            </Grid>
            <Grid item xs={3}>
                <TextField id="sql-conn-database" name="database" label="Base" onChange={(event, value) => { onChange(event, value) }} />
            </Grid>
        </Grid>

    )
}

export default FormMysql;