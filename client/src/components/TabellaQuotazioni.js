import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';    

export default function TabellaQuotazioni(props){

    let listaCalciatori = props?.lista.slice(1, props?.lista?.length)

    const [order, setOrder] = useState('desc');

    const ordinaPerValore = () => {
        setOrder(order === 'asc' ? 'desc' : 'asc')
    }

    const sortedLista = [...listaCalciatori].sort((a, b) => {
        if(order === 'asc'){
            return a["Column12"]-b["Column12"]
        } return b["Column12"]-a["Column12"]
    })

    return(
        <Table style={{backgroundColor: '#fafafa'}}>
            <TableHead style={{backgroundColor: 'rgba(0, 0, 0, 0.04)'}}>
                <TableRow>
                    <TableCell><strong>Calciatore</strong></TableCell>
                    <TableCell><strong>Squadra</strong></TableCell>
                    <TableCell><strong>Quotazione iniziale</strong></TableCell>
                    <TableCell><strong>Quotazione attuale</strong></TableCell>
                    <TableCell>
                        <strong>Valore di mercato (su 500 crediti)</strong>
                        <IconButton
                            color="primary"
                            onClick={ordinaPerValore}
                        >
                        { order === 'asc' ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/> }
                        </IconButton>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            { sortedLista.map( calciatore => //slice to remove header result in json
                <TableRow key={calciatore.id}>
                    <TableCell>{calciatore.Column4}</TableCell>
                    <TableCell>{calciatore.Column5}</TableCell>
                    <TableCell>{calciatore.Column7}</TableCell>
                    <TableCell>{calciatore.Column6}</TableCell>
                    <TableCell>{Math.round(calciatore.Column12/2)}</TableCell>
                </TableRow>
                )}
            </TableBody>
        </Table>
    )
}