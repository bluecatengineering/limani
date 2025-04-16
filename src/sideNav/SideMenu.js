/*
Copyright 2023-2025 BlueCat Networks Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import { t } from '@bluecateng/l10n.macro';
import { Layer, SideNav } from '@bluecateng/pelagos';
import { useCallback, useEffect, useRef, useState } from 'react';
import usePlatformData from '../hooks/usePlatformData';
import Category from './Category';
import './SideMenu.less';
import SideMenuCategoryButton from './SideMenuCategoryButton';
import SideMenuHeader from './SideMenuHeader';
import SideNavMenuItem from './SideNavMenuItem';

const isCurrentPathOfCategory = (pathname, category) => {
    const flattenedNavLinks = category?.reduce((acc, link) => {
        if (link.href === pathname) {
            return true;
        }
        if (link.children) {
            return acc || isCurrentPathOfCategory(pathname, link.children);
        }
        return acc;
    }, false);
    return flattenedNavLinks;
};

const getStates = () =>
    JSON.parse(sessionStorage.getItem('gw-leftnav-states')) ?? {};

const saveStates = (states) =>
    sessionStorage.setItem('gw-leftnav-states', JSON.stringify(states));

const SideMenu = () => {
    const [currentCategoryKey] = useState(null);
    const [expandedCategoryKey, setExpandedCategoryKey] = useState(null);
    const animationRef = useRef(null);
    const menuRef = useRef(null);
    const [, setOpen] = useState(getStates());
    const { data } = usePlatformData();
    const homeUrl = data?.user?.home_url;
    const landingPageActivated = ![null, '', '/', '/home', undefined].includes(
        homeUrl,
    );
    const { custom_workflows: customWorkflows, default_workflows: settings } =
        data?.user?.nav_links || {
            'custom_workflows': [],
            'default_workflows': [],
        };
    const customWorkflowsActivated = isCurrentPathOfCategory(
        window.location.pathname,
        customWorkflows,
    );
    const settingsActivated = isCurrentPathOfCategory(
        window.location.pathname,
        settings,
    );

    useEffect(() => {
        if (menuRef?.current) {
            animationRef?.current?.pause();
            const currentTime = animationRef?.current?.currentTime ?? 0;
            animationRef.current =
                menuRef.current.animate(
                    [
                        { transform: 'translateX(-100%)' },
                        { transform: 'translateX(0)' },
                    ],
                    {
                        duration: 250,
                        fill: 'both',
                        easing: 'ease-out',
                    },
                ) ?? null;

            animationRef.current.pause();
            animationRef.current.currentTime = currentTime;
            if (currentTime !== 250 && expandedCategoryKey) {
                animationRef.current.play();
            }
        }
    }, [expandedCategoryKey]);

    const handleCategoryButtonChange = useCallback(
        (categoryKey) => {
            if (expandedCategoryKey === categoryKey && animationRef?.current) {
                animationRef.current.onfinish =
                    animationRef.current.playbackRate > 0
                        ? () => {
                              setExpandedCategoryKey(null);
                          }
                        : null;
                document
                    .getElementById(Category[categoryKey].buttonId)
                    ?.focus();
                animationRef.current.reverse();
            } else {
                setExpandedCategoryKey(categoryKey);
            }
        },
        [expandedCategoryKey],
    );

    const handleClick = useCallback(
        (event) => {
            const target = event.target;
            const item = target.closest('[data-state-key]');
            if (!item) {
                // Only groups have a state key.
                return;
            }
            const key = item.getAttribute('data-state-key');
            if (!key) {
                // Only groups have a state key.
                return;
            }
            const expanded = item.getAttribute('aria-expanded') === 'true';

            item.setAttribute('aria-expanded', !expanded);
            const states = getStates();
            states[key] = !expanded;
            saveStates(states);
            setOpen((open) => ({ ...open, [key]: !expanded }));
        },
        [handleCategoryButtonChange, expandedCategoryKey],
    );

    const handleKeyDown = useCallback(
        (event) => {
            if (
                event.code === 'Escape' &&
                expandedCategoryKey &&
                // Only close the menu if the menu is not already closing
                (animationRef?.current?.playState !== 'running' ||
                    animationRef?.current?.playbackRate > 0)
            ) {
                handleCategoryButtonChange(expandedCategoryKey);
            }
        },
        [handleCategoryButtonChange, expandedCategoryKey],
    );

    return (
        <div className='SideMenu' data-theme='dark'>
            <div className='SideMenu__categories' aria-label={t`Side menu`}>
                {landingPageActivated && (
                    <SideMenuCategoryButton
                        {...Category['Home']}
                        href={homeUrl}
                        current={homeUrl === window.location.pathname}
                    />
                )}
                <SideMenuCategoryButton {...Category['Workflows']} />
                <div key={'CustomWorkflows'}>
                    <SideMenuCategoryButton
                        {...Category['CustomWorkflows']}
                        current={customWorkflowsActivated}
                        expanded={'CustomWorkflows' === expandedCategoryKey}
                        toggleMenu={() =>
                            handleCategoryButtonChange('CustomWorkflows')
                        }
                    />
                    {(expandedCategoryKey === 'CustomWorkflows' ||
                        (!expandedCategoryKey &&
                            currentCategoryKey === 'CustomWorkflows')) && (
                        <Layer>
                            <SideNav
                                id='secondaryNavigation'
                                className='SideMenu__secondaryNavigation'
                                active={!!expandedCategoryKey}
                                aria-label={Category['CustomWorkflows'].title}
                                ref={expandedCategoryKey ? menuRef : undefined}
                                onClick={handleClick}
                                onKeyDown={handleKeyDown}>
                                <SideMenuHeader
                                    {...Category['CustomWorkflows']}
                                />
                                <SideNavMenuItem items={customWorkflows} />
                            </SideNav>
                        </Layer>
                    )}
                </div>
                <div
                    key={'Settings'}
                    className={'SideMenu__categories__fromBottom'}>
                    <SideMenuCategoryButton
                        {...Category['Settings']}
                        current={settingsActivated}
                        expanded={'Settings' === expandedCategoryKey}
                        toggleMenu={() =>
                            handleCategoryButtonChange('Settings')
                        }
                    />
                    {(expandedCategoryKey === 'Settings' ||
                        (!expandedCategoryKey &&
                            currentCategoryKey === 'Settings')) && (
                        <Layer>
                            <SideNav
                                id='secondaryNavigation'
                                className='SideMenu__secondaryNavigation'
                                active={!!expandedCategoryKey}
                                aria-label={Category['Settings'].title}
                                ref={expandedCategoryKey ? menuRef : undefined}
                                onClick={handleClick}
                                onKeyDown={handleKeyDown}>
                                <SideMenuHeader {...Category['Settings']} />
                                <SideNavMenuItem items={settings} />
                            </SideNav>
                        </Layer>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
