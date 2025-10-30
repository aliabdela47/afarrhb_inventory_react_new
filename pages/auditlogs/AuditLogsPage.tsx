import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import { auditLogsApi } from '../../services/api';
import { AuditLog } from '../../types';

const AuditLogsPage = () => {
    const navigate = useNavigate();
    const [logs, setLogs] = useState<AuditLog[]>([]);
    
    useEffect(() => {
        auditLogsApi.getAll().then(setLogs);
    }, []);

    const columns = [
        { header: 'User', accessor: 'user' as keyof AuditLog, sortable: true },
        { header: 'Action', accessor: 'action' as keyof AuditLog, sortable: true },
        { header: 'Entity', accessor: 'entity' as keyof AuditLog, sortable: true },
        { header: 'Entity ID', accessor: 'entityId' as keyof AuditLog, sortable: true },
        { header: 'Timestamp', accessor: (log: AuditLog) => new Date(log.timestamp).toLocaleString(), sortable: true },
    ];

    return (
        <div>
            <PageHeader
                title="Audit Logs"
                breadcrumbs={[{ name: 'Administration', href: '/audit-logs' }, { name: 'Audit Logs', href: '/audit-logs' }]}
            />
            <DataTable columns={columns} data={logs} />
        </div>
    );
};

export default AuditLogsPage;
