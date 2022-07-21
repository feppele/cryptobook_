import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import {useState} from 'react';



export function SnackbarComp(props){

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
        }
    const [state, setState] = useState({
        open: false,
        Transition: Slide,
        });
        const handleClose = () => {
        setState({ ...state, open: false });
        };
        const handleClick = (Transition) => () => {
        setState({
            open: true,
            Transition,
        });
        };

    return(
        <Snackbar
        open={props.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message="I love snacks"
        key={state.Transition.name}
    />
    );

}