import { useState } from "react"

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            return console.log('password & confirm password must be the same')
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            user.displayName = displayName
            const userDocRef = await createUserDocumentFromAuth(user)
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
                <label>Display Name</label>
                <input type='text' name="displayName" value={displayName} required onChange={handleChange}/>
                <label>Email</label>
                <input type='email' name="email" value={email} required onChange={handleChange}/>
                <label>Password</label>
                <input type='password' name="password" value={password} required onChange={handleChange}/>
                <label>Confirm Password</label>
                <input type='password' name="confirmPassword" value={confirmPassword} required onChange={handleChange}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm