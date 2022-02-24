import classes from './BasicButton2Big.module.css';

function BasicButton2Big(props){



    return (

            <button onClick={props.onButtonClicked} className={classes.button}>
                {props.text}
            </button>

    );


}

export default BasicButton2Big;