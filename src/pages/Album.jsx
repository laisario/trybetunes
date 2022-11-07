import React, { Component } from 'react';
import Props from 'prop-types';
import styled from 'styled-components';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import background from '../assets/background.png';

const ScrollableContainer = styled.div`
  margin-left: 32%;
  overflow-y: scroll;
  height: 65vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
`;

const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  background-image: url(${background});
  width: 80vw;
  height: 35vh;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
  `;

const Image = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 12px;
  position: absolute;
  bottom: -50%;
  left: 5%;
  `;

const AlbumName = styled.h2`
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  color: white;
  position: absolute;
  left: 32%;
  bottom: 20%;
`;

const ArtistName = styled.h3`
    height: 18px;
    font-family: 'Epilogue';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: white;
    position: absolute;
    left: 32%;
    bottom: 13%;
`;

class Album extends Component {
  state = {
    musics: [],
  };

  async componentDidMount() {
    await this.fetchMusicsApi();
  }

  fetchMusicsApi = async () => {
    const { match: { params: { id } } } = this.props;
    const responseGetMusics = await getMusics(id);
    this.setState({ musics: responseGetMusics });
  };

  render() {
    const { musics } = this.state;
    return (
      <Container row data-testid="page-album">
        <Header />
        <Container column>
          <ContainerHeader>
            <Image
              src={ musics.length && musics[0].artworkUrl100 }
              alt={ musics.length && musics[0].collectionName }
            />
            <Container>
              <AlbumName
                data-testid="album-name"
              >
                {musics.length && musics[0].collectionName}
              </AlbumName>
              <ArtistName
                data-testid="artist-name"
              >
                {musics.length && musics[0].artistName}
              </ArtistName>
            </Container>
          </ContainerHeader>
          <ScrollableContainer>
            {musics.slice(1)
              .map(({ trackName, previewUrl, trackId }) => (
                <MusicCard
                  musicName={ trackName }
                  previewMusic={ previewUrl }
                  key={ trackId }
                />))}
          </ScrollableContainer>
        </Container>
      </Container>
    );
  }
}
Album.propTypes = {
  match: Props.shape({
    params: Props.shape({
      id: Props.string,
    }),
  }),
}.isRequired;

export default Album;
