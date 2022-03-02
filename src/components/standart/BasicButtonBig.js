import classes from './BasicButtonBig.module.css';

function BasicButtonBig(props){



    return (

            <button onClick={props.onButtonClicked} className={classes.button}>
                {props.text}
            </button>

    );


}

export default BasicButtonBig;