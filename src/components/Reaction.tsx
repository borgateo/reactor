import React from 'react';
import styled from 'styled-components';
import { Comment } from '../App';

const ReactionContainer = styled.div<{ x: number; y: number }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2a8ce8;
  border-radius: 0 25px 25px 25px;
  width: 45px;
  height: 45px;
  color: white;
  font-weight: bold;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
`;

type ReactionProps = {
  x: number;
  y: number;
  comments: Comment[];
  author: string;
};

// api.multiavatar.com/stefan.svg

const Reaction: React.FC<ReactionProps> = ({ x, y, comments }) => (
  <ReactionContainer x={x} y={y}>
    {comments.length}
  </ReactionContainer>
);

export default Reaction;
