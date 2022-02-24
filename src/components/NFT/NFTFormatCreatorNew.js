import NFTFormatEasy from './NFTFormatEasy';


function NFTFormatCreatorNew(props){

    console.log(props)

    // es muss nurnoch die TokenId übergeben werden, da NFTFormatEasy selber alle daten lädt
    return  props.array.map(

        element =>  <NFTFormatEasy  tokenId={element}/> 

    )


}

export default NFTFormatCreatorNew;