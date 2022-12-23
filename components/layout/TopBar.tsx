import Image from "next/image";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import styles from "../../styles/Main.module.css";
import {
    faMoneyBill1Wave, faPersonThroughWindow, faClockRotateLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Link from "next/link";
const authState = auth;

import logo from "../../public/logo.png"

const URL = "https://cdn.shopify.com/s/files/1/0574/9263/5817/files/bigly_logo_art_file.png?v=1626380659&width=300";
type Props = {
    state: {
        name: string,
        email: string,
        uid: string
    },
    openState: boolean,
    toggleMenu: Dispatch<SetStateAction<boolean>>
}

export const TopBar: FunctionComponent<Props> = ({state, openState, toggleMenu}) => {
    const logOut = () => {
        signOut(authState)
            .then(() => {
                // Sign-out successful.
                console.log("Signed Out");
            }).catch((error) => {
            // An error happened.
                console.log("Signed Out");
            })
    }
    return (
        <header className={`${styles.row} ${styles.full} `}>
            <div className={`${styles.row} ${styles.full}`} style={{justifyContent: "space-between", padding: "0.5rem 1rem"}}>
                <div style={{width: "10%", paddingTop:  "0.5rem", color: "rgb(174 43 43)"}} onClick={() => logOut()}>
                    <FontAwesomeIcon icon={faPersonThroughWindow} />
                </div>
                <div style={{width: "10%", paddingTop:  "0rem", color: "rgb(174 43 43)"}}>
                    <Link href={`/home/${state.uid}`}>
                        <Image
                            src="/logo.png"
                            alt="imPowered Logo"
                            width={40} 
                            height={40}/>
                    </Link>
                </div>
                <div style={{width: "30%",justifyContent: "flex-end"}} className={`${styles.row}`}>
                    <Link href={`/history/${state.uid}`} style={{width: "30%", padding:  "0.6rem 0.6rem 0 0", color: "rgb(174 43 43)"}}>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                    </Link>
                    <Link href={`/payments/${state.uid}`} style={{width: "30%", paddingTop:  "0.5rem", color: "rgb(174 43 43)", marginLeft: "0.9rem"}}>
                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                    </Link>
                </div>
            </div>
        </header>
    )
}