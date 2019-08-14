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

const useStyles = makeStyles(theme => ({
    inline: {
        display: "inline",
    },
}));

export default function MuiListItem({ item }) {
    const classes = useStyles();

    let date = new Date(item.launch_date_local);
    return (
        <>
            <ListItem alignItems="flex-start">
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
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}
