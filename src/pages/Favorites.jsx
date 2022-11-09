import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

const Container = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
`;

class Favorites extends Component {
  state = {
    isLoading: false,
    favorites: [],
    favoritesIds: [],
  };

  async componentDidMount() {
    await this.getFavoriteSongs();
  }

  getFavoriteSongs = async () => {
    this.setState({
      isLoading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    const favoriteSongsIds = favoriteSongs.map((song) => song.trackId);
    this.setState({
      isLoading: false,
      favorites: favoriteSongs,
      favoritesIds: favoriteSongsIds,
    });
  };

  deleteSong = async (music) => {
    this.setState({
      isLoading: true,
    });
    const result = await removeSong(music);
    if (result === 'OK') {
      this.setState((state) => ({
        favorites: state.favorites.filter((song) => song.trackId !== music.trackId),
        favoritesIds: state.favorites.filter((songId) => songId !== music.trackId),
        isLoading: false,
      }));
    }
  };

  render() {
    const { isLoading, favorites, favoritesIds } = this.state;
    return (
      <Container row data-testid="page-favorites">
        <Header />
        <Container column>
          <h2>Favorite Songs</h2>
          {isLoading
            ? (<Loading />)
            : (favorites
              .map((music) => (
                <MusicCard
                  key={ music.trackId }
                  music={ music }
                  deleteSong={ () => this.deleteSong(music) }
                  isLoading={ isLoading }
                  isChecked={ favoritesIds.includes(music.trackId) }
                />)))}
        </Container>
      </Container>
    );
  }
}
export default Favorites;
