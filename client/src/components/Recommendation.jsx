import React, { useEffect, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import { api } from "../utils/api";

const Container = styled.div`
  flex: 2;
`;

export const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await api.get(`/api/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };

    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {Array.isArray(videos)
        ? videos?.map((video) => (
            <Card type="sm" key={video._id} video={video} />
          ))
        : null}
    </Container>
  );
};
