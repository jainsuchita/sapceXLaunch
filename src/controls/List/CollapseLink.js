import React from "react";

// Styles
import { makeStyles } from "@material-ui/core/styles";

// Material UI Components
import ListItem from "@material-ui/core/ListItem";
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

// Local Components
import { APIEndPoints } from "modules";
import Loader from "../Loader/Loader";
import useApiRequest from "modules/Hooks/useAPIRequest";
import { FETCHING, SUCCESS, ERROR } from "modules/Hooks/useAPIRequest/actionTypes";

const useStyles = makeStyles(theme => ({
    divider: {
        margin: 0
    },

    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function SecondaryText({ status, text }) {

    text = text ? text : "-";
    return (
        <>
            {status === FETCHING && <Loader />}
            {status === SUCCESS && text}
            {status === ERROR && "Error in fetching the data"}
        </>
    );
};

export default function CollapseLinks({ open, flightNo }) {
    const classes = useStyles();
    const [{ status, response }, makeRequest] = useApiRequest(`${APIEndPoints.launches}/${flightNo}`);

    React.useEffect(() => {
        makeRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const flight = response && response.data;

    return (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem className={classes.nested}>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Flight number"
                        secondary={<SecondaryText status={status} text={flight && flight.flight_number} />} />
                </ListItem>
                <ListItem className={classes.nested}>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Mission Name"
                        secondary={<SecondaryText status={status} text={flight && flight.mission_name} />} />
                </ListItem>
                {
                    <ListItem className={classes.nested}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Mission Id"
                            secondary={<SecondaryText status={status} text={flight && flight.mission_id[0]} />} />
                    </ListItem>
                }

                <Divider className={classes.divider} variant="inset" component="li" />
            </List>

        </Collapse>
    );
}
