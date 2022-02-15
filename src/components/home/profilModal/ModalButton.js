import classes from './ModalButton.module.css';

function ModalButton(props){



    return(

    <div className={classes.buttonWrapper}>
        <img className={classes.picture} src = {props.imgSource}></img>
        <button onClick={props.onModalButtonClick} className={classes.button}> {props.text} </button>
    </div>

    );





}


export default ModalButton;