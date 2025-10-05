import React, { useCallback, useEffect, useRef, useState } from "react";
import { useArchiveData } from "./useArchiveData";
import { ArchiveItem } from "./types";
import { PostItNote } from "./Archive";

export function useFullscreenPreviewPresenter(active: boolean): {hoverRef: React.RefObject<HTMLDivElement>, preview: React.ReactNode | null} {
    const {allItems} = useArchiveData();
    const renderableItems = allItems.filter(i => i.type === 'file' && (i.fileType === 'image' || i.fileType === 'video'));
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const [triggeredByHover, setTriggeredByHover] = useState(false);
    const hoverRef = useRef<HTMLDivElement>(null);
    const firedAdditionalTapYet = useRef(false);

    useEffect(() => {
        if (!active) {
            setHoveredItem(null);
            setTriggeredByHover(false);
        }
    }, [active]);

    const setHoveredItemBasedOnFractionalYPosition = useCallback((y: number) => {
        const itemIndex = Math.floor(y * renderableItems.length);
        if (itemIndex < 0 || itemIndex >= renderableItems.length) {
            setHoveredItem(null);
            return;
        }
        setHoveredItem(itemIndex);
    }, [renderableItems]);

    const additionalFingerTapHandler = useCallback(() => {
        console.log('additionalFingerTapHandler');
        if (hoveredItem !== null) {
            openItemInNewTab(renderableItems[hoveredItem]);
        }
    }, [hoveredItem, renderableItems]);

    useEffect(() => {
        const element = hoverRef.current;
        if (!element || !active) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const y = (e.clientY - rect.top) / rect.height;
            setHoveredItemBasedOnFractionalYPosition(y);
            setTriggeredByHover(true);
        };

        const handleMouseLeave = () => {
            setHoveredItem(null);
        };

        const handleTouchStart = (e: TouchEvent) => {
            // Prevent page scroll while interacting
            e.preventDefault();
            
            if (e.touches.length === 1) {
                const rect = element.getBoundingClientRect();
                const y = (e.touches[0].clientY - rect.top) / rect.height;
                setHoveredItemBasedOnFractionalYPosition(y);
                setTriggeredByHover(false);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            // Prevent page scroll while scrubbing
            e.preventDefault();
            
            if (e.touches.length === 1) {
                const rect = element.getBoundingClientRect();
                const touch = e.touches[0];
                
                // Check if touch is outside the drawer bounds
                if (touch.clientX < rect.left || touch.clientX > rect.right ||
                    touch.clientY < rect.top || touch.clientY > rect.bottom) {
                    // Touch left the drawer, dismiss immediately
                    setHoveredItem(null);
                    return;
                }
                
                const y = (touch.clientY - rect.top) / rect.height;
                setHoveredItemBasedOnFractionalYPosition(y);
                setTriggeredByHover(false);
            } else if (e.touches.length > 1) {
                // Additional finger tap
                if (!firedAdditionalTapYet.current) {
                    firedAdditionalTapYet.current = true;
                    additionalFingerTapHandler();
                }
            }
        };

        const handleTouchEnd = () => {
            setHoveredItem(null);
            firedAdditionalTapYet.current = false;
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('touchstart', handleTouchStart);
        element.addEventListener('touchmove', handleTouchMove);
        element.addEventListener('touchend', handleTouchEnd);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
        };
    }, [setHoveredItemBasedOnFractionalYPosition, additionalFingerTapHandler]);

    const shouldInterceptClicks = active && hoveredItem !== null && triggeredByHover;
    useClickInterceptor(shouldInterceptClicks ? additionalFingerTapHandler : undefined);

    return {
        preview: hoveredItem && active ? <Preview item={renderableItems[hoveredItem]} triggeredByHover={triggeredByHover} /> : null,
        hoverRef,
    }
}

function useClickInterceptor(handler: (() => void) | undefined) {
    // console.log('useClickInterceptor', shouldIntercept);
    useEffect(() => {
        if (!handler) return;

        const handleClick = (e: MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            handler();
        };

        // Use capture phase to intercept before bubbling
        document.body.addEventListener('click', handleClick, true);
        
        return () => {
            document.body.removeEventListener('click', handleClick, true);
        };
    }, [handler]);
}

function Preview({item, triggeredByHover}: {item: ArchiveItem, triggeredByHover: boolean}) {
    const handleClick = (e: React.MouseEvent) => {
        if (triggeredByHover) {
            // Desktop mode: click opens in new tab
            e.stopPropagation();
            openItemInNewTab(item);
        }
        // Touch mode: handled by touch events, so click does nothing
    };

    const hint = triggeredByHover ? 'Click to open in new tab' : 'Tap with another finger to open in a new tab';
    const text = `${item.name}: ${hint}`;

    return (
        <div 
            className="fullscreen-preview" 
            onClick={handleClick}
            style={{ cursor: triggeredByHover ? 'pointer' : 'default' }}
        >
            <ContentPreview item={item} />

            <PostItNote text={text} style={{ left: `1em`, bottom: `-80px` }} />
        </div>
    );
}

function ContentPreview({item}: {item: ArchiveItem}) {
    if (item.fileType === 'video') {
        return (
            <video 
                src={'archive/' + item.path} 
                autoPlay 
                loop 
                muted 
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                }}
            />
        );
    } else if (item.fileType === 'image') {
        return (
            <img 
                src={'archive/' + item.path} 
                alt={item.name}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center'
                }}
            />
        );
    }
    return null;
}

function openItemInNewTab(item: ArchiveItem) {
    window.open('archive/' + item.path, '_blank');
}
