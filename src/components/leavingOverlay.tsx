import React, { useEffect, useState, useCallback } from 'react';
import './leavingOverlay.css';
import leavingOverlaySvg from '../images/LeavingOverlay.svg';
import { GetGlobalActivityStore } from './activityStore';

const TOP_REGION_HEIGHT = 100; // pixels from top where we detect exit intent
const DISCOUNT_COINS = 10;
const DISCOUNT_AWARD_ID = 'leaving-overlay-discount';

export default function LeavingOverlay() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    const hasNeverWonSlotMachine = useCallback(() => {
        const store = GetGlobalActivityStore();
        // Check if user has never won (no awards with category 'slot-win')
        const neverWon = !Object.values(store.awards).some(award => award.category === 'slot-win');
        console.log('[LeavingOverlay] hasNeverWonSlotMachine:', neverWon, 'awards:', store.awards);
        return neverWon;
    }, []);

    const hasReceivedDiscount = useCallback(() => {
        const store = GetGlobalActivityStore();
        const received = store.hasAward(DISCOUNT_AWARD_ID);
        console.log('[LeavingOverlay] hasReceivedDiscount:', received);
        return received;
    }, []);

    const scrollToSlots = useCallback(() => {
        const slotsElement = document.getElementById('slot-machine');
        if (slotsElement) {
            slotsElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    const applyDiscount = useCallback(() => {
        const store = GetGlobalActivityStore();
        store.unlockAward({
            id: DISCOUNT_AWARD_ID,
            name: 'Leaving Bonus',
            coins: DISCOUNT_COINS,
            activityText: `🎁 Here's ${DISCOUNT_COINS} free coins for the slot machine!`,
            category: 'bonus',
            notification: { coinAnim: true }
        });
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (dismissed) return;

        let wasInTopRegion = false;

        const handleMouseMove = (e: MouseEvent) => {
            // Track if mouse is in the top region
            if (e.clientY < TOP_REGION_HEIGHT) {
                wasInTopRegion = true;
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            console.log('[LeavingOverlay] mouseleave event', { 
                clientY: e.clientY, 
                wasInTopRegion,
                dismissed 
            });
            
            // Only trigger if mouse was in top region and is leaving upward
            if (!wasInTopRegion) {
                console.log('[LeavingOverlay] skipping: mouse was not in top region');
                return;
            }
            if (e.clientY > 10) {
                console.log('[LeavingOverlay] skipping: mouse left from side/bottom, not top');
                return;
            }

            // Check conditions
            if (!hasNeverWonSlotMachine()) {
                console.log('[LeavingOverlay] skipping: user has already won slot machine');
                return;
            }
            if (hasReceivedDiscount()) {
                console.log('[LeavingOverlay] skipping: already received discount');
                return;
            }

            console.log('[LeavingOverlay] showing overlay!');
            // Show the overlay
            setVisible(true);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        console.log('[LeavingOverlay] event listeners attached');

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [dismissed, hasNeverWonSlotMachine, hasReceivedDiscount]);

    const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
        // Only dismiss if clicking the background, not the image
        if (e.target === e.currentTarget) {
            console.log('[LeavingOverlay] dismissed via background click');
            setVisible(false);
            setDismissed(true);
        }
    }, []);

    const handleImageClick = useCallback(() => {
        console.log('[LeavingOverlay] image clicked - scrolling to slots and applying discount');
        setVisible(false);
        setDismissed(true);
        scrollToSlots();
        applyDiscount();
    }, [scrollToSlots, applyDiscount]);

    if (!visible) return null;

    return (
        <div className="LeavingOverlay" onClick={handleBackgroundClick}>
            <div className="LeavingOverlay-content" onClick={handleImageClick}>
                <img src={leavingOverlaySvg} alt="Wait! Try the slot machine again!" />
            </div>
        </div>
    );
}

