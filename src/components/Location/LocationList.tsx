import * as React from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { Tabs, Tab, TextField, List, ListItem, Typography } from '@mui/material';

interface AutocompleteListProps {
  setAddress: (address: string) => void;
  handleClose: () => void;
}

const indianCities = [
  { label: 'Mumbai', state: 'Maharashtra' },
  { label: 'Delhi', state: 'Delhi' },
  { label: 'Bengaluru', state: 'Karnataka' },
  { label: 'Hyderabad', state: 'Telangana' },
  { label: 'Ahmedabad', state: 'Gujarat' },
  { label: 'Chennai', state: 'Tamil Nadu' },
  { label: 'Kolkata', state: 'West Bengal' },
  { label: 'Pune', state: 'Maharashtra' },
  { label: 'Jaipur', state: 'Rajasthan' },
  { label: 'Surat', state: 'Gujarat' },
  { label: 'Lucknow', state: 'Uttar Pradesh' },
  { label: 'Kanpur', state: 'Uttar Pradesh' },
  { label: 'Nagpur', state: 'Maharashtra' },
  { label: 'Indore', state: 'Madhya Pradesh' },
  { label: 'Thane', state: 'Maharashtra' },
  { label: 'Bhopal', state: 'Madhya Pradesh' },
  { label: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { label: 'Pimpri-Chinchwad', state: 'Maharashtra' },
  { label: 'Patna', state: 'Bihar' },
  { label: 'Vadodara', state: 'Gujarat' },
  { label: 'Ghaziabad', state: 'Uttar Pradesh' },
  { label: 'Ludhiana', state: 'Punjab' },
  { label: 'Agra', state: 'Uttar Pradesh' },
  { label: 'Nashik', state: 'Maharashtra' },
  { label: 'Faridabad', state: 'Haryana' },
  { label: 'Meerut', state: 'Uttar Pradesh' },
  { label: 'Rajkot', state: 'Gujarat' },
  { label: 'Kalyan-Dombivli', state: 'Maharashtra' },
  { label: 'Vasai-Virar', state: 'Maharashtra' },
  { label: 'Varanasi', state: 'Uttar Pradesh' },
  { label: 'Srinagar', state: 'Jammu and Kashmir' },
  { label: 'Aurangabad', state: 'Maharashtra' },
  { label: 'Dhanbad', state: 'Jharkhand' },
  { label: 'Amritsar', state: 'Punjab' },
  { label: 'Navi Mumbai', state: 'Maharashtra' },
  { label: 'Allahabad', state: 'Uttar Pradesh' },
  { label: 'Ranchi', state: 'Jharkhand' },
  { label: 'Howrah', state: 'West Bengal' },
  { label: 'Coimbatore', state: 'Tamil Nadu' },
  { label: 'Jabalpur', state: 'Madhya Pradesh' },
  { label: 'Gwalior', state: 'Madhya Pradesh' },
  { label: 'Vijayawada', state: 'Andhra Pradesh' },
  { label: 'Jodhpur', state: 'Rajasthan' },
  { label: 'Madurai', state: 'Tamil Nadu' },
  { label: 'Raipur', state: 'Chhattisgarh' },
  { label: 'Kota', state: 'Rajasthan' },
  { label: 'Guwahati', state: 'Assam' },
  { label: 'Chandigarh', state: 'Chandigarh' },
  { label: 'Solapur', state: 'Maharashtra' },
  { label: 'Hubballi-Dharwad', state: 'Karnataka' },
  { label: 'Bareilly', state: 'Uttar Pradesh' },
  { label: 'Moradabad', state: 'Uttar Pradesh' },
  { label: 'Mysore', state: 'Karnataka' },
  { label: 'Gurugram', state: 'Haryana' },
  { label: 'Aligarh', state: 'Uttar Pradesh' },
  { label: 'Jalandhar', state: 'Punjab' },
  { label: 'Tiruchirappalli', state: 'Tamil Nadu' },
  { label: 'Bhubaneswar', state: 'Odisha' },
  { label: 'Salem', state: 'Tamil Nadu' },
  { label: 'Mira-Bhayandar', state: 'Maharashtra' },
  { label: 'Warangal', state: 'Telangana' },
  { label: 'Thiruvananthapuram', state: 'Kerala' },
  { label: 'Guntur', state: 'Andhra Pradesh' },
  { label: 'Bhiwandi', state: 'Maharashtra' },
  { label: 'Saharanpur', state: 'Uttar Pradesh' },
  { label: 'Gorakhpur', state: 'Uttar Pradesh' },
  { label: 'Bikaner', state: 'Rajasthan' },
  { label: 'Amravati', state: 'Maharashtra' },
  { label: 'Noida', state: 'Uttar Pradesh' },
  { label: 'Jamshedpur', state: 'Jharkhand' },
  { label: 'Bhilai', state: 'Chhattisgarh' },
  { label: 'Cuttack', state: 'Odisha' },
  { label: 'Firozabad', state: 'Uttar Pradesh' },
  { label: 'Kochi', state: 'Kerala' },
  { label: 'Nellore', state: 'Andhra Pradesh' },
  { label: 'Bhavnagar', state: 'Gujarat' },
  { label: 'Dehradun', state: 'Uttarakhand' },
  { label: 'Durgapur', state: 'West Bengal' },
  { label: 'Asansol', state: 'West Bengal' },
  { label: 'Rourkela', state: 'Odisha' },
  { label: 'Nanded', state: 'Maharashtra' },
  { label: 'Kolhapur', state: 'Maharashtra' },
  { label: 'Ajmer', state: 'Rajasthan' },
  { label: 'Akola', state: 'Maharashtra' },
  { label: 'Gulbarga', state: 'Karnataka' },
  { label: 'Jamnagar', state: 'Gujarat' },
  { label: 'Ujjain', state: 'Madhya Pradesh' },
  { label: 'Loni', state: 'Uttar Pradesh' },
  { label: 'Siliguri', state: 'West Bengal' },
  { label: 'Jhansi', state: 'Uttar Pradesh' },
  { label: 'Ulhasnagar', state: 'Maharashtra' },
  { label: 'Jammu', state: 'Jammu and Kashmir' },
  { label: 'Sangli-Miraj & Kupwad', state: 'Maharashtra' },
  { label: 'Mangalore', state: 'Karnataka' },
  { label: 'Erode', state: 'Tamil Nadu' },
  { label: 'Belgaum', state: 'Karnataka' },
  { label: 'Ambattur', state: 'Tamil Nadu' },
  { label: 'Tirunelveli', state: 'Tamil Nadu' },
  { label: 'Malegaon', state: 'Maharashtra' },
  { label: 'Gaya', state: 'Bihar' },
  { label: 'Jalgaon', state: 'Maharashtra' },
  { label: 'Udaipur', state: 'Rajasthan' },
  { label: 'Maheshtala', state: 'West Bengal' },
  { label: 'Davanagere', state: 'Karnataka' },
  { label: 'Kozhikode', state: 'Kerala' },
  { label: 'Kurnool', state: 'Andhra Pradesh' },
  { label: 'Rajpur Sonarpur', state: 'West Bengal' },
  { label: 'Rajahmundry', state: 'Andhra Pradesh' },
  { label: 'Bokaro Steel City', state: 'Jharkhand' },
  { label: 'South Dumdum', state: 'West Bengal' },
  { label: 'Bellary', state: 'Karnataka' },
  { label: 'Patiala', state: 'Punjab' },
  { label: 'Gopalpur', state: 'West Bengal' },
  { label: 'Agartala', state: 'Tripura' },
]

const AutocompleteList: React.FC<AutocompleteListProps> = ({ setAddress, handleClose }) => {
  const {
    // ready,
    value,
    // suggestions: {  data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const [tab, setTab] = React.useState<'search' | 'cities'>('search');
  const [selectedCity, setSelectedCity] = React.useState<string | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // const handleSelect = ({ description }: any) => () => {
  //   setValue(description, false);
  //   clearSuggestions();
  //   setAddress(description);
  //   handleClose();
  //   getGeocode({ address: description }).then((results) => {
  //     const { lat, lng } = getLatLng(results[0]);
  //     console.log('📍 Coordinates:', { lat, lng });
  //   });
  // };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setAddress(city);
    handleClose();
  };

  // const renderSuggestions = () =>
  //   data.map((suggestion) => {
  //     const {
  //       place_id,
  //       structured_formatting: { main_text, secondary_text },
  //     } = suggestion;

  //     return (
  //       <ListItem
  //         key={place_id}
  //         onClick={handleSelect(suggestion)}
  //         className="cursor-pointer hover:bg-gray-100"
  //       >
  //         <Typography variant="body1" component="strong">
  //           {main_text}
  //         </Typography>
  //         <Typography variant="body2" className="text-gray-500">
  //           {secondary_text}
  //         </Typography>
  //       </ListItem>
  //     );
  //   });

  return (
    <div ref={ref} className="p-4 rounded shadow-lg w-96" style={{
    }}>
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        className="mb-4"
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Search Places" value="search" />
        <Tab label="Select City" value="cities" />
      </Tabs>

      {tab === 'search' ? (
        <div>
        <TextField
          value={value}
          onChange={handleInput}
          placeholder="Search for a location"
          variant="outlined"
          fullWidth
          className="mb-4"
        />
        
        {value.trim() && (
          <List className="max-h-64 overflow-y-auto">
            {indianCities
              .filter((city) =>
                city.label.toLowerCase().includes(value.toLowerCase())
              )
              .map((city) => (
                <ListItem
                  key={city.label}
                  onClick={() => handleCitySelect(city.label)}
                  className="cursor-pointer hover:bg-blue-50"
                >
                  <Typography variant="body1">{city.label}</Typography>, 
                  <Typography variant="body2" className="text-gray-500">
                    {city.state}
                  </Typography>
                </ListItem>
              ))}
            {indianCities.filter((city) =>
              city.label.toLowerCase().includes(value.toLowerCase())
            ).length === 0 && (
              <Typography
                variant="body2"
                className="text-gray-500 p-4 text-center"
              >
                Not Serviceable in this Area
              </Typography>
            )}
          </List>
        )}
      </div>
      
      ) : (
        <div>
          <List className="max-h-64 overflow-y-auto">
            {indianCities.map((city) => (
              <ListItem
                key={city.label}
                onClick={() => handleCitySelect(city.label)}
                className={`cursor-pointer hover:bg-blue-50 ${
                  selectedCity === city.label ? 'bg-blue-100' : ''
                }`}
              >
                <Typography variant="body1">{city.label}</Typography>,
                <Typography variant="body2" className="text-gray-500">
                  {city.state}
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default AutocompleteList;