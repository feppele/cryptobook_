import classes from './BasicButton.module.css';

function BasicButton(props){



    return (

            <button onClick={props.onButtonClicked} className={classes.button}>
                <div> {props.text}  </div>
            </button>

    );


}

export default BasicButton;