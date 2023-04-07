import { useNavigate } from "react-router";


export default function Profile() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_token_type")
    navigate("/");
  };

  return (
    <>
      <div style={{ marginTop: 20, minHeight: 700 }}>
        <h1>Profile page</h1>
        <p>pagina de perfil de usuario</p>

        <button onClick={signOut}>sign out</button>
      </div>
    </>
  );
}