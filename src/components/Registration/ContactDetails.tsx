import { Box } from '@mui/material';
import "./style.css"
import CustomTextField from '../CustomTextField';


function ContactDetails({ stepData, setStepData }) {
  const { phoneNumber } = stepData;

  const handleChange = (field, value) => {
    setStepData({
      ...stepData,
      [field]: value,
    });
  };

  return (
    <Box sx={{ padding: 2, mt: 2 }}>
      <CustomTextField
        id="phoneNumber"
        type="text"
        label="Phone Number"
        value={phoneNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, 'phoneNumber')}
        placeholder="Enter Phone"
        // error={errors.title}
        // isError={!!errors.title}
        fullWidth

      />
    </Box>
  );
}

export default ContactDetails;
