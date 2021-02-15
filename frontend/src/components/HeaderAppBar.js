import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { Icon } from '@fluentui/react/lib/Icon';

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: 'rgb(56,56,56)',
        color: '#FFF'
    },
    title: {
        flexGrow: 1,
        fontWeight: 700,
        fontFamily: 'Ubuntu',
    },
    signature: {
        textAlign: "center",
        fontFamily: 'Ubuntu',
        fontSize: '14px',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    }
}));

export default function HeaderAppBar(props) {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton} onClick={props.ActionMenu}>
                    <Icon iconName="GlobalNavButton" />
                </IconButton>
                <Typography variant="h5" className={classes.title}>Cloud Sky</Typography>

                <Grid item className={classes.signature} >
                    Developed by <b>Ozias Junior</b>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
