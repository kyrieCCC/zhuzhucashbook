import React, { forwardRef, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Popup, Icon } from "zarm";

import s from './style.module.less'

const PopupAddBill = forwardRef((props, ref) => {
    const [show, setShow] = useState(false)
    const [payType, setPayType] = useState('expense')

    if (ref) {
        ref.current = {
            show: () => {
                setShow(true)
            },
            close: () => {
                setShow(false)
            }
        }
    };

    // 切换支出和收入
    const changeType = (type) => {
        setPayType(type)
    }

    return (
        <Popup
            visible={show}
            direction="bottom"
            onMaskClick={() => setShow(false)}
            destroy={false}
            mountContainer={() => document.body}
        >
            <div className={s.addWrap}>
                {/* 右上角关闭弹窗 */}
                <header className={s.header}>
                    <span className={s.close} onClick={() => setShow(false)}><Icon type="wrong" /></span>
                </header>
                {/* 「收入」和「支出」类型切换 */}
                <div className={s.filter}>
                    <div className={s.type}>
                        <span onClick={() => changeType('expense')} className={cx({ [s.expense]: true, [s.active]: payType == 'expense' })}>支出</span>
                        <span onClick={() => changeType('income')} className={cx({ [s.income]: true, [s.active]: payType == 'income' })}>收入</span>
                    </div>
                </div>
            </div>
        </Popup>
    );
})

export default PopupAddBill