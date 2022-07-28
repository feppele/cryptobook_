import classes from './LittleMenu.module.css';
import {useState,useEffect} from 'react';


// use like thise
// <Button onClick={e => {setMenuOpened(e)}}> click </Button>
// {menuOpened && <LittleMenu open={menuOpened}/> }


function LittleMenu(props){

    const e = props.open
    const target = e.target;
    // Get the bounding rectangle of target
    const rect = target.getBoundingClientRect();

    // Mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top +40;


    if(!props.open){return }

    return (

        <div style={{top:y,left:x}} className={classes.container}>
            hi

        </div>
    );



}

export default LittleMenu;