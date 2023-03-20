import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    IconButton,
    TableRow,
    TableHead,
    TableContainer,
    TableBody,
    Table,
    Paper,
    CircularProgress
} from "@mui/material";
import { blue } from "@mui/material/colors"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom";

import { listClients, deleteClient } from "../services/client.service";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: blue[800],
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
        backgroundColor: theme.palette.action.hover,
    },
    "td, th": {
        border: "1px solid gray",
    },
}));

export default function CustomizedTables({ clientData }) {
    const [clientsList, setClientsList] = useState([])

    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    let getClientsList = async () => {
        try {
            let clients = await listClients(clientData.identificacion, clientData.nombre, localStorage.getItem('userid'))
            if (!clients.data.length) {
                enqueueSnackbar('No se encontraron resultados', { variant: 'error' })
            } else {
                setClientsList(clients.data)
            }
        } catch (err) {
            enqueueSnackbar('Ha habido un problema con su peticion', { variant: 'error' })
        }
    }

    useEffect(() => {
        getClientsList()
    }, [clientData]);

    const onEditClient = async (id) => {
        navigate(`/dashboard/edit/${id}`)
    }

    const onDeleteClient = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        const decision = window.confirm('Seguro deseas eliminar a este cliente?')
        if (decision === true) {
            try {
                await deleteClient(id)
                getClientsList()
                enqueueSnackbar('Cliente eliminado con exito', { variant: 'success' })
            } catch (err) {
                enqueueSnackbar('Ha habido un problema con su peticion', { variant: 'error' })
            }
        }
    }
    return (
        <>
            <TableContainer component={Paper}>
                {!clientsList.length ?
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '50vh'
                    }}>
                        <CircularProgress color="success" size={100} />
                    </div> :
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Identificacion</StyledTableCell>
                                <StyledTableCell align="left">Nombre Completo</StyledTableCell>
                                <StyledTableCell align="left">Acciones</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {clientsList && clientsList.map(({ id, nombre, apellidos, identificacion }) => (
                                <StyledTableRow key={id}>
                                    <StyledTableCell align="left">{identificacion}</StyledTableCell>
                                    <StyledTableCell>
                                        {nombre} {apellidos}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <IconButton onClick={() => onEditClient(id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => onDeleteClient(id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </TableContainer>
        </>
    );
}
