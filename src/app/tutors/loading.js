import React from 'react';
import { Spinner } from '@heroui/react';

const TutorsLoading = () => {
    return (
        <div className="flex flex-col items-center gap-2 py-10">
            Loading all tutors...
            <Spinner color="warning" />
            <span className="text-xs text-muted">Fetching Tutors</span>
        </div>
    );
};

export default TutorsLoading;