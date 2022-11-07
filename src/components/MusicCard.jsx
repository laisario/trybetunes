import React, { Component } from 'react';
import Props from 'prop-types';
import styled from 'styled-components';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

const Container = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  border-bottom: 1px solid #CCD4E1;
  width: 90%;
  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`;

const SongName = styled.p`
  color: #001813;
  font-family: 'Epilogue';
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
`;

const Audio = styled.audio`
  &::-webkit-media-controls-play-button, &::-webkit-media-controls-panel {
    background-color: #fff;
  }
`;

const FavoriteSong = styled.input``;

const FavoriteSongContainer = styled.label``;

export default class MusicCard extends Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  saveSong = async () => {
    const { objMusic } = this.props;
    console.log(objMusic);
    this.setState({ isLoading: true });
    await addSong(objMusic);
    this.setState({
      isLoading: false,
      isChecked: true,
    });
  };

  render() {
    const { objMusic } = this.props;
    const { musicName, previewMusic, trackId } = objMusic;
    const { isLoading, isChecked } = this.state;
    return (
      <div>
        {isLoading
          ? <Loading />
          : (
            <Container row>
              <SongName>{musicName}</SongName>
              <Audio data-testid="audio-component" src={ previewMusic } controls>
                <track kind="captions" />
              </Audio>
              <FavoriteSongContainer>
                Favorita
                <FavoriteSong
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.saveSong }
                  checked={ isChecked }
                />
              </FavoriteSongContainer>
            </Container>
          )}
      </div>
    );
  }
}
MusicCard.propTypes = {
  musicName: Props.string,
  previewMusic: Props.string,
}.isRequired;
