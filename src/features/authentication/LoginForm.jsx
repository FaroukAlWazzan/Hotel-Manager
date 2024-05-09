import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import NewFormRow from "../../ui/NewFormRow";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
// import FormRowVertical from "../../ui/FormRowVertical";

function LoginForm() {
  const [email, setEmail] = useState("farouk@example.com");
  const [password, setPassword] = useState("Asdf1234");
  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <NewFormRow label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isPending}
          onChange={(e) => setEmail(e.target.value)}
        />
      </NewFormRow>
      <NewFormRow label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isPending}
          onChange={(e) => setPassword(e.target.value)}
        />
      </NewFormRow>
      <NewFormRow>
        <Button size="large" disabled={isPending}>
          {!isPending ? "Login" : <SpinnerMini />}
        </Button>
      </NewFormRow>
    </Form>
  );
}

export default LoginForm;
