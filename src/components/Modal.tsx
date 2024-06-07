import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
// import EmojiPicker from "./EmojiPicker";
import arrowUp from "../assets/up-arrow.svg";
import { Comment as CommentType } from "../App";
import Avatar from "./Avatar";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div<{ x: number; y: number }>`
  background: #2b2b2b;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  width: 300px;
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const CommentInput = styled.input`
  background: transparent;
  border: none;
  width: 100%;
  resize: none;
  font-size: 1rem;
  padding: 2px;
  color: #ccc;
  outline: none;

  ::placeholder {
    color: #999;
  }
`;

const Comment = styled.div`
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 1rem;
`;

const SaveButton = styled.button`
  background: url(${arrowUp}) no-repeat center center #767676;
  background-size: contain;
  border: none;
  width: 25px;
  height: 25px;
  cursor: pointer;
  border-radius: 25px;
  padding: 5px;
  border: 5px solid #767676;
`;

type ModalProps = {
  x: number;
  y: number;
  onClose: () => void;
  onSave: (comment: string) => void;
  comments: CommentType[];
};

const PADDING = 10;
const Modal: React.FC<ModalProps> = ({ x, y, onClose, onSave, comments }) => {
  // const [emoji, setEmoji] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // FIXME: I could introduce Floating-UI to make sure the modal is always in the right position
  // PADDING won't be needed anymore
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent
        x={x + PADDING}
        y={y + PADDING}
        onClick={(e) => e.stopPropagation()}
      >
        {comments.map((comment, index) => (
          <Comment key={index}>
            <Avatar name={comment.author} />
            <span style={{ marginLeft: "35px" }}>{comment.text}</span>
          </Comment>
        ))}
        <InputContainer>
          <CommentInput
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
          />
          <SaveButton onClick={() => onSave(comment)} title="Save" />
        </InputContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
