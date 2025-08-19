import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../useLocalStorage';
import { mockTasks } from '../mocks';

export const ResetDialog = ({ visible, handleCloseDialog }) => {
    const resetQuest = () => {    
        window.localStorage.removeItem('mocks');
        window.localStorage.setItem('mocks', JSON.stringify(mockTasks));
        handleCloseDialog();
    }

    const footerContent = (
        <div>
            <Button label="Відмінити" onClick={handleCloseDialog} className="p-button-text" />
            <Button label="Підтвердити" severity="danger" onClick={resetQuest} autoFocus />
        </div>
    );

    return (
        <Dialog header="Перезапусти всі квести?" visible={visible}
        style={{ width: '40vw' }}
        onHide={handleCloseDialog}
        footer={footerContent}>
            <p>Всі квести будуть перезавантажені і подорож потрібно буде почати з самого початку.</p>
        </Dialog>
    )
}

export const OxigenDialog = ({ visible, handleCloseDialog }) => {
    const FIVE_MINUTES_MS = 2 * 60 * 1000;
    const [cooldownEndTimestamp, setCooldownEndTimestamp] = useLocalStorage('oxygenCooldownEnd', null);
    const [remainingMs, setRemainingMs] = useState(0);
    const [value, setIputValue] = useState('');
    const [error, setError] = useState(false);

    const previouslyVisibleRef = useRef(false);
    useEffect(() => {
        const becameVisible = visible && !previouslyVisibleRef.current;
        previouslyVisibleRef.current = visible;
        if (!becameVisible) return;
        const now = Date.now();
        const hasActiveCooldown = typeof cooldownEndTimestamp === 'number' && cooldownEndTimestamp > now;
        if (!hasActiveCooldown) {
            setCooldownEndTimestamp(now + FIVE_MINUTES_MS);
        }
    }, [visible, cooldownEndTimestamp, setCooldownEndTimestamp, FIVE_MINUTES_MS]);

    useEffect(() => {
        if (!visible) return;
        if (typeof cooldownEndTimestamp !== 'number') {
            setRemainingMs(0);
            return;
        }
        let intervalId;
        const updateRemaining = () => {
            const msLeft = Math.max(0, cooldownEndTimestamp - Date.now());
            setRemainingMs(msLeft);
            if (msLeft <= 0) {
                clearInterval(intervalId);
            }
        };
        updateRemaining();
        intervalId = setInterval(updateRemaining, 1000);
        return () => clearInterval(intervalId);
    }, [visible, cooldownEndTimestamp]);

    const remainingFormatted = useMemo(() => {
        const totalSeconds = Math.floor(remainingMs / 1000);
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    }, [remainingMs]);

    const isFinished = remainingMs <= 0;

    const closeDialog = () => {
        setCooldownEndTimestamp(null);
        setRemainingMs(0);
        setIputValue('');
        handleCloseDialog();
    }

    const onInputChange = (e) => {
        setError(false);
        setIputValue(e.target.value)
    }

    const confirm = () => {
        if (!value || value !== '2019') {
            setError(true);
            return;
        }
        setError(false);
        closeDialog();
    }

    const header = (
        <span style={{ fontSize: '4rem', color: 'red', animation: 'flicker 1s infinite', textAlign: 'center' }}>
            <i className="pi pi-exclamation-triangle" style={{ fontSize: '4rem', color: 'red', textAlign: 'center' }}></i>  Повітря
        </span>
    )

    return (
        <Dialog
            modal
            visible={visible}
            onHide={closeDialog}
            header={header}
            style={{ width: '40vw' }}
           >
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundColor: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                <span style={{ fontSize: '2rem', color: 'red', fontWeight: 'bold' }}>Низький рівень повітря</span>
                <p>На кораблі залишилось повітря на 2 хвилини. Необхідно замінити балон!</p>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {isFinished ? 'Готово: час вичерпано' : <p>Залишилось часу: <span style={{ fontSize: '2rem', color: 'red', fontWeight: 'bold' }}>{remainingFormatted}</span></p>}
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                    <div className="inputWrapper">
                        <label htmlFor="username">Замініть балон та введіть код підтвердження:</label>
                        <InputText id="username" aria-describedby="username-help" value={value}
                            onChange={onInputChange}
                            invalid={error}
                            placeholder='****' />
                        {error ? <p style={{ color: '#fb2c36', fontWeight: '500' }}>Перевірте код, та спробуйте ще раз.</p> : ''}
                    </div>
                    <Button label="Підтвердити" severity="info" onClick={confirm} disabled={error} />
                </div>
            </div>
        </Dialog>
    )
}

export const BatteryDialog = ({ visible, handleCloseDialog }) => {
    const FIVE_MINUTES_MS = 2 * 60 * 1000;
    const [cooldownEndTimestamp, setCooldownEndTimestamp] = useLocalStorage('batteryCooldownEnd', null);
    const [remainingMs, setRemainingMs] = useState(0);
    const [value, setIputValue] = useState('');
    const [error, setError] = useState(false);

    const previouslyVisibleRef = useRef(false);
    useEffect(() => {
        const becameVisible = visible && !previouslyVisibleRef.current;
        previouslyVisibleRef.current = visible;
        if (!becameVisible) return;
        const now = Date.now();
        const hasActiveCooldown = typeof cooldownEndTimestamp === 'number' && cooldownEndTimestamp > now;
        if (!hasActiveCooldown) {
            setCooldownEndTimestamp(now + FIVE_MINUTES_MS);
        }
    }, [visible, cooldownEndTimestamp, setCooldownEndTimestamp, FIVE_MINUTES_MS]);

    useEffect(() => {
        if (!visible) return;
        if (typeof cooldownEndTimestamp !== 'number') {
            setRemainingMs(0);
            return;
        }
        let intervalId;
        const updateRemaining = () => {
            const msLeft = Math.max(0, cooldownEndTimestamp - Date.now());
            setRemainingMs(msLeft);
            if (msLeft <= 0) {
                clearInterval(intervalId);
            }
        };
        updateRemaining();
        intervalId = setInterval(updateRemaining, 1000);
        return () => clearInterval(intervalId);
    }, [visible, cooldownEndTimestamp]);

    const remainingFormatted = useMemo(() => {
        const totalSeconds = Math.floor(remainingMs / 1000);
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    }, [remainingMs]);

    const isFinished = remainingMs <= 0;

    const closeDialog = () => {
        setCooldownEndTimestamp(null);
        setRemainingMs(0);
        setIputValue('');
        handleCloseDialog();
    }

    const onInputChange = (e) => {
        setError(false);
        setIputValue(e.target.value)
    }

    const confirm = () => {
        if (!value || value !== '2019') {
            setError(true);
            return;
        }
        setError(false);
        closeDialog();
    }

    const header = (
        <span style={{ fontSize: '4rem', color: 'red', animation: 'flicker 1s infinite', textAlign: 'center' }}>
            <i className="pi pi-exclamation-triangle" style={{ fontSize: '4rem', color: 'red', textAlign: 'center' }}></i> Батарея
            </span>
    )

    return (
        <Dialog
            modal
            visible={visible}
            onHide={closeDialog}
            header={header}
            style={{ width: '40vw' }}
           >
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundColor: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                <span style={{ fontSize: '2rem', color: 'red', fontWeight: 'bold' }}>Низький рівень заряду</span>
                <p>Низьки зарад акумулятора! Якщо не замінити батарею, то через 2 хвилини корабель вийде з ладу і місія буде провалена.</p>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {isFinished ? 'Готово: час вичерпано' : <p>Залишилось часу: <span style={{ fontSize: '2rem', color: 'red', fontWeight: 'bold' }}>{remainingFormatted}</span></p>}
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                    <div className="inputWrapper">
                        <label htmlFor="username">Замініть балон та введіть код підтвердження:</label>
                        <InputText id="username" aria-describedby="username-help" value={value}
                            onChange={onInputChange}
                            invalid={error}
                            placeholder='****' />
                        {error ? <p style={{ color: '#fb2c36', fontWeight: '500' }}>Перевірте код, та спробуйте ще раз.</p> : ''}
                    </div>
                    <Button label="Підтвердити" severity="info" onClick={confirm} disabled={error} />
                </div>
            </div>
        </Dialog>
    )
}

export const MessageDialog = ({ visible, handleCloseDialog }) => {
    const footerContent = (
        <div>
            <Button label="Зрозуміло" onClick={handleCloseDialog} className="p-button-text" />
        </div>
    );

    return (
        <Dialog header="Ви отримали повідомлення із Землі" visible={visible}
        style={{ width: '40vw' }}
        onHide={handleCloseDialog}
        footer={footerContent}>
            <p>Тут буде повідомлення</p>
        </Dialog>
    )
}

export const HelpDialog = ({ visible, handleCloseDialog }) => {
    const navigate = useNavigate();
    const confirm = () => {
        navigate('/tasks/7');
        handleCloseDialog();
    }
    const header = (
        <span style={{ fontSize: '4rem', color: 'red', animation: 'flicker 1s infinite', textAlign: 'center' }}>
            <i className="pi pi-exclamation-triangle" style={{ fontSize: '4rem', color: 'red', textAlign: 'center', masrginRight: '0.5rem' }}></i>  SOS</span>
    )

    const footerContent = (
        <div className="flex gap-2" style={{ marginTop: '0.5rem' }}>
            <Button label="Допомогти" severity="info" onClick={confirm} />
            <Button label="Ігнорувати" severity="secondary" onClick={confirm} />
        </div>
    )

    return (
        <Dialog
            modal
            visible={visible}
            onHide={handleCloseDialog}
            header={header}
            footer={footerContent}
            style={{ width: '40vw' }}
           >
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundColor: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                <span style={{ fontSize: '2rem', color: 'red', fontWeight: 'bold' }}>Ви отримали сигнал про допомогу!</span>
                <p>Схоже, поруч сталась аварія на іншому кораблі і хтось у небезпеці. Ви можете допомогти цьому кораблеві або продовжити свій політ.</p>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Попадання метеоритів у корабель біля планети Сигма
                </div>
            </div>
        </Dialog>
    )
}

export const AllertDialog = ({ visible, handleCloseDialog }) => {
    const navigate = useNavigate();
    const confirm = () => {
        navigate('/map/5');
        handleCloseDialog();
    }
    const header = (
        <span style={{ fontSize: '4rem', color: 'red', animation: 'flicker 1s infinite', textAlign: 'center' }}>
            <i className="pi pi-asterisk" style={{ fontSize: '4rem', color: 'red', textAlign: 'center', masrginRight: '0.5rem' }}></i>  Метеоритна буря</span>
    )

    const footerContent = (
        <div className="flex gap-2" style={{ marginTop: '0.5rem' }}>
            <Button label="Прийнято! Вирушаємо на станцію!" severity="danger" onClick={confirm} />
        </div>
    )

    return (
        <Dialog
            modal
            visible={visible}
            onHide={handleCloseDialog}
            header={header}
            footer={footerContent}
            style={{ width: '40vw' }}
           >
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundColor: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                <span style={{ fontSize: '2rem', color: 'red', fontWeight: 'bold' }}>Найвищий рівень небезпеки. Всім підготуватись!</span>
                <p>На радарах поміченно потужну метеоритну бурю, яка рухається через галактику в напрямку головної станції.</p>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Пристібніть паски безпеки!
                </div>
            </div>
        </Dialog>
    )
}

export const NavigationDialog = ({ visible, handleCloseDialog }) => {
    const [value, setIputValue] = useState('');
    const [error, setError] = useState(false);

    const closeDialog = () => {
        setIputValue('');
        handleCloseDialog();
    }

    const onInputChange = (e) => {
        setError(false);
        setIputValue(e.target.value)
    }

    const confirm = () => {
        if (!value || value !== '2019') {
            setError(true);
            return;
        }
        setError(false);
        closeDialog();
    }

    return (
        <Dialog header="Перевірте навігацію" visible={visible}
            style={{ width: '40vw' }}
            onHide={handleCloseDialog}
        >
            <p>Перевірте навігацію та підтвердьте, що все працює вірно.</p>
            <div style={{ marginTop: '0.5rem' }}>
                    <div className="inputWrapper">
                        <label htmlFor="username">Замініть балон та введіть код підтвердження:</label>
                        <InputText id="username" aria-describedby="username-help" value={value}
                            onChange={onInputChange}
                            invalid={error}
                            placeholder='****' />
                        {error ? <p style={{ color: '#fb2c36', fontWeight: '500' }}>Перевірте код, та спробуйте ще раз.</p> : ''}
                    </div>
                    <Button label="Підтвердити" severity="info" onClick={confirm} disabled={error} />
                </div>
        </Dialog>
    )
}