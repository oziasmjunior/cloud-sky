import React, { useState, useEffect } from 'react';
import CloudSkyApi from '../../services/cloudsky_api'

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { CommandBarButton, Stack } from 'office-ui-fabric-react';


import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FormMysql from './FormConnection/form_mysql';

const useStyles = makeStyles(() => ({
    fullWidth: {
        width: "100%",
        margin: "0"
    },
    playButton: {
        background: '#0e7a0d',
        color: '#fff',
    },
    cleanButton: {
        background: '#ff2800',
        color: '#fff',
    },
    textField: {
        overflow: 'auto',
        whiteSpace: 'noWrap',
    }
}));

function SQLView() {
    const classes = useStyles();
    const [status, setStatus] = useState('');

    const [selectConnection, setSelectConnection] = useState('');
    const [connection, setConnection] = useState('');
    const [sqlScript, setSqlScript] = useState('');

    const [sqlHeadResult, setSqlHeadResult] = useState([]);
    const [sqlBodyResult, setSqlBodyResult] = useState([]);

    const connectionOptions = [
        { key: 'connections', text: 'Conexões', itemType: DropdownMenuItemType.Header },
        { key: 'Open-Base', text: 'Open-Base' },
    ]

    const menuProps = {
        items: [
            {
                key: 'SavedConnection',
                text: 'Conexões Salvas',
                onClick: (event, value) => { setSelectConnection(value.key) }
            },
            {
                key: 'divider_1',
                itemType: ContextualMenuItemType.Divider
            },
            {
                key: 'FormMysql',
                text: 'MySQL',
                onClick: (event, value) => { setSelectConnection(value.key) }
            },
        ],
    };

    const SendScript = () => {
        let data;

        if (selectConnection === 'FormMysql') {
            data = connection;
            data['sql'] = sqlScript
        } else {
            data = { conn: selectConnection, sql: sqlScript }
        }

        console.log(data)

        setSqlHeadResult([]);
        setSqlBodyResult([]);
        setStatus("Consultando...")

        CloudSkyApi('post', '/database', data)
            .then(value => {
                if (value.data.code === undefined) {
                    setSqlHeadResult(value.data.head)
                    setSqlBodyResult(value.data.body)
                    setStatus("Sucesso")
                    console.log(value)
                } else {
                    setStatus(value.data.message)
                }
            })

    }

    const stackStyles = { root: { height: 44 } };
    return (
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" className={classes.fullWidth} >

            <Grid item xs={12}>
                <Stack horizontal styles={stackStyles}>
                    <CommandBarButton iconProps={{ iconName: 'Play' }} text="Executar" onClick={SendScript} />
                    <CommandBarButton iconProps={{ iconName: 'Add' }} text="Nova Conexão" menuProps={menuProps} />
                </Stack>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" >



                    {selectConnection === 'FormMysql' ?
                        <Grid item xs={12}>
                            <FormMysql setConnection={setConnection} />
                        </Grid>
                        :
                        <Grid item xs={12}>
                            <Dropdown
                                placeholder="Selecione uma conexão"
                                label="Conexões Salvas"
                                options={connectionOptions}
                                onChange={(event, item) => { setSelectConnection(item.key) }}
                            />
                        </Grid>
                    }
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <TextField id="sql-script" label="Script" multiline rows={10} value={sqlScript} onChange={(event, value) => { setSqlScript(value) }} />
            </Grid>

            {sqlHeadResult.length > 0 ?
                <Grid xs={12}>
                    <DetailsList
                        items={sqlBodyResult}
                        columns={sqlHeadResult}
                        setKey="set"
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="Row checkbox"
                    />
                </Grid>
            : null}
        </Grid>
    )
}

export default SQLView;