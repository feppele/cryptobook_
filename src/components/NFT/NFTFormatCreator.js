import NFTFormatEasy from './NFTFormatEasy';


function NFTFormatCreator(props){
    var key =1;


    // es muss nurnoch die TokenId übergeben werden, da NFTFormatEasy selber alle daten lädt
    return  props.metadataArray.map(

        element =>  <NFTFormatEasy key={key++} imageURL={element[0]} imageName={element[1]} tokenId={element[2]}/> 

    )


}

export default NFTFormatCreator;