import {useState,useEffect} from 'react';

import classes from './Logo.module.css'


function Logo(){


    return (
    <div className={classes.container1} >
    <div className={classes.container} >


    <div style={{top:'calc(5 * 6.66% - 1.5px)',left:'calc(2 * 12.5% - 1.5px)'}} className={classes.line}></div>
    <div style={{top:'calc(7 * 6.66% - 1.5px)',left:'calc(2 * 12.5% - 1.5px)'}} className={classes.line}></div>
    <div style={{top:'calc(9 * 6.66% - 1.5px)',left:'calc(2 * 12.5% - 1.5px)'}} className={classes.line}></div>

    <div style={{top:'calc(5 * 6.66% - 1.5px)',left:'calc(6 * 12.5% - 1.5px)'}} className={classes.line}></div>
    <div style={{top:'calc(7 * 6.66% - 1.5px)',left:'calc(6 * 12.5% - 1.5px)'}} className={classes.line}></div>


    <div style={{top:'calc(4.5 * 6.66% - 1.5px)',left:'calc(5.60 * 12.5% - 1.5px)',transform: 'rotate(61deg)',background:'#3e0270'}} className={classes.line}></div>
    <div style={{top:'calc(5.7 * 6.66% - 1.5px)',left:'calc(4.4 * 12.5% - 1.5px)',transform: 'rotate(61deg)',background:'#3e0270'}} className={classes.line}></div>

    <div style={{top:'calc(4.5 * 6.66% - 1.5px)',left:'calc(30% - 1.5px)',transform: 'rotate(119deg)',background:'#3e0270'}} className={classes.line}></div>
    <div style={{top:'calc(5.7 * 6.66% - 1.5px)',left:'calc(45% - 1.5px)',transform: 'rotate(119deg)',background:'#3e0270'}} className={classes.line}></div>

    <div style={{top:'calc(9.5 * 6.66% - 1.5px)',left:'calc(32% - 1.5px)',transform: 'rotate(61deg)',background:'#3e0270'}} className={classes.line}></div>
    <div style={{top:'calc(7.5 * 6.66% - 1.5px)',left:'calc(57% - 1.5px)',transform: 'rotate(61deg)',background:'#3e0270'}} className={classes.line}></div>

    <div style={{top:'calc(7.6 * 6.66% - 1.5px)',left:'calc(44% - 1.5px)',transform: 'rotate(119deg)',background:'#3e0270'}} className={classes.line}></div>
    <div style={{top:'calc(9.5 * 6.66% - 1.5px)',left:'calc(68% - 1.5px)',transform: 'rotate(119deg)',background:'#3e0270'}} className={classes.line}></div>

    <div style={{top:'calc(7.6 * 6.66% - 1.5px)',left:'calc(44% - 1.5px)',transform: 'rotate(119deg)',background:'#3e0270'}} className={classes.line}></div>
    <div style={{top:'calc(9.5 * 6.66% - 1.5px)',left:'calc(68% - 1.5px)',transform: 'rotate(119deg)',background:'#3e0270'}} className={classes.line}></div>

    <div style={{top:'calc(8 * 6.66% - 1.5px)',left:'calc(5 * 12.5% - 1.5px)'}} className={classes.line}></div>
    <div style={{top:'calc(8 * 6.66% - 1.5px)',left:'calc(3 * 12.5% - 1.5px)'}} className={classes.line}></div>

    <div style={{top:'calc(9.5 * 6.66% - 1.5px)',left:'calc(82% - 1.5px)',transform: 'rotate(61deg)',background:'#3e0270'}} className={classes.line}></div>


    <div style={{top:'calc(4 * 6.66% - 1.5px)',left:'calc(7 * 12.5% - 1.5px)'}} className={classes.line}></div>
    <div style={{top:'calc(6 * 6.66% - 1.5px)',left:'calc(7 * 12.5% - 1.5px)'}} className={classes.line}></div>
    <div style={{top:'calc(8 * 6.66% - 1.5px)',left:'calc(7 * 12.5% - 1.5px)'}} className={classes.line}></div>

    <div style={{top:'calc(2.6 * 6.66% - 1.5px)',left:'calc(6.5 * 12.5% - 1.5px)',transform: 'rotate(119deg)',background:'#3e0270'}} className={classes.line}></div>


    <div style={{top:'calc(3.6 * 6.66% - 1.5px)',left:'calc(4.5 * 12.5% - 1.5px)',transform: 'rotate(61deg)',background:'#3e0270'}} className={classes.line}></div>
    <div style={{top:'calc(2.6 * 6.66% - 1.5px)',left:'calc(5.5 * 12.5% - 1.5px)',transform: 'rotate(61deg)',background:'#3e0270'}} className={classes.line}></div>
    
    <div style={{top:'calc(3.6 * 6.66% - 1.5px)',left:'calc(3.5 * 12.5% - 1.5px)',transform: 'rotate(119deg)',background:'#3e0270'}} className={classes.line}></div>
    <div style={{top:'calc(2.6 * 6.66% - 1.5px)',left:'calc(2.5 * 12.5% - 1.5px)',transform: 'rotate(119deg)',background:'#3e0270'}} className={classes.line}></div>
    

    <div style={{top:'calc(2.6 * 6.66% - 1.5px)',left:'calc(1.5 * 12.5% - 1.5px)',transform: 'rotate(61deg)',background:'#3e0270'}} className={classes.line}></div>

    <div style={{top:'calc(4 * 6.66% - 1.5px)',left:'calc(1 * 12.5% - 1.5px)'}} className={classes.line}></div>
    <div style={{top:'calc(6 * 6.66% - 1.5px)',left:'calc(1 * 12.5% - 1.5px)'}} className={classes.line}></div>
    <div style={{top:'calc(8 * 6.66% - 1.5px)',left:'calc(1 * 12.5% - 1.5px)'}} className={classes.line}></div>




      <div style={{top:'calc(0% - 5px)',left:'calc(3 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(0% - 5px)',left:'calc(5 * 12.5% - 5px)'}} className={classes.dot1}></div>

      <div style={{top:'calc(6.66% - 5px)',left:'calc(2 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(6.66% - 5px)',left:'calc(4 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(6.66% - 5px)',left:'calc(6 * 12.5% - 5px)'}} className={classes.dot1}></div>

      <div style={{top:'calc(2 * 6.66% - 5px)',left:'calc(1 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(2 * 6.66% - 5px)',left:'calc(3 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(2 * 6.66% - 5px)',left:'calc(5 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(2 * 6.66% - 5px)',left:'calc(7 * 12.5% - 5px)'}} className={classes.dot1}></div>

      <div style={{top:'calc(3 * 6.66% - 5px)',left:'calc(0 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(3 * 6.66% - 10px)',left:'calc(2 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(3 * 6.66% - 5px)',left:'calc(4 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(3 * 6.66% - 10px)',left:'calc(6 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(3 * 6.66% - 5px)',left:'calc(8 * 12.5% - 5px)'}} className={classes.dot1}></div>

      <div style={{top:'calc(4 * 6.66% - 10px)',left:'calc(1 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(4 * 6.66% - 10px)',left:'calc(3 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(4 * 6.66% - 10px)',left:'calc(5 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(4 * 6.66% - 10px)',left:'calc(7 * 12.5% - 10px)'}} className={classes.dot2}></div>

      <div style={{top:'calc(5 * 6.66% - 5px)',left:'calc(0 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(5 * 6.66% - 20px)',left:'calc(2 * 12.5% - 20px)'}} className={classes.dot3}></div>
      <div style={{top:'calc(5 * 6.66% - 10px)',left:'calc(4 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(5 * 6.66% - 20px)',left:'calc(6 * 12.5% - 20px)'}} className={classes.dot3}></div>
      <div style={{top:'calc(5 * 6.66% - 5px)',left:'calc(8 * 12.5% - 5px)'}} className={classes.dot1}></div>

      <div style={{top:'calc(6 * 6.66% - 10px)',left:'calc(1 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(6 * 6.66% - 20px)',left:'calc(3 * 12.5% - 20px)'}} className={classes.dot3}></div>
      <div style={{top:'calc(6 * 6.66% - 20px)',left:'calc(5 * 12.5% - 20px)'}} className={classes.dot3}></div>
      <div style={{top:'calc(6 * 6.66% - 10px)',left:'calc(7 * 12.5% - 10px)'}} className={classes.dot2}></div>

      <div style={{top:'calc(7 * 6.66% - 5px)',left:'calc(0 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(7 * 6.66% - 20px)',left:'calc(2 * 12.5% - 20px)'}} className={classes.dot3}></div>
      <div style={{top:'calc(7 * 6.66% - 20px)',left:'calc(4 * 12.5% - 20px)'}} className={classes.dot3}></div>
      <div style={{top:'calc(7 * 6.66% - 20px)',left:'calc(6 * 12.5% - 20px)'}} className={classes.dot3}></div>
      <div style={{top:'calc(7 * 6.66% - 5px)',left:'calc(8 * 12.5% - 5px)'}} className={classes.dot1}></div>

      <div style={{top:'calc(8 * 6.66% - 10px)',left:'calc(1 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(8 * 6.66% - 10px)',left:'calc(3 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(8 * 6.66% - 10px)',left:'calc(5 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(8 * 6.66% - 10px)',left:'calc(7 * 12.5% - 10px)'}} className={classes.dot2}></div>

      <div style={{top:'calc(9 * 6.66% - 5px)',left:'calc(0 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(9 * 6.66% - 20px)',left:'calc(2 * 12.5% - 20px)'}} className={classes.dot3}></div>
      <div style={{top:'calc(9 * 6.66% - 10px)',left:'calc(4 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(9 * 6.66% - 20px)',left:'calc(6 * 12.5% - 20px)'}} className={classes.dot3}></div>
      <div style={{top:'calc(9 * 6.66% - 5px)',left:'calc(8 * 12.5% - 5px)'}} className={classes.dot1}></div>

      <div style={{top:'calc(10 * 6.66% - 10px)',left:'calc(1 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(10 * 6.66% - 10px)',left:'calc(3 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(10 * 6.66% - 10px)',left:'calc(5 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(10 * 6.66% - 10px)',left:'calc(7 * 12.5% - 10px)'}} className={classes.dot2}></div>

      <div style={{top:'calc(11 * 6.66% - 5px)',left:'calc(0 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(11 * 6.66% - 10px)',left:'calc(2 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(11 * 6.66% - 5px)',left:'calc(4 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(11 * 6.66% - 10px)',left:'calc(6 * 12.5% - 10px)'}} className={classes.dot2}></div>
      <div style={{top:'calc(11 * 6.66% - 5px)',left:'calc(8 * 12.5% - 5px)'}} className={classes.dot1}></div>

      <div style={{top:'calc(12 * 6.66% - 5px)',left:'calc(1 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(12 * 6.66% - 5px)',left:'calc(3 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(12 * 6.66% - 5px)',left:'calc(5 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(12 * 6.66% - 5px)',left:'calc(7 * 12.5% - 5px)'}} className={classes.dot1}></div>

      <div style={{top:'calc(13 * 6.66% - 5px)',left:'calc(2 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(13 * 6.66% - 5px)',left:'calc(4 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(13 * 6.66% - 5px)',left:'calc(6 * 12.5% - 5px)'}} className={classes.dot1}></div>

      <div style={{top:'calc(14 * 6.66% - 5px)',left:'calc(3 * 12.5% - 5px)'}} className={classes.dot1}></div>
      <div style={{top:'calc(14 * 6.66% - 5px)',left:'calc(5 * 12.5% - 5px)'}} className={classes.dot1}></div>




    </div>
    </div>
    );
}

export default Logo;