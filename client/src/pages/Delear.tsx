import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import stateOptions from './data/stateOptions';
import { useQuery } from '@apollo/react-hooks';
import { GET_ITEMS_BY_STATE_AND_CITY_QUERY } from "../Queries/index";



interface State {
    id: number;
    name: string;
    cities: string[];
}

//mydata interface
interface MyData {
    phoneNumber: string | number;
    city: string;
    zip: string | number;
    password: string;
    personName: string;
    dealerName: string;
    id: string;
    email: string;
    street: string;
    state: string;
}

export default function Delear() {

    const [selectedState, setSelectedState] = useState<State | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    //handling the from the GrapghQL Query
    // const { loading, error, data } = useQuery(GET_ITEMS_BY_STATE_AND_CITY_QUERY);
    const { data } = useQuery(GET_ITEMS_BY_STATE_AND_CITY_QUERY,
        {
            variables: { state: selectedState?.name, city: selectedCity },
        });
  
    
    //handle change for state
    const handleStateChange = (event: any) => {
        const stateId = parseInt(event.target.value);
        const state = stateOptions.find((state: any) => state.id === stateId) || null;
        setSelectedState(state);
        setSelectedCity(null);
    };

    //handle change for city
    const handleCityChange = (event: any) => {
        const city = event.target.value;
        setSelectedCity(city);
    };

    return (
        <>
            <div>
                <Box sx={{ flexGrow: 1, paddingLeft: 30 }}>
                    <div style={{ margin: 5 }}>
                        <h2>Find a Dealer</h2>
                        <Paper>
                            <Box sx={{ paddingLeft: 20, marginTop: 3 }}>
                                <FormControl sx={{ m: 1, minWidth: 300 }}>
                                    <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={selectedState?.id || ''}
                                        onChange={handleStateChange}
                                        label="State"
                                        placeholder='select state'
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {stateOptions.map((state: any) => (
                                            <MenuItem key={state.id} value={state.id}>
                                                {state.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ m: 1, minWidth: 300 }}>
                                    <InputLabel id="demo-simple-select-helper-label">City</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        placeholder='select city'
                                        value={selectedCity || ''}
                                        onChange={handleCityChange}
                                        disabled={!selectedState}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {selectedState?.cities.map((city) => (
                                            <MenuItem key={city} value={city}>
                                                {city}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </Box>
                        </Paper>
                    </div>
                    <div>
                        <Paper>
                            {data?.getUserByStateAndCity.length > 0 ? (
                                <div className="container" style={{ paddingTop: "3vh" }}>
                                    <div className="d-flex flex-wrap justify-content-center">
                                        {data.getUserByStateAndCity.map((data: MyData, index: any) => (
                                            <div className="col col-sm-4" style={{ margin: "60px" }}>
                                                <div
                                                    className="image-container card m-2 "
                                                    data-mdb-animation-on-scroll="repeat"
                                                    key={index}
                                                >
                                                    <Card key={index} >
                                                        <CardContent>
                                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                                {data.personName}
                                                            </Typography>
                                                            <Typography variant="h5" component="div">
                                                                {data.dealerName}
                                                            </Typography>
                                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                                {data.state}, {data.city}, {data.street} -{data.zip}
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                {data.email}
                                                                <br />
                                                                {data.phoneNumber}
                                                            </Typography>
                                                        </CardContent>

                                                    </Card>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="d-flex flex-wrap justify-content-center"
                                    style={{ paddingTop: "10vh" }}
                                >
                                    <h3>No Data Found</h3>
                                </div>
                            )}
                        </Paper>
                    </div>
                </Box>
            </div>
        </>
    );
}
