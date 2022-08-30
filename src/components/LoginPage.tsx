function LoginPage() {
  return (
    <div>
      <h1>Login</h1>

      <div className="margin-bottom-2">
        <sdx-input
          type="email"
          label="E-Mail"
          placeholder="Enter your E-Mail "
        ></sdx-input>
      </div>
      <div className="margin-bottom-3">
        <sdx-input
          type="password"
          label="Password"
          placeholder="Enter your Password"
        ></sdx-input>
      </div>
      <sdx-button label="Login"></sdx-button>
    </div>
  );
}

export default LoginPage;
