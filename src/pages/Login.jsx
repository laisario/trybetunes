import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    isButtonValid: false,
    userName: '',
  };

  hadleChangeInputName = ({ target }) => {
    const minLegth = 3;
    if (target.value.length >= minLegth) {
      this.setState({ isButtonValid: true });
    }
    this.setState({ userName: target.value });
  };

  fetchUserApi = async () => {
    const { userName } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: userName });
    this.setState({ isLoading: false });
  };

  render() {
    const { userName, isButtonValid, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          placeholder="Seu nome"
          value={ userName }
          onChange={ this.hadleChangeInputName }
        />
        { isLoading ? <Loading /> : <Redirect to="./search" /> }
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ !isButtonValid }
          onClick={ this.fetchUserApi }
          name="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}
export default Login;
