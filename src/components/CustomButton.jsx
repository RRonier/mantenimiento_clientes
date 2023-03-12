import { Button } from "@mui/material"
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    '&:hover': {
        backgroundColor: grey[700],
    },
}));

export const CustomButton = ({ variant, label, ...props }) => {
    return (
        <ColorButton variant={variant} startIcon={props?.startIcon} {...props}>{label}</ColorButton>
    )
}