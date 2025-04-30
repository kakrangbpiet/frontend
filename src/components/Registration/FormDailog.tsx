import React from 'react';
import {
  Dialog,
  Slide,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import styled from 'styled-components';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  border-radius: 24px;
  backdrop-filter: blur(24px);
  padding: 2rem;
  
  @media (max-width: 600px) {
    max-height: 100vh;
    border-radius: 0;
    padding: 1rem;
  }
`;

const CloseButton = styled(IconButton)`
  position: relative;
  top: 0px;
  right: 0px;
  z-index: 10;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
    transform: scale(1.1);
  }
`;

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  fullScreen?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const FormDialog: React.FC<FormDialogProps> = ({
  open,
  onClose,
  children,
  fullScreen,
  maxWidth = 'md'
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      fullScreen={fullScreen !== undefined ? fullScreen : isMobile}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          overflow: 'hidden',
        }
      }}
      sx={{
        backdropFilter: 'blur(3px)',
        '& .MuiDialog-container': {
          alignItems: isMobile ? 'flex-end' : 'center',
        }
      }}
    >
      <DialogContainer>
        <CloseButton
          onClick={onClose}
          aria-label="close"
        >
          <Close sx={{
            color:"white"
          }}/>
        </CloseButton>
        {children}
      </DialogContainer>
    </Dialog>
  );
};

export default FormDialog;