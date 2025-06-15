import { useContext, useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const { setCurrentUser } = useContext(UserContext);
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Your passwords do not match...");
      return;
    }
    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(response.user, { displayName });
      setCurrentUser(response.user);
      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already exists ...");
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          id="displayName"
          name="displayName"
          onChange={changeHandler}
          value={displayName}
          required
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={changeHandler}
          value={confirmPassword}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
