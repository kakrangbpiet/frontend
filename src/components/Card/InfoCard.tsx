import { Modal, Backdrop, Fade, Box, Typography, Button, Grid, Avatar } from '@mui/material';

const InfoCard = ({ open, onClose, dependentInfo,InfoCardFor }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            padding: 4
          }}
        >
          <Typography variant="h4" sx={{
            fontWeight: "400",
            mb: 2
          }}>{InfoCardFor}</Typography>

          {dependentInfo &&
            <Grid container sx={{
              height: "250px",
            }}>
              <Grid  size={{xs:4,md:4,lg:4}} sx={{
                borderLeft: "2px solid grey",
                borderTop: "2px solid grey",
                borderBottom: "2px solid grey",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", 
                padding: "1rem", 
                borderTopLeftRadius: "5px", 
                borderBottomLeftRadius: "5px", 
                gap:2
              }}>
                {/* todo get image from backend */}
                <Avatar alt="Profile Sharp" src="/logo192.png" />
                <Box sx={{
                 justifyContent: 'flex-end',
                 mt:4,
                 textAlign:"center"
                }}>
                  <Typography>
                    {dependentInfo.rank}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{xs:8,md:8,lg:8}} sx={{
                borderRight: "2px solid grey",
                borderTop: "2px solid grey",
                borderBottom: "2px solid grey",
                borderLeft: "2px solid grey",
                display: "flex",
                flexDirection:"column",
                justifyContent: "center",
                borderTopRightRadius: "5px", 
                borderBottomRightRadius: "5px",
                alignItems: "center", 
              }}>
                 <Typography mb={2}>Service No: {dependentInfo.serviceNo}</Typography>
                 <Typography>BrahmaId No: {dependentInfo.user.brahmaId}</Typography>
              </Grid>
              <Button onClick={onClose}>Close</Button>
            </Grid>
          }

        </Box>
      </Fade>
    </Modal>
  );
};

export default InfoCard;