import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Cookies from "js-cookie";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import { useEffect, useState } from "react";
import ActivateForm from "./ActivateForm";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export default function Activate() {
  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loadng, setLoading] = useState(false);
  const { token } = useParams();
  useEffect(() => {
    activateAccount();
  });
  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data.message);
      setSuccess(data.message);
      Cookies.set("user", JSON.stringify({...user , verified : true}));
      dispatch({
        type: "VERIFY",
        payload: true,
      })
      setTimeout(() => {
        navigate("/");
      },3000)
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate("/");
      },3000)
      
    }
  };

  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account Verification succeded"
          text={success}
          loadng={loadng}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account Verification failed"
          text={error}
          loadng={loadng}
        />
      )}

      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
