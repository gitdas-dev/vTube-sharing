import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { api } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  row-gap: 2rem;
  column-gap: 5rem;
  @media (min-width: 1125px) {
    justify-content: flex-start;
  }
`;
const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    try {
      const fetchVideos = async () => {
        try {
          const res = await api.get(`/api/videos/${type}`);
          setVideos(res.data);
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

      fetchVideos();
    } catch (err) {}
  }, [type]);
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
        {Array.isArray(videos) ? (
          videos.map((video) => (
            <Card key={video._id} video={video}>
              {video.title}
            </Card>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </Container>
    </>
  );
};

export default Home;
