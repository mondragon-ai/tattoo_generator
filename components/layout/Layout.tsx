import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import styles from "../../styles/Main.module.css";
import useWindowWidth from "../tools/window";
import { TopBar } from "./TopBar";
// import Menu from "./Menu";


type Props = {
    state?: {
        name: string,
        email: string,
        uid: string
    },
    children: ReactNode
}

export const Layout: FunctionComponent<Props> = (props) => {
    const [openState, toggleMenu] = useState(false);

    const innerWidth = useWindowWidth()

    return (
        <div style={{
            minHeight: "",
            width: "100vw",
            background: "rgb(41 41 41)",
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
                <div style={{justifyContent: "space-between"}}className={`${styles.col} ${styles.full} `}>
                    <TopBar 
                        openState={openState}
                        toggleMenu={toggleMenu}
                        state={props.state as {
                            name: string,
                            email: string,
                            uid: string
                        }}
                    />
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