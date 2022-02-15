
import classes from './FinishedNFTBackdrop.module.css';

function FinishedNFTBackdrop(props){


    return(

        <div className={classes.backdrop} onClick={props.onBackDropClicked}>

        </div>

    );




}


export default FinishedNFTBackdrop;