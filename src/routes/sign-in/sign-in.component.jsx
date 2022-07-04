import SignUp from "../../components/sign-up/sign-up.component";
import { signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    console.log(user);
  const userDocRef =await  createUserDocumentFromAuth(user);
  console.log(userDocRef);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign In</button>
      <SignUp/>
    </div>
  );
};

export default SignIn;
