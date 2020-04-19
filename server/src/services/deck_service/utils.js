const _ = require('lodash');

/**
 * Converts a card name to an all lower case representation.
 * Removes special characters and replaces characters with diacritics with "normal" versions.
 * Turns `Lim-Dûl's Vault` into `lim duls vault`.
 *
 * @function normalizeCardName
 * @param {String} name Card name to normalize
 * @returns {String} The normalized card name
 */
function normalizeCardName(name) {
    return name.toLowerCase().normalize('NFKD').replace('-', ' ').replace(/[^\w\s]/g, '');
}

/**
 * Special case short names that don't follow the standard rule
 */
const SPECIAL_SHORT_NAMES = {
    'Anje Falkenrath': 'Anje',
    'Edgar Markov': 'Edgar',
    'General Tazri': 'Tazri',
    'Grand Arbiter Augustin IV': 'GAAIV',
    'The Gitrog Monster': 'Gitrog',
    'God-Eternal Kefnet': 'Kefnet',
    'Niv-Mizzet Reborn': 'Niv-Mizzet',
    'The First Sliver': 'Sliver',
};

/**
 * Shortens the legendary card to the main name.
 * `Jace, Vryn's Prodigy` -> `Jace`
 * `Kaalia of the Vast` -> `Kaalia`
 * `Tymna the Weaver` -> `Tymna`
 * `The Gitrog Monster` -> `Gitrog`
 *
 * @function extractLegendaryShortName
 * @param {String} name Name of a legendary card
 * @returns {String} The short name of the legendary card
 */
function extractLegendaryShortName(name) {
    return SPECIAL_SHORT_NAMES[name] || name.split(/(,|\sthe|\sof)/)[0];
}

/**
 * Shortens the name of a commander or commanders into a single string.
 * `Teferi, Temporal Archmage` -> `Teferi`
 * `Thrasios, Triton Hero`, `Tymna the Weaver` -> `Tymna/Thrasios
 * @function extractCommandersShortName
 * @param  {String[]} commanderNames Full card names to shorten and combine
 * @returns {String} The shortened and concatenated name
 */
function extractCommandersShortName(commanderNames) {
    const shortNames = commanderNames
        .map((name) => extractLegendaryShortName(name))
        .sort()
        .reverse();
    return shortNames.join('/');
}

function has(deck, cardName) {
    const normalized = normalizeCardName(cardName);
    return _.has(deck.mainboard, normalized) || _.has(deck.commanders, normalized);
}

function hasAtLeast(deck, n, cardNames) {
    return (cardNames.filter((cardName) => has(deck, cardName)).length >= n);
}

function hasAll(deck, cardNames) {
    return hasAtLeast(deck, cardNames.length, cardNames);
}

module.exports = {
    normalizeCardName,
    extractLegendaryShortName,
    extractCommandersShortName,
    has,
    hasAtLeast,
    hasAll,
};
