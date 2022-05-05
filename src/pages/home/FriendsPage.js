import classes from './FriendsPage.module.css';
import Friends from '../../components/friendComp/Friends';

function FriendsPage(){

    return (
        <div className={classes.container}>
            <Friends />
        </div>
    );
}

export default FriendsPage;