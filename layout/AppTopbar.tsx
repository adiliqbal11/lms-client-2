import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '../types/types';
import { LayoutContext, useAppContext } from './context/layoutcontext';
import LoadingBar from 'react-top-loading-bar';


const AppTopBar = forwardRef<AppTopbarRef>((props, ref) => {
    const { pageLoader } = useAppContext()
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menuButtonRef = useRef(null);
    const topBarMenuRef = useRef(null);
    const topBarMenuButtonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menuButtonRef.current,
        topbarmenu: topBarMenuRef.current,
        topbarmenubutton: topBarMenuButtonRef.current
    }));

    return (
        <div className="layout-topbar">
            <LoadingBar
                color="#0000FF"
                progress={pageLoader?.pageLoading}
                onLoaderFinished={() => pageLoader?.setPageLoading(0)}
            />
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo.png`} alt="logo" />
            </Link>

            <button ref={menuButtonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topBarMenuButtonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>
            
            <div ref={topBarMenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
               <Link href="/lms/history">
                    <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-users"></i>
                        <span>History</span>
                    </button>
                    <strong>Ali Usama</strong>
                </Link>
            </div>
        </div>
    );
});

AppTopBar.displayName = 'AppTopBar';

export default AppTopBar;
