import classes from './Right.module.css';

import nft_example from '../../../images/nft_exampe.jpeg';

function Right(){




    return (
        <div className={classes.right}>
            <div className={classes.imageWrapper}>
                <img className={classes.image} src ={nft_example}></img>
                <div className={classes.box}></div>
            </div>
        </div>
    );
}

export default Right;