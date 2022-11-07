import React, { Component } from 'react';
import Props from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { musicName, previewMusic } = this.props;
    return (
      <div>
        <p>{musicName}</p>
        <audio data-testid="audio-component" src={ previewMusic } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
      </div>
    );
  }
}
MusicCard.propTypes = {
  musicName: Props.string,
  previewMusic: Props.string,
}.isRequired;
