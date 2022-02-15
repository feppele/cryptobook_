
import classes from './LoginModal.module.css';

function LoginModal(props){



    return(

        <div className={classes.modal}>

            <p className={classes.text}>Connect Wallet to login</p>

            <button onClick={props.onModalMetamaskClicked} className={classes.button}> Metamask </button>
            <button onClick={props.onModalCancelClicked} className={classes.button}> Cancel</button>


        </div>

    );




}


export default LoginModal;