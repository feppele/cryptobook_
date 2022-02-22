import classes from './FriendsPage.module.css';

import Friends from '../../components/friendComp/Friends';


import {onLoad} from '../../web3/LoadingFunctions';

function FriendsPage(){

    //onLoad();


    return (

        <div className={classes.container}>

            <Friends />

        </div>





    );


}

export default FriendsPage;