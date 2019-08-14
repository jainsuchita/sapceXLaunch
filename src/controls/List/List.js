import React, { useEffect, useState } from "react";
import axios from "axios";

// Styles
import { makeStyles } from "@material-ui/core/styles";

// Material UI Components
import List from "@material-ui/core/List";
import CircularProgress from '@material-ui/core/CircularProgress';

// Local Components
import { APIEndPoints } from "modules";
import MuiListItem from "./ListItem";

const LAUNCH_YEAR = "2014";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        display: "inline-block",
        border: "1px solid #888"
    },

    progress: {
        margin: theme.spacing(2),
    },

    appHeader: {
        margin: theme.spacing(3)
    }
}));

function getFlightsBeforeYear(flights) {
    let filteredflights = flights.filter((flight) => flight.launch_year < LAUNCH_YEAR);
    return filteredflights;
}

export default function MuiList() {
    const classes = useStyles();

    const [state, setState] = useState({ flights: [], isLoading: false });

    useEffect(() => {
        setState({ ...state, isLoading: true });

        const fetchData = async () => {
            const result = await axios(APIEndPoints.launches);
            let flights = getFlightsBeforeYear(result.data);
            setState({ flights: flights, isLoading: false });
        }

        fetchData();
    }, []);


    console.log(state);

    return (
        <>
            <header className={classes.appHeader}>
                Total Launches {state.flights && state.flights.length} launched in {LAUNCH_YEAR}
            </header>
            {
                state.isLoading ?
                    <CircularProgress className={classes.progress} color="secondary" />
                    :
                    <List className={classes.root}>
                        {
                            state.flights.map((flight) => {
                                return <MuiListItem item={flight} key={flight.flight_number} />
                            })
                        }

                    </List>
            }
        </>
    );
}
