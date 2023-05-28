import React, { useEffect, useState } from 'react';
import { Button, FilePicker, Input, Toast, NoticeBar } from 'zarm';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import axios from 'axios';
import { get, post, imgUrlTrans } from '@/utils'
import { baseUrl } from 'config'
import s from './style.module.less';

const UserInfo = () => {
    const navigateTo = useNavigate()
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('')
    const [signature, setSignature] = useState('')
    const token = localStorage.getItem('token')

    useEffect(() => {
        getUserInfo()
    }, [])

    // 获取用户信息
    const getUserInfo = async () => {
        const { data } = await get('/user/getUserInfo');
        setUser(data);
        setAvatar(imgUrlTrans(data.avatar))
        setSignature(data.signature)
    };

    const handleSelect = (file) => {
        console.log('file.file', file.file)
        if (file && file.file.size > 200 * 1024) {
            Toast.show('上传头像不得超过 200 KB!!')
            return
        }
        let formData = new FormData()
        formData.append('file', file.file)
        axios({
            method: 'post',
            url: `${baseUrl}/test/upload`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        }).then(res => {
            // setAvatar(imgUrlTrans(res.data))
            console.log(res.data)
        })
    }

    const save = async () => {
        const { data } = await post('/user/editUserInfo', {
            signature
            // avatar
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
                    <div className={s.title}>头像(暂不可用)</div>
                    <NoticeBar theme="danger" speed={100}>修改头像功能目前正在维护中。。请过几天再来试试吧^.^</NoticeBar>
                    <div className={s.avatar}>
                        <img className={s.avatarUrl} src={avatar} alt="" />
                        <div className={s.desc}>
                            <span>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</span>
                            {/* <span>头像修改功能目前维护中。。。</span> */}
                            <FilePicker className={s.filePicker} onChange={handleSelect} accept="image/*">
                                <Button className={s.upload} theme='primary' size='xs' disabled>点击上传</Button>
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
    );
};

export default UserInfo;