import './social.css'
import React, { useCallback } from 'react'
import instagram from '../images/social/instagram.svg';
import instagram2 from '../images/social/instagram2.svg';
import twitter from '../images/social/twitter.svg';
import threads from '../images/social/threads.svg';
import mastodon from '../images/social/mastodon.svg';
import github from '../images/social/github.svg';
import bluesky from '../images/social/bluesky.svg';
import { Award, GetGlobalActivityStore, useUnlockedAwards } from './activityStore';
import HScroll from './hscroll.jsx';
import { runWhenTabVisible } from './utils';

const SOCIAL_LINK_COINS = 2;

interface SocialLink {
    name: string;
    image: string;
    url: string;
}

const links: SocialLink[] = [
    {
        name: "Twitter",
        image: twitter,
        url: "https://twitter.com/nateparrott"
    },
    {
        name: "Instagram",
        image: instagram,
        url: "https://www.instagram.com/nate_loved_an_image/"
    },
    {
        name: "GitHub",
        image: github,
        url: "https://github.com/nate-parrott"
    },
    {
        name: "Bluesky",
        image: bluesky,
        url: "https://bsky.app/profile/nateparrott.bsky.social"
    },
    {
        name: "3D Instagram",
        image: instagram2,
        url: "https://www.instagram.com/nate_loved_a_movie/"
    },
    {
        name: "Threads",
        image: threads,
        url: "https://www.threads.net/@nate_loved_an_image"
    },
    {
        name: "Mastodon",
        image: mastodon,
        url: "https://mstdn.social/@nate"
    },
];

function awardFromSocialLink(link: SocialLink): Award {
    return {
        id: `social-${link.name.toLowerCase()}-click`,
        name: link.name,
        coins: SOCIAL_LINK_COINS,
        activityText: `Thanks for visiting my ${link.name} page!`,
        category: 'social',
        notification: { coinAnim: true }
    }
}

export default function Social() {
    // Don't call it `social` because it's blocked by some ad blockers 
    const unlocked = useUnlockedAwards()
    return (
        <div className='section on-other-websites'>
            <div className='readable-width'>
                <h3>Hate this website?</h3>
                <p>
                    Follow me on a different dopamine-crushing metrics-driven site instead. These links open in a new tab but you’ll collect 2 coins for each one you click!               
                </p>
                <HScroll>
                    {links.map(link => (
                        <SocialLink key={link.name} link={link} unlocked={!!unlocked[awardFromSocialLink(link).id]} />
                    ))}
                </HScroll>
            </div>
        </div>
    )
}

interface SocialLinkProps {
    link: SocialLink;
    unlocked: boolean;
}

function SocialLink(props: SocialLinkProps) {
    const { link, unlocked } = props;

    const onClick = useCallback(() => {
        if (!unlocked) {
            setTimeout(() => {
                runWhenTabVisible(() => {
                    GetGlobalActivityStore().unlockAward(awardFromSocialLink(link));
                });
            }, 500);
        }
    }, [unlocked, link]);

    return (
        <a href={link.url} onClick={onClick} target="_blank" rel="noopener noreferrer" className={`socialLink ${unlocked ? 'unlocked' : ''}`}>
            <img src={link.image} alt={""} />
            <div className='name'>{link.name}</div>
            <div className='subtitle'>{ unlocked ? "Unlocked" : "Unlock" } </div>
        </a>
    )
}
