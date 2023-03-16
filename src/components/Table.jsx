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
} from "@mui/material";
import { blue } from "@mui/material/colors"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom";

import { listClients, deleteClient, getClient } from "../services/client.service";

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

export default function CustomizedTables() {
    const [clients, setClients] = useState([])

    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    let getClientsList = async () => {
        let clientsList = await listClients('', '', localStorage.getItem('userid'))
        setClients(clientsList.data)
    }

    useEffect(() => {
        getClientsList()
    }, []);

    const onEditClient = async (id) => {
        navigate(`/dashboard/edit/${id}`)
    }

    const onDeleteClient = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        const decision = window.confirm('Seguro deseas eliminar a este cliente?')
        if (decision === true) {
            await deleteClient(id)
            getClientsList()
            enqueueSnackbar('Cliente eliminado con exito', { variant: 'success' })
        }
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Identificacion</StyledTableCell>
                            <StyledTableCell align="left">Nombre Completo</StyledTableCell>
                            <StyledTableCell align="left">Acciones</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {clients && clients.map(({ id, nombre, apellidos, identificacion }) => (
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
            </TableContainer>
        </>
    );
}
