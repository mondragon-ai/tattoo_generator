import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { ChangeEvent, SetStateAction, useState } from "react";
import { auth } from "../lib/firebase";
import {User} from "@firebase/auth/dist/auth-public";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Main.module.css";
// // import styles from '../styles/Auth.module.css';
// import {
//     faEyeSlash,
//     faEye
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Fonts? 
import { 
    Merienda_One,
    Saira_Extra_Condensed,
    Anonymous_Pro,
    Bungee_Shade,
} from '@next/font/google'
import Head from "next/head";
import Header from "../components/ui/text/RotatingHeader";
import CustomInput from "../components/ui/form/Input";
import Button from "../components/ui/Button";
import RotatingImage from "../components/ui/images/RotatingImage";
import { impoweredRequest } from "../lib/requests";


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

                const response = await impoweredRequest("http://localhost:3000/api/customers/create",
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

                if (u !== null) {
                  u.providerData.forEach((profile) => {
                    console.log(" => Sign-in provider: " + profile);
                    console.log("Sign-in provider: " + profile.providerId);
                    console.log("  [Provider-specific UID]: " + profile.uid);
                    console.log("  [Name]: " + profile.displayName);
                    console.log("  [Email]: " + profile.email);
                    console.log("  [Photo URL]: " + profile.photoURL);
                  });
                }

                // Update user Auth Profile
                await updateUser(
                    toggleState,
                    setLoading,
                    setErr,
                    user?.first_name);

                // Debug
                console.log("Signed Up -- Created - FN: " + user?.first_name);
                console.log("  [UUID]: " + u.uid);
                console.log("  [TOKEN]: " + await u.getIdToken());
                console.log("  [VERIFIED]: " + u.emailVerified);
                console.log("  [VERIFIED]: " +  u.email);
                console.log("  [NAME]: " +  u.displayName);
                console.log("  [IS ANON]: " +  u.isAnonymous);
                setLoading(false);
                toggleState(false);

                const response = await impoweredRequest("http://localhost:3000/api/customers",
                "POST", {
                    "Content-Type": "application/json",
                }, {
                    user_uuid: u.uid
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
                    <RotatingImage images={[
                        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-Q8nHB6D7F0eaq3zBeBd7pqSh.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=ynTR%2B53tkgDRx%2BvmFf%2BEunKd8l1G2LsqQ7gdKW%2Blwek%3D",
                        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-U8gPiit4vsWxCtRpp7h1kVoX.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=JZ6Cov/DlPXKR0u0B4mZFiRCs6NEZrHXD8CeBml2iJ8%3D",
                        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-qm20w5xyfXpPsuZvbSIoWD5L.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=a6tITmx5HNByZloaAb7XVI3RTIyH%2B9y/C/BWpjrqky4%3D",
                        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-NVGEj7QPhG9HMeBVTgr8E8UC.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=w/akfWMSslMLbGb/Dh8WWBJP3wbriwzRsSdSDsRfZAk%3D"
                    ]} interval={2000} />
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