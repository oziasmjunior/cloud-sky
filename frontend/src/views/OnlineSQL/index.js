import React, { useState, useEffect } from 'react';
import SPOC_API from '../../services/spoc_api'

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton } from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';

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

    const [sqlHead, setSqlHead] = useState([]);
    const [sqlBody, setSqlBody] = useState([]);

    const connectionOptions = [
        { key: 'connections', text: 'Conexões', itemType: DropdownMenuItemType.Header },
        { key: 'testme', text: 'Teste Me' },
        { key: 'newConnections', text: 'Nova Conexão', itemType: DropdownMenuItemType.Header },
        { key: 'FormMysql', text: 'MySQL' }
    ]

    const SendScript = () => {
        let data;

        if (selectConnection === 'FormMysql') {
            data = connection;
            data['sql'] = sqlScript
        } else {
            data = { conn: selectConnection, sql: sqlScript }
        }

        console.log(data)

        setSqlHead([]);
        setSqlBody([]);
        setStatus("Consultando...")

        SPOC_API('post', '/database', data)
            .then(value => {
                if (value.data.code === undefined) {
                    setSqlHead(value.data.head)
                    setSqlBody(value.data.body)
                    setStatus("Sucesso")
                    console.log(value)
                } else {
                    setStatus(value.data.message)
                }
            })

    }

    let columns = [
        { key: 'column1', name: 'Name', fieldName: 'name', isResizable: true },
        { key: 'column2', name: 'Value', fieldName: 'value', isResizable: true },
    ]

    let items = [
        {key: 1, name: 'Item A', value: 1},
        {key: 2, name: 'Item B', value: 2},
        {key: 3, name: 'Item C', value: 3},
        {key: 4, name: 'Item D', value: 4},
        {key: 5, name: 'Item E', value: 5},
        {key: 6, name: 'Item F', value: 6},
        {key: 7, name: 'Item G', value: 7},
        {key: 8, name: 'Item H', value: 8},
        {key: 9, name: 'Item I', value: 9},
        {key: 10, name: 'Item J', value: 10},
    ]

    return (
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" className={classes.fullWidth} >

            <Grid item xs={2}>
                <PrimaryButton text="Executar" onClick={SendScript} allowDisabledFocus />
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" >

                    <Grid item xs={3}>
                        <Dropdown
                            placeholder="Selecione uma conexão"
                            label="Conexões Banco de Dados"
                            options={connectionOptions}
                            onChange={(event, item) => { setSelectConnection(item.key) }}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        {selectConnection === 'FormMysql' ? <FormMysql setConnection={setConnection} /> : null}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <TextField id="sql-script" label="Script" multiline rows={10} value={sqlScript} onChange={(event, value) => { setSqlScript(value) }} />
            </Grid>
{/* 
            <Grid item xs={12}>
                <table border="1">
                    <thead><tr>{sqlHead.map((item, index) => (<th key={index}>{item}</th>))}</tr></thead>
                    <tbody>{
                        sqlBody.map((row, index) => (
                            <tr key={index}>
                                {sqlHead.map((cell, index) => (<td key={index}>{row[cell]}</td>))}
                            </tr>
                        ))
                    }</tbody>
                </table>
                {status}
            </Grid>
*/}
            <Grid xs={12}>
                <DetailsList
                    items={sqlBody}
                    columns={sqlHead}
                    setKey="set"
                    ariaLabelForSelectionColumn="Toggle selection"
                    ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                    checkButtonAriaLabel="Row checkbox"
                />
            </Grid>

        </Grid>
    )
}

export default SQLView;