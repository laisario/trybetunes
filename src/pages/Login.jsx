import React, { Component } from 'react';
import Props from 'prop-types';
import styled from 'styled-components';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

import logo from '../assets/logo.svg';

const Container = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 26px rgba(68, 73, 85, 0.2);
  border-radius: 20px;
  position: absolute;
  top: 20%;
  left: 18%;
  padding: 75px 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 550px;
  min-height: 250px;
`;

const InputName = styled.input`
  color: #003BE5;
  border: 1px solid #003BE5;
  border-radius: 100px;
  width: 100%;
  margin-top: 48px;
  padding: 8px;
  text-align: center;

  &::placeholder {
    color: #003BE5;
  }

  &:active, &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 103%;
  margin-top: 8px;
  padding: 8px;
  background-color: #003BE5;
  border-radius: 100px;
  text-transform: uppercase;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 14px;
`;

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
    const { history } = this.props;
    history.push('./search');
  };

  render() {
    const { userName, isButtonValid, isLoading } = this.state;
    return (
      <Container data-testid="page-login">
        <img src={ logo } alt="" />
        {isLoading
          ? <Loading />
          : (
            <>
              <InputName
                data-testid="login-name-input"
                type="text"
                placeholder="Qual é o seu nome?"
                value={ userName }
                onChange={ this.hadleChangeInputName }
              />
              <Button
                data-testid="login-submit-button"
                type="button"
                disabled={ !isButtonValid }
                onClick={ this.fetchUserApi }
                name="button"
              >
                Entrar
              </Button>
            </>
          )}
      </Container>
    );
  }
}

Login.propTypes = {
  history: Props.shape({
    push: Props.func,
  }),
}.isRequired;

export default Login;
