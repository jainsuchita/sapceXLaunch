import React from "react";

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
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// Local Components
// import { APIEndPoints } from "modules";
import CollapseLinks from "./CollapseLink";

const useStyles = makeStyles(() => ({
    inline: {
        display: "inline",
    },

    root: {
        cursor: "pointer"
    },

    divider: {
        margin: 0
    },

}));

export default function MuiListItem({ item }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let date = new Date(item.launch_date_local);

    function handleClick() {
        setOpen(!open);
    }

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
            {
                open &&
                <CollapseLinks open={open} flightNo={item.flight_number} />
            }

        </>
    )
}
