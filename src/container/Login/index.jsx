import React, { useCallback, useState, useEffect, useRef } from "react";
import s from "./style.module.less";
import { Input, Cell, Button, Checkbox, Toast } from "zarm";
import Captcha from "react-captcha-code";
import { post } from "@/utils";
import cx from "classnames";

const Login = () => {
  const captchaRef = useRef();
  const [username, setUsername] = useState(""); // 账号
  const [password, setPassword] = useState(""); // 密码
  const [verify, setVerify] = useState(""); // 验证码
  const [captcha, setCaptcha] = useState("");
  const [type, setType] = useState("login"); // 登录注册类型

  // 检测验证码变化
  const handleChange = useCallback((captcha) => {
    console.log("captcha:", captcha);
    setCaptcha(captcha);
  }, []);

  // 提交注册信息
  const onSubmit = async () => {
    if (!username) {
      Toast("请输入账号");
      return;
    }
    if (!password) {
      Toast("请输入密码");
      return;
    }
    try {
      if (type == 'login') {
        const { data } = await post("/user/login", {
          username,
          password,
        });
        localStorage.setItem('token', data.token);
        window.location.href = '/'
      } else {
        if (!verify) {
          Toast("请输入验证码");
          return;
        }
        if (verify != captcha) {
          Toast("验证码错误, 请重试");
          return;
        };
        const { data } = await post("/user/register", {
          username,
          password,
        });
        Toast("注册成功");
        setType('login')
      }
    } catch (error) {
      Toast.show(error.msg)
    }
  };

  useEffect(() => {
    document.title = type == 'login' ? '登录' : '注册';
  }, [type])  

  return (
    <div className={s.auth}>
      <div className={s.head}></div>
      <div className={s.tab}>
        <span
          className={cx({ [s.avtive]: type == "login" })}
          onClick={() => setType("login")}
        >
          登录
        </span>
        <span
          className={cx({ [s.avtive]: type == "register" })}
          onClick={() => setType("register")}
        >
          注册
        </span>
      </div>
      <div className={s.form}>
        <Cell title="账号">
          <Input
            clearable
            type="text"
            placeholder="请输入"
            onChange={(value) => setUsername(value)}
          />
        </Cell>
        <Cell title="密码">
          <Input
            clearable
            type="password"
            placeholder="请输入"
            onChange={(value) => setPassword(value)}
          />
        </Cell>
        {type == "register" ? (
          <Cell>
            <Input
              clearable
              type="text"
              placeholder="请输入验证码"
              onChange={(value) => setVerify(value)}
            />
            <Captcha ref={captchaRef} charNum={4} onChange={handleChange} />
          </Cell>
        ) : null}
      </div>
      <div className={s.operation}>
        {type == "register" ? (
          <div className={s.agree}>
            <Checkbox />
            <label className="text-light">
              阅读并同意<a>《猪猪的使用须知》</a>
            </label>
          </div>
        ) : null}
        <Button onClick={onSubmit} block theme="primary">
          {type == "login" ? "登录" : "注册"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
