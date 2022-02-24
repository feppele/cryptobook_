import classes from './Page1.module.css';
import {useState} from 'react';
import Writer from './writer/Writer';

function Page1(){

const text1 = `Make the first step into the 
connected Blockchain World`;
const text2 = `Store your friends Identity
on Blockchain`;
const text3 = `Send cryptos to friends
like PayPal`;
const text4 = `Share your own NFT-Art
on your profile`;

const [ writerIsOpen, setWriterIsOpen ] = useState(true);
const [ writer2IsOpen, setWriter2IsOpen ] = useState(false);
const [ writer3IsOpen, setWriter3IsOpen ] = useState(false);
const [ writer4IsOpen, setWriter4IsOpen ] = useState(false);

    window.addEventListener("load", function(event) {
        setTimeout(() => {
            setWriterIsOpen(false);
            setWriter2IsOpen(true);
        },4000);
        setTimeout(() => {
            setWriter2IsOpen(false);
            setWriter3IsOpen(true);
        },8000);
        setTimeout(() => {
            setWriter3IsOpen(false);
            setWriter4IsOpen(true);
        },12000);
        setTimeout(() => {
            setWriter4IsOpen(false);
            setWriterIsOpen(true);
        },16000);
    })

    return (
        <div id="container" className={classes.container}>
             {  writerIsOpen && <Writer  id="writer"  text={text1}/>}
             {  writer2IsOpen && <Writer  id="writer"  text={text2}/>}
             {  writer3IsOpen && <Writer  id="writer"  text={text3}/>}
             {  writer4IsOpen && <Writer  id="writer"  text={text4}/>}
        </div>
    );
}

export default Page1;