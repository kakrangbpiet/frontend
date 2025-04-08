// SearchPlaces.tsx
import { Box } from '@mui/material';
import AutocompleteList from './LocationList';

function SearchPlaces({setAddress,handleClose}:{setAddress:any,handleClose:any}) {
 
  return (
    <Box className="flex items-center w-full h-full rounded-lg focus-within:shadow-lg z-[1000]">
      <AutocompleteList setAddress={setAddress} handleClose={handleClose}/>
    </Box>
  );
}

export default SearchPlaces;