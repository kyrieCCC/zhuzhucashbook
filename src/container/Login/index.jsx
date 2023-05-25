import React, { useCallback, useState } from "react";
import s from "./style.module.less";
import { Input, Cell, Button, Checkbox } from "zarm";
import Captcha from 'react-captcha-code';

const Login = () => {

  const [username, setUsername] = useState(''); // 账号
  const [password, setPassword] = useState(''); // 密码
  const [verify, setVerify] = useState(''); // 验证码
  const [captcha, setCaptcha] = useState('');

  // 检测验证码变化
  const handleChange = useCallback((captcha) => {
    console.log('captcha:', captcha);
    setCaptcha(captcha)
  }, []);

  return (
    <div className={s.auth}>
      <div className={s.head} />
      <div className={s.tab}>
        <span>注册页面</span>
      </div>
      <div className={s.form}>
        <Cell title="账号">
          <Input clearable type="text" placeholder="请输入" onChange={(value) => setUsername(value)} />
        </Cell>
        <Cell title="密码">
          <Input clearable type="password" placeholder="请输入" onChange={(value) => setPassword(value)} />
        </Cell>
        <Cell title="验证码">
          <Input clearable type="text" placeholder="请输入验证码" onChange={(value) => setVerify(value)} />
          <Captcha charNum={4} onChange={handleChange} />
        </Cell>
      </div>
      <div className={s.operation}>
        <div className={s.agree}>
          <Checkbox />
          <label className="text-light">
            阅读并同意<a>《猪猪的使用须知》</a>
          </label>
        </div>
        <Button block theme="primary">
          注册
        </Button>
      </div>
    </div>
  );
};

export default Login;
