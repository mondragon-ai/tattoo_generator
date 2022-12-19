import styles from "../../styles/Main.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
    faGauge,
    faMagnifyingGlassChart,
    faUsers,
    faBasketShopping,
    faPercent,
    faMoneyBillTransfer,
    faTruckFast,
    faSliders,
    faArrowRightFromBracket,
    faPersonThroughWindow
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Underline from "../ui/Underline";
import { Dispatch, FC, FunctionComponent, MouseEvent, SetStateAction, useState } from "react";
// import { auth } from "../../lib/firebase";
// import { signOut } from "firebase/auth";

// const authState = auth;

const URL = "https://cdn.shopify.com/s/files/1/0574/9263/5817/files/bigly_logo_art_file.png?v=1626380659&width=300";
type Props = {
    openState: boolean,
    toggleMenu: Dispatch<SetStateAction<boolean>>
}
export const Menu: FunctionComponent<Props> = ({openState, toggleMenu}) => {

    const router = useRouter();
    console.log(router.pathname);


    const logOut = (e: MouseEvent<any>) => {
        e.preventDefault();
        // signOut(authState)
        //     .then(() => {
        //         // Sign-out successful.
        //         console.log("Signed Out");
        //     }).catch((error) => {
        //     // An error happened.
        //         console.log("Signed Out");
        //     })
    };

    return (
        <nav 
            className={`${styles.col} ${styles.sideBar} `} 
            style={{
                marginLeft: window.innerWidth > 720 ?  "0" : !openState ?   "-600px" : "0",
                height: window.innerWidth < 720 ? "" + (window.innerHeight + 600) + "px" : "" + (window.innerHeight) + "px",
                minHeight: "" + window.innerHeight + "px",
            }}>
            <header className={`${styles.col} ${styles.topHeaderMobile}`}>
                <div className={`${styles.row}`}>
                    <Image
                    src={URL}
                    alt="imPowered Logo"
                    width={90} 
                    height={90}/>
                    <div 
                        onClick={(e) => toggleMenu(!openState)}
                        className={`${styles.row} ${styles.mobileExit}`}>
                        <div><FontAwesomeIcon icon={faArrowRightFromBracket} /></div>
                    </div>
                </div>
                    {/* <Underline width={40} /> */}
            </header>
            
        </nav>
    )
}

export default Menu;