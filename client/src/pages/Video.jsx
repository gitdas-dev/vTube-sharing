import { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ShareIcon from "@mui/icons-material/Share";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { subscribe } from "../redux/userSlice";
import { Recommendation } from "../components/Recommendation";
import { api } from "../utils/api";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.div`
  border: 1px solid ${({ theme }) => theme.soft};
  margin: 15px 0;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: lightgreen;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: 100%;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;
const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await api.get(`/api/videos/find/${path}`);

        const channelRes = await api.get(
          `/api/users/find/${videoRes?.data.userId}`
        );

        setChannel(channelRes?.data);

        dispatch(fetchSuccess(videoRes?.data));
      } catch (error) {
        toast.error("Server error! Try to sign in again.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      await api.put(`/api/users/like/${currentVideo?._id}`);
      dispatch(like(currentUser?._id));
    } catch (error) {
      toast.error("Server error! Try to sign in again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Optionally dispatch an action to handle the error in the UI
    }
  };

  const handleDislike = async () => {
    try {
      await api.put(`/api/users/dislike/${currentVideo?._id}`);
      dispatch(dislike(currentUser?._id));
    } catch (error) {
      toast.error("Server error! Try to sign in again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Optionally dispatch an action to handle the error in the UI
    }
  };

  const handleSub = async () => {
    try {
      currentUser.subscribedUsers.includes(channel?._id)
        ? await api.put(`/api/users/unsub/${channel?._id}`)
        : await api.put(`/api/users/sub/${channel?._id}`);

      dispatch(subscribe(channel?._id));
    } catch (error) {
      toast.error("Server error! Try to sign in again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Container>
        <Content>
          <VideoWrapper>
            <VideoFrame src={currentVideo?.videoUrl} controls />
          </VideoWrapper>
          <Title>{currentVideo?.title}</Title>
          <Details>
            <Info>
              {currentVideo?.views} views | {format(currentVideo?.createdAt)}
            </Info>
            <Buttons>
              <Button onClick={handleLike}>
                {currentVideo?.likes?.includes(currentUser?._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOffAltIcon />
                )}
                {currentVideo?.like?.length}
              </Button>
              <Button onClick={handleDislike}>
                {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                  <ThumbDownAltIcon />
                ) : (
                  <ThumbDownOffAltIcon />
                )}
                Dislike
              </Button>
              <Button>
                <ShareIcon />
                Share
              </Button>
              <Button>
                <SaveAltIcon />
                Save
              </Button>
            </Buttons>
          </Details>
          <Hr />
          <Channel>
            <ChannelInfo>
              <Image src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
              <ChannelDetail>
                <ChannelName>{channel?.name}</ChannelName>
                <ChannelCounter>
                  {channel?.subscribers} subscribers
                </ChannelCounter>
                <Description>{currentVideo?.desc}</Description>
              </ChannelDetail>
            </ChannelInfo>
            <Subscribe onClick={handleSub}>
              {currentUser?.subscribedUsers?.includes(channel?._id)
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </Subscribe>
          </Channel>
          <Hr />
          <Comments videoId={currentVideo?._id} />
        </Content>
        <Recommendation tags={currentVideo?.tags} />
      </Container>
    </>
  );
};
export default Video;
