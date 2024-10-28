import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { api } from "../utils/api";

const Container = styled.div``;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const Button = styled.button`
  background-color: grey;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 0.3rem;
`;

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [currComment, setCurrComment] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();
    await api.post(`/api/comments/`, {
      videoId,
      desc: currComment,
    });
    setCurrComment("");
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/api/comments/${videoId}`);
        setComments(res.data);
      } catch (error) {}
    };
    fetchComments();
  }, [handleComment]);

  return (
    <Container>
      <NewComment>
        <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
        <Input
          placeholder="Add a comment..."
          onChange={(e) => setCurrComment(e.target.value)}
          value={currComment}
        />
        <Button onClick={handleComment}>Add</Button>
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
