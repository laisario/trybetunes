import React, { Component } from 'react';
import styled from 'styled-components';
import CardAlbuns from '../components/CardAlbuns';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const ContainerPage = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled.input`
  background: rgba(255, 255, 255, 0.5);
  border:  none;
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
  background-image: url('https://i.pinimg.com/originals/03/a8/cc/03a8ccd16233e6ab0c13c09ab0ec3575.jpg');
  background-attachment: fixed;
  background-position: left bottom;
  width: 85vw;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const P = styled.p`
  margin: 50px 0;
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
  background-color: white;
`;

const ContainerButtons = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  background-color: white;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
`;

const ContainerAlbuns = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  justify-content: space-evenly;
  background-color: white;
`;

const ButtonNext = styled.button`
  background-color: #00D5E2;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: none;
  margin-left: 10px;
`;
const ButtonPrev = styled.button`
  background-color: #00D5E2;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: none;
  margin-right: 10px;
  `;

class Search extends Component {
  state = {
    artistInput: '',
    artistSaved: '',
    isButtonValid: false,
    page: 1,
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
    const { artistInput,
      isButtonValid,
      isLoading, artistSaved, albuns, page } = this.state;

    const pageSize = 4;
    const albunsPerPage = albuns
      ?.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize);

    console.log('aaa', albunsPerPage);
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
              {albunsPerPage
              && (
                <Container>
                  <P>
                    {`Resultado de álbuns de:  
                    ${artistSaved.toLocaleUpperCase()}`}
                  </P>
                  <ContainerAlbuns row>
                    {albunsPerPage.length
                      ? albunsPerPage
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
                  </ContainerAlbuns>
                  <ContainerButtons row>
                    <ButtonPrev
                      type="button"
                      onClick={ () => this.setState({ page: page - 1 }) }
                    >
                      {'<'}
                    </ButtonPrev>
                    <span>{page}</span>
                    <ButtonNext
                      type="button"
                      onClick={ () => this.setState({ page: page + 1 }) }
                    >
                      {'>'}
                    </ButtonNext>
                  </ContainerButtons>
                </Container>
              )}
            </Container>
          )}
      </ContainerPage>
    );
  }
}
export default Search;
