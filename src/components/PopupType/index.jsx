import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Icon, Popup } from "zarm";
import cx from 'classnames';
import { get } from '@utils';

import s from './style.module.less'

const PopupType = forwardRef(({ onSelect }, ref) => {
    const [show, setShow] = useState(false); // 组件的显示和隐藏
    const [active, setActive] = useState('all'); // 激活的 type
    const [expense, setExpense] = useState([]); // 支出类型标签
    const [income, setIncome] = useState([]); // 收入类型标签

    useEffect(async () => {
        const { data: { list } } = await get('/type/list')
        setExpense(list.filter(item => item.type == 1))
        setIncome(list.filter(item => item.type == 2))
    }, [])

    if (ref) {
        ref.current = {
            // 控制显示和隐藏
            show: () => {
                setShow(true)
            },
            close: () => {
                setShow(false)
            }
        }
    };

    // 选择类型回调
    const choseType = (item) => {
        setActive(item.id)
        setShow(false)
        onSelect(item)
    }

    return <Popup
        visible={show}
        direction="bottom"
        onMaskClick={() => setShow(false)}
        destroy={false}
        mountContainer={() => document.body}
    >
        <div className={s.popupType}>
            <div className={s.header}>
                请选择类型
                <Icon type="wrong" className={s.cross} onClick={() => setShow(false)} />
            </div>
            <div className={s.content}>
                <div onClick={() => choseType({ id: 'all' })} className={cx({ [s.all]: true, [s.active]: active == 'all' })}>全部类型</div>
                <div className={s.title}>支出</div>
                <div className={s.expenseWrap}>
                    {
                        expense.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({ [s.active]: active == item.id })} >{item.name}</p>)
                    }
                </div>
                <div className={s.title}>收入</div>
                <div className={s.incomeWrap}>
                    {
                        income.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({ [s.active]: active == item.id })} >{item.name}</p>)
                    }
                </div>
            </div>
        </div>
    </Popup>
});

PopupType.propTypes = {
    onSelect: PropTypes.func
};
  
export default PopupType;