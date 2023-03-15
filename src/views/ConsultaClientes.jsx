import { Paper, Typography, Divider, TextField, IconButton, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import SearchIcon from '@mui/icons-material/Search';
import Table from "../components/Table"
import { CustomButton } from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import { getClient } from '../services/client.service';
import { enqueueSnackbar } from 'notistack';

export const ConsultaClientes = () => {
    const navigate = useNavigate()

    const onGetClient = async (clientId) => {
        let client = await getClient(clientId)
        console.log(client)
    }

    return (
        <Container>
            <Paper elevation={1} sx={{
                width: '90%',
                height: 'fit-content',
                marginTop: 3
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    paddingBottom: 10
                }}>
                    <Typography variant='h6'>Consulta de clientes</Typography>
                    <div>
                        <CustomButton
                            sx={{
                                marginRight: 2
                            }}
                            variant='contained'
                            startIcon={<AddIcon />}
                            label="Agregar"
                            onClick={() => navigate('/dashboard/mantenimiento')}
                        />
                        <CustomButton
                            variant='contained'
                            startIcon={<KeyboardBackspaceIcon />}
                            label="Regresar"
                            onClick={() => navigate('/dashboard/welcome')}
                        />
                    </div>
                </div>
                <Divider />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    paddingBottom: 10,
                }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Nombre"
                        variant='outlined'
                        fullWidth
                        sx={{
                            marginRight: 5
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Identificacion"
                        variant='outlined'
                        fullWidth
                    />
                    <IconButton aria-label="search" onClick={onGetClient}>
                        <SearchIcon style={{
                            border: '1px solid black',
                            borderRadius: '50%',
                            padding: '20%'
                        }} />
                    </IconButton>
                </div>
                <Divider />
                <Table />
            </Paper >
        </Container>
    )
}