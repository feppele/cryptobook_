import classes from './CryptoAddress.module.css';

function CryptoAddress(props){



    return (

        <div className={classes.addressWrapper}>
            <img src={props.cryptoSign} className={classes.cryptoSign}></img>
            <p className={classes.address} > {props.addr}</p>
        </div>

    );


}

export default CryptoAddress;