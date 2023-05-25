import React, { useCallback, useState } from "react";
import s from "./style.module.less";
import { Input, Cell, Button, Checkbox, Toast } from "zarm";
import Captcha from 'react-captcha-code';
import { post } from '@/utils'

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

  // 提交注册信息
  const onSubmit = async () => {
    if (!username) {
      Toast('请输入账号')
      return 
    }
    if (!password) {
      Toast('请输入密码')
      return 
    }
    if (!verify) {
      Toast('请输入验证码')
      return 
    }
    if (verify != captcha) {
      Toast("验证码错误, 请重试")
      return 
    }
    try {
      const { data } = await post('/user/register', {
        username,
        password
      });
      Toast('注册成功')
    } catch(error) {
      Toast('系统错误')
      return 
    }
  }

  return (
    <div className={s.auth}>
      <div className={s.head}></div>
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
        <Button onClick={onSubmit} block theme="primary">
          注册
        </Button>
      </div>
    </div>
  );
};

export default Login;
