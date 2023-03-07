import { Box, Typography } from "@mui/material"

export const WelcomePage = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }}
    >
        <Typography sx={{ marginTop: 10 }} variant="h1">Bienvenido</Typography>
    </Box>
)