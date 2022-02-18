import classes from './LikesList.module.css';
import Button6 from '../standart/Button6';
import closePic from '../../images/close.png';
import ListElement from './ListElement';

function LikesList(props){

    console.log("props")

    console.log(props.likesList[0])

    return (

        <div className={classes.container}>

            <img onClick={props.onCloseClick} src={closePic} className={classes.close}></img>


            <div className={classes.top}>
                {props.text}
            </div>

            <div className={classes.list}>

            {props.likesList[0].map(item => <ListElement likesItem={item} />   )}

            </div>


        </div>

    );


}

export default LikesList;