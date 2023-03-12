import { Paper, Typography, Divider, TextField, IconButton, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import SearchIcon from '@mui/icons-material/Search';
import Table from "../components/Table"
import { CustomButton } from '../components/CustomButton';

export const ConsultaClientes = () => {
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
                        <CustomButton sx={{
                            marginRight: 2
                        }} variant='contained' startIcon={<AddIcon />} label="Agregar" />
                        <CustomButton variant='contained' startIcon={<KeyboardBackspaceIcon />} label="Regresar" />
                        {/* <Button variant='contained' startIcon={<KeyboardBackspaceIcon />}>Regresar</Button> */}
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
                    <IconButton aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </div>
                <Divider />
                <Table />
            </Paper >
        </Container>
    )
}