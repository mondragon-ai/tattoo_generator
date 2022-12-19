import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import styles from "../../styles/Main.module.css";
import useWindowWidth from "../tools/window";
// import Menu from "./Menu";


type Props = {
    state?: boolean,
    children: ReactNode
}

export const Layout: FunctionComponent<Props> = (props) => {
    const [openState, toggleMenu] = useState(false);

    const innerWidth = useWindowWidth()

    console.log(innerWidth> 720);
    console.log(innerWidth);
    
    return (
        <div style={{
            minHeight: "100vh",
            width: "100vw",
            background: "var(--darkBackground)",
            height: "auto"
        }} className={`${styles.row} ${styles.full} `}>
            <div
                style={{
                    display: innerWidth > 720 ?  "" : !openState ?   "none" : "",
                    height:  innerWidth < 720 ? "" + (innerWidth + 600) + "px" : "" + (innerWidth) + "px",
                    minHeight:  "", //"" + window?.innerHeight + "px",
                }} 
                className={styles.mainLayout}></div>
            <div
                style={{
                    display: innerWidth > 720 ?  "" : !openState ?   "none" : "",
                    height:  innerWidth < 720 ? "" + (innerWidth + 600) + "px" : "" + (innerWidth) + "px",
                    minHeight:  innerWidth + "px",
                }} 
                className={styles.blur}></div>

            {/* TODO: SIDE NAV COMP */}
            {/* <Menu openState={openState} toggleMenu={toggleMenu} /> */}
           
            <main 
                className={`${styles.col} ${styles.mainContainer} ${styles.full} `}
                style={{
                    justifyContent: "space-between",
                    width: "100vw",
                    display:  "", //window?.innerWidth > 720 ?  "flex" : openState ?   "none" : "",
                    height: "auto"
                }}>
                <div 
                    style={{justifyContent: "space-between"}}className={`${styles.col} ${styles.full} `}>
                    {props.children}
                </div>
                {/* <footer  className={`${styles.row} ${styles.footer}`}>`
                    Bigly 
                </footer> */}
            </main>

        </div>
    )
}

export default Layout;