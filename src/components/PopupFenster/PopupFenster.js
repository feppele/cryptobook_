import classes from './PopupFenster.module.css';
import closePic from '../../images/close.png';
import {useRef} from 'react'


// This is a PopupFenster Gerüst. 

//props.onCloseClicked to Close PopupFenster
// props.integration    <PopupFenster integration={<Integration /> } />
function PopupFenster(props){

    // function closeAnimated(){
    //     ref.current.style.animationName ="driveOut"
    //     ref.current.style.animationDuration ="0.6s"

    //     setTimeout(()=>props.onCloseClicked(),600)
    // }

    return (


        <div  className={classes.komplett}> 


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