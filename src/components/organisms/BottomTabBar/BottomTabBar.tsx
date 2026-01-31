import React, { useState } from 'react';
import { AiChatModal } from '../AiChatModal/AiChatModal';
import { LiquidTabBar } from './LiquidTabBar';

export const BottomTabBar = (props: any) => {
    const [isChatVisible, setChatVisible] = useState(false);

    return (
        <>
            <LiquidTabBar
                {...props}
                onChatPress={() => setChatVisible(true)}
            />
            <AiChatModal
                visible={isChatVisible}
                onClose={() => setChatVisible(false)}
            />
        </>
    );
};