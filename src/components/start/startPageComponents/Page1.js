import classes from './Page1.module.css';
import {useState,useContext,useEffect} from 'react';
import Writer from './writer/Writer';
import Logo from '../../homePages/Logo'
import LogoMedium from '../../homePages/LogoMedium'

//ColorTheme - Night Mode
import {themes} from '../../../ColorTheme'
import {NightContext} from '../../../NightModeProvider'

function Page1(){

    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])


    

    const text1 = `Make the first step into the 
connected Blockchain World`;

// const text1 = `The first Blockchain Social Media
// for save messaging, NFTs, `;

const text2 = `Store your friends Identity
on Blockchain`;
const text3 = `Send cryptos to friends
like Paypal`;
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
        <div style={{backgroundColor:theme.startPage}} id="container" className={classes.container}>

           <div className={classes.logoMedium}><LogoMedium /></div> 
           <div className={classes.logoBig}><Logo /></div> 


            <div className={classes.writerSite}>

                <div className={classes.header}> MyCryptoBook</div>

                {  true && writerIsOpen && <Writer theme={theme}   id="writer"  text={text1}/>}
                {  true &&writer2IsOpen && <Writer theme={theme} id="writer"  text={text2}/>}
                {  true &&writer3IsOpen && <Writer  theme={theme} id="writer"  text={text3}/>}
                {  true && writer4IsOpen && <Writer theme={theme}  id="writer"  text={text4}/>}
             </div>

        </div>
    );
}

export default Page1;