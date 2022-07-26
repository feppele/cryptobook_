import {useState,useEffect} from 'react';
import Writer from './writer/Writer';
import M from '../../../images/M.svg'
import './Test.css'

function Test(){

    useEffect(() => {
        var cube = document.querySelector('.cube');
        var radioGroup = document.querySelector('.radio-group');
        var currentClass = '';
        function changeSide() {
        var checkedRadio = radioGroup.querySelector(':checked');
        var showClass = 'show-' + checkedRadio.value;
        if ( currentClass ) {
            cube.classList.remove( currentClass );
        }
        cube.classList.add( showClass );
        currentClass = showClass;
        }
        // set initial side
        changeSide();
        radioGroup.addEventListener( 'change', changeSide );

    },[])






    return (
    <div style={{position: 'absolute',zIndex:'1000'}}>
        <div class="scene">
  <div class="cube">
    <div class="cube__face cube__face--front">front</div>
    <div class="cube__face cube__face--back">back</div>
    <div class="cube__face cube__face--right">right</div>
    <div class="cube__face cube__face--left">left</div>
    <div class="cube__face cube__face--top">top</div>
    <div class="cube__face cube__face--bottom">bottom</div>
  </div>
</div>
<p class="radio-group">
  <label>
    <input type="radio" name="rotate-cube-side" value="front" checked /> front
  </label>
  <label>
    <input type="radio" name="rotate-cube-side" value="right" /> right
  </label>
  <label>
    <input type="radio" name="rotate-cube-side" value="back" /> back
  </label>
  <label>
    <input type="radio" name="rotate-cube-side" value="left" /> left
  </label>
  <label>
    <input type="radio" name="rotate-cube-side" value="top" /> top
  </label>
  <label>
    <input type="radio" name="rotate-cube-side" value="bottom" /> bottom
  </label>
</p>


    </div>
    );
}

export default Test;