import React from 'react'
import { Telephone, People, Person, ListTask } from 'react-bootstrap-icons'
import style from '@/styles/header.module.scss'
import Link from 'next/link'

const Sidebar = () => {
    const categories = [
        {
            name: 'Quản lý sản phẩm',
            icon: <Telephone size={20}/>,
            status: false,
            url: 'product'
        },
        {
            name: 'Quản lý đơn hàng',
            icon: <ListTask size={20}/>,
            status: false,
            url: 'order'
        },
        {
            name: 'Quản lý khách hàng',
            icon: <Person size={20}/>,
            status: false,
            url: 'customer'
        },
        {
            name: 'Quản lý nhân viên',
            icon: <People size={20}/>,
            status: false,
            url: 'employee'
        }
    ]
    return (
        <div className={style.sidebar}>
            <h3 className='text-center'>Hello Admin</h3>
            <ul className='mt-4'>
                {categories.map((cate, i: number) =>
                    <li
                        className='flex items-center py-2 hover:cursor-pointer hover:underline'
                        key={cate.name}
                    >
                        {cate.icon}
                        <Link className='ml-4' href={`/admin/${cate.url}`}>
                            {cate.name}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default React.memo(Sidebar)