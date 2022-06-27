import React, {ReactElement} from "react";
import {SocialIconsType} from "../../types/SocialIconsType";
import socialIcons from "../../items/ArraySocialIcons";

const SocialIcon = (): ReactElement => {
    return (
        <div className="Header-social-icons">
            {socialIcons.map((socialIcon: SocialIconsType, index: number) =>
                <a key={index} className="Icon" href={socialIcon.link}>{socialIcon.componentIcon}</a>
            )}
        </div>
    );
}

export default SocialIcon

