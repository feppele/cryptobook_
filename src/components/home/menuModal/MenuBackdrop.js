
import classes from './MenuBackdrop.module.css';

function MenuBackdrop(props){



    return(

        <div className={classes.backdrop} onMouseOver={props.onBackDropClicked} onClick={props.onBackDropClicked}>

        </div>

    );




}


export default MenuBackdrop;