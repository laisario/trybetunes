import React, { Component } from 'react';
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
    console.log(name);
    // const nametest = await name;
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
              <span>test</span>
            </>)}
      </header>
    );
  }
}
export default Header;
