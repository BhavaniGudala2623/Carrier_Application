import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Box from '@mui/material/Box';
import Post from "./form/Posts";


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(5),
    },
}));

const Home: React.FC = () => {
    const classes = useStyles();
    return (
        <div>
            <Box sx={{ flexGrow: 1, paddingLeft: 30 }}>
                <p>Home/Carrier
                    <br></br>
                Carrier delivers global solutions across a broad range of applications in heating, air conditioning, refrigeration and beyond.
                </p>
                <Container className={classes.container}>
                    <Post title="RESIDENTIAL SYSTEMS" img="https://images.carriercms.com/image/upload/w_600,c_fill,q_auto,f_auto,ar_2.0/v1543517018/carrier/carrier-global/people/carrier-residential-systems-keep-families-comfortable.jpg" paragraph="Millions of people trust the leadership and expertise of Carrier in delivering efficient solutions for their home heating and cooling needs." />
                    <Post title="COMMERCIAL SYSTEMS" img="https://images.carriercms.com/image/upload/w_600,c_fill,q_auto,f_auto,ar_2.0/v1543515599/carrier/carrier-global/buildings/carrier-commercial-hvac-solutions-cool-office-buildings.jpg" paragraph="Setting the standard for performance, energy efficiency and sustainability, Carrier offers solutions in air conditioning, heating and building controls."/>
                    <Post title="TRANSPORT REFRIGERATION" img="https://images.carriercms.com/image/upload/w_600,c_fill,q_auto,f_auto,ar_2.0/v1543603071/carrier/carrier-global/transport-refrigeration/carrier-transicold-vector-trailer-refrigeration-unit.jpg" paragraph="Carrier transport refrigeration equipment, cold chain monitoring solutions and replacement components ensure the safe, reliable transport of food and beverages, medical supplies and other perishable cargo to people and businesses around the world."/>
                    <Post title="COMMERCIAL REFRIGERATION" img="https://images.carriercms.com/image/upload/w_600,c_fill,q_auto,f_auto,ar_2.0/v1543517062/carrier/carrier-global/people/woman-hypermarket-fresh-vegetables.jpg" paragraph="Serving the beverage, food service and food retail industries, our refrigeration solutions are built on next-generation technologies to preserve freshness, ensure safety and enhance appearances of global food and beverage for retail."/>
                </Container>
            </Box>
        </div>

    );
};

export default Home
