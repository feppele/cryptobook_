import classes from './LikesList.module.css';
import closePic from '../../images/close.png';

function LikesList(props){



    return (

        <div className={classes.container}>

            <img src={closePic} className={classes.close}></img>


            <div className={classes.top}>
                {props.text}
            </div>

            <div className={classes.list}>


            </div>


        </div>

    );


}

export default LikesList;