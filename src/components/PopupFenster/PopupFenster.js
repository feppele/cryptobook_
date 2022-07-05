import classes from './PopupFenster.module.css';
import closePic from '../../images/close.png';


// This is a PopupFenster Gerüst. 

//props.onCloseClicked to Close PopupFenster
// props.integration    <PopupFenster integration={<Integration /> } />
function PopupFenster(props){



    return (


        <div className={classes.komplett}> 


            <div onClick={props.onCloseClicked} className={classes.backdrop}> 



            </div>

            <div className={classes.fenster}>

            <img onClick={props.onCloseClicked} src={closePic} className={classes.close}></img>


            <div className={classes.top}>
                {props.text}
            </div>


            {/* Integration */}
            {props.integration}

            </div>

        </div>

    );


}

export default PopupFenster;