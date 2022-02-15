
import classes from './MenuModal.module.css';

function MenuModal(props){



    return(

        <div className={classes.modal}>

            <p>Connect to Wallet</p>

            <button > Metamask2 </button>

            <button onClick={props.onModalCancelClicked}> Cancel</button>

        </div>

    );




}


export default MenuModal;