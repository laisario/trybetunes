import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component">
        {isLoading ? <Loading />
          : (
            <>
              <p data-testid="header-user-name">{`${userName.name}`}</p>
              <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </>)}
      </header>
    );
  }
}
export default Header;
