import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function PaymentInfo({ stepData, setStepData }) {
  const { paymentInfo } = stepData;

  const handleChange = (event) => {
    setStepData({
      ...stepData,
      gstType: event.target.value,
    });
  };

  return (
    <Box sx={{ padding: 2, mt: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="paymentInfo-select-label">Choose Package</InputLabel>
        <Select
          labelId="paymentInfo-select-label"
          id="paymentInfo-select"
          value={paymentInfo || ''}
          label="Choose GST Type"
          onChange={handleChange}
        >
          <MenuItem value="GST1">10% Downpayment (Travel in next 20 days)</MenuItem>
          <MenuItem value="GST2">25% Downpayment (Travel in next 14 days)</MenuItem>
          <MenuItem value="GST3">50% Downpayment (Travel in next 7 days)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default PaymentInfo;
