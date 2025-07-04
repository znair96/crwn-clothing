import { useContext, useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
  signInWithGooglePopUp,
} from "../../utils/firebase/firebase.utils";
import { ButtonsContainer } from "./sign-in-form.styles";
import { SignUpContainer } from "../sign-up-form/sign-up-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [signInFormFields, setSignInFormFields] = useState(defaultFormFields);
  const { email, password } = signInFormFields;
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setSignInFormFields({
      ...signInFormFields,
      [name]: value,
    });
  };

  const resetFormFields = () => {
    setSignInFormFields(defaultFormFields);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Fill email or password");
      return;
    }
    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
    } catch (err) {
      if (err.code === "auth/invalid-login-credentials") {
        alert("Invalid creds...");
      }
      console.log(err.code);
    }
  };
  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopUp();
      const userDocRef = await createUserDocumentFromAuth(user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SignUpContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Email"
          type="email"
          id="email"
          name="email"
          onChange={changeHandler}
          value={email}
          required
        />
        <FormInput
          label="Password"
          type="password"
          id="password"
          name="password"
          onChange={changeHandler}
          value={password}
          required
        />
        <ButtonsContainer>
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignInForm;
