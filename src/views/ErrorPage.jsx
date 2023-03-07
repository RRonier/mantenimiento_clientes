import { useRouteError } from "react-router-dom";
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import { Typography, Box, Container } from '@mui/material';
export const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
                <ReportProblemRoundedIcon color="primary" sx={{ fontSize: 100, margin: 0, padding: 0 }} />
                <Typography variant='h5' component="p" color="primary" sx={{ lineHeight: 1.330, fontSize: 100, margin: 0, padding: 0 }}>404</Typography>
            </Box>
            <Typography variant="h6" color="gray" sx={{ fontSize: 40 }}>Oops...Page Not Found!</Typography>
            <p><i>{error.statusText || error.message}</i></p>
        </Container>
    )
}