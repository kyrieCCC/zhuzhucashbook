import React from "react";
import s from "./style.module.less";
import { Input, Cell, Button, Checkbox } from "zarm";

const Login = () => {

  return (
    <div className={s.auth}>
      <div className={s.head} />
      <div className={s.tab}>
        <span>注册页面</span>
      </div>
      <div className={s.form}>
        <Cell title="账号">
          <Input clearable type="text" placeholder="请输入" />
        </Cell>
        <Cell title="密码">
          <Input clearable type="password" placeholder="请输入" />
        </Cell>
        <Cell title="验证码">
          <Input clearable type="text" placeholder="请输入验证码" />
        </Cell>
      </div>
      <div className={s.operation}>
        <div className={s.agree}>
          <Checkbox />
          <label className="text-light">
            阅读并同意<a>《掘掘手札条款》</a>
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
