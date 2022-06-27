import React, {ReactElement} from "react";
import {mainArticles} from "../../items/ArrayMainArticles";
import {MainArticlesType} from "../../types/MainArticlesType";

export const MainArticles = (): ReactElement => {
    return (
        <div className="Cards-articles">
            {mainArticles.map((mainArticle: MainArticlesType, index:number) =>
            <div key={index} className="Card Border">
                <a href={mainArticle.link}>{mainArticle.title}</a>
                <a href="src/components/header_components/MainArticles#"><p>{mainArticle.text}</p></a>
            </div>)}
        </div>
    );
}