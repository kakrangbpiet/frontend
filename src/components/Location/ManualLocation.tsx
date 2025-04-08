import {  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import SearchPlaces from './SearchPlaces'

function ManualLocation({ setAddress,open, handleClose }: any) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
            <SearchPlaces setAddress={setAddress} handleClose={handleClose} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ManualLocation