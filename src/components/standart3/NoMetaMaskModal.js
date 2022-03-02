import classes from './NoMetaMaskModal.module.css';
import closePic from '../../images/close.png';

function NoMetaMaskModal(props){


    return (

        <div className={classes.backdrop} onClick={props.close}>

            <div className={classes.container}>

                <img onClick={props.close} src={closePic} className={classes.close}></img>


                <div className={classes.top}>
                    {props.text}
                </div>

                <div className={classes.box}>


                </div>


            </div>


        </div>



    );


}

export default NoMetaMaskModal;