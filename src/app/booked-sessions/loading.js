import React from 'react';
import { Spinner } from '@heroui/react';

const MyBookedSessionsLoading = () => {
    return (
        <div className="flex flex-col items-center gap-2 py-10">
            Loading my booked sessions...
            <Spinner color="warning" />
            <span className="text-xs text-muted">Fetching my booked sessions</span>
        </div>
    );
};

export default MyBookedSessionsLoading;