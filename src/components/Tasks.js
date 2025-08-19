import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import { mockTasks } from '../mocks';

export function Tasks() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const saved = JSON.parse(window.localStorage.getItem('mocks'));
            if (Array.isArray(saved) && saved.length > 0) {
                setTasks(saved);
            } else {
                setTasks(mockTasks);
                window.localStorage.setItem('mocks', JSON.stringify(mockTasks));
            }
        } catch (error) {
            setTasks(mockTasks);
            window.localStorage.setItem('mocks', JSON.stringify(mockTasks));
        }
    }, [])

    const handleTaskClick = (event) => {
        const taskId = event.data.id;
        navigate(`/tasks/${taskId}`);
    };

    const statusBodyTemplate = (rowData) => {
        const statusClass = rowData.status === 'Виконано' ? 'p-button-success' : 
                            rowData.status === 'Виконується' ? 'p-button-warning' : 'p-button-secondary';
        const statusIcon = rowData.status === 'Виконано' ? 'pi pi-check-circle' : 
                            rowData.status === 'Виконується' ? 'pi pi-spin pi-spinner' : null;
        return <Button label={rowData.status} text className={statusClass} size="small" icon={statusIcon} />;
    };

    return (
        <div className="task-container">
            <div className="content-wrapper">
                <Card className="dark-card" title="Список завдань">
                    <div className="card-content">                        
                        <DataTable 
                            value={tasks || []} 
                            className="dark-datatable"
                            stripedRows
                            showGridlines
                            onRowClick={handleTaskClick}
                            selectionMode="single"
                            rows={10}
                        >
                            <Column field="id" header="ID" style={{ width: '10%' }} />
                            <Column field="name" header="Назва" style={{ width: '40%' }} />
                            <Column field="status" header="Статус" body={statusBodyTemplate} style={{ width: '25%' }} />
                        </DataTable>
                    </div>
                </Card>
            </div>
        </div>
    );
}

