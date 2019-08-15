import React from "react";

// Styles
import { makeStyles } from "@material-ui/core/styles";

// Material UI Components
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

// Local Components
import { APIEndPoints } from "modules";
import MuiListItem from "./ListItem";
import Loader from "../Loader/Loader";
import useApiRequest from "modules/Hooks/useAPIRequest";
import { FETCHING, SUCCESS, ERROR } from "modules/Hooks/useAPIRequest/actionTypes";

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
    },

    loader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}));

function getFlightsBeforeYear(flights) {
    let filteredflights = flights.filter((flight) => flight.launch_year < LAUNCH_YEAR);
    return filteredflights;
}

export default function MuiList() {
    const classes = useStyles();

    const [{ status, response }, makeRequest] = useApiRequest(APIEndPoints.launches);

    React.useEffect(() => {
        makeRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    let flights = [];
    flights = response && getFlightsBeforeYear(response.data)
    console.log(flights);

    return (
        <>
            <Typography className={classes.appHeader} variant="h6" >
                Total Launches <strong>{flights && flights.length}</strong> launched in <strong>{LAUNCH_YEAR}</strong>
            </Typography>

            {
                status === FETCHING &&
                <Loader size={40} loaderClass={classes.loader}>
                    <Typography variant="body2">Wait while we load your data</Typography>
                </Loader>
            }
            {
                status === SUCCESS &&
                <List className={classes.root}>
                    {
                        flights && flights.map((flight) => {
                            return <MuiListItem item={flight} key={flight.flight_number} />
                        })
                    }
                </List>
            }
            {
                status === ERROR && JSON.stringify(response)
            }
        </>
    );
}
