import React, {ReactElement} from "react";
import navigationMenu from "../../items/ArrayNavigationMenu";
import {NavigationMenuType} from "../../types/NavigationMenuType";


const NavigationMenu = (): ReactElement => {
    return (
        <div className="List-menu">
            {navigationMenu.map((elementMenu: NavigationMenuType, index: number) => <div key={index} className="Menu">
                <a key={index} href={elementMenu.link}>{elementMenu.sectionName}</a></div>)}
            <div className="DropMenu Menu"><a href="src/components/header_components/NavigationMenu#">ЩЕ</a></div>
        </div>
    );
}
export default NavigationMenu;