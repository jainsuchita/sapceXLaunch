import React from "react";
import axios from "axios";

// Styles
import { makeStyles } from "@material-ui/core/styles";

// Material UI Components
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import FlightIcon from '@material-ui/icons/Flight';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { APIEndPoints } from "modules";
import Loader from "../Loader/Loader";

const useStyles = makeStyles(theme => ({
    inline: {
        display: "inline",
    },

    root: {
        cursor: "pointer"
    },

    divider: {
        margin: 0
    },

    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function MuiListItem({ item }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({ flight: {}, isLoading: false });

    async function handleClick() {
        setOpen(!open);

        if (!open) {
            setState({ ...state, isLoading: true });
            const result = await axios(`${APIEndPoints.launches}/${item.flight_number}`);
            console.log("result", result.data);
            setState({ flight: result.data, isLoading: false });
        }
    }

    let date = new Date(item.launch_date_local);

    const { isLoading, flight } = state;
    return (
        <>
            <ListItem className={classes.root} alignItems="flex-start" onClick={handleClick}>
                <ListItemAvatar>
                    <Avatar>
                        <FlightIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={item.mission_name}
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
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Divider className={classes.divider} variant="inset" component="li" />
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
                            <ListItemText primary="Mission Id" secondary={isLoading ? <Loader /> : item.mission_id[0]} />
                        </ListItem>
                    }

                    <Divider className={classes.divider} variant="inset" component="li" />
                </List>

            </Collapse>

        </>
    )
}
