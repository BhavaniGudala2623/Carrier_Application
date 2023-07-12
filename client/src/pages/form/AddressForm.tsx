import { useState } from 'react';
import { FormWrapper } from "./FormWrapper"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import stateOptions from "../data/stateOptions";

type AddressData = {
  street: string
  city: string
  state: string
  zip: string
}

interface State {
  id: number;
  name: string;
  cities: string[];
}

type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void
}

export function AddressForm({
  street,
  zip,
  updateFields,
}: AddressFormProps) {
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleStateChange = (event: any) => {  // eslint-disable-line @typescript-eslint/no-explicit-any
    const stateId = parseInt(event.target.value);
    const stateName = stateOptions.find((state) => state.id === stateId) || null;  // eslint-disable-line @typescript-eslint/no-explicit-any
    setSelectedState(stateName); 
    updateFields({ state: stateName?.name })
    setSelectedCity(null);
  };

  const handleCityChange = (event: any) => {
    const city = event.target.value;
    setSelectedCity(city);
    updateFields({ city: event.target.value })
  };

  return (
    <FormWrapper title="Address">
      <label><b>Street</b></label>
      <TextField
        id="filled-start-adornment"
        variant="outlined"
        size="small"
        autoFocus
        required
        type="text"
        value={street}
        onChange={e => updateFields({ street: e.target.value })}
      />

      <label><b>State</b></label>
      <Select
        id="filled-start-adornment"
        variant="outlined"
        size="small"
        required
        type="text"
        value={selectedState?.id || ''}
        onChange={handleStateChange}
      // value={state}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        {stateOptions.map((state: any) => (
          <MenuItem key={state.id} value={state.id}>
            {state.name}
          </MenuItem>
        ))}
      </Select>
      <label><b>City</b></label>
      <Select
        id="filled-start-adornment"
        variant="outlined"
        size="small"
        required
        type="text"
        value={selectedCity || ''}
        onChange={handleCityChange}
        disabled={!selectedState}
      // value={city}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        {selectedState?.cities.map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
      <label><b>Zip</b></label>
      <TextField
        id="filled-start-adornment"
        variant="outlined"
        size="small"
        required
        type="text"
        value={zip}
        onChange={e => updateFields({ zip: e.target.value })}
      />
    </FormWrapper>
  )
}
