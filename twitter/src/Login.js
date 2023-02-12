import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material"
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {

  const location = useLocation();
  const navigate = useNavigate();

  const handle = useRef();
  const password = useRef()

  const api = "http://localhost:8484";

  const [ err, setErr] = useState(false);
  const  [ errMsg, setErrMsg ] = useState("");

  async function login(handle, password) {

    const res = await fetch(`${api}/users/login`, {
            method: "POST",
            headers: {"Content-Type" : "application/json" },
            body: JSON.stringify({ handle, password})
          });
  
    if(!res.ok) return false;
  
    const token = await res.text();
    localStorage.setItem("token", token);
    return token;
  }
  

  const loginHandler = async (e) => {
    e.preventDefault();
    const token = await login(handle.current.value, password.current.value)
    if(token){
      navigate('/');
    } else {
      setErr(true);
      setErrMsg("handle or password incorrect");
    }
  }

  return(
    <Box sx={{ my: 3, mx: {lg: 20, md: 5, sm: 5, xs: 3}}}>
      <Typography variant="h4" sx={{ mb: 4}} > Login</Typography>

      {err && <Alert severity="warning" sx={{ mb: 4}}>{errMsg}</Alert>}

      {location.state && (
        <Alert severity="success" sx={{ mb: 4 }}>
          {location.state}
        </Alert>
      )}
      <form onSubmit={(e) => loginHandler(e)}>
        <OutlinedInput placeholder="handle" fullWidth sx={{ mb:2}} inputRef={handle} />
        <OutlinedInput type="password" placeholder="password" fullWidth sx={{ mb:2}} inputRef={password} />
        <Button type="submit" variant="contained">Login</Button>
      </form>
    </Box>
  )
}