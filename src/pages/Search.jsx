import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artist: '',
    isButtonValid: false,
  };

  handleInputChange = ({ target }) => {
    const minLegth = 2;
    if (target.value.length >= minLegth) {
      this.setState({ isButtonValid: true });
    }
    this.setState({ artist: target.value });
  };

  render() {
    const { artist, isButtonValid } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome do Artista"
            value={ artist }
            onChange={ this.handleInputChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ !isButtonValid }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
export default Search;
