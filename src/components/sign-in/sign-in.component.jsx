import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss'

const defaultFormInputs = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formInputs, setFormInputs] = useState(defaultFormInputs);

  const { email, password } = formInputs;

  const resetFormFields = () => setFormInputs(defaultFormInputs);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!email || !password) return alert("email & password must be provided");

    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);
      console.log(user);
      resetFormFields();
    } catch (e) {
      console.log(e);
      console.log(e.code);
      alert(e.message);
    }
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account ?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Email Address"
          required
          type="email"
          name="email"
          onChange={changeHandler}
          value={email}
        />
        <FormInput
          label="Password"
          required
          type="password"
          name="password"
          onChange={changeHandler}
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Login</Button>
          <Button type='button' buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
