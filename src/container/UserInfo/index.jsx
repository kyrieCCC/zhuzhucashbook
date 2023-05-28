import React, { useEffect, useState } from 'react';
import { Button, FilePicker, Input, Toast } from 'zarm';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header'; // 由于是内页，使用到公用头部
import axios from 'axios'; // // 由于采用 form-data 传递参数，所以直接只用 axios 进行请求
import { get, post } from '@/utils';
import { baseUrl } from 'config';

import s from './style.module.less'

const UserInfo = () => {

    const navigateTo = useNavigate();

    const [user, setUser] = useState({})
    const [avatar, setAvatar] = useState('')
    const [signature, setSignature] = useState('')
    const token = localStorage.getItem('token')

    const getUserInfo = async () => {
        const { data } = await get('/user/getUserInfo')
        setUser(data);
        setAvatar(data.avatar);
        setSignature(data.signature)
    }
    
    const handleSelect = (file) => {
        console.log('file', file);
        if (file && file.file.size > 200 * 1024) {
            Toast.show('上传头像的体积不能太大')
            return
        }
        const formData = new FileData();
        formData.append('file', file.file);

        axios({
            method: 'post',
            url: `${baseUrl}/upload`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        }).then(res => {
            setAvatar(res.data)
        })
    };

    // 编辑用户的信息方法
    const sava = async () => {
        const { data } = await post('/user/editUserInfo', {
            signature,
            avatar
        });

        Toast.show('修改成功')
        navigateTo(-1)
    }


    return (
        <>
            <Header title='用户信息' />
            <div className={s.userinfo}>
                <h1>个人资料</h1>
                <div className={s.item}>
                    <div className={s.title}>头像</div>
                    <div className={s.avatar}>
                        <img className={s.avatarUrl} src={avatar} alt="" />
                        <div className={s.desc}>
                            <span>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</span>
                            <FilePicker className={s.filePicker} onChange={handleSelect} accept="image/*">
                                <Button className={s.upload} theme='primary' size='xs'>点击上传</Button>
                            </FilePicker>
                        </div>
                    </div>
                </div>
                <div className={s.item}>
                    <div className={s.title}>个性签名</div>
                    <div className={s.signature}>
                        <Input
                            clearable
                            type="text"
                            value={signature}
                            placeholder="请输入个性签名"
                            onChange={(value) => setSignature(value)}
                        />
                    </div>
                </div>
                <Button onClick={save} style={{ marginTop: 50 }} block theme='primary'>保存</Button>
            </div>
        </>
    )
}

export default UserInfo