import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import './authentication.styles.scss'

const SignInForm = () => {

  return (
    <div className="authentication-container">
      <SignIn/>
      <SignUp/>
    </div>
  );
};

export default SignInForm;
