import React, { useState } from 'react'
import { setCookie } from 'typescript-cookie'
import 'react-notifications-component/dist/theme.css'
import { NOTIFICATION_TYPE, Store } from 'react-notifications-component'

import style from './style.module.scss'
import { useGContext } from '../GlobalContext'
import { getProfile, signIn } from '@/pages/api/userApi'
import { useRouter } from 'next/router';

export const setNotification = (notify: NOTIFICATION_TYPE, titleNotify: string, messageNotify: string) => {
    Store.addNotification({
        title: titleNotify,
        message: messageNotify,
        type: notify,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 1000,
            onScreen: true
        }
    });
};

const SignIn = ({ callback }: { callback: Function }) => {
    const [formValue, setformValue] = useState({ mobile: '', password: '' });
    const { setUser } = useGContext();
    const { push } = useRouter()
    var notify = 'warning';
    var titleNotify = 'Thông tin tài khoản hoặc mật khẩu không đúng';
    var messageNotify = 'Vui lòng nhập lại'

    const handleChange = (event: any) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleLogin = async () => {
        if (formValue.mobile === '' || formValue.password === '') {
            titleNotify = 'Tên tài khoản hoặc mật khẩu chưa đầy đủ.';
            messageNotify = 'Vui lòng nhập lại';
            setNotification('warning', titleNotify, messageNotify);
            return;
        }

        const resp = await signIn(formValue);
        if (resp.msg === 'password not correct') {
            titleNotify = "Đăng nhập thất bại."
            messageNotify = "Tài khoản hoặc mật khẩu không đúng.";
            setNotification('danger', titleNotify, messageNotify);
        }
        else if (resp.status === 200) {
            titleNotify = "Đăng nhập thành công."
            messageNotify = "Vui lòng chờ...";
            const token = resp.data.token;

            setCookie('user', token, { expires: 7 });
            setNotification('success', titleNotify, messageNotify);
            callback(false);
            getProfile(token).then(data => {
                setUser(data[0]);
                if (data[0].isAdmin === '1') push('/admin/Product')
            })
        }
    }

    return (
        <div className={style['login-form']}>
            <div>
                <label>Mobile</label>
                <input type='text' name='mobile' required onChange={handleChange} />
            </div>
            <div>
                <label>Password</label>
                <input type='password' name='password' required onChange={handleChange} />
            </div>
            <div>
                <button className='btn-danger' onClick={handleLogin}>
                    Đăng nhập
                </button>
            </div>
        </div>
    )
}

SignIn.Header = () => <h4>Login</h4>;
SignIn.Footer = ({ callback }: { callback: Function }) => {
    return <p className='text-sm text-right'>
        <span>
            Bạn chưa có tài khoản?{' '}
            <a
                onClick={() => callback(false)}
                className='text-sky-500 hover:text-sky-400 underline cursor-pointer'
            >
                Đăng ký ngay
            </a>
        </span>
    </p>
}

export default SignIn;