import React from "react";
import { Link } from "react-router";

const SignUpForm = props => {
  return (
    <form
      id="signup-form"
      className="auth-form shadow mt-20"
      onSubmit={props.handleSubmit}>
      <header className="auth-form_head mb-24">Регистрация</header>

      <label className="auth-form_label" htmlFor="firstName">Имя:</label>
      <input
        id="firstName"
        name="firstName"
        className="input mb-20"
        type="text"
        onChange={props.handleChange}
        placeholder="Иван"
        required
      />

      <label className="auth-form_label" htmlFor="lastName">Фамилия:</label>
      <input
        id="lastName"
        name="lastName"
        className="input mb-20"
        type="text"
        onChange={props.handleChange}
        placeholder="Иванов"
        required
      />

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

      <button id="signup-form-submit" className="button mr-20" type="submit">
        Зарегистрироваться
      </button>

      <Link
        to="/signin"
        id="signup-form-change"
        className="button button--auth-change"
        onClick={props.changeFormType}>
        Вход
      </Link>

      <div className="alert">{props.error}</div>
    </form>
  );
};

export default SignUpForm;
