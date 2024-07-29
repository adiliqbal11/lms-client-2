/* eslint-disable @next/next/no-img-element */
'use client';

import React, {useEffect, useState } from 'react';
import {  useAppContext } from '../../layout/context/layoutcontext';
import fetchDashboardInsightsHandler from '../context/server/insights/fetchDashboardInsights';
import { DashboardInsights } from '../shared/types';

const Dashboard = () => {
    const g = useAppContext();
    const [dashboardInsights, setDashboardInsights] = useState({
        totalGrades: 0,
        totalQuestions: 0,
        totalSchools: 0,
        totalSubjects: 0,   
        totalSubTopics: 0,
        totalTopics: 0,
    } as DashboardInsights);
    const fetchDashboardInsights = async () => {
        try {
            const response = await fetchDashboardInsightsHandler();
            if (response?.status) {
                setDashboardInsights(response?.result?.data as DashboardInsights);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Dashboard Insights" });
        }
    }
    useEffect(() => {
        fetchDashboardInsights()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Schools</span>
                            <div className="text-900 font-medium text-xl">{dashboardInsights?.totalSchools}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Grades</span>
                            <div className="text-900 font-medium text-xl">{dashboardInsights?.totalGrades}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-map-marker text-orange-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                        <span className="block text-500 font-medium mb-3">Subjects</span>
                            <div className="text-900 font-medium text-xl">{dashboardInsights?.totalSubjects}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-inbox text-cyan-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Topics</span>
                            <div className="text-900 font-medium text-xl">{dashboardInsights?.totalTopics}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-comment text-purple-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Sub Topics</span>
                            <div className="text-900 font-medium text-xl">{dashboardInsights?.totalSubTopics}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-comment text-purple-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Questions</span>
                            <div className="text-900 font-medium text-xl">{dashboardInsights?.totalQuestions}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-comment text-purple-500 text-xl" />
                        </div>
                    </div>
                    {/* <span className="text-green-500 font-medium">85 </span>
                    <span className="text-500">responded</span> */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
