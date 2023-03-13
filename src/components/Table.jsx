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

import { listClients, addClient, deleteClient } from "../services/client.service";
import { getInteresList } from "../services/interes.service";

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
    const [interests, setInterests] = useState([])

    const { enqueueSnackbar } = useSnackbar()

    let getClientsList = async () => {
        let clientsList = await listClients('', '', localStorage.getItem('userid'))
        setClients(clientsList.data)
        console.log(clientsList.data)
    }
    let getInterestsList = async () => {
        let interestsList = await getInteresList()
        console.log(interestsList.data)
        setInterests(interestsList.data)
    }

    useEffect(() => {
        getClientsList()
        getInterestsList()
    }, []);

    const onDeleteClient = async (id) => {
        const decision = confirm('Are you sure you want to delete?')
        if (decision === true) {
            await deleteClient(id)
            getClientsList()
            enqueueSnackbar('Cliente eliminado con exito', { variant: 'success' })
        }
    }

    const onAddClient = async () => {
        await addClient(
            {
                nombre: "Avatar",
                apellidos: "Sthephen",
                identificacion: "uu",
                celular: "+4917655884789",
                otroTelefono: "+4917655448759",
                direccion: "string",
                fNacimiento: "2023-03-09T16:04:19.334Z",
                fAfiliacion: "2023-03-09T16:04:19.334Z",
                sexo: "M",
                resennaPersonal: "string",
                imagen: "string",
                interesFK: "47c53f03-87fb-4bc4-8426-d17ef67445e0",
                usuarioId: "863b5771-88ea-425c-a97b-e2ba5ac67fbe"
            })
        await getClientsList()
        enqueueSnackbar('Cliente agregado con exito', { variant: 'success' })
    }
    return (
        <>
            <button onClick={onAddClient}>Click</button>
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
                                    <IconButton>
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
