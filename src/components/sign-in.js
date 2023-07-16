import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form"

// import AuthService from "../services/AuthService";
import { useAuth } from "../context/AuthProvider";

const SignInForm = () => {
  // const { AuthService } = useServices();
  const formMethods = useForm()
  const { user } = useAuth()
  console.log({ user })
  const { register, handleSubmit, formState: { errors } } = formMethods

  // const [isLoading, setIsLoading] = useState(false);
  // const [loginError, setLoginError] = useState(null);

  const onSubmit = async (data) => {
    // AuthService.signIn(data)
    // setIsLoading(true);
    // setLoginError(null);
    // try {
    //   await AuthService.signIn(data);
    //   setIsLoading(false);
    //   // handle successful sign in, e.g. redirect to dashboard
    // } catch (error) {
    //   setIsLoading(false);
    //   // handle error, e.g. show a message to the user
    //   setLoginError('Invalid username or password.');
    // }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input 
            {...register("username", { required: true })}
            placeholder="Username" 
          />
        </div>

        <div>
          <label>Password:</label>
          <input 
            {...register("password", { required: true })} 
            placeholder="Password" 
            type="password" 
          />
        </div>
        <input type="submit" />
      </form>
    </FormProvider>
  );
};

export default SignInForm;
