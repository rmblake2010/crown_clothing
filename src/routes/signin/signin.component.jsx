import SignUpForm from "../../components/sign-up-form/sign-up-form.component"
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const SignIn = () => {

    /* Sign in w/ redirect option
    useEffect(() => {
        async function authResponse() {
            const response = await getRedirectResult(auth)
            if(response){
                const userDocRef = await createUserDocumentFromAuth(response.user)
            }
        }
        authResponse()

        // Testing unmount of useEffect
        return () => {
            console.log('this will be logged on unmount at signin component')
        }
    }, [])
*/
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
    }


    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google </button>
            <SignUpForm/>
        </div>
    )
}

export default SignIn