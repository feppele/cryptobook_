import classes from './Left.module.css';
import { useHistory } from "react-router-dom";

import BasicButton from '../../standart/BasicButton';
import BasicButton2 from '../../standart/BasicButton2';


function Left(){

    const history = useHistory();

    function goToFriends(){
        history.push('/friends')
    }

    return (

        <div className={classes.left}>

            <p className={classes.friends}> Never use public addresses again</p>

            <p className={classes.text}> instead - send crypto by using names.</p>
            <p className={classes.text}> Your friends name and address are interconnected in Smart Contracts on the Blockchain, </p>
            <p className={classes.text}> so no one can can change it maliciously</p>
            <p className={classes.text}> </p>
            <p className={classes.text}> </p>

            <div className={classes.buttonWrapper}>
                <BasicButton2 onButtonClicked={goToFriends} text ="add friends"/>
                <BasicButton   text ="learn more"/>
            </div>

        </div>
    );
}

export default Left;