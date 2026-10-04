
'use client'

import { signIn } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const SignInPage = () => {
 const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
   console.log(data);
   const { data:resData, error } = await signIn.email({
    email: data.email,
    password: data.password,
    rememberMe: true, 
    callbackURL: '/'
});

console.log('after data: ', resData, error);
  };

const singInAndLogin = async () => {
  const data = await signIn.social({
    provider: "google",
  });

  console.log(data);
};

// const handleGoogleLogin = async () => {
//   const { data, error } = await signIn.social({
//     provider: "google",
//   });

//   console.log(data);
//   console.log(error);
// };

    return (
      <div className="flex justify-center mt-7">
    
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="flex gap-2">
            <Button type="submit">Submit</Button>
            <Button type="reset" variant="secondary">
              Reset
            </Button>
          </div>

           <Button onClick={singInAndLogin}>google signIn</Button>
        </Form>
      </div>
    );
  };


export default SignInPage;
