import { useState } from 'react';
import axios from 'axios';

const baseURL = 'http://127.0.0.1:3000';

export interface IProps {
  setToken: (token: string) => void;
}

function Login(props: IProps) {
  const [credentials, updateCredentials] = useState({
    email: '',
    password: '',
  });

  const onInputChange = (e: React.ChangeEvent<HTMLSdxInputElement>) => {
    const { name, value } = e.target;
    updateCredentials({ ...credentials, [name as string]: value });
  };

  function onSubmit(e: React.FormEvent<HTMLSdxButtonElement>) {
    e.preventDefault();
    axios
      .post(`${baseURL}/auth/jwt/sign`, {
        email: credentials.email,
        password: credentials.password,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        props.setToken(response.data.token);
      })
      .catch((error) => {
        alert('invalid credentials, use «m294» as password');
      });
  }

  return (
    <div className="margin-top-4">
      <form>
        <h1>Login</h1>
        <div className="margin-bottom-2">
          <sdx-input
            name="email"
            type="email"
            label="E-Mail"
            placeholder="Enter your E-Mail"
            value={credentials.email}
            onInput={onInputChange}
            required
          ></sdx-input>
        </div>
        <div className="margin-bottom-3">
          <sdx-input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your Password"
            value={credentials.password}
            onInput={onInputChange}
            required
          ></sdx-input>
        </div>
        <sdx-button
          theme="primary"
          label="Login"
          type="submit"
          onClick={onSubmit}
        ></sdx-button>
      </form>
    </div>
  );
}

export default Login;
