import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export const ALERT = { ERROR: 'error', WARN: 'warning', INFO: 'info', SUCCESS: 'success' };
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function AlertSnackbar(props) {
  const [open, setOpen] = React.useState(props.open || false);
  const [message, setMessage] = React.useState(props.message);
  const [type, setType] = React.useState(props.type);
  //const handleClick = () => {setOpen(true);};

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    if (props.onClose)  //Override when closing any cleanup or callbacks //Important dont remove
    {
      props.onClose();
      //console.log('autoclosed')
    }
  };
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}
        type={type}
      >{message}
      </Alert>
    </Snackbar>

  );
}

//<SnackBar open={open} type={ALERT.error} message="Hello"/>