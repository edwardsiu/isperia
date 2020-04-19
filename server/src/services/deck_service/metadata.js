const _ = require('lodash');
const { Archetypes, ArchetypesShort, ArchetypePosition } = require('../../modules/enums');
const { has, hasAtLeast, hasAll, extractCommandersShortName } = require('./utils');

// This should be an ordered list of archetypes by importance
// Higher archetypes will take precedence over lower archetypes in the shortened name,
// however, all archetypes will be listed in the Deck.archetypes property
const CLASSIFIERS = [
    {
        name: Archetypes.FOOD_CHAIN,
        position: ArchetypePosition.PREFIX,
        match: (deck) => has(deck, 'food chain'),
    },
    {
        name: Archetypes.TURBO_NAUS,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => (
            hasAll(deck, [
                'ad nauseam',
                'lotus petal',
                'dark ritual',
                'cabal ritual',
                'mana vault',
                'grim monolith',
            ])
            && hasAtLeast(deck, 2, [
                'lions eye diamond',
                'culling the weak',
                'rain of filth',
            ])
        ),
    },
    {
        name: Archetypes.CONSULT,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => (
            hasAtLeast(deck, 1, [
                'demonic consultation',
                'tainted pact',
            ])
            && hasAtLeast(deck, 1, [
                'thassas oracle',
                'laboratory maniac',
                'jace wielder of mysteries',
            ])
        ),
    },
    {
        name: Archetypes.STORM,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => (
            hasAll(deck, [
                'lotus petal',
                'mana vault',
            ])
            && hasAtLeast(deck, 4, [
                'lions eye diamond',
                'mox opal',
                'grim monolith',
                'dramatic reversal',
                'snap',
                'frantic search',
                'dark ritual',
                'cabal ritual',
            ])
            && hasAtLeast(deck, 2, [
                'ad nauseam',
                'aetherflux reservoir',
                'high tide',
                'minds desire',
                'underworld breach',
                'yawgmoths will',
            ])
        ),
    },
    {
        name: Archetypes.DOOMSDAY,
        position: ArchetypePosition.PREFIX,
        match: (deck) => has(deck, 'doomsday'),
    },
    {
        name: Archetypes.FUTURE_TOP,
        match: (deck) => (
            has(deck, 'senseis divining top')
            && hasAtLeast(deck, 1, [
                'etherium sculptor',
                'helm of awakening',
                'cloud key',
            ])
            && hasAtLeast(deck, 1, [
                'elsha of the infinite',
                'future sight',
                'bolass citadel',
            ])
        ),
    },
    {
        name: Archetypes.HERMIT,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => has(deck, 'hermit druid'),
    },
    {
        name: Archetypes.HULK,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => (
            has(deck, 'protean hulk')
            && hasAtLeast(deck, 1, [
                'flash',
                'necromancy',
            ])
        ),
    },
    {
        name: Archetypes.POLYMORPH,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => hasAtLeast(deck, 2, [
            'proteus staff',
            'divergent transformations',
            'polymorph',
            'reweave',
            'synthetic destiny',
        ]),
    },
    {
        name: Archetypes.REANIMATOR,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => (
            has(deck, 'entomb')
            && hasAtLeast(deck, 3, [
                'reanimate',
                'animate dead',
                'dance of the dead',
                'life death',
                'necromancy',
            ])
        ),
    },
    {
        name: Archetypes.SCEPTER,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => has(deck, 'isochron scepter') && has(deck, 'dramatic reversal'),
    },
    {
        name: Archetypes.STAX,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => (
            hasAtLeast(deck, 5, [
                'chalice of the void',
                'grafdiggers cage',
                'cursed totem',
                'null rod',
                'sphere of resistance',
                'thorn of amethyst',
                'winter orb',
                'tangle wire',
                'trinisphere',
                'root maze',
                'collector ouphe',
                'blood moon',
                'magus of the moon',
                'stranglehold',
                'stasis',
                'back to basics',
                'chains of mephistopheles',
                'leyline of the void',
                'deafening silence',
                'drannith magistrate',
                'ethersworn canonist',
                'rest in peace',
                'stony silence',
                'thalia guardian of thraben',
                'aven mindcensor',
                'linvala keeper of silence',
            ])
        ),
    },
    {
        name: Archetypes.THIEF,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => (
            hasAtLeast(deck, 3, [
                'burning inquiry',
                'winds of change',
                'timetwister',
                'wheel of fortune',
                'windfall',
                'whispering madness',
            ])
            && hasAtLeast(deck, 3, [
                'waste not',
                'narset parter of veils',
                'rielle the everwise',
                'alms collector',
                'notion thief',
                'smothering tithe',
            ])
        ),
    },
    {
        name: Archetypes.TURNS,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => (
            hasAtLeast(deck, 3, [
                'capture of jingzhou',
                'temporal manipulation',
                'time warp',
                'nexus of fate',
                'temporal mastery',
            ])
        ),
    },
    {
        name: Archetypes.TWIN,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => (
            hasAtLeast(deck, 1, [
                'splinter twin',
                'kiki jiki mirror breaker',
            ])
            && hasAtLeast(deck, 1, [
                'deciever exarch',
                'pestermite',
                'felidar guardian',
                'zealous conscripts',
            ])
        ),
    },
    {
        name: Archetypes.DIVERGENT,
        position: ArchetypePosition.PREFIX,
        match: (deck) => has(deck, 'divergent transformations'),
    },
    {
        name: Archetypes.ALUREN,
        position: ArchetypePosition.PREFIX,
        match: (deck) => has(deck, 'aluren'),
    },
    {
        name: Archetypes.BIRTHING_POD,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => (
            hasAtLeast(deck, 1, [
                'birthing pod',
                'prime speaker vannifar',
            ])
            && hasAtLeast(deck, 1, [
                'corridor monitor',
                'felidar guardian',
            ])
        ),
    },
    {
        name: Archetypes.CHAIN_VEIL,
        position: ArchetypePosition.PREFIX,
        match: (deck) => has(deck, 'the chain veil'),
    },
    {
        name: Archetypes.UNDERWORLD_BREACH,
        position: ArchetypePosition.SUFFIX,
        match: (deck) => (
            has(deck, 'underworld breach')
            && has(deck, 'lions eye diamond')
        ),
    },
];

const ARCHETYPE_PRIORITY = [
    Archetypes.FOOD_CHAIN,
    Archetypes.DOOMSDAY,
    Archetypes.DIVERGENT,
    Archetypes.CHAIN_VEIL,
    Archetypes.STAX,
    Archetypes.TURBO_NAUS,
    Archetypes.HULK,
    Archetypes.REANIMATOR,
    Archetypes.THIEF,
    Archetypes.SCEPTER,
    Archetypes.UNDERWORLD_BREACH,
    Archetypes.CONSULT,
    Archetypes.BIRTHING_POD,
    Archetypes.TWIN,
    Archetypes.TURNS,
    Archetypes.HERMIT,
    Archetypes.STORM,
    Archetypes.FUTURE_TOP,
];

/**
 * @function classify
 * @param {Deck} deck
 * @returns {Object}
 */
function classify(deck) {
    const archetypes = CLASSIFIERS
        .filter((classifier) => classifier.match(deck))
        .map((classifier) => classifier.name);
    const archetypesMap = archetypes.reduce((o, archetype) => {
        o[archetype] = true;
        return o;
    }, {});
    return archetypesMap;
}

function generateFullDeckName(deck) {
    const archetypes = CLASSIFIERS.filter((classifier) => classifier.match(deck));
    const archetypeMap = archetypes.reduce((o, archetype) => Object.assign(o, {
        [archetype.name]: archetype.position,
    }), {});
    const commanderName = extractCommandersShortName(
        Object.values(deck.commanders).map(({ name }) => name),
    );
    const primary = ARCHETYPE_PRIORITY.find((name) => _.has(archetypeMap, name));
    const names = [];
    if (primary && archetypeMap[primary] === ArchetypePosition.PREFIX) {
        names.push(ArchetypesShort[primary] || primary);
    }
    names.push(commanderName);
    if (primary && archetypeMap[primary] === ArchetypePosition.SUFFIX) {
        names.push(ArchetypesShort[primary] || primary);
    }
    return names.join(' ');
}

module.exports = {
    classify,
    generateFullDeckName,
};
