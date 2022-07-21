import classes from './ListElement.module.css';
import closePic from '../../images/close.png';
import {shortAddr} from '../../web3/LoadingFunctions';
import {useHistory} from 'react-router-dom';
import {useEffect,useState,useContext} from 'react'
import {getProfilePicURL} from '../../node/images'
import StandartProfilPic from '../../images/background.jpeg';

//User Context
import {UserContext} from '../../UserProvider'


function ListElement(props){
    const userData = useContext(UserContext)

    const [profilePic,setProfilePic] =useState(StandartProfilPic);

    var address;
    if(props.likesItem.address === undefined){
        address = props.likesItem.follower;
    }else{
        address = props.likesItem.address;
    }

    var username =props.likesItem.name;
    if( username=== null ){
        username = "unnamed";
    }

    const history = useHistory();
    function goToProfile(){
            if(userData.address ===address){

                history.push({
                    pathname:"/me/"
                });
            }else{
                history.push({
                    pathname:"/profile/"+address
                });
            }
    }


    useEffect(() => {
        getProfilePicURL(address).then(url => {
            if(url.length >0){
                setProfilePic(url);
            }
        })

    },[])


    return (

        <div onClick={goToProfile} className={classes.container}>

            <img src={profilePic} className={classes.profilePicture}></img>

            <div className={classes.container2}>
                <div className={classes.name}>{username}</div>
                <div className={classes.addresse}>{shortAddr(address)}</div>
            </div>


        </div>


    )


}

export default ListElement;