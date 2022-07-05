import classes from './LikesIntegration.module.css';

import ListElement from './ListElement';

function LikesIntegration(props){

    console.log("props")

    console.log(props.likesList[0])

    return (

        <div className={classes.integration}>

            {props.likesList[0].map(item => <ListElement likesItem={item} />   )}

        </div>

    );


}

export default LikesIntegration;