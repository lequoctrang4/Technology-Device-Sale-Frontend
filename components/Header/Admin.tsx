import React from 'react'
import style from '@/styles/header.module.scss'
import { Settings, Bell } from 'react-feather'

const HeaderAdmin = () => {
    return (
        <nav className={`bg-primary ${style.header}`}>
            <div className='px-6'>
                <h1>Mewfone</h1>
                <div className='flex'>
                    <button className='mr-6'>
                        Thông báo
                        <Bell />
                    </button>
                    <button>
                        Cài đặt
                        <Settings />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default HeaderAdmin;