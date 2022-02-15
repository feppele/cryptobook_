import classes from './TextInput.module.css';

function TextInput(props){



    return (

        <input type="text" placeholder="Item name" className={classes.textInput}></input>

    );


}

export default TextInput;