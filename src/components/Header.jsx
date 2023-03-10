import React, { Component } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

import logo from '../assets/logo.svg';
import iconSearch from '../assets/search.svg';
import iconFavorite from '../assets/favorite.svg';
// import iconProfile from '../assets/profile.svg';

const Logo = styled.img`
  width: 100px;
  margin-top: 30px;
`;
const ContainerUserName = styled.div`
  border: ${({ hasName }) => (hasName ? '1px solid rgb(0, 59, 229)' : 'none')} ;
  text-align: center;
  border-radius: 100px;
  padding: 0 3%;
  margin-bottom: 15px;
  max-width: 60%;
`;
const UserNameP = styled.p``;

const ContainerHeader = styled.header`
  display: flex;
  flex-direction: column;
  min-width: 15vw;
  min-height: 100vh;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
`;

const ContainerLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px;
`;

const LinkIcon = styled.img`
`;

const Link = styled(RouterLink)`
  font-family: Epilogue;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.03em;
  text-align: left;
  text-decoration: none;
  color: #444955;
  margin-left: 16px;
`;

class Header extends Component {
  state = {
    userName: {},
  };

  async componentDidMount() {
    const userName = await this.handleGetUser();
    this.setState({ userName });
  }

  handleGetUser = async () => {
    this.setState({ isLoading: true });
    const name = await getUser();
    this.setState({ isLoading: false });
    return name;
  };

  render() {
    const { userName, isLoading } = this.state;
    return (
      <ContainerHeader data-testid="header-component">
        <Logo src={ logo } alt="Logo TrybeTunes" />
        <ContainerLinks>
          {isLoading ? <Loading /> : (
            <>
              <LinkIconContainer>
                <LinkIcon src={ iconSearch } />
                <Link
                  to="/trybetunes/search"
                  data-testid="link-to-search"
                >
                  Pesquisar
                </Link>
              </LinkIconContainer>
              <LinkIconContainer>
                <LinkIcon src={ iconFavorite } />
                <Link
                  to="/trybetunes/favorites"
                  data-testid="link-to-favorites"
                >
                  Favoritas
                </Link>
              </LinkIconContainer>
              {/* <LinkIconContainer>
                <LinkIcon src={ iconProfile } />
                <Link
                  to="/trybetunes/profile"
                  data-testid="link-to-profile"
                >
                  Perfil
                </Link>
              </LinkIconContainer> */}
            </>)}
        </ContainerLinks>
        <ContainerUserName hasName={ userName.name }>
          <UserNameP data-testid="header-user-name">{userName.name || ''}</UserNameP>
        </ContainerUserName>
      </ContainerHeader>
    );
  }
}
export default Header;
