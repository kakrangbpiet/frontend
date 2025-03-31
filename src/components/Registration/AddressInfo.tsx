import { Box } from '@mui/material';
import CustomTextField from '../CustomTextField';

function AddressInfo({ stepData, setStepData }) {
  const { address } = stepData;

  const handleChange = (field, value) => {
    setStepData({
      ...stepData,
      [field]: value,
    });
  };

  return (
    <Box sx={{ padding: 2, mt: 2 }}>
        <CustomTextField
        id="address"
        type="text"
        label="Address"
        value={address}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, 'address')}
        placeholder="Enter Address"
        // error={errors.title}
        // isError={!!errors.title}
        fullWidth
      />
    </Box>
  );
}

export default AddressInfo;
