import React, { Component } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  background-color: white;
  border-radius:10 px;
  width: auto;
  display: flex;
  text-align: center;
  justify-content: center;
`;

const P = styled.p`
  color: #001813;
  font-family: 'Epilogue';
  font-style: normal;
  font-size: 50px;
  font-weight: 400;
`;

class NotFound extends Component {
  render() {
    return (
      <Div data-testid="page-not-found">
        <P>Ops, não encontrei nada...</P>
      </Div>
    );
  }
}
export default NotFound;
