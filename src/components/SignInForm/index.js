import React from "react";
import { Link } from "react-router";

const SignInForm = props => {
  return (
    <form
      id="signin-form"
      className="auth-form shadow mt-40"
      onSubmit={props.handleSubmit}>
      <header className="auth-form_head mb-24">Вход в систему</header>

      <label className="auth-form_label" htmlFor="email">
        Электронная почта:
      </label>
      <input
        id="email"
        name="email"
        className="input mb-20"
        type="text"
        onChange={props.handleChange}
        placeholder="example@mail.com"
        required
      />

      <label className="auth-form_label" htmlFor="password">Пароль:</label>
      <input
        id="password"
        name="password"
        className="input mb-20"
        type="password"
        onChange={props.handleChange}
        placeholder="******"
        required
      />

      <button id="signin-form-submit" className="button mr-20" type="submit">
        Войти
      </button>

      <Link
        to="/signup"
        id="signin-form-change"
        className="button button--auth-change">
        Регистрация
      </Link>

      <div className="alert">{props.error}</div>
    </form>
  );
};

export default SignInForm;
