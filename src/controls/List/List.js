import React, { useEffect, useState } from "react";
import axios from "axios";

// Styles
import { makeStyles } from "@material-ui/core/styles";

// Material UI Components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import FlightIcon from '@material-ui/icons/Flight';

// Local Components
import { APIEndPoints } from "modules";

const LAUNCH_YEAR = "2014";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },
}));

function getFlightsBeforeYear(flights) {
    let filteredflights = flights.filter((flight) => flight.launch_year < LAUNCH_YEAR);
    return filteredflights;
}

function MuiListItem({ flight }) {
    const classes = useStyles();

    let date = new Date(flight.launch_date_local);
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar>
                        <FlightIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={flight.mission_name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {date.toLocaleDateString()}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}

export default function AlignItemsList() {
    const classes = useStyles();

    const [data, setData] = useState({ flights: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(APIEndPoints.launches);
            let flights = getFlightsBeforeYear(result.data);
            setData({ flights: flights });
        }

        fetchData();
    }, []);


    console.log(data.flights);
    return (
        <List className={classes.root}>
            {
                data.flights.map((flight) => {
                    return <MuiListItem flight={flight} key={flight.flight_number} />
                })
            }

        </List>
    );
}
