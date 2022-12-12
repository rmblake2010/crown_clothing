import { useState,  } from "react"
import './sign-in-form.styles.scss'

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import { signInWithGooglePopup, createUserDocumentFromAuth, signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"

const defaultFormFields = {
    email: '',
    password: '',

}

const SignInForm= () => {
const [formFields, setFormFields] = useState(defaultFormFields)
const { email, password } = formFields



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

const resetFormFields = () => {
    setFormFields(defaultFormFields)
}

const signInWithGoogle = async () => {
    await signInWithGooglePopup()
}


const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        const { user } = await signInUserWithEmailAndPassword(email, password)
        resetFormFields()

        console.log(user)
    }catch(error){
        switch(error.code){
            case 'auth/wrong password':
                alert('incorrect password')
                break;
            case 'auth/user-not-found':
                alert('no user associated with this email')
                break;
            default:
                console.log(error)
        }
    }
}

const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({...formFields, [name]: value})
}

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='email'
                    type='email'
                    name='email'
                    value={email}
                    required
                    onChange={handleChange}
                />
                <FormInput 
                    label='password'
                    type='password'
                    name='password'
                    value={password}
                    required
                    onChange={handleChange}
                />
                <div className="buttons-container">
                    <Button type='submit'>Sign in</Button>              
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )

}

export default SignInForm