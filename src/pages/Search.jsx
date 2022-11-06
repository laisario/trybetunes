import React, { Component } from 'react';
import styled from 'styled-components';
import CardAlbuns from '../components/CardAlbuns';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import background from '../assets/background.png';

const ContainerPage = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled.input`
  background: rgba(255, 255, 255, 0.5);
  width: 400px;
  height: 40px;
  border-radius: 23px;
  text-align: center;
  font-size: 16px;
  color: white;
  margin-right: 5px;
  `;

const SearchButton = styled.button`
  text-align: center;
  border-radius: 23px;
  font-size: 16px;
  color: white;
  width: 114px;
  height: 40px;
  background: #00D5E2;
  margin-left: 5px;
`;

const SearchContainer = styled.form`
  background-image: url(${background});
  /* background-repeat: no-repeat; */
  background-attachment: fixed;
  background-position: left bottom;
  width: 85vw;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const P = styled.p`
  width: 400px;
  height: 24.89px;
  top: 297px;
  font-family: 'Epilogue';
  font-style: italic;
  font-weight: 300;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: #003BE5;
`;
const Container = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  overflow-x: scroll;
  justify-content: space-between;
`;

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

  render() {
    const { artistInput, isButtonValid, isLoading, artistSaved, albuns } = this.state;
    return (
      <ContainerPage data-testid="page-search">
        <Header />
        {isLoading ? <Loading />
          : (
            <Container>
              <SearchContainer>
                <SearchInput
                  data-testid="search-artist-input"
                  type="text"
                  placeholder="NOME DO ARTISTA"
                  value={ artistInput }
                  onChange={ this.handleInputChange }
                />
                <SearchButton
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ !isButtonValid }
                  onClick={ this.fetchApiAlbuns }
                >
                  Pesquisar
                </SearchButton>
              </SearchContainer>
              {albuns
              && (
                <>
                  <P>
                    {`Resultado de álbuns de:  
                    ${artistSaved}`}
                  </P>
                  <Container row>
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
                      : <P>Nenhum álbum foi encontrado</P>}
                  </Container>
                </>
              )}
            </Container>
          )}
      </ContainerPage>
    );
  }
}
export default Search;
