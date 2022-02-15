import classes from './BasicButton.module.css';

function BasicButton(props){



    return (

            <button onClick={props.onButtonClicked} className={classes.button}>
                {props.text}
            </button>

    );


}

export default BasicButton;