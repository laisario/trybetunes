import React, { Component } from 'react';
import Props from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardAlbuns extends Component {
  render() {
    const {
      thumbnail,
      albumName,
      artist,
      collectionId,
    } = this.props;
    return (
      <div>
        <img src={ thumbnail } alt={ `Thumbnail of ${albumName}` } />
        <h3>{ albumName }</h3>
        <p>{ artist }</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Página Album
        </Link>
      </div>

    );
  }
}

CardAlbuns.propTypes = {
  thumbnail: Props.string.isRequired,
  albumName: Props.string.isRequired,
  artist: Props.string.isRequired,
  collectionId: Props.number.isRequired,
};
