import React, { useEffect, useState } from 'react';
import { Search } from 'react-bootstrap-icons';

import style from './order.module.scss';
import Pagination from '@/components/Pagination';
import InfoModal from '@/components/Modal/Info';
import { useDirect } from '@/components/GlobalContext';

const Orders = () => {
    const [index, setIndex] = useState<number>(0);
    const [users, setUsers] = useState([]);
    const [amount, setAmount] = useState<number>(0);
    const [showModal, setShowModal] = useState<Boolean>(false);
    const states = ['Đang chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Đã giao'];

    useDirect();
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((resp) => resp.json())
            .then((data) => setUsers(data));
    }, []);

    return (
        <div className="p-8 col-span-4">
            <h3 className="font-normal">Quản lý đơn hàng</h3>
            <div className="flex justify-between my-4">
                <ul className={style._states}>
                    {states.map((s: string, i: number) => (
                        <li
                            key={i}
                            className={i === index ? style.active : ''}
                            onClick={() => setIndex(i)}
                        >
                            {s}
                        </li>
                    ))}
                </ul>
                <form className={style.form}>
                    <input placeholder="Nhập mã sản phẩm hoặc từ khóa" />
                    <button type="submit">
                        <Search />
                    </button>
                </form>
            </div>
            <div>
                {users
                    .slice(amount * 5, (amount + 1) * 5)
                    .map((user: any, i: number) => {
                        return (
                            <div
                                className="mb-4 bg-secondary p-3 rounded"
                                key={i}
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <h4>Đơn hàng: #00000{user.id}</h4>
                                        <p>
                                            Trạng thái:{' '}
                                            <span className="italic">
                                                Đang chờ
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <button className="btn-danger mr-4" onClick={() => setShowModal(true)}>
                                            Từ chối
                                        </button>
                                        <button className="btn-success">
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between ml-6">
                                    <table className={style.list}>
                                        <tbody>
                                            <tr>
                                                <th>Tên khách hàng</th>
                                                <td> {user.name} </td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td> {user.email} </td>
                                            </tr>
                                            <tr>
                                                <th>Số điện thoại</th>
                                                <td> {user.phone} </td>
                                            </tr>
                                            <tr>
                                                <th>Địa chỉ</th>
                                                <td>
                                                    {user.address.street},{' '}
                                                    {user.address.suite},{' '}
                                                    {user.address.city}{' '}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className={style.detail}>
                                        <thead>
                                            <tr>
                                                <th>Tên sản phẩm</th>
                                                <th>Số lượng</th>
                                                <th>Giá tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            <tr>
                                                <td>iPhone 11 Promax</td>
                                                <td>x1</td>
                                                <td>20.000.000 VND</td>
                                            </tr>
                                            <tr>
                                                <td>iPhone 11 Promax</td>
                                                <td>x1</td>
                                                <td>20.000.000 VND</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })}
            </div>
            {showModal && <InfoModal exit={setShowModal}>
                <p>Bạn có chắc muốn từ chối đơn hàng này?</p>
            </InfoModal>}
            {/* Pages */}
            <Pagination callback={setAmount} />
        </div>
    );
};

export default Orders;
