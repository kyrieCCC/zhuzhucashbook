import React from "react";
import { Button } from 'zarm'
import s from './style.module.less'

export default function Index() {
    return (<div className={s.index}>
        Index Page
        <span>我的样式出现了变化</span>
        <Button theme="primary"> 按钮 </Button>
    </div>
    )
}