import React, { useState } from 'react'; 
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

import {
    ResetDialog,
    OxigenDialog,
    BatteryDialog,
    AllertDialog,
    HelpDialog,
    NavigationDialog,
    FinalQuestDialog,
} from './Dialogs';

export function Navigation() {
    const navigate = useNavigate();
    const [showResetDialog, setShowResetDialog] = useState(false);
    const [showOxigenDialog, setShowOxigenDialog] = useState(false);
    const [showBatteryDialog, setShowBatteryDialog] = useState(false);
    const [showFinalDialog, setShowFinalDialog] = useState(false);
    const [showAirAllert, setShowAirAllert] = useState(false);
    const [showNeedHelpDialog, setShowHelpDialog] = useState(false);
    const [showNavDialog, setShowNavDialog] = useState(false);

    const items = [
        {
            label: 'Головна',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        {
            label: 'Завдання',
            icon: 'pi pi-list',
            command: () => navigate('/tasks')
        },
        {
            label: 'Карта місцевості',
            icon: 'pi pi-star',
            command: () => navigate('/map')
        },
        {
            label: 'Роміо',
            icon: 'pi pi-android',
            items: [
                {
                    label: 'Почати квест',
                    icon: 'pi pi-caret-right',
                    command: () => navigate('/tasks/1')
                },
                {
                    label: 'Перезапустити',
                    icon: 'pi pi-times-circle',
                    command: () => setShowResetDialog(true)
                },
                {
                    label: 'Заміна кисню',
                    command: () => setShowOxigenDialog(true)
                },
                {
                    label: 'Заміна батареї',
                    command: () => setShowBatteryDialog(true)
                },
                {
                    label: 'Навігація',
                    command: () => setShowNavDialog(true)

                },
                {
                    label: 'Метеорити',
                    command: () => setShowAirAllert(true)
                },
                {
                    label: 'SOS',
                    command: () => setShowHelpDialog(true)
                },
                {
                    label: 'Фінальний квест',
                    command: () => setShowFinalDialog(true)
                },

            ]
        }
    ];

    return (
        <div className="navigation-container">
            <Menubar model={items} className="dark-theme-menubar" />
            <ResetDialog visible={showResetDialog} handleCloseDialog={() => setShowResetDialog(false)}/>
            <OxigenDialog visible={showOxigenDialog} handleCloseDialog={() => setShowOxigenDialog(false)}/>
            <BatteryDialog visible={showBatteryDialog} handleCloseDialog={() => setShowBatteryDialog(false)}/>
            <FinalQuestDialog visible={showFinalDialog} handleCloseDialog={() => setShowFinalDialog(false)}/>
            <AllertDialog visible={showAirAllert} handleCloseDialog={() => setShowAirAllert(false)}/>
            <HelpDialog visible={showNeedHelpDialog} handleCloseDialog={() => setShowHelpDialog(false)}/>
            <NavigationDialog visible={showNavDialog} handleCloseDialog={() => setShowNavDialog(false)}/>
        </div>
    );
}

