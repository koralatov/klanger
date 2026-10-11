//  Script:   easter-eggs.js
//  Version:  1.7
//  Dated:    2026-10-11
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
        '<a class="link-shy" href="https://koralatov.com/10print"><code>10 PRINT CHR$(205.5+RND(1)); : GOTO 10</code></a>',
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

const barbieLogoHTML = `
    <svg aria-hidden="true" focusable="false"
         version="1.0" xmlns="http://www.w3.org/2000/svg"
         width="198pt" viewBox="0 0 395 99"
         preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,99.000000) scale(0.100000,-0.100000)"
           fill="#e0218a" stroke="none">
            <path d="M620 955 c-30 -32 -32 -85 -5 -117 11 -13 -10 5 -46 40 l-66 63 -69 -3 -69 -3 0 -159 0 -159 -87 -23 c-142 -38 -210 -81 -247 -157 -27 -57 -28 -144 -2 -195 24 -45 174 -194 218 -216 66 -33 170 -13 212 40 17 22 27 24 95 24 54 0 76 4 77 13 0 6 0 51 -1 99 l-1 87 82 -84 c88 -91 127 -115 183 -115 41 0 76 28 76 61 0 19 1 19 33 -4 104 -79 231 -85 325 -17 l40 28 33 -34 c31 -32 37 -34 98 -34 l66 0 0 168 c0 161 12 242 35 242 18 0 19 -19 5 -54 -34 -80 -14 -148 71 -237 107 -112 186 -145 272 -116 23 8 45 11 47 6 3 -4 69 -8 145 -8 147 0 144 -1 140 47 -2 23 0 22 49 -12 62 -42 120 -53 178 -33 25 9 45 11 51 5 5 -5 38 -8 73 -6 l64 3 -3 55 -4 55 49 -47 c49 -48 105 -78 145 -78 43 1 107 38 129 75 l21 35 40 -36 c57 -51 101 -67 183 -68 52 0 80 6 111 21 48 25 111 92 120 128 7 28 24 34 24 9 0 -9 30 -47 67 -85 l66 -69 62 0 61 0 46 77 c81 137 128 281 128 399 0 71 -22 109 -106 183 -77 68 -121 75 -171 29 -42 -39 -39 -92 8 -143 17 -19 17 -24 4 -70 -9 -27 -19 -53 -24 -58 -9 -9 -31 44 -31 77 0 13 -26 48 -68 89 -67 67 -68 67 -124 67 -95 0 -104 -11 -66 -77 l23 -38 -55 47 c-97 85 -210 102 -316 48 l-59 -29 -30 29 c-17 17 -36 30 -42 30 -7 0 -14 8 -18 19 -10 32 -133 144 -151 137 -9 -4 -36 -11 -61 -17 -47 -12 -68 -36 -52 -60 5 -7 9 -29 9 -46 0 -26 -4 -33 -20 -33 -11 0 -20 -6 -20 -12 0 -7 -5 -20 -10 -28 -8 -12 -12 -11 -32 7 -13 11 -32 25 -44 31 -33 17 -116 24 -161 14 l-43 -10 0 31 c0 24 -14 44 -69 99 -62 62 -71 68 -93 59 -14 -5 -43 -14 -65 -20 l-40 -11 5 -123 5 -122 -46 42 c-77 71 -187 82 -290 29 l-49 -26 -30 25 c-23 19 -41 25 -78 25 -27 0 -52 -5 -55 -11 -4 -6 -19 -7 -36 -4 -31 7 -129 -20 -141 -38 -4 -6 -2 -19 3 -28 5 -10 9 -28 9 -40 0 -21 -5 -18 -47 23 -64 63 -121 88 -204 88 -50 0 -77 -6 -115 -25 -27 -14 -50 -25 -52 -25 -1 0 0 11 4 25 12 47 -22 107 -100 184 -66 64 -78 71 -113 71 -29 0 -46 -7 -63 -25z m97 -10 c77 -54 30 -209 -96 -315 l-50 -42 43 -52 c23 -28 61 -86 84 -129 40 -72 45 -77 75 -77 40 0 57 -15 57 -50 0 -35 -17 -50 -56 -50 -53 0 -94 38 -164 153 -36 59 -77 119 -92 134 l-28 28 0 -158 0 -157 -50 0 -50 0 0 141 c0 129 -1 140 -17 136 -174 -47 -221 -73 -240 -129 -15 -47 -1 -100 34 -128 32 -25 58 -25 83 0 28 28 25 37 -14 32 -60 -7 -94 47 -61 95 50 71 185 4 185 -92 0 -70 -72 -135 -149 -135 -115 0 -203 123 -171 239 24 89 116 150 283 188 l67 15 0 159 0 159 50 0 50 0 0 -135 c0 -74 4 -135 8 -135 19 0 131 113 150 151 l21 42 -25 19 c-32 25 -31 61 2 87 32 25 43 26 71 6z m1423 -376 l0 -339 -47 0 -48 0 0 330 0 330 40 14 c22 7 43 11 48 9 4 -2 7 -157 7 -344z m588 233 l3 -72 74 0 c41 0 75 -4 75 -9 0 -5 -3 -23 -6 -40 l-6 -31 -69 0 -69 0 0 -170 c0 -180 3 -192 47 -176 12 5 14 9 5 18 -17 17 -15 64 4 82 20 21 63 20 86 -1 28 -25 24 -94 -8 -132 -53 -63 -146 -63 -199 0 -25 30 -25 33 -25 205 l0 174 -30 0 c-32 0 -33 2 -24 49 5 24 12 31 30 31 22 0 24 4 24 48 0 26 -5 53 -11 59 -8 8 1 15 33 26 23 8 48 14 53 13 6 -1 11 -35 13 -74z m1053 -43 c20 -20 21 -29 16 -108 -7 -117 -54 -247 -136 -378 -24 -40 -29 -43 -72 -43 l-46 0 -73 213 c-40 116 -79 224 -87 240 l-14 27 56 0 c45 0 55 -3 55 -17 0 -23 113 -353 121 -353 12 0 89 179 103 238 l14 60 -29 21 c-21 15 -29 30 -29 51 0 62 77 93 121 49z m-2189 -46 c37 -33 11 -103 -39 -103 -13 0 -31 9 -40 20 -27 31 -42 24 -65 -27 -19 -42 -22 -67 -22 -210 l-1 -163 -45 0 -45 0 0 235 0 235 35 10 c49 14 50 14 50 -22 l0 -32 28 31 c15 17 36 36 47 42 25 14 73 6 97 -16z m317 9 c72 -36 75 -49 81 -283 l5 -209 -47 0 c-41 0 -48 3 -48 20 0 19 -1 19 -37 -2 -75 -45 -180 -22 -224 48 -25 41 -25 119 0 157 24 38 46 51 126 82 83 31 135 62 135 80 0 30 -31 46 -84 43 -49 -3 -51 -4 -54 -33 -7 -59 -63 -85 -104 -48 -47 42 -2 128 81 153 48 15 134 11 170 -8z m560 0 c72 -36 75 -49 81 -283 l5 -209 -47 0 c-41 0 -48 3 -48 20 0 19 -1 19 -37 -2 -75 -45 -180 -22 -224 48 -25 41 -25 119 0 157 24 38 46 51 126 82 83 31 135 62 135 80 0 30 -31 46 -84 43 -49 -3 -51 -4 -54 -33 -7 -59 -63 -85 -104 -48 -47 42 -2 128 81 153 48 15 134 11 170 -8z m-1298 -23 c43 -21 83 -67 106 -118 24 -56 21 -168 -6 -224 -63 -130 -220 -173 -339 -93 -132 89 -136 316 -7 418 61 48 170 56 246 17z m2065 6 c160 -66 180 -341 32 -441 -156 -105 -355 2 -360 193 -6 201 152 320 328 248z m-2433 -204 c-3 -21 0 -62 6 -91 6 -29 10 -54 8 -56 -2 -2 -23 24 -47 58 l-43 62 39 33 c21 18 40 33 41 33 0 0 -1 -17 -4 -39z m2074 -43 c-2 -13 -4 -5 -4 17 -1 22 1 32 4 23 2 -10 2 -28 0 -40z"/>
            <path d="M1805 464 c-44 -19 -86 -42 -92 -51 -20 -27 -15 -62 13 -90 21 -21 32 -25 66 -20 46 6 75 29 94 74 15 34 19 123 7 122 -5 0 -44 -16 -88 -35z"/>
            <path d="M2365 464 c-44 -19 -86 -42 -92 -51 -20 -27 -15 -62 13 -90 21 -21 32 -25 66 -20 46 6 75 29 94 74 15 34 19 123 7 122 -5 0 -44 -16 -88 -35z"/>
            <path d="M1001 633 c-57 -30 -75 -64 -79 -146 -2 -55 1 -80 15 -106 53 -100 192 -106 248 -11 26 45 28 160 3 206 -35 64 -123 91 -187 57z m179 -163 c0 -78 -44 -140 -98 -140 -23 0 -24 2 -20 55 5 57 30 98 73 115 38 16 45 11 45 -30z"/>
            <path d="M3093 643 c-35 -7 -81 -60 -94 -106 -14 -52 -6 -129 18 -170 37 -65 132 -86 194 -44 47 31 69 79 69 152 0 68 -21 118 -61 148 -26 19 -87 29 -126 20z m160 -186 c-2 -75 -45 -127 -105 -127 -19 0 -20 4 -15 51 8 63 28 96 70 114 45 20 52 14 50 -38z"/>
        </g>
    </svg>
`;

const falloutLogoHTML = `
<svg aria-hidden="true" focusable="false"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     width="198pt" viewBox="0 0 79.37 22.68"
     preserveAspectRatio="xMidYMid meet">
<defs>
<g>
<g id="glyph-0-0">
<path d="M 7.625 -18.4375 L 4.609375 -18.4375 L 0 0 L 3.015625 0 L 4.90625 -7.671875 L 5.125 0 L 7.984375 0 L 7.734375 -9.21875 L 12.59375 -18.4375 L 9.734375 -18.4375 L 5.703125 -10.796875 Z M 7.625 -18.4375 "/>
</g>
<g id="glyph-0-1">
<path d="M 10.140625 -13.765625 C 9.765625 -13.78125 9.3125 -13.765625 8.78125 -13.6875 C 8.234375 -13.609375 7.6875 -13.40625 7.203125 -13.09375 C 6.6875 -12.765625 6.265625 -12.328125 5.9375 -11.765625 L 6.34375 -13.390625 L 3.359375 -13.390625 L 0 0 L 3.234375 0 L 5.25 -8.09375 C 5.34375 -8.40625 5.421875 -8.65625 5.515625 -8.859375 C 5.625 -9.03125 5.75 -9.21875 5.9375 -9.4375 C 6.140625 -9.671875 6.4375 -9.890625 6.875 -10.140625 C 7.328125 -10.359375 7.734375 -10.5 8.15625 -10.5 C 8.578125 -10.53125 8.96875 -10.484375 9.296875 -10.421875 Z M 10.140625 -13.765625 "/>
</g>
<g id="glyph-0-2">
<path d="M 6.015625 -3.578125 C 5.921875 -3.25 5.84375 -2.984375 5.75 -2.8125 C 5.640625 -2.640625 5.515625 -2.46875 5.40625 -2.34375 C 5.28125 -2.21875 5.046875 -2.140625 4.734375 -2.140625 C 4.4375 -2.171875 4.265625 -2.21875 4.1875 -2.34375 C 4.125 -2.46875 4.09375 -2.640625 4.09375 -2.8125 C 4.09375 -2.984375 4.140625 -3.25 4.21875 -3.578125 L 4.53125 -4.90625 C 4.65625 -5.375 4.765625 -5.703125 4.859375 -5.8125 C 4.953125 -5.96875 5.109375 -6.09375 5.296875 -6.21875 C 5.46875 -6.34375 5.75 -6.40625 6.0625 -6.4375 L 6.703125 -6.4375 Z M 5.96875 -10.578125 C 6.046875 -10.890625 6.140625 -11.140625 6.21875 -11.3125 C 6.3125 -11.515625 6.4375 -11.65625 6.578125 -11.8125 C 6.6875 -11.90625 6.90625 -11.984375 7.203125 -11.984375 C 7.515625 -11.984375 7.6875 -11.9375 7.765625 -11.8125 C 7.84375 -11.65625 7.859375 -11.515625 7.859375 -11.3125 C 7.859375 -11.1875 7.859375 -11.015625 7.8125 -10.796875 L 7.09375 -7.921875 L 6.09375 -7.921875 C 4.875 -7.890625 4.015625 -7.765625 3.46875 -7.515625 C 2.9375 -7.28125 2.484375 -6.90625 2.09375 -6.390625 C 1.703125 -5.875 1.359375 -5.046875 1.0625 -3.921875 C 0.765625 -2.8125 0.640625 -1.953125 0.71875 -1.40625 C 0.765625 -0.84375 1.03125 -0.421875 1.484375 -0.171875 C 1.921875 0.078125 2.390625 0.203125 2.890625 0.171875 C 3.375 0.125 3.875 -0.03125 4.3125 -0.296875 C 4.78125 -0.59375 5.15625 -0.890625 5.421875 -1.234375 L 5.125 -0.046875 L 8.359375 -0.046875 L 10.96875 -10.53125 C 11.09375 -11.015625 11.09375 -11.515625 10.953125 -12 C 10.78125 -12.5 10.5 -12.875 10.078125 -13.109375 C 9.640625 -13.390625 9.203125 -13.515625 8.671875 -13.515625 L 6.65625 -13.515625 C 6.171875 -13.484375 5.671875 -13.359375 5.15625 -13.109375 C 4.609375 -12.875 4.140625 -12.5 3.71875 -12 C 3.359375 -11.515625 3.078125 -11.015625 2.953125 -10.53125 L 2.65625 -9.390625 L 5.671875 -9.390625 Z M 5.96875 -10.578125 "/>
</g>
<g id="glyph-0-3">
<path d="M 7.84375 -18.4375 L 4.609375 -18.4375 L 0 0 L 3.234375 0 Z M 7.84375 -18.4375 "/>
</g>
<g id="glyph-0-4">
<path d="M 8.484375 -11.34375 L 8.921875 -13.1875 L 7.5625 -13.1875 L 8.875 -18.46875 L 5.28125 -17.03125 L 4.3125 -13.1875 L 3.296875 -13.1875 L 2.859375 -11.34375 L 3.875 -11.34375 L 1.78125 -2.984375 C 1.625 -2.296875 1.609375 -1.71875 1.75 -1.234375 C 1.90625 -0.734375 2.1875 -0.421875 2.640625 -0.21875 C 3.0625 -0.03125 3.546875 0.046875 4.0625 0.046875 L 5.625 0.046875 L 6.171875 -2.140625 L 5.40625 -2.140625 C 5.296875 -2.140625 5.203125 -2.171875 5.125 -2.25 C 5.03125 -2.296875 4.984375 -2.359375 4.953125 -2.4375 C 4.9375 -2.546875 5 -2.90625 5.15625 -3.59375 L 7.09375 -11.34375 Z M 8.484375 -11.34375 "/>
</g>
<g id="glyph-0-5">
<path d="M 10.328125 -16.03125 L 6.3125 -7.9375 L 10.25 -7.9375 L 10.921875 -10.625 C 11.046875 -11.125 11.015625 -11.609375 10.875 -12.078125 C 10.71875 -12.578125 10.421875 -12.9375 10.015625 -13.21875 C 9.90625 -13.296875 9.78125 -13.34375 9.6875 -13.390625 Z M 1.78125 -6.21875 L 8.3125 -13.609375 L 6.6875 -13.609375 C 6.1875 -13.609375 5.671875 -13.515625 5.125 -13.296875 C 4.5625 -13.046875 4.09375 -12.703125 3.71875 -12.234375 C 3.328125 -11.734375 3.0625 -11.21875 2.890625 -10.625 Z M 5.703125 -5.875 L 1.703125 -5.875 L 0.984375 -2.984375 C 0.859375 -2.46875 0.859375 -1.96875 1.015625 -1.484375 C 1.15625 -0.984375 1.4375 -0.609375 1.875 -0.34375 C 2.296875 -0.078125 2.859375 0.078125 3.59375 0.078125 Z M 2.5625 2.90625 L 5.671875 0.03125 C 6.046875 0.03125 6.4375 -0.078125 6.90625 -0.265625 C 7.34375 -0.4375 7.765625 -0.734375 8.140625 -1.15625 C 8.5 -1.609375 8.796875 -2.1875 9 -2.984375 L 10.15625 -7.59375 Z M 2.5625 2.90625 "/>
</g>
<g id="glyph-0-6">
<path d="M 5.453125 0 L 11.4375 -13.390625 L 8.625 -13.390625 L 5.625 -6.3125 L 6.171875 -13.390625 L 3.359375 -13.390625 L 2.640625 0 Z M 5.453125 0 "/>
</g>
<g id="glyph-1-0">
<path d="M 4.046875 -1.65625 C 3.96875 -1.796875 3.9375 -1.953125 3.9375 -2.125 C 3.9375 -2.265625 3.9375 -2.4375 4 -2.640625 L 6.109375 -10.890625 C 6.171875 -11.125 6.234375 -11.296875 6.3125 -11.421875 C 6.40625 -11.59375 6.515625 -11.765625 6.65625 -11.890625 C 6.78125 -12 7 -12.078125 7.296875 -12.078125 C 7.5 -12.0625 7.640625 -12.03125 7.734375 -11.984375 C 7.796875 -11.953125 7.84375 -11.9375 7.84375 -11.890625 C 7.921875 -11.765625 7.96875 -11.59375 7.96875 -11.421875 C 7.96875 -11.296875 7.9375 -11.125 7.890625 -10.890625 L 5.796875 -2.640625 C 5.71875 -2.4375 5.640625 -2.265625 5.59375 -2.125 C 5.5 -1.953125 5.375 -1.796875 5.234375 -1.65625 C 5.109375 -1.53125 4.875 -1.484375 4.59375 -1.484375 C 4.40625 -1.484375 4.265625 -1.5 4.171875 -1.546875 C 4.125 -1.578125 4.0625 -1.609375 4.046875 -1.65625 Z M 5.296875 0.046875 C 5.796875 0.046875 6.34375 -0.078125 6.90625 -0.34375 C 7.453125 -0.59375 7.921875 -0.96875 8.3125 -1.453125 C 8.703125 -1.953125 8.953125 -2.421875 9.09375 -2.9375 L 11.078125 -10.625 C 11.1875 -11.125 11.171875 -11.609375 11.015625 -12.078125 C 10.875 -12.578125 10.578125 -12.9375 10.15625 -13.21875 C 9.734375 -13.46875 9.265625 -13.609375 8.75 -13.609375 L 6.609375 -13.609375 C 6.09375 -13.609375 5.546875 -13.46875 5 -13.21875 C 4.46875 -12.9375 3.96875 -12.578125 3.578125 -12.078125 C 3.1875 -11.609375 2.9375 -11.125 2.8125 -10.625 L 0.84375 -2.9375 C 0.71875 -2.421875 0.71875 -1.953125 0.859375 -1.453125 C 1.03125 -0.96875 1.3125 -0.59375 1.71875 -0.34375 C 2.171875 -0.078125 2.609375 0.046875 3.125 0.046875 Z M 5.296875 0.046875 "/>
</g>
</g>
<clipPath id="clip-0">
<path clip-rule="nonzero" d="M 0.242188 0 L 14 0 L 14 20 L 0.242188 20 Z M 0.242188 0 "/>
</clipPath>
</defs>
<g clip-path="url(#clip-0)">
<g fill="currentColor">
<use xlink:href="#glyph-0-0" x="0.940257" y="19.070301"/>
</g>
</g>
<g fill="currentColor">
<use xlink:href="#glyph-1-0" x="9.883987" y="19.070301"/>
</g>
<g fill="currentColor">
<use xlink:href="#glyph-0-1" x="19.116611" y="19.070301"/>
<use xlink:href="#glyph-0-2" x="26.758784" y="19.070301"/>
<use xlink:href="#glyph-0-3" x="36.028002" y="19.070301"/>
<use xlink:href="#glyph-0-2" x="40.218871" y="19.070301"/>
<use xlink:href="#glyph-0-4" x="49.488089" y="19.070301"/>
<use xlink:href="#glyph-0-5" x="56.070219" y="19.070301"/>
<use xlink:href="#glyph-0-6" x="65.314784" y="19.070301"/>
</g>
</svg>
`;

// --- Master Configuration Object (Single Source of Truth) ---
const specialDateConfig = {
    '01-01': { quote: 'Happy New Year' },
    '01-10': { quote: '<em title="The die is cast">“Alea Jacta Est”</em>' },
    '03-09': {
        quote: '<a href="https://www.youtube.com/watch?v=ZyhrYis509A" class="link-shy">“Come on, Barbie, let’s go party”</a>',
        customCSS: `:root { --colour-lime: #e0218a; } a { color: var(--colour-background); } a:active { color: var(--colour-background); }
@media (prefers-color-scheme: dark) { a { color: var(--colour-text); } } #site-title, #site-title a { background-color: transparent; padding: 0; } #site-title:hover g { fill: var(--colour-active); }`,
        titleHTML: barbieLogoHTML
    },
    '03-15': { quote: '<em title="“Even you, Brutus?”">“Et tu, Brute?”</em>' },
    '05-03': {
        quote: '<a href="https://iainplays.com" class="link-shy">Happy Birthday, Onion Samson</a>',
        color: '#ff7b00',
        fontLink: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Mono:wght@400&display=swap',
        customCSS: `:root { --font-body: "IBM Plex Sans", "Georgia", serif; --font-monospaced: "IBM Plex Mono", "Courier", monospace; --font-weight-bold: 700; }`
    },
    '10-10': {
        quote: '<a href="https://en.wikipedia.org/wiki/Fallout_(video_game)" class="link-shy">War. War never changes.</a>',
        customCSS: `
            #site-title {
                background-color: transparent;
                padding: 0;
            }

            #site-title svg {
                background-color: var(--colour-links);
                color: var(--colour-text);
                display: block;

                padding-top:    1px;
                padding-bottom: 1px;
                padding-left:   2px;
                padding-right:  2px;
            }

            #site-title:hover svg {
                background-color: transparent;
                color: var(--colour-active);
            }

            #site-title:active svg {
                background-color: var(--colour-text);
                color: var(--colour-links);
            }

            @media (prefers-color-scheme: dark) {
                #site-title svg {
                    color: var(--colour-background);
                }

                #site-title:active svg {
                    background-color: var(--colour-text);
                    color: var(--colour-background);
                }
            }
        `,
        titleHTML: falloutLogoHTML
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
        style.textContent = todaysConfig.customCSS;
        document.head.appendChild(style);
    }
    if (todaysConfig.titleHTML) {
        const siteTitleElement = document.getElementById('site-title');
        if (siteTitleElement) {
            siteTitleElement.innerHTML = todaysConfig.titleHTML;
            siteTitleElement.setAttribute('aria-label', 'Koralatov');
        }
    }
}

// --- Logic for Copyright Year (Always Runs) ---
const currentYear = today.getFullYear();
// Logic for the element that ONLY shows the year
const copyrightYearOnly = document.getElementById('copyright-year');
if (copyrightYearOnly) {
    copyrightYearOnly.textContent = String(currentYear);
}
// Logic for the element that shows the symbol AND the year
const copyrightLink = document.getElementById('copyright-year-link');
if (copyrightLink) {
    copyrightLink.textContent = '© ' + currentYear;
}

// --- Logic for Quote ---
const quoteElement = document.getElementById('random-quote');
if (quoteElement) {
    // Use the special quote if it's defined for today, otherwise get a random one.
    quoteElement.innerHTML = (todaysConfig && todaysConfig.quote) ? todaysConfig.quote : getRandomQuote();
}

