import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
// import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import NewFormRow from "../../ui/NewFormRow";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors } = formState;
  const { signup, isSigningup } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <NewFormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningup}
          {...register("fullName", { required: "This field  is required" })}
        />
      </NewFormRow>

      <NewFormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningup}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "You must enter a valid email address",
            },
          })}
        />
      </NewFormRow>

      <NewFormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningup}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "This must be at least 8 characters long",
            },
          })}
        />
      </NewFormRow>

      <NewFormRow
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningup}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords Must Match",
          })}
        />
      </NewFormRow>

      <NewFormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={reset}
          disabled={isSigningup}
        >
          Cancel
        </Button>
        <Button disabled={isSigningup}>
          {!isSigningup ? "Create new user" : <SpinnerMini />}
        </Button>
      </NewFormRow>
    </Form>
  );
}

export default SignupForm;
