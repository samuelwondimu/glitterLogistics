import { Box, Button, Dialog, DialogActions, DialogTitle, Divider, Grid, TextField } from '@mui/material'
import React from 'react'

export default function CustomeDialog({
    open,
    handleClose,
    handleSubmit,
    title,
    children,
    submitText,
    cancelText,
    formData,
    type,
    pattern,
    ...props
}) {
    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle >{title}</DialogTitle>
            <Divider sx={{ mb: 1 }} />
            <Box component="form" onSubmit={handleSubmit} {...props} >
                <Grid container spacing={1} sx={{ px: 3, }}>
                    {children}
                    {formData.map((data, i) => {
                        return (
                            <Grid item xs={6} key={i}>
                                {data.type ? (
                                    <TextField margin='normal' required fullWidth label={data.label} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name={data.name} defaultValue={data.defaultValue} />
                                ) : (
                                    <TextField margin='normal' required fullWidth label={data.label} name={data.name} defaultValue={data.defaultValue} />
                                )}
                            </Grid>
                        )
                    })}
                </Grid>
                <Divider sx={{ pt: 2, mb: 2 }} />
                <DialogActions>
                    <Button variant='contained' color='error' onClick={handleClose} >
                        {cancelText}
                    </Button>
                    <Button variant='contained' color='success' type="submit" >
                        {submitText}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}
