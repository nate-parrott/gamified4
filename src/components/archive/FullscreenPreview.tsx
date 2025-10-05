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
    // const firedAdditionalTapYet = useRef(false);

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

    useMultitouchGesture({
        ref: hoverRef,
        handleSingleFingerPress: (e: TouchEvent) => {
            const rect = hoverRef.current?.getBoundingClientRect();
            if (!rect) return;
            const y = (e.touches[0].clientY - rect.top) / rect.height;
            setHoveredItemBasedOnFractionalYPosition(y);
            setTriggeredByHover(true);
        },
        handleSecondaryTap: additionalFingerTapHandler,
        handleTouchEnd: () => {
            setHoveredItem(null);
        },
    });

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

        // const handleTouchStart = (e: TouchEvent) => {
        //     // Prevent page scroll while interacting
        //     e.preventDefault();

        //     if (e.touches.length === 1) {
        //         const rect = element.getBoundingClientRect();
        //         const y = (e.touches[0].clientY - rect.top) / rect.height;
        //         setHoveredItemBasedOnFractionalYPosition(y);
        //         setTriggeredByHover(false);
        //         firedAdditionalTapYet.current = false;
        //     } else if (e.touches.length > 1) {
        //         // Second finger detected - trigger open in new tab
        //         if (!firedAdditionalTapYet.current) {
        //             firedAdditionalTapYet.current = true;
        //             additionalFingerTapHandler();
        //         }
        //     }
        // };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [setHoveredItemBasedOnFractionalYPosition, additionalFingerTapHandler, active]);

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

    const hint = triggeredByHover ? 'Mouse left to exit' : 'Tap with another finger to open in new tab';
    // const text = `${item.name}: ${hint}`;

    return (
        <div 
            className="fullscreen-preview" 
            onClick={handleClick}
            style={{ cursor: triggeredByHover ? 'pointer' : 'default' }}
        >
            <ContentPreview item={item} />

            <PostItNote text={hint} style={{ left: `1em`, bottom: `-80px` }} />
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

interface MultitouchGestureProps {
    ref: React.RefObject<HTMLDivElement>;
    handleSingleFingerPress: (e: TouchEvent) => void; // initial and move
    handleSecondaryTap: () => void;
    handleTouchEnd: () => void;
}

function useMultitouchGesture({ref, handleSingleFingerPress, handleSecondaryTap, handleTouchEnd}: MultitouchGestureProps) {
    // Install a touchstart and touchmove on the ref, and a touchend on the document
    const firstTouchId = useRef<number | null>(null);

    const [isPressed, setIsPressed] = useState(false);

    const touchStartHandler = useCallback((e: TouchEvent) => {
        console.log('touchStartHandler');
        e.preventDefault();
        e.stopPropagation();
        setIsPressed(true);
        if (firstTouchId.current === null) {
            // First touch
            firstTouchId.current = e.changedTouches[0].identifier;
            handleSingleFingerPress(e);
        } else {
            handleSecondaryTap();
        }
    }, [handleSingleFingerPress, handleSecondaryTap]);

    const touchMoveHandler = useCallback((e: TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleSingleFingerPress(e);
        // if (firstTouchId.current === e.changedTouches[0].identifier) {
        //     handleSingleFingerPress(e);
        // }
    }, [handleSingleFingerPress]);

    const touchEndHandler = useCallback((e: TouchEvent) => {
        if (e.touches.length === 0) {
            // no more touches
            firstTouchId.current = null;
            handleTouchEnd();
            setIsPressed(false);
        }
    }, [handleTouchEnd]);

    const touchCancelHandler = useCallback((e: TouchEvent) => {
        firstTouchId.current = null;
        handleTouchEnd();
        setIsPressed(false);
    }, [handleTouchEnd]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        element.addEventListener('touchstart', touchStartHandler, { passive: false });
        element.addEventListener('touchmove', touchMoveHandler, { passive: false });
        document.addEventListener('touchend', touchEndHandler);
        document.addEventListener('touchcancel', touchCancelHandler);
        return () => {
            element.removeEventListener('touchstart', touchStartHandler);
            element.removeEventListener('touchmove', touchMoveHandler);
            document.removeEventListener('touchend', touchEndHandler);
            document.removeEventListener('touchcancel', touchCancelHandler);
        };
    }, [ref, touchStartHandler, touchMoveHandler, touchEndHandler, touchCancelHandler]);

    // useEffect(() => {
    //     // If isPressed, install global touch handler to handler additional taps anywhere onscreen
    //     if (!isPressed) return;

    //     document.addEventListener('touchstart', touchStartHandler, { passive: false, capture: true });
    //     return () => {
    //         document.removeEventListener('touchstart', touchStartHandler, { capture: true });
    //     };
    // }, [isPressed, touchStartHandler]);
}
