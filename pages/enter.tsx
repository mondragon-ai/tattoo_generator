import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import {  SetStateAction, useState } from "react";
import { auth } from "../lib/firebase";
import {User} from "@firebase/auth/dist/auth-public";
// import Image from "next/image";
// import Link from "next/link";
import styles from "../styles/Main.module.css";
// // import styles from '../styles/Auth.module.css';
// import {
//     faEyeSlash,
//     faEye
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Fonts? 
// import { 
//     Merienda_One,
//     Saira_Extra_Condensed,
//     Anonymous_Pro,
//     Bungee_Shade,
// } from '@next/font/google'
import Head from "next/head";
import Header from "../components/ui/text/RotatingHeader";
import CustomInput from "../components/ui/form/Input";
import Button from "../components/ui/Button";
import RotatingImage from "../components/ui/images/RotatingImage";
import { impoweredRequest } from "../lib/requests";
import Image from "next/image";


// const DEV_SERVER = "http://localhost:5001/tattooideas-10372/us-central1/api";
const LIVE_SERVER = "http://localhost:5001/tattooideas-10372/us-central1/api"

// const auth = getAuth();
const updateUser = async (
    toggleState: SetStateAction<any>,
    loadingState: SetStateAction<any>,
    setErr: SetStateAction<any>,
    first_name: string
) => {
    console.log(first_name);

    const user = auth?.currentUser as User;

    await updateProfile(user, {
        displayName: first_name,
        photoURL: "https://preview.redd.it/do-people-still-like-deku-i-mean-with-the-multiple-quirks-v0-0n2llx05e5p91.jpg?auto=webp&s=de896ef0fd36735be9ff048149135fa39f723f84",
    }).then(() => {

        // Update states
        toggleState(true);
        loadingState(false);
        console.log("SUCCESS");

    }).catch((error) => {

        // Update states
        loadingState(false);
        setErr("Profile not updated succesfully.");
        console.log("SUCCESS");

        // Debug
        console.log(error.code);
    });
}
        

// const meriendaOne = Merienda_One({
//   weight: '400',
// })

// const saira = Saira_Extra_Condensed({
//     weight: "400",
// })

// const bungee = Bungee_Shade({
//     weight: '400'
// })

// const anonPro = Anonymous_Pro({
//     weight: "400",
// })

const IMG_URL = "https://cdn.dribbble.com/assets/auth/sign-in-a63d9cf6c1f626ccbde669c582b10457b07523adb58c2a4b46833b7b4925d9a3.jpg";
const IMG_NFT = "https://vagazine.com/vaga_v3/wp-content/uploads/2022/04/ezgif.com-gif-maker-1.gif";
const LOGO = "https://cdn.shopify.com/s/files/1/0574/9263/5817/files/bigly_logo_art_file.png?v=1626380659&width=300";

const authUser = auth;
export default function Enter() {
    const tattoos = ['American Traditional', 'Blackwork', 'Celtic', 'Chicano', 'Dotwork', 'Japanese', 'Neo-Traditional', 'Realistic', 'Script', 'Watercolor'];

    // Input State
    const [user, setUser] = useState({
        first_name: "",
        email: "",
        password: "",
        browser_type: "",
        ip_address: ""
    })

    // Auth State
    const [authState, toggleState] = useState(false);

    // Toggle password view
    const [showPass, hidePass] = useState(false);

    // err handling state
    const [error, setErr] = useState({
        name: "",
        email: "",
        password: "",
        error: ""
    })

    // Form type 
    const [FORM_STATE, setFormState] = useState<"SIGN_UP" | "SIGN_IN" | "">("SIGN_UP");

    // async loading handling for UI
    const [loading, setLoading] = useState(false);


    let text = "app"

    const signIn = (e: any) => {
        e.preventDefault();
        setLoading(true);
        toggleState(true);

        signInWithEmailAndPassword(authUser, user?.email, user?.password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;

                // Update states
                toggleState(false);
                setLoading(false);

                const response = await impoweredRequest(LIVE_SERVER + "/customers/create",
                "POST", {
                    "Content-Type": "application/json",
                }, {
                    user_uuid: user.uid
                });

                if (!response) throw new Error("Likely couldnt create customer.");
                

                // Debug
                console.log(response)
            })
            .catch((err) => {
                // Update states
                toggleState(false);
                setLoading(false);
                setErr({...error, error:"Email or password did not match. Reset password?"});

                // Debug
                console.log(err.code);
            });
    } 

    const signUp = (e: any) => {
        e.preventDefault();

        // Start Loading
        setLoading(true);
        toggleState(true);

        // Create account & send POST to create database || LINK
        createUserWithEmailAndPassword(authUser, user?.email, user?.password)
            .then( async (userCredential) => {
                // Signed Up
                const u = userCredential.user;

                if (u === null) {
                    throw new Error("ERROR: Likley in creating the user credentials and authorizing");
                    
                }

                // Update user Auth Profile
                await updateUser(
                    toggleState,
                    setLoading,
                    setErr,
                    user?.first_name);

                // Debug
                setLoading(false);
                toggleState(false);

                await impoweredRequest(LIVE_SERVER + "/users/create",
                "POST", {
                    "Content-Type": "application/json",
                }, {
                    user_uuid: u.uid,
                    first_name: u.displayName,
                    email: u.email,
                })
            })
            .catch((er) => {
                // Update states
                setErr({...error, error: String(er.code).replaceAll("-", " ").substring(5)});
                setLoading(false);
                toggleState(false);

                // Debug
                console.log(String(er.code).replaceAll("-", " ").substring(5));
            });
    }

    return (
        <>
        <Head>
            <title>Login or Sign Up</title>
            <meta name="description" content="Log into instant tattoo ideas, and get inspiration for your next session!" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${styles.full} ${styles.col}`} style={{background: "rgb(41 41 41)"}}>


            <div className={`${styles.full}  ${styles.col}`}>

                <div className={`${styles.container} ${styles.full}`} style={{paddingBottom: "40px", position: "relative"}}>
                    <Image style={{margin: "40px 0"}} src={"/logo.png"} width={60} height={60} alt={""} />
                    <Header words={tattoos} interval={1000} />
                </div>

                <form className={`${styles.container} ${styles.full}  ${styles.col}`} style={{height: "auto"}}>
                    {
                        FORM_STATE == "SIGN_UP" ? <CustomInput 
                            error={error.name}
                            name={"first_name"}
                            label={"First Name"}
                            value={user?.first_name}
                            onChange={(e) => setUser({
                                ...user,
                                first_name: e.target.value
                            })}
                        /> : null
                    }

                    <CustomInput 
                        error={error.email}
                        name={"email"}
                        label={"Email"}
                        value={user?.email}
                        onChange={(e) => setUser({
                            ...user,
                            email: e.target.value
                        })}
                    />

                    <CustomInput 
                        error={error.password}
                        name={"password"}
                        label={"Password"}
                        value={user?.password}
                        onChange={(e) => setUser({
                            ...user,
                            password: e.target.value
                        })}
                    />
                    
                    <div  className={`${styles.container} ${styles.full}  ${styles.col}`} style={{height: "auto", paddingBottom: 10, textAlign: "center"}}>
                        <span  className={`${styles.container} ${styles.full}`} style={{padding: "0rem"}}>
                            {error.error}
                        </span>
                    </div>

                    {
                        FORM_STATE == "SIGN_IN" ? <Button onClick={signIn}>{!authState ? "Sign In" : "Loading . . . "}</Button> :
                        <Button onClick={signUp}>{!authState ? "Sign Up" : "Loading . . . "}</Button> 
                    }

                    <div  className={`${styles.container} ${styles.full}  ${styles.col}   ${styles.paddingY}`} style={{height: "auto",}}>
                        {
                            FORM_STATE == "SIGN_IN" ? <span  className={`${styles.container} ${styles.full}`}
                                style={{padding: "0rem", textAlign: "center"}}
                                onClick={(e) => setFormState("SIGN_UP")}
                            >Not a member? Sign ups here.
                            </span> : <span  className={`${styles.container} ${styles.full}`}
                                style={{padding: "0rem", textAlign: "center"}}
                                onClick={(e) => setFormState("SIGN_IN")}
                            >Already a member? Sign in here.
                            </span> 
                        }
                    </div>
                </form>

            </div>
        </main>
        </>
    )
}