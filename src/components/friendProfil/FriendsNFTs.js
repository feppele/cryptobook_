import classes from './FriendsNFTs.module.css';
import {useEffect} from 'react';

import NftCollection from '../NFT/NftCollection';


function FriendsNFTs(props){


    return (

        <div className={classes.container}>


                <div className={classes.header}>

                    <div className={classes.headerText}> {props.personData.friend_name +"'s NFTs"}</div>

                    <div className={classes.buttonWrapper}>

                    </div>

                </div>

                <div className={classes.stripe}></div>


                { <NftCollection from={props.personData.friend_addr}/>}




        </div>





    );


}

export default FriendsNFTs;