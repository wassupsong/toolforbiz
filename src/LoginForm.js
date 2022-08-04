import { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineFacebook } from "react-icons/ai";
import { firebaseApp } from "./fbase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const changeInput = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };
  const submitLogin = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      let errorStr;
      switch (error.code) {
        case "auth/wrong-password":
          errorStr = "비밀번호를 잘못 입력했습니다.";
          break;
        case "auth/user-not-found":
          errorStr = "존재하지 않는 계정입니다. 가입해주세요!";
          break;
        case "auth/weak-password":
          errorStr = "비밀번호는 6자리 이상 입력해주세요.";
          break;
        case "auth/email-already-in-use":
          errorStr = "이미 존재하는 사용자입니다. 로그인해주세요.";
          break;
        case "auth/invalid-email":
          errorStr = "이메일을 입력해주세요.";
          break;
        case "auth/internal-error":
          errorStr = "비밀번호를 입력해주세요.";
          break;
      }
      alert(errorStr);
    }
  };
  const socialLogin = async (event) => {
    const {
      target: { name },
    } = event;
    const auth = getAuth();
    let provider;
    if (name === "googleLogin") {
      provider = new GoogleAuthProvider();
    } else if (name === "facebookLogin") {
      provider = new FacebookAuthProvider();
    }

    await signInWithPopup(auth, provider);
  };
  const toggleMode = () => {
    setIsLoginMode((cur) => !cur);
  };
  return (
    <div className="login_container">
      <Form className="login_input_form" onSubmit={submitLogin}>
        <h1 className="login_title">Tool For Biz</h1>
        <Form.Group as={Row} className="mb-3">
          <Col sm>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={changeInput}
              placeholder="이메일을 입력해주세요."
              className="login_input"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={changeInput}
              placeholder="비밀번호 입력해주세요."
              className="login_input"
            />
          </Col>
        </Form.Group>
        <div className="login_social">
          <Button
            variant="light"
            type="button"
            className="login_social_button"
            name="googleLogin"
            onClick={socialLogin}
          >
            <FcGoogle className="icon" />
            &nbsp; Google
          </Button>
          <Button
            variant="light"
            type="button"
            className="login_social_button"
            name="facebookLogin"
            onClick={socialLogin}
          >
            <AiOutlineFacebook className="icon" />
            &nbsp; Facebook
          </Button>
        </div>
        <div className="d-grid gap-1">
          <Button variant="secondary" type="submit">
            {isLoginMode ? "로그인" : "회원가입"}
          </Button>
        </div>
        <br />
        <span className="login_toggle" onClick={toggleMode}>
          {isLoginMode ? "회원가입" : "로그인"}
        </span>
      </Form>
    </div>
  );
};

export default LoginForm;
