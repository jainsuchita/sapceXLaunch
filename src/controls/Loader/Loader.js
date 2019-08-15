import React from "react";

// Material UI Components
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader({ size, children, loaderClass }) {
    let loader = loaderClass ? loaderClass : "";

    return (
        <div className={loader}>
            <CircularProgress size={size ? size : 20} color="primary" />
            {children}
        </div>
    )
}
