import classes from './LikesList.module.css';
import Button6 from '../standart/Button6';
import closePic from '../../images/close.png';

function LikesList(props){



    return (

        <div className={classes.container}>

            <img src={closePic} className={classes.close}></img>


            <div className={classes.top}>
                Favorited by
            </div>

            <div className={classes.list}>


            </div>


        </div>

    );


}

export default LikesList;