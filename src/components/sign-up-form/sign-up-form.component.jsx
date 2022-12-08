import { useState } from "react"
import FormInput from "../form-input/form-input.component"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',

}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword }= formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            alert('password & confirm password must be the same')
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            const userDocRef = await createUserDocumentFromAuth(user, {displayName})
            resetFormFields()
           // console.log('User was added to DB')
        }catch(err){
            console.log(err)
        }
        
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div>
            <h1>Sign up with email</h1>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Display Name'
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    required
                />
                <FormInput 
                    label='Email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    required
                />
                <FormInput 
                    label='Password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    required
                />
                <FormInput 
                    label='Confirm Password'
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default SignUpForm