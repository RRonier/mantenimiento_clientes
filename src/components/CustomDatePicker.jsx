import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';


export default function CustomDatePicker(props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                sx={{
                    paddingTop: 0,
                    width: '100%',
                }} components={['DatePicker']}>
                <DatePicker
                    {...props}
                    sx={{
                        width: '100%',
                    }} {...props} />
            </DemoContainer>
        </LocalizationProvider >
    );
}
