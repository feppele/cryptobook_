
import classes from './MiniBackdrop.module.css';

function MiniBackdrop(props){


    return(

        <div className={classes.backdrop} onMouseOver={props.onBackDropMouse} >

        </div>

    );



    

}


export default MiniBackdrop;