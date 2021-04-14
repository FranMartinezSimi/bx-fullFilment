import React from 'react';

const OrderItem = (props) => {

    const {order_number, first_name, description, tracking, fecha, showDetailHandle, setOrderDetails} = props;

    const onDetailClickHandle = () => {
        setOrderDetails({
            order_number: order_number,
            first_name: first_name,
            description: description,
            tracking: tracking,
            fecha: fecha
        })
        showDetailHandle(true);
    }

    return (
        <tr key={order_number}>
            <td>{order_number}</td>
            <td>{first_name}</td>
            <td>{description}</td>
            <td>{tracking}</td>
            <td>{fecha}</td>
            <td>
                <button onClick={() => onDetailClickHandle()}>Ver Detalle &#62;</button>
            </td>
        </tr>
    );
};

export default OrderItem;