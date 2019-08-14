import React from "react";

// Local Components
import { MuiList } from "controls";

//styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  app: {
    textAlign: "center"
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <MuiList />
    </div>
  );
}

export default App;
