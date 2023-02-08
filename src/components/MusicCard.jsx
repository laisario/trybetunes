import React, { Component } from 'react';
import Props from 'prop-types';
import styled from 'styled-components';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Loading from './Loading';

const Container = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  border-bottom: 1px solid #CCD4E1;
  min-width: 50vw;
  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
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

const FavoriteSong = styled.button`
  background: none;
  border: none;
`;

class MusicCard extends Component {
  render() {
    const { music, addSong, deleteSong, isLoading, isChecked } = this.props;
    const { trackName, previewUrl, trackId } = music;

    return (
      <div>
        <Container row>
          <SongName>{trackName}</SongName>
          <Audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
          </Audio>
          {isLoading ? (
            <Loading />
          ) : (
            <FavoriteSong
              type="button"
              data-testid={ `checkbox-music-${trackId}` }
            >
              {isChecked
                ? <FavoriteIcon onClick={ isChecked ? deleteSong : addSong } />
                : (
                  <FavoriteBorderIcon
                    onClick={ isChecked ? deleteSong : addSong }
                  />)}
            </FavoriteSong>
          )}
        </Container>
      </div>
    );
  }
}

MusicCard.propTypes = {
  objMusic: Props.shape({
    trackName: Props.string,
    previewUrl: Props.string,
    trackId: Props.string,
  }),
  previewMusic: Props.string,
}.isRequired;

export default MusicCard;
