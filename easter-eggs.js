//  Script:   easter-eggs.js
//  Version:  1.4.4
//  Dated:    2025-08-18
//  Function: Handles all dynamic style and content enhancements.
//  This script performs three main functions:
//
//  1. It checks the current date and, if it matches a special
//     occasion, it can override the site’s logo, link color, inject
//     custom CSS, or display a specific quote.
//  2. It updates the copyright year in the footer to the current year.
//  3. If no specific quote is set for the day, it displays a random one.

function getRandomQuote() {
    const quotes = [
        '<a class="link-shy" href="https://memory-alpha.fandom.com/wiki/Rules_of_Acquisition">Rule of Acquisition</a> 190: “Hear all, trust nothing”',
        '<a class="link-shy" href="https://www.youtube.com/watch?v=m9joBLOZVEo"><code>10 PRINT CHR$(205.5+RND(1)); : GOTO 10</code></a>',
        '<em title="“Always the same”">“Semper Idem”</em>',
        '<em title="“Listen, watch, be still”">“Aude, Vide, Sile”</em>',
        '<em title="“They lived”">“Vixere”</em>',
        '<em title="“Where are we marching?”">“Quo Vadimus?”</em>',
        '<span title="“Remember you are free”">𝖒𝖊𝖒𝖊𝖓𝖙𝖔 𝖑𝖎𝖇𝖊𝖗</span>',
        '<span title="“Remember you must die”">𝖒𝖊𝖒𝖊𝖓𝖙𝖔 𝖒𝖔𝖗𝖎</span>',
        '<svg width="1em" height="1em" style="vertical-align:-0.125em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' + '<path d="m23 12-2.44-2.78 0.34-3.68-3.61-0.82-1.89-3.18-3.4 1.46-3.4-1.46-1.89 3.18-3.61 0.81 0.34 3.68-2.44 2.79 2.44 2.78-0.34 3.69 3.61 0.82 1.89 3.18 3.4-1.47 3.4 1.46 1.89-3.18 3.61-0.82-0.34-3.68zm-13 5-4-4 1.41-1.41 2.59 2.58 6.59-6.59 1.41 1.42z" fill="currentColor"/>' + '</svg>&nbsp;Shitposting since 1997',
        'A Controlled Descent',
        'I’m Sorry You Can’t Take a Joke',
        'Live Free or Die',
        'Not Nice But Kind',
        '“Arrakis teaches the attitude of the knife – chopping off what’s incomplete and saying: ‘Now, it’s complete because it ended here.’&hairsp;”',
        '“Everyone With a Heart Votes Love”',
        '“Forty-two,” said Deep Thought, with infinite majesty and calm.',
        '“HEAL FROM WHAT I SAID OR STAY MAD”',
        '“Monsters in the Parasol”',
        '“Nothing Good Comes Easy”',
        '“Short Words in Simple Sentences”',
        '“Show Your Bones”',
        '“State the problem in words as clearly as possible”<br/><em>(A stolen <a class="link-shy" href="https://en.wikipedia.org/wiki/Oblique_Strategies">Oblique Strategy</a>)</em>',
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// --- Master Configuration Object (Single Source of Truth) ---
const specialDateConfig = {
    '01-01': { quote: 'Happy New Year' },
    '01-10': { quote: '<em title="The die is cast">“Alea Jacta Est”</em>' },
    '03-09': {
        quote: '<a href="https://www.youtube.com/watch?v=ZyhrYis509A" class="link-shy">“Come on, Barbie, let’s go party”</a>',
        customCSS: `:root { --colour-lime: #e0218a; } a { color: var(--colour-background); } a:active { color: var(--colour-background); } @media (prefers-color-scheme: dark) { a { color: var(--colour-text); } }`
    },
    '03-15': { quote: '<em title="“Even you, Brutus?”">“Et tu, Brute?”</em>' },
    '05-03': {
        quote: '<a href="https://iainplays.com" class="link-shy">Happy Birthday, Onion Samson</a>',
        color: '#ff7b00',
        fontLink: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Mono:wght@400&display=swap',
        customCSS: `:root { --font-body: "IBM Plex Sans", "Georgia", serif; --font-monospaced: "IBM Plex Mono", "Courier", monospace; --font-weight-bold: 700; }`
    },
    '10-31': { quote: 'Happy Halloween' },
    '11-20': {
        customCSS: `img { filter: grayscale(100%); } a { background-color: var(--colour-text); color: var(--colour-background); } a:active { background-color: transparent; color: var(--colour-text); } @media (prefers-color-scheme: dark) { a { background-color: var(--colour-text); color: var(--colour-background); } }`
    },
    '12-25': { quote: 'Merry Christmas' }
};

// --- Date Calculation (Done Once) ---
const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();
const dateKey = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
const todaysConfig = specialDateConfig[dateKey];

// --- Logic for Special Dates ---
if (todaysConfig) {
    if (todaysConfig.color) {
        document.documentElement.style.setProperty('--colour-lime', todaysConfig.color);
    }
    if (todaysConfig.fontLink) {
        const fontLink = document.createElement('link');
        fontLink.href = todaysConfig.fontLink;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
    }
    if (todaysConfig.customCSS) {
        const style = document.createElement('style');
        style.innerHTML = todaysConfig.customCSS;
        document.head.appendChild(style);
    }
    if (todaysConfig.titleHTML) {
        const siteTitleElement = document.getElementById('site-title');
        if (siteTitleElement) {
            siteTitleElement.innerHTML = todaysConfig.titleHTML;
        }
    }
}

// --- Logic for Copyright Year (Always Runs) ---
const currentYear = today.getFullYear();
// Logic for the element that ONLY shows the year
const copyrightYearOnly = document.getElementById('copyright-year');
if (copyrightYearOnly) {
    copyrightYearOnly.innerHTML = currentYear;
}
// Logic for the element that shows the symbol AND the year
const copyrightLink = document.getElementById('copyright-year-link');
if (copyrightLink) {
    copyrightLink.innerHTML = '© ' + currentYear;
}

// --- Logic for Quote ---
const quoteElement = document.getElementById('random-quote');
if (quoteElement) {
    // Use the special quote if it's defined for today, otherwise get a random one.
    quoteElement.innerHTML = (todaysConfig && todaysConfig.quote) ? todaysConfig.quote : getRandomQuote();
}
