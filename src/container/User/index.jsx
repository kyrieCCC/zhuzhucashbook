import React, { useState, useEffect } from 'react';
import { get } from '@/utils';

import s from './style.module.less';

const User = () => {
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        getUserInfo()
    }, [])

    // 获取用户信息
    const getUserInfo = async () => {
        const { data } = await get('/user/getUserInfo');
        setUser(data)
        setAvatar(data.avatar)
    }

    return (
        <div className={s.user}>
            <div className={s.head}>
                <div className={s.info}>
                    <span>昵称：{user.username || '-=-'}</span>
                    <span>
                        <img style={{ width: 30, height: 30, verticalAlign: '-10px' }} src="//s.yezgea02.com/1615973630132/geqian.png" alt="" />
                        <b>{user.signature || '这个人很懒，什么都没有留下~'}</b>
                    </span>
                </div>
                <img className={s.avatar} style={{ width: 60, height: 60, borderRadius: 8 }} src={'//s.yezgea02.com/1624959897466/avatar.jpeg'} alt="" />
            </div>
        </div>
    );
}

export default User
