//  Script:   easter-eggs.js
//  Version:  1.3
//  Dated:    2025-08-12
//  Replaces: special-dates.js, copyright-link.js, random-quote.js
//  Function: Handles all dynamic style and content enhancements.
//
//  This script performs three main functions:
//  1. It checks the current date and, if it matches a special
//     occasion, it can override the site’s logo, link color, inject
//     custom CSS, or display a specific quote.
//  2. It updates the copyright year in the footer to the current year.
//  3. If no specific quote is set for the day, it displays a random one.

// This function now only returns a random quote.
function getRandomQuote() {
    const quotes = [
        '<em title="“Always the same”">“Semper Idem”</em>',
        '<em title="“Listen, watch, be still”">“Aude, Vide, Sile”</em>',
        '<span title="“Remember you are free”">𝖒𝖊𝖒𝖊𝖓𝖙𝖔 𝖑𝖎𝖇𝖊𝖗</span>',
        '<span title="“Remember you must die”">𝖒𝖊𝖒𝖊𝖓𝖙𝖔 𝖒𝖔𝖗𝖎</span>',
        '<em title="“They lived”">“Vixere”</em>',
        '<em title="“Where are we marching?”">“Quo Vadimus?”</em>',
        'A Controlled Descent',
        'I’m Sorry You Can’t Take a Joke',
        'Live Free or Die',
        'Not Nice But Kind',
        '<a class="link-shy" href="https://memory-alpha.fandom.com/wiki/Rules_of_Acquisition">Rule of Acquisition</a> 190: “Hear all, trust nothing”',
        '“Arrakis teaches the attitude of the knife – chopping off what’s incomplete and saying: ‘Now, it’s complete because it ended here.’&hairsp;”',
        '“Everyone With a Heart Votes Love”',
        '“Forty-two,” said Deep Thought, with infinite majesty and calm.',
        '“HEAL FROM WHAT I SAID OR STAY MAD”',
        '“Monsters in the Parasol”',
        '“Nothing Good Comes Easy”',
        '“Short Words in Simple Sentences”',
        '“Show Your Bones”',
        '“State the problem in words as clearly as possible”<br/><em>(A stolen <a class="link-shy" href="https://en.wikipedia.org/wiki/Oblique_Strategies">Oblique Strategy</a>)</em>',
        '<svg width="1em" height="1em" style="vertical-align:-0.125em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="m23 12-2.44-2.78 0.34-3.68-3.61-0.82-1.89-3.18-3.4 1.46-3.4-1.46-1.89 3.18-3.61 0.81 0.34 3.68-2.44 2.79 2.44 2.78-0.34 3.69 3.61 0.82 1.89 3.18 3.4-1.47 3.4 1.46 1.89-3.18 3.61-0.82-0.34-3.68zm-13 5-4-4 1.41-1.41 2.59 2.58 6.59-6.59 1.41 1.42z" fill="currentColor"/>' +
        '</svg>&nbsp;Shitposting since 1997'
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}


document.addEventListener('DOMContentLoaded', function() {

    // --- Master Configuration Object (Single Source of Truth) ---
    const specialDateConfig = {
        '01-01': { quote: 'Happy New Year' },
        '01-10': { quote: '<em title="The die is cast">“Alea Jacta Est”</em>' },
        '03-09': { quote: '<a href="https://www.youtube.com/watch?v=ZyhrYis509A" class="link-shy">“Come on, Barbie, let’s go party”</a>',
                   customCSS: `
                    /* On Barbie’s birthday, the link colours is
                     * changed to ‘Barbie Pink’ and the link style
                     * is changed to ensure it works: the link is
                     * white text on Barbie Pink background for
                     * better contrast and a more ‘Barbie’ look.      */
                    :root { --colour-lime: #e0218a; }
                    a { color: var(--colour-background); }
                    a:active { color: var(--colour-background); }
                    a svg { margin-top: 1rem; }
                    @media (prefers-color-scheme: dark) { 
                        a { color: var(--colour-text); }
                    }
                `,
                titleHTML: `
                    <a href="https://koralatov.com/">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="198pt" viewBox="0 0 395 99" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,99.000000) scale(0.100000,-0.100000)" fill="#e0218a" stroke="none">
                                <path d="M620 955 c-30 -32 -32 -85 -5 -117 11 -13 -10 5 -46 40 l-66 63 -69 -3 -69 -3 0 -159 0 -159 -87 -23 c-142 -38 -210 -81 -247 -157 -27 -57 -28 -144 -2 -195 24 -45 174 -194 218 -216 66 -33 170 -13 212 40 17 22 27 24 95 24 54 0 76 4 77 13 0 6 0 51 -1 99 l-1 87 82 -84 c88 -91 127 -115 183 -115 41 0 76 28 76 61 0 19 1 19 33 -4 104 -79 231 -85 325 -17 l40 28 33 -34 c31 -32 37 -34 98 -34 l66 0 0 168 c0 161 12 242 35 242 18 0 19 -19 5 -54 -34 -80 -14 -148 71 -237 107 -112 186 -145 272 -116 23 8 45 11 47 6 3 -4 69 -8 145 -8 147 0 144 -1 140 47 -2 23 0 22 49 -12 62 -42 120 -53 178 -33 25 9 45 11 51 5 5 -5 38 -8 73 -6 l64 3 -3 55 -4 55 49 -47 c49 -48 105 -78 145 -78 43 1 107 38 129 75 l21 35 40 -36 c57 -51 101 -67 183 -68 52 0 80 6 111 21 48 25 111 92 120 128 7 28 24 34 24 9 0 -9 30 -47 67 -85 l66 -69 62 0 61 0 46 77 c81 137 128 281 128 399 0 71 -22 109 -106 183 -77 68 -121 75 -171 29 -42 -39 -39 -92 8 -143 17 -19 17 -24 4 -70 -9 -27 -19 -53 -24 -58 -9 -9 -31 44 -31 77 0 13 -26 48 -68 89 -67 67 -68 67 -124 67 -95 0 -104 -11 -66 -77 l23 -38 -55 47 c-97 85 -210 102 -316 48 l-59 -29 -30 29 c-17 17 -36 30 -42 30 -7 0 -14 8 -18 19 -10 32 -133 144 -151 137 -9 -4 -36 -11 -61 -17 -47 -12 -68 -36 -52 -60 5 -7 9 -29 9 -46 0 -26 -4 -33 -20 -33 -11 0 -20 -6 -20 -12 0 -7 -5 -20 -10 -28 -8 -12 -12 -11 -32 7 -13 11 -32 25 -44 31 -33 17 -116 24 -161 14 l-43 -10 0 31 c0 24 -14 44 -69 99 -62 62 -71 68 -93 59 -14 -5 -43 -14 -65 -20 l-40 -11 5 -123 5 -122 -46 42 c-77 71 -187 82 -290 29 l-49 -26 -30 25 c-23 19 -41 25 -78 25 -27 0 -52 -5 -55 -11 -4 -6 -19 -7 -36 -4 -31 7 -129 -20 -141 -38 -4 -6 -2 -19 3 -28 5 -10 9 -28 9 -40 0 -21 -5 -18 -47 23 -64 63 -121 88 -204 88 -50 0 -77 -6 -115 -25 -27 -14 -50 -25 -52 -25 -1 0 0 11 4 25 12 47 -22 107 -100 184 -66 64 -78 71 -113 71 -29 0 -46 -7 -63 -25z m97 -10 c77 -54 30 -209 -96 -315 l-50 -42 43 -52 c23 -28 61 -86 84 -129 40 -72 45 -77 75 -77 40 0 57 -15 57 -50 0 -35 -17 -50 -56 -50 -53 0 -94 38 -164 153 -36 59 -77 119 -92 134 l-28 28 0 -158 0 -157 -50 0 -50 0 0 141 c0 129 -1 140 -17 136 -174 -47 -221 -73 -240 -129 -15 -47 -1 -100 34 -128 32 -25 58 -25 83 0 28 28 25 37 -14 32 -60 -7 -94 47 -61 95 50 71 185 4 185 -92 0 -70 -72 -135 -149 -135 -115 0 -203 123 -171 239 24 89 116 150 283 188 l67 15 0 159 0 159 50 0 50 0 0 -135 c0 -74 4 -135 8 -135 19 0 131 113 150 151 l21 42 -25 19 c-32 25 -31 61 2 87 32 25 43 26 71 6z m1423 -376 l0 -339 -47 0 -48 0 0 330 0 330 40 14 c22 7 43 11 48 9 4 -2 7 -157 7 -344z m588 233 l3 -72 74 0 c41 0 75 -4 75 -9 0 -5 -3 -23 -6 -40 l-6 -31 -69 0 -69 0 0 -170 c0 -180 3 -192 47 -176 12 5 14 9 5 18 -17 17 -15 64 4 82 20 21 63 20 86 -1 28 -25 24 -94 -8 -132 -53 -63 -146 -63 -199 0 -25 30 -25 33 -25 205 l0 174 -30 0 c-32 0 -33 2 -24 49 5 24 12 31 30 31 22 0 24 4 24 48 0 26 -5 53 -11 59 -8 8 1 15 33 26 23 8 48 14 53 13 6 -1 11 -35 13 -74z m1053 -43 c20 -20 21 -29 16 -108 -7 -117 -54 -247 -136 -378 -24 -40 -29 -43 -72 -43 l-46 0 -73 213 c-40 116 -79 224 -87 240 l-14 27 56 0 c45 0 55 -3 55 -17 0 -23 113 -353 121 -353 12 0 89 179 103 238 l14 60 -29 21 c-21 15 -29 30 -29 51 0 62 77 93 121 49z m-2189 -46 c37 -33 11 -103 -39 -103 -13 0 -31 9 -40 20 -27 31 -42 24 -65 -27 -19 -42 -22 -67 -22 -210 l-1 -163 -45 0 -45 0 0 235 0 235 35 10 c49 14 50 14 50 -22 l0 -32 28 31 c15 17 36 36 47 42 25 14 73 6 97 -16z m317 9 c72 -36 75 -49 81 -283 l5 -209 -47 0 c-41 0 -48 3 -48 20 0 19 -1 19 -37 -2 -75 -45 -180 -22 -224 48 -25 41 -25 119 0 157 24 38 46 51 126 82 83 31 135 62 135 80 0 30 -31 46 -84 43 -49 -3 -51 -4 -54 -33 -7 -59 -63 -85 -104 -48 -47 42 -2 128 81 153 48 15 134 11 170 -8z m560 0 c72 -36 75 -49 81 -283 l5 -209 -47 0 c-41 0 -48 3 -48 20 0 19 -1 19 -37 -2 -75 -45 -180 -22 -224 48 -25 41 -25 119 0 157 24 38 46 51 126 82 83 31 135 62 135 80 0 30 -31 46 -84 43 -49 -3 -51 -4 -54 -33 -7 -59 -63 -85 -104 -48 -47 42 -2 128 81 153 48 15 134 11 170 -8z m-1298 -23 c43 -21 83 -67 106 -118 24 -56 21 -168 -6 -224 -63 -130 -220 -173 -339 -93 -132 89 -136 316 -7 418 61 48 170 56 246 17z m2065 6 c160 -66 180 -341 32 -441 -156 -105 -355 2 -360 193 -6 201 152 320 328 248z m-2433 -204 c-3 -21 0 -62 6 -91 6 -29 10 -54 8 -56 -2 -2 -23 24 -47 58 l-43 62 39 33 c21 18 40 33 41 33 0 0 -1 -17 -4 -39z m2074 -43 c-2 -13 -4 -5 -4 17 -1 22 1 32 4 23 2 -10 2 -28 0 -40z"/>
                                <path d="M1805 464 c-44 -19 -86 -42 -92 -51 -20 -27 -15 -62 13 -90 21 -21 32 -25 66 -20 46 6 75 29 94 74 15 34 19 123 7 122 -5 0 -44 -16 -88 -35z"/>
                                <path d="M2365 464 c-44 -19 -86 -42 -92 -51 -20 -27 -15 -62 13 -90 21 -21 32 -25 66 -20 46 6 75 29 94 74 15 34 19 123 7 122 -5 0 -44 -16 -88 -35z"/>
                                <path d="M1001 633 c-57 -30 -75 -64 -79 -146 -2 -55 1 -80 15 -106 53 -100 192 -106 248 -11 26 45 28 160 3 206 -35 64 -123 91 -187 57z m179 -163 c0 -78 -44 -140 -98 -140 -23 0 -24 2 -20 55 5 57 30 98 73 115 38 16 45 11 45 -30z"/>
                                <path d="M3093 643 c-35 -7 -81 -60 -94 -106 -14 -52 -6 -129 18 -170 37 -65 132 -86 194 -44 47 31 69 79 69 152 0 68 -21 118 -61 148 -26 19 -87 29 -126 20z m160 -186 c-2 -75 -45 -127 -105 -127 -19 0 -20 4 -15 51 8 63 28 96 70 114 45 20 52 14 50 -38z"/>
                            </g>
                        </svg>
                    </a>
                `
        },
        '03-15': { quote: '<em title="“Even you, Brutus?”">“Et tu, Brute?”</em>' },
        '05-03': { quote: '<a href="https://iainplays.com" class="link-shy">Happy Birthday, Onion Samson</a>',
                   color: '#ff7b00',
                   titleHTML: `
                    <a href="https://koralatov.com/">
                        <img width="355" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWMAAAAZAQMAAADewt2xAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAFVJREFUOMtj+MHA38DwHwgeIIgfDECAKcb8YGirBjORCSCASDN+gLCGuGq4h7GGCUI1+wGGGoYhqxrhYXDo4AwTBjv+hiGuGhoS/MihA1eNCJ0hqxoAHQM0UpQ9/hYAAAAASUVORK5CYII=">
                    </a>
                `
                                              },
        '10-31': { quote: 'Happy Halloween' },
        '11-20': { customCSS: `
                    /* On the anniversary of Beau’s death this makes
                     * the whole site black and white monochrome.
                     * It also makes images grayscale.                */
                    a {
                        background-color: var(--colour-text);
                        color: var(--colour-background);
                    }
                    a:active {
                        background-color: transparent;
                        color: var(--colour-text);
                    }
                    @media (prefers-color-scheme: dark) {
                        a {
                            background-color: var(--colour-text);
                            color: var(--colour-background);
                        }
                    }
                   img { filter: grayscale(100%); }
                `
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
        // Apply a simple color override if one is defined.
        if (todaysConfig.color) {
            document.documentElement.style.setProperty('--colour-lime', todaysConfig.color);
        }

        // Inject a block of custom CSS if it's defined.
        if (todaysConfig.customCSS) {
            const style = document.createElement('style');
            style.innerHTML = todaysConfig.customCSS;
            document.head.appendChild(style);
        }

        // Apply title override if one is defined for today.
        if (todaysConfig.titleHTML) {
            const siteTitleElement = document.getElementById('site-title');
            if (siteTitleElement) {
                siteTitleElement.innerHTML = todaysConfig.titleHTML;
            } else {
                console.error('Script failed: Target #site-title not found for title override.');
            }
        }
    }

    // --- Logic for Copyright Year (Always Runs) ---
    const copyrightLink = document.getElementById('copyright-link');
    if (copyrightLink) {
        copyrightLink.innerHTML = `© ${today.getFullYear()}`;
    }
    
    // --- Logic for Quote ---
    const quoteElement = document.getElementById('random-quote');
    if (quoteElement) {
        // Use the special quote if it's defined for today, otherwise get a random one.
        quoteElement.innerHTML = (todaysConfig && todaysConfig.quote) ? todaysConfig.quote : getRandomQuote();
    }
});
