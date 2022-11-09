import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

const Container = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
`;

const Link = styled(RouterLink)``;

class Profile extends Component {
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

  render() {
    const { isLoading, userInformation } = this.state;
    return (
      <Container row data-testid="page-profile">
        <Header />
        {isLoading
          ? (<Loading />)
          : (
            <div>
              <p>{ userInformation.name }</p>
              <p>{ userInformation.email }</p>
              <p>{ userInformation.description }</p>
              <img
                data-testid="profile-image"
                src={ userInformation.image }
                alt="Foto do usuario"
              />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </Container>
    );
  }
}
export default Profile;
