import React, {ReactElement} from "react";
import {SocialIconsType} from "../types/SocialIconsType";
import socialIcons from "../items/ArraySocialIcons";

const SocialIcon = (): ReactElement => {
    return (
        <div className="Header-social-icons">
            {socialIcons.map((socialIcon: SocialIconsType) =>
                <a key={socialIcon.idIcon} className="Icon" href={socialIcon.link}>{socialIcon.componentIcon}</a>
            )}
        </div>
    );
}

export default SocialIcon

