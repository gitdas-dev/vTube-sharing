import { SearchOutlined, VideoCallOutlined } from "@mui/icons-material";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Upload } from "./Upload.jsx";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

const Container = styled.div`
  padding: 0.5rem;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  @media (max-width: 480px) {
    margin-right: 1rem;
  }
`;

const Span = styled.span`
  font-size: 12px;
  display: flex;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 20px;
`;

const Search = styled.div`
  width: 35rem;
  margin-left: 3rem;
  margin-right: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  @media (max-width: 1512px) {
    width: 30rem;
  }
  @media (max-width: 817px) {
    width: 20rem;
  }
  @media (max-width: 480px) {
    width: 9rem;
  }
`;

const Item = styled.span`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  padding: 7.5px 0;
  margin-right: 1rem;
  color: ${({ theme }) => theme.text};
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Wrapper>
          <span>
            <Search>
              <Input
                placeholder={"Search"}
                onChange={(e) => setQ(e.target.value)}
              />
              <SearchOutlined
                onClick={() => navigate(`/search?q=${q}`)}
                style={{ cursor: "pointer" }}
              />
            </Search>
          </span>
          <span
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Item
              onClick={() => {
                setDarkMode((darkMode) => !darkMode);
              }}
            >
              <Span>
                {darkMode ? <ToggleOnIcon /> : <ToggleOffIcon />}
                {darkMode ? "Light" : "Dark"} Mode
              </Span>
            </Item>
            <span style={{ display: "flex", gap: "" }}>
              {open && <Upload setOpen={setOpen} />}
              {currentUser ? (
                <User>
                  <span style={{ cursor: "pointer" }}>
                    <VideoCallOutlined onClick={() => setOpen(true)} />
                  </span>
                  <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                  {currentUser.name}
                </User>
              ) : (
                <Link to="signin" style={{ textDecoration: "none" }}>
                  <Button>
                    <AccountCircleOutlined />
                    SIGN IN
                  </Button>
                </Link>
              )}
            </span>

            {/* Implement logout button */}
          </span>
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
