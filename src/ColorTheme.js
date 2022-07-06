// Import nightMode Boolean from Navbar Switch
import {nightMode} from './components/home/Navbar3'

const dark1 = 'rgb(32, 34, 37)'//{backgroundColor:'rgb(32, 34, 37)'}
const dark2 = 'rgb(48, 51, 57)'//{backgroundColor:'rgb(48, 51, 57)'}
const darkFont = 'rgb(201, 201, 201)'//{color:'rgb(201, 201, 201)'}
const pngDark = 'invert(0.75)'//{filter:'invert(0.75)'}
const borderDark = '1px solid rgb(22, 22, 22)'//{border: '1px solid rgb(212, 212, 212)'}

const white = 'white'//{backgroundColor:'white'}
const lightGrey = 'rgb(243, 243, 243)'//{backgroundColor:'rgb(243, 243, 243)'}
const brightFont = 'black'//{color:'black'}
const pngNormal = ''//{}
const borderBright = '1px solid rgb(212, 212, 212)' //{border: '1px solid rgb(212, 212, 212)'}



const darkTheme= {color1:dark1, color2:dark2,color3:dark2,font:darkFont,png:pngDark,border:borderDark}
const brightTheme= {color1:white, color2:lightGrey,color3:white,font:brightFont,png:pngNormal,border:borderBright}

const theme = brightTheme

const themes ={dark:darkTheme,bright:brightTheme}

export {theme}
export {themes}