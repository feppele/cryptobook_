import classes from './MyNftPage.module.css';

import NftCollection from './NftCollection';

import React, { Component } from 'react';
import {useState,useEffect} from 'react';
import {loadFriends,shortAddr,onLoad} from '../../web3/LoadingFunctions';
import {useHistory} from 'react-router-dom';
import {NFTContract,NFTContractAddress} from '../../web3/NFTContract';


import {getAllTokensMetadataArray} from '../../web3/NFTContractHelper';


function MyNftPage(){

    const history = useHistory();

    function openCreatePage(){
        history.push("/createNFT");
    }


    return (

        <div className={classes.container}>


                <div className={classes.header}>

                    <div className={classes.headerText}>my NFTs</div>

                    <div className={classes.buttonWrapper}>
                        <button className={classes.button1}>Explore</button>
                        <button onClick={openCreatePage} className={classes.button2}>Create</button>
                    </div>

                </div>

                <div className={classes.stripe}></div>


                { <NftCollection from={"me"}/>}




        </div>






    );


}

export default MyNftPage;
