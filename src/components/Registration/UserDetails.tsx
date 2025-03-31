import { Box } from '@mui/material';
import CustomTextField from '../CustomTextField';

function UserDetails({ stepData, setStepData }) {
  const { name } = stepData;

  const handleChange = (field, value) => {
    setStepData({
      ...stepData,
      [field]: value,
    });
  };

  return (
    <Box sx={{ padding: 2, mt: 2 }}>

      <CustomTextField
        id="name"
        type="text"
        label="Name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, 'name')}
        placeholder="Enter Name"
        // error={errors.title}
        // isError={!!errors.title}
        fullWidth
      />
    </Box>
  );
}

export default UserDetails;
