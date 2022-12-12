import SignUpForm from "../../components/sign-up-form/sign-up-form.component"
import SignInForm from "../../components/sign-in-form/sign-in-form.component"
import './signin.styles.scss'

const SignIn = () => {

    return (
        <div>
            <h1>Sign in Page</h1>
            <div className="sign-in-page-container">
                <SignInForm/>
                <SignUpForm/>     
            </div>     
        </div>
    )
}

export default SignIn