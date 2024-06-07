import React from 'react';
import styled from 'styled-components';

const Picker = styled.div<{ x: number; y: number }>`
  position: absolute;
  display: flex;
  gap: 10px;
  background: white;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
`;

const Emoji = styled.div`
  cursor: pointer;
  font-size: 24px;
`;

const emojis = ['😀', '😂', '😍', '👍', '😢', '😡'];

type EmojiPickerProps = {
  x: number;
  y: number;
  onSelect: (emoji: string) => void;
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({ x, y, onSelect }) => (
  <Picker x={x} y={y}>
    {emojis.map((emoji, index) => (
      <Emoji key={index} onClick={() => onSelect(emoji)}>
        {emoji}
      </Emoji>
    ))}
  </Picker>
);

export default EmojiPicker;
