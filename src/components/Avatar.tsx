import React from "react";
import styled from "styled-components";

type AvatarProps = {
  name: string;
  date?: string;
};

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAvatar = styled.img`
  width: 30px;
  height: 30px;
  vertical-align: middle;
  margin-right: 7px;
`;

const Name = styled.span`
  font-weight: bold;
`;

const DateText = styled.span`
  color: #999;
`;

// FIXME: use a real avatar and make human readable date
const Avatar: React.FC<AvatarProps> = ({ name, date }) => {
  return (
    <AvatarContainer>
      <StyledAvatar
        src={`https://api.multiavatar.com/${name}.svg`}
        alt={name || "anonymous"}
      />
      <Name>{name}</Name>
      <DateText>{date}</DateText>
    </AvatarContainer>
  );
};

export default Avatar;
