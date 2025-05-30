import React from 'react';

const AccountDetails = ({ profile, onChangeClick }) => {
    if (!profile) return null;

    return (
        <div className="rounded-lg shadow-md mb-6 border border-primary-lighter">
            <div className='p-4 bg-primary-lightest border-b border-primary-lighter rounded-t-md'>
                <h2 className="font-semibold">Account Information</h2>
            </div>
            <div className="flex justify-between items-center p-4">
                <div className='flex flex-col gap-1'>
                    <p className='font-medium'>{profile.firstName} {profile.lastName}</p>
                    <p>{profile.email}</p>
                </div>
                <button
                    onClick={onChangeClick}
                    className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all duration-300"
                >
                    Change
                </button>
            </div>
        </div>
    );
};

export default AccountDetails;