import classes from './NoFriendsSign.module.css';
import {loadFriends,shortAddr} from '../../web3/LoadingFunctions.js';
import sad from '../../images/sad.png'

function NoFriendsSign(props){




    return  (

    <div className={classes.noFriendsWrapper}>
        <div className={classes.noFriends}>{props.text} </div>
        <img src={sad} className={classes.sad}></img>
    </div>



    );
}

export default NoFriendsSign;