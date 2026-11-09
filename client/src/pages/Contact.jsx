import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaUserShield, FaHeadset } from 'react-icons/fa';

const contactCards = [
    {
        title: 'User Support',
        icon: FaHeadset,
        rows: [
            { label: 'Email', value: 'support@eventora.com', icon: FaEnvelope },
            { label: 'Phone', value: '+91 98765 43210', icon: FaPhoneAlt },
            { label: 'Hours', value: 'Mon - Sat, 9:00 AM - 6:00 PM', icon: FaClock },
            { label: 'Address', value: 'Eventora Help Desk, 12 MG Road, Bengaluru, Karnataka 560001', icon: FaMapMarkerAlt },
        ],
    },
    {
        title: 'Admin / Event Organizer Desk',
        icon: FaUserShield,
        rows: [
            { label: 'Email', value: 'admin@eventora.com', icon: FaEnvelope },
            { label: 'Phone', value: '+91 91234 56789', icon: FaPhoneAlt },
            { label: 'Hours', value: 'Mon - Fri, 10:00 AM - 5:00 PM', icon: FaClock },
            { label: 'Address', value: 'Eventora Admin Office, 45 Residency Road, Bengaluru, Karnataka 560025', icon: FaMapMarkerAlt },
        ],
    },
];

const Contact = () => (
    <div className="max-w-6xl mx-auto">
        <div className="bg-black text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Contact Us</h1>
            <p className="text-gray-300">We're here to help with bookings, events and account questions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactCards.map(({ title, icon: CardIcon, rows }) => (
                <div key={title} className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 hover:-translate-y-1 transition duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-900 flex items-center justify-center">
                            <CardIcon />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    </div>
                    <div className="space-y-5">
                        {rows.map(({ label, value, icon: Icon }) => (
                            <div key={label} className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-900 flex items-center justify-center shrink-0">
                                    <Icon />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-400 uppercase">{label}</p>
                                    <p className="font-bold text-gray-800">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <p className="text-gray-500 text-sm mt-6 text-center">These are demo contact details for this project.</p>
    </div>
);

export default Contact;
