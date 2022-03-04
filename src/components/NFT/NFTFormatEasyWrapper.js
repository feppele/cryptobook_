import classes from './NFTFormatEasyWrapper.module.css';

import NFTFormatEasy from './NFTFormatEasy'

function NFTFormatEasyWrapper(props){





    return (

        <div className={classes.wrapper}> 

            <NFTFormatEasy tokenId={props.tokenId}/>

        </div>





    );


}

export default NFTFormatEasyWrapper;