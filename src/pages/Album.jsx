import React, { Component } from 'react';
import Props from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

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
    console.log(musics);
    return (
      <div data-testid="page-album">
        <div>
          <Header />
          <div>
            <h1 data-testid="album-name">{musics.length && musics[0].collectionName}</h1>
            <h2 data-testid="artist-name">{musics.length && musics[0].artistName}</h2>
            {musics.slice(1)
              .map(({ trackName, previewUrl, trackId }) => (
                <MusicCard
                  musicName={ trackName }
                  previewMusic={ previewUrl }
                  key={ trackId }
                />))}
          </div>
        </div>
      </div>
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
