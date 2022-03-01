import classes from './FriendsInfo.module.css';
import { useHistory } from "react-router-dom";

import BasicButton from '../standart/BasicButton';
import BasicButton2 from '../standart/BasicButton2';


function FriendsInfo(){

    const history = useHistory();

    function goToFriends(){
        history.push('/friends')
    }

    return (

        <div className={classes.container}>

            <div className={classes.friends}> Never use public addresses again</div>

            <div className={classes.text}> instead - send crypto by using names. Your friends name and address is interconnected in Smart Contracts on the Blockchain, so no one can can change it maliciously</div>

            <div className={classes.buttonWrapper}>
                <BasicButton2 onButtonClicked={goToFriends} text ="add friends"/>
                <BasicButton   text ="learn more"/>
            </div>

        </div>
    );
}

export default FriendsInfo;