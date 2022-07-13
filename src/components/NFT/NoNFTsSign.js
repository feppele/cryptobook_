import classes from './NoNFTsSign.module.css';
import {loadFriends,shortAddr} from '../../web3/LoadingFunctions.js';
import sad from '../../images/sad.png'
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

function NoNFTsSign(props){

    return  (

    <div className={classes.noFriendsWrapper}>
        { !props.load && <CircularProgress color="inherit" />}
        { props.load && <div className={classes.noFriends}>{props.text} </div> }
        { props.load && <img src={sad} className={classes.sad}></img> }
    </div>



    );
}

export default NoNFTsSign;