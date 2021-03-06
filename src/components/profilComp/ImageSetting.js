import classes from './ImageSetting.module.css';
import React, {useState} from 'react';
import coverImage from '../../images/image.png';

function ImageSetting(props){

    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

    // input Tag has ugly Button. So make input invisible in css. Create new button and ref!! on click to input tag
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (

            <div className={classes.imageUploadWrapper}>
                <div id="text">test</div>
                <form id="imageupload" >
                    <input ref={hiddenFileInput} id ="imageInput" type="file" name="image" onChange={changeHandler}  className={classes.imageInput}/>
                </form>
                <div onClick={handleClick} className={classes.hiddenFileButton}></div>

                { !isSelected && <img src ={coverImage} className={classes.coverImage}></img>}
                { isSelected &&   <img src={URL.createObjectURL(selectedFile)} className={classes.image}></img>  }
		    </div>

    );


}

export default ImageSetting;



















