import React from "react";
import axios from "axios";

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

const useStyles = makeStyles(theme => ({
    divider: {
        margin: 0
    },

    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function CollapseLinks({ open, flightNo }) {
    const classes = useStyles();
    const [state, setState] = React.useState({ flight: {}, isLoading: false });

    React.useEffect(() => {
        setState({ ...state, isLoading: true });

        const fetchData = async () => {
            console.log("called");
            const result = await axios(`${APIEndPoints.launches}/${flightNo}`);
            setState({ flight: result.data, isLoading: false });
        }

        fetchData();
    }, []);

    const { flight, isLoading } = state;

    return (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem className={classes.nested}>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Flight number" secondary={isLoading ? <Loader /> : flight.flight_number} />
                </ListItem>
                <ListItem className={classes.nested}>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Mission Name" secondary={isLoading ? <Loader /> : flight.mission_name} />
                </ListItem>
                {
                    flight && flight.mission_id && flight.mission_id[0] &&
                    <ListItem className={classes.nested}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Mission Id" secondary={isLoading ? <Loader /> : flight.mission_id[0]} />
                    </ListItem>
                }

                <Divider className={classes.divider} variant="inset" component="li" />
            </List>

        </Collapse>
    );
}
