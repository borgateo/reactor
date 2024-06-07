import React, { MouseEvent, useState } from 'react';
import Container from './components/Container.styled';
import Reaction from './components/Reaction';
import Modal from './components/Modal';

export type Comment = {
  text: string;
  author: string;
};

type ReactionType = {
  x: number;
  y: number;
  author: string;
  emoji: string;
  comments: Comment[];
};

const DIMENSION = 45;
const AUTHOR = 'Matteo Borgato'; // TODO: get from local storage or user session

const App: React.FC = () => {
  const [reactions, setReactions] = useState<ReactionType[]>([]);
  const [modal, setModal] = useState({ visible: false, x: 0, y: 0 });
  const [currentComments, setCurrentComments] = useState<Comment[]>([]);

  // DEBUG MODE
  // useEffect(() => {
  //   console.log("reacting", reactions);
  // }, [reactions]);

  const addReaction = (x: number, y: number, comment: Comment) => {
    const existingReactionIndex = reactions.findIndex(
      (reaction) => reaction.x === x && reaction.y === y
    );

    if (existingReactionIndex !== -1) {
      const updatedReactions = [...reactions];
      updatedReactions[existingReactionIndex] = {
        ...updatedReactions[existingReactionIndex],
        comments: [
          ...updatedReactions[existingReactionIndex].comments,
          comment,
        ],
      };
      setReactions(updatedReactions);
    } else {
      setReactions([
        ...reactions,
        {
          x,
          y,
          author: AUTHOR,
          emoji: '',
          comments: [comment],
        },
      ]);
    }
  };

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX: clickX, clientY: clickY } = e;
    const clickPosition = { x: clickX, y: clickY };

    // Check if the click position is within the bounds of an existing reaction
    const clickedReaction = reactions.find(
      (reaction) =>
        clickPosition.x >= reaction.x &&
        clickPosition.x <= reaction.x + DIMENSION &&
        clickPosition.y >= reaction.y &&
        clickPosition.y <= reaction.y + DIMENSION
    );

    if (clickedReaction) {
      setModal({
        visible: true,
        x: clickedReaction.x,
        y: clickedReaction.y,
      });
      setCurrentComments(clickedReaction.comments);
    } else {
      setModal({ visible: true, x: clickPosition.x, y: clickPosition.y });
      setCurrentComments([]);
    }
  };

  const handleSave = (comment: string) => {
    if (comment) {
      addReaction(modal.x, modal.y, { text: comment, author: AUTHOR });
    }
    setModal({ visible: false, x: 0, y: 0 });
  };

  return (
    <Container onClick={handleContainerClick}>
      {reactions.map((reaction, index) => (
        <Reaction
          key={index}
          x={reaction.x}
          y={reaction.y}
          comments={reaction.comments}
          author={reaction.author}
        />
      ))}
      {modal.visible && (
        <Modal
          x={modal.x}
          y={modal.y}
          onClose={() => setModal({ visible: false, x: 0, y: 0 })}
          onSave={handleSave}
          comments={currentComments}
        />
      )}
    </Container>
  );
};

export default App;
