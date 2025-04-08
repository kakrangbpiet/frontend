import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react'
import ManualLocation from './ManualLocation'
import LiveLocation from './LiveLocation'

function ChooseLocation({ open, handleClose, setAddress }: { open: boolean, handleClose: any, setAddress: any }) {

  const [openManualLocation, setOpenManualLocation] = useState<boolean>(false)
  const [openLiveLocation, setOpenLiveLocation] = useState<boolean>(false)

  const chooseLiveLocation = () => {
    setOpenLiveLocation(!openLiveLocation)
  }

  const chooseLocationManually = () => {
    setOpenManualLocation(!openManualLocation)
  }

  const hanldeCloseLocationDailog = () => {
    handleClose()
    setOpenManualLocation(!openManualLocation)
  }

  const hanldeCloseLiveLocationDailog = () => {
    handleClose()
    setOpenLiveLocation(!openLiveLocation)
  }

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
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={chooseLocationManually} sx={{
          }}>Choose Manually</Button>
          <Button onClick={chooseLiveLocation} autoFocus sx={{
          }}>
            Use My Location
          </Button>
        </DialogActions>
      </Dialog>

      <ManualLocation setAddress={setAddress} open={openManualLocation} handleClose={hanldeCloseLocationDailog} />
      {openLiveLocation &&
        <LiveLocation setAddress={setAddress} open={openLiveLocation} handleClose={hanldeCloseLiveLocationDailog} />
      }
    </div>
  )
}

export default ChooseLocation