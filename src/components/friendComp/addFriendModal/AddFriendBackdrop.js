
import classes from './AddFriendBackdrop.module.css';

function Backdrop(props){


    return(

        <div className={classes.backdrop}  onClick={props.onBackDropClicked}>

        </div>

    );



    

}


export default Backdrop;