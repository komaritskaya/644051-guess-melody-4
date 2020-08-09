import React, {useRef} from 'react';

interface AuthScreenProps {
  onReplayButtonClick: () => void;
  onSubmit: (authData: {
    login: string;
    password: string;
  }) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({onReplayButtonClick, onSubmit}) => {
  const loginRef = useRef<HTMLInputElement | undefined>();
  const passwordRef = useRef<HTMLInputElement | undefined>();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <section className="login">
      <div className="login__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__text">Хотите узнать свой результат? Представтесь!</p>
      <form
        className="login__form"
        action=""
        onSubmit={handleSubmit}
      >
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input className="login__input" type="text" name="name" id="name"
            ref={loginRef}
          />
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input" type="text" name="password" id="password"
            ref={passwordRef}
          />
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit">Войти</button>
      </form>
      <button className="replay" type="button"
        onClick={onReplayButtonClick}
      >Сыграть ещё раз</button>
    </section>
  );
};

export default AuthScreen;
