import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Text } from 'office-ui-fabric-react/lib/Text';

const useStyles = makeStyles(() => ({
    fullWidth: {
        width: "100%",
        margin: "0"
    }
}));

function HomeView() {
    const classes = useStyles();
    return (
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" className={classes.fullWidth} >
            <Grid item xs={12}>
                <Text key={1} variant="mediumPlus" nowrap block>
                    Olá a primeira ferramenta desenvolvida serve para realizar operações em banco de dados.<br />
                    Para testar use a conexão salva Open-Base e execute a query: <code>select * from country</code>
                </Text>
            </Grid>
        </Grid>
    )
}

export default HomeView;