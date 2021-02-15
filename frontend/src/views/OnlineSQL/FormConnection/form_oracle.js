import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

function form_mysql(props) {
    const [connection, setConnection] = useState({});

    const onChange = (field_info) => {
        console.log(field_info)
    }

    return (

        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" >
            <Grid item xs={3}>
                <TextField id="sql-user" label="Usuario" onChange={(event, value) => { onChange(value) }} />
            </Grid>
            <Grid item xs={3}>
                <TextField id="sql-pass" label="Senha" onChange={(event, value) => { onChange(value) }} />
            </Grid>
            <Grid item xs={3}>
                <TextField id="sql-conn" label="Conexão" onChange={(event, value) => { onChange(value) }} />
            </Grid>
        </Grid>

    )
}

export default HomeView;