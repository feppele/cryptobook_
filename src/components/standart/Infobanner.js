import classes from './Infobanner.module.css';

function Infobanner(props){



    return (

            <div className={classes.container}>
                {props.text}
            </div>

    );


}

export default Infobanner;