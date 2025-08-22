import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

import { mockTasksDescription } from '../mocks';
import { completeTask, findCurrentTaskStatus } from '../commonHandlers';
import {
    DecodeDialog,
    OxigenDialog,
    BatteryDialog,
    NavigationDialog,
    ConnectionDialog,
    FinalQuestDialog,
} from './Dialogs';

const getTask = (id) => (mockTasksDescription.filter(el => el.id === Number(id)))[0];
const getStorageMocks = () => JSON.parse(window.localStorage.getItem('mocks'));
const isTaskDisabled = (id, tasks) => {
    const currItemStatus = findCurrentTaskStatus(Number(id), tasks);
    return currItemStatus !== 'Виконується'
}

export function TaskItem() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentTask, setCurrentTask] = useState(getTask(id));
    const [disabled, setDisabled] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showOxigenDialog, setShowOxigenDialog] = useState(false);
    const [showBatteryDialog, setShowBatteryDialog] = useState(false);
    const [showNavDialog, setShowNavDialog] = useState(false);
    const [showConnectionDialog, setShowConnectionDialog] = useState(false);
    const [showFinalDialog, setShowFinalDialog] = useState(false);

    useEffect(() => {
        setCurrentTask(getTask(id));
        const mocks = getStorageMocks();
        setDisabled(isTaskDisabled(id, mocks));
    }, [id])

    const handleCompleteTask = () => {
        const mocks = getStorageMocks();

        if (isTaskDisabled(id, mocks)) {
            return;
        }

        window.localStorage.removeItem('mocks');
        window.localStorage.setItem('mocks', JSON.stringify(completeTask(id, mocks)));

        navigate('/tasks');
    }

    const openDialog = (action) => {
        switch(action) {
            case 'oxigen': {
              return setShowOxigenDialog(true);
            }
            case 'battery': {
               return setShowBatteryDialog(true);
            }
            case 'navigation': {
               return setShowNavDialog(true);
            }
            case 'connection': {
                return setShowConnectionDialog(true);
            }
            default: {
                return null;
            }
        }
    }

    return (
        <div className="task-container">
             <div className="content-wrapper">
                <Card className="dark-card" title={currentTask?.name}>
                    <div className="card-content" style={{ textAlign: 'left' }}>                        
                       <p>{currentTask?.description}</p>
                       <ul className='task-item-list'>
                        {currentTask?.subtasks?.map(({ name, type, description, id, rewards, icon, color, actionValue }) => {

                            const getRewards = () => {
                                if (!rewards && !rewards?.length) return '';
                                const statusClass = (level) => level === 'Звичайний' ? '' : 'p-button-warning';
                                return rewards.map((el, id) => <Button key={id} label={el.value} className={statusClass(el.level)} style={{ marginRight: '1rem' }}/>)
                            }

                            const getActionButtons = (action) => {
                                if (currentTask.id === 3 && id === 2) {
                                    return <Button label="Розшифрувати" size="small" className='p-button-help' onClick={() => setShowDialog(true)} />
                                }
                                if (!action) return '';

                                return <Button label="Виконати" size="small" className='p-button-secondary' onClick={() => openDialog(actionValue)} />
                            }
                        
                            return (
                                <React.Fragment key={id}>
                                    <li className='task-item-wrapper'>
                                        <div className='item-image'><i className={`pi ${icon || 'pi-info-circle'} zoom-shake`} style={{ fontSize: '4rem', color: color }}></i></div>
                                        <div>
                                            <h3>{id}. {name}: <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: color }}>{type}</span></h3>
                                            <p>{description}</p>
                                            {getRewards()}
                                            {getActionButtons(actionValue)}
                                        </div>
                                    </li>
                                    <Divider />     
                                </React.Fragment>
                            )
                        })}
                       </ul>
                       <div className='flex task-item-buttons'>
                            <Button label="Назад" link onClick={() => navigate('/tasks')}/>
                            <div className='flex'>
                                {(currentTask.id === 6) ? (
                                  <Button label="Відкрити дешифратор" severity="info" onClick={() => setShowFinalDialog(true)}/>
                                  ) : (
                                  <Button label="Завершити завдання" size="small" className='p-button-success' onClick={handleCompleteTask} disabled={disabled} />
                                  )}  
                                  <Button label="Карта" severity="secondary" onClick={() => navigate(`/map/${id}`)} style={{ marginLeft: '1rem' }}/>
                            </div>
                       </div>

                    </div>
                </Card>
            </div>
            <DecodeDialog visible={showDialog} handleCloseDialog={() => setShowDialog(false)}/>
            <OxigenDialog visible={showOxigenDialog} handleCloseDialog={() => setShowOxigenDialog(false)}/>
            <BatteryDialog visible={showBatteryDialog} handleCloseDialog={() => setShowBatteryDialog(false)}/>
            <NavigationDialog visible={showNavDialog} handleCloseDialog={() => setShowNavDialog(false)}/>
            <ConnectionDialog visible={showConnectionDialog} handleCloseDialog={() => setShowConnectionDialog(false)}/>
            <FinalQuestDialog visible={showFinalDialog} handleCloseDialog={() => setShowFinalDialog(false)}/>
        </div>
    );
}