import { useState } from "react"
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



const logGoogleUser = async () => {
    console.log('clicked')
    const {user} = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
}


const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        signInUserWithEmailAndPassword(email, password)
    }catch(err){
        alert(err)
    }
}

const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({...formFields, [name]: value})
}

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
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
                <Button type='submit'>Sign in</Button>              
            </form>
            <Button buttonType='google' onClick={logGoogleUser}> Sign in with Google</Button>
        </div>
    )

}

export default SignInForm