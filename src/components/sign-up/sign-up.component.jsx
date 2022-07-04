import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields=()=>setFormFields(defaultFormFields);

  const submitHandler = async (e) => {
    e.preventDefault();

    //confirm passwords do match
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      //send to signup
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      //create user doc
      const docRef = await createUserDocumentFromAuth(user,{displayName});
      resetFormFields();
    } catch (e) {
      alert(e.message);
      console.log(e);
    }
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
        <h2>Don't have an account ?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
        label='Display Name'
          required
          type="text"
          name="displayName"
          onChange={changeHandler}
          value={displayName}
        />

        <FormInput
        label='Email'
          required
          type="email"
          name="email"
          onChange={changeHandler}
          value={email}
        />

        <FormInput
        label='Password'
          required
          type="password"
          name="password"
          onChange={changeHandler}
          value={password}
        />

        <FormInput
        label='Confirm Password'
          required
          type="password"
          name="confirmPassword"
          onChange={changeHandler}
          value={confirmPassword}
        />

       <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
