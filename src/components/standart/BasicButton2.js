import classes from './BasicButton2.module.css';

function BasicButton2(props){



    return (

            <button onClick={props.onButtonClicked} className={classes.button}>
                {props.text}
            </button>

    );


}

export default BasicButton2;