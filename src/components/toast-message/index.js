import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hidenToastMessage } from '../../redux/slices/ThemeSlice'
import './style.scss'

function ToastMessage() {
    const { isShowToastMessage } = useSelector(state => state.theme)
    const dispatch = useDispatch()

    const handleType = () => {
        if (isShowToastMessage.type === 'error') {
            return <i class="fas fa-exclamation-circle"></i>
        }
        else {
            return <i className="fas fa-check-circle"></i>
        }
    }

    const typeMessage = isShowToastMessage.type === 'error' ? 'toast__error' : 'toast__success'

    useEffect(() => {
        const clear = setTimeout(() => {
            dispatch(hidenToastMessage())
        }, 2000)

        return () => {
            clearTimeout(clear)
        }
    }, [dispatch])
    return (
        <div className={isShowToastMessage.isShow ? `toast ${typeMessage}` : `toast ${typeMessage}`}>
            <div className="toast__icon">
                {
                    handleType()
                }

            </div>
            <div className="toast__body">
                <p className="toast__msg">{isShowToastMessage.message}</p>
            </div>
        </div>
    )
}

export default ToastMessage
