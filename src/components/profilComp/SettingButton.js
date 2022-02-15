import classes from './SettingButton.module.css';

import settingsPic from '../../images/settings2.png';

function SettingButton(){



    return (

            <button className={classes.settingButton}>
                <img src={settingsPic}></img>
            </button>





    );


}

export default SettingButton;