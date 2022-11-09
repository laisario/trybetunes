import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

const Container = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
`;

class ProfileEdit extends Component {
  state = {
    isLoading: false,
    userInformation: {},
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ isLoading: true });
    const userInformation = await getUser();
    this.setState({
      isLoading: false,
      userInformation });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      userInformation: {
        [name]: value,
      },
    });
  };

  render() {
    const { isLoading, userInformation } = this.state;
    return (
      <Container row data-testid="page-profile-edit">
        <Header />
        {isLoading
          ? (<Loading />)
          : (
            <form>
              <input
                type="text"
                name="name"
                value={ userInformation.name }
                data-testid="edit-input-name"
                onChange={ this.handleChange }
              />
              <input
                type="text"
                name="email"
                value={ userInformation.email }
                data-testid="edit-input-email"
                onChange={ this.handleChange }
              />
              <textarea
                data-testid="edit-input-description"
                name="description"
                value={ userInformation.description }
                onChange={ this.handleChange }
              />
              <img
                data-testid="edit-input-image"
                name="image"
                alt="Editar foto"
              />
              <button
                type="submit"
                data-testid="edit-button-save"
              >
                Salvar
              </button>
            </form>
          )}
      </Container>
    );
  }
}
export default ProfileEdit;
