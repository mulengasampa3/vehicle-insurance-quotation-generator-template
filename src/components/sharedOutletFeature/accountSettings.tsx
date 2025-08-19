import React, { useState } from 'react';

const AccountSettings: React.FC = () => {
    const tabs = [
        'My Profile',
        'Security',
        'Teams',
        'Delete Account',
    ];

    const [activeTab, setActiveTab] = useState('My Profile');

    return (
        <div className="flex flex-col md:flex-row h-full w-full bg-gray-100 rounded-lg overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-[240px] bg-white dark:bg-[#2a2a2a]">
                <ul className="">
                    {tabs.map((tab) => (
                        <li key={tab}>
                            <button
                                onClick={() => setActiveTab(tab)}
                                className={`w-full bg-white dark:bg-[#2a2a2a] dark:border-62 border-b border-x h-[60px] text-left px-4 py-2 text-sm transition-colors ${activeTab === tab
                                    ? 'bg-blue-100 text-blue-700 font-semibold'
                                    : 'text-gray-700 dark:text-white hover:bg-gray-100'
                                    } ${tab === 'Delete Account'
                                        ? 'text-red-500 dark:text-red-500 hover:bg-red-50'
                                        : ''
                                    }`}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <section className="flex-1 dark:bg-[#2a2a2a] dark:border-62 border-b border-x bg-white p-6 overflow-y-auto">
                {activeTab === 'My Profile' && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4 uppercase dark:text-white">My Profile</h3>

                        {/* Profile Card */}
                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src="https://i.pravatar.cc/100"
                                alt="Profile"
                                className="w-[180px] h-[180px] rounded-full"
                            />
                            <div>
                                <h4 className="text-lg font-medium dark:text-white">Pantumba Zulu</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Team Manager</p>
                                <p className="text-sm text-gray-500 dark:text-gray-600">Lusaka, Zambia</p>
                            </div>
                            <button className="text-62 px-4 rounded-md bg-dc hover:underline text-sm">
                                ✎ Edit
                            </button>
                        </div>

                        {/* Personal Info */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <h5 className="font-medium text-gray-700 dark:text-white">Personal Information</h5>
                                <button className="text-62 px-4 rounded-md bg-dc hover:underline text-sm">
                                    ✎ Edit
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">First Name</p>
                                    <p className="font-medium text-gray-700 dark:text-gray-600">Pantumba</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">Last Name</p>
                                    <p className="font-medium text-gray-700 dark:text-gray-600">Zulu</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">Email address</p>
                                    <p className="font-medium text-gray-700 dark:text-gray-600">patumba1234@gmail.com</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">Phone</p>
                                    <p className="font-medium text-gray-700 dark:text-gray-600">+260760670312</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">Bio</p>
                                    <p className="font-medium text-gray-700 dark:text-gray-600">Sales Assistant</p>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <div className="flex justify-between items-center mb-2"> 
                                <h5 className="font-medium text-gray-700 dark:text-white">Address</h5>
                                <button className="text-62 px-4 rounded-md bg-dc hover:underline text-sm">
                                    ✎ Edit
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">Country</p>
                                    <p className="font-medium text-gray-700 dark:text-gray-600">Zambia</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">City/State</p>
                                    <p className="font-medium text-gray-700 dark:text-gray-600">Lusaka Zambia</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">Postal Code</p>
                                    <p className="font-medium text-gray-700 dark:text-gray-600">00000</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">TAX ID</p>
                                    <p className="font-medium text-gray-700 dark:text-gray-600">AS45645756</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab !== 'My Profile' && (
                    <div className="text-center text-gray-500 text-sm mt-20">
                        <p>
                            <span className="font-semibold">{activeTab}</span> content coming
                            soon.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AccountSettings;
