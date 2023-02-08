import React, { Component } from 'react';
import styled from 'styled-components';
import Props from 'prop-types';
import { Link } from 'react-router-dom';

const Container = styled.div`
  & + & {
    margin-left: 25px;
  }
`;

const Thumbnail = styled.img`
  width: 200px;
  height: 200px;
  left: calc(50% - 200px/2 - 213px);
  top: calc(50% - 200px/2 + 114px);
  border-radius: 10px;
`;

const AlbumTitle = styled.h3`
  width: 147px;
  height: 18px;
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 150%;
  color: #3D495C;
`;

const ArtistName = styled.p`
  width: 147px;
  height: 14px;
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 150%;
  color: #3D495C;
`;

export default class CardAlbuns extends Component {
  render() {
    const maxLength = 16;
    const {
      thumbnail,
      albumName,
      artist,
      collectionId,
    } = this.props;
    return (
      <Container>
        <Thumbnail src={ thumbnail } alt={ `Thumbnail of ${albumName}` } />
        <AlbumTitle>
          { albumName.length > maxLength
            ? `${albumName.slice(0, maxLength)} ...`
            : albumName }
        </AlbumTitle>
        <ArtistName>{ artist }</ArtistName>
        <Link
          to={ `/trybetunes/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Página Album
        </Link>
      </Container>

    );
  }
}

CardAlbuns.propTypes = {
  thumbnail: Props.string.isRequired,
  albumName: Props.string.isRequired,
  artist: Props.string.isRequired,
  collectionId: Props.number.isRequired,
};
