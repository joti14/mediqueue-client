import React from 'react';
import { Spinner } from '@heroui/react';

const MyTutorsLoading = () => {
    return (
        <div className="flex flex-col items-center gap-2 py-10">
            Loading my tutors...
            <Spinner color="warning" />
            <span className="text-xs text-muted">Fetching tutos list</span>
        </div>
    );
};

export default MyTutorsLoading;