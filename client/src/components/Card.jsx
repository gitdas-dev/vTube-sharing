import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import { api } from "../utils/api";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  max-width: ${(props) => props.type === "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
  @media (max-width: 1025px) {
    width: 20rem;
  }
  @media (max-width: 820px) {
    width: 25rem;
  }
`;
const Image = styled.img`
  width: ${(props) => (props.type === "sm" ? "2rem" : "100%")};
  height: ${(props) => (props.type === "sm" ? "102px" : "202px")};
  background-color: #999;
  flex: 1;
`;
const Details = styled.div`
  display: flex;
  width: ${(props) => (props.type === "sm" ? "100%" : "")};
  margin-top: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  gap: 12px;
  flex: 1;
`;
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
  diplay: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  width: 60%;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await api.get(`/api/users/find/${video?.userId}`);
      setChannel(res.data);
      await api.put(`/api/videos/view/${video?._id}`);
    };

    fetchChannel();
  }, [video?.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video?.imgUrl} />
        <Details type={type}>
          <ChannelImage
            type={type}
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          />
          <Texts>
            <Title>{video?.title}</Title>
            <ChannelName>{channel?.name}</ChannelName>
            <Info>
              {video?.views} views : {format(video?.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
