import React, { Component } from 'react';
import CardAlbuns from '../components/CardAlbuns';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artistInput: '',
    artistSaved: '',
    isButtonValid: false,
  };

  handleInputChange = ({ target }) => {
    const minLegth = 2;
    if (target.value.length >= minLegth) {
      this.setState({ isButtonValid: true });
    }
    this.setState({ artistInput: target.value });
  };

  fetchApiAlbuns = async () => {
    const { artistInput } = this.state;
    this.setState({ isLoading: true });
    const albuns = await searchAlbumsAPI(artistInput);
    this.setState({
      isLoading: false,
      artistInput: '',
      artistSaved: artistInput,
      albuns,
    });
  };
  // Após receber a resposta da requisição exibir na tela o texto Resultado de álbuns de: <artista>, onde <artista> é o nome que foi digitado no input.

  render() {
    const { artistInput, isButtonValid, isLoading, artistSaved, albuns } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? <Loading />
          : (
            <>
              <form>
                <input
                  data-testid="search-artist-input"
                  type="text"
                  placeholder="Nome do Artista"
                  value={ artistInput }
                  onChange={ this.handleInputChange }
                />
                <button
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ !isButtonValid }
                  onClick={ this.fetchApiAlbuns }
                >
                  Pesquisar
                </button>
              </form>
              {albuns
              && (
                <>
                  <p>
                    {`Resultado de álbuns de:  
                    ${artistSaved}`}
                  </p>
                  {albuns.length
                    ? albuns
                      .map(({
                        artworkUrl100,
                        collectionName,
                        artistName,
                        collectionId,
                      }) => (<CardAlbuns
                        key={ collectionId }
                        collectionId={ collectionId }
                        thumbnail={ artworkUrl100 }
                        albumName={ collectionName }
                        artist={ artistName }
                      />))
                    : <p>Nenhum álbum foi encontrado</p>}
                </>
              )}
            </>
          )}
      </div>
    );
  }
}
export default Search;
