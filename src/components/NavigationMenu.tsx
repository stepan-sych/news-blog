import React, {ReactElement} from "react";
import navigationMenu from "../items/ArrayNavigationMenu";
import {NavigationMenuType} from "../types/NavigationMenuType";


const NavigationMenu = (): ReactElement => {
    return (
        <div className="List-menu">
            {navigationMenu.map((elementMenu: NavigationMenuType) => <div key={elementMenu.idItem} className="Menu">
                <a key={elementMenu.idItem} href={elementMenu.link}>{elementMenu.sectionName}</a></div>)}
            <div className="DropMenu Menu"><a key={16} href="#">ЩЕ</a></div>
        </div>
    );
}
export default NavigationMenu;