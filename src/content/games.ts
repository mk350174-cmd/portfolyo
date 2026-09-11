/**
 * The Historical Strategy Games Lab inventory.
 *
 * Titles are taken from each prototype's own `<title>` tag; the line counts
 * and Three.js usage were measured across the archive. Historical notes are
 * kept deliberately short and cautious — these are living traditions with
 * contested reconstructions, and the lab's own position is that
 * implementation choices should be labelled as choices.
 */

export interface GamePrototype {
  file: string;
  title: string;
  english: string;
  tradition: string;
  lines: number;
  threeD: boolean;
  note: string;
}

export const GAME_PROTOTYPES: GamePrototype[] = [
  {
    file: "hiashatar_v3.html",
    title: "Hiashatar",
    english: "The Khan's Guards",
    tradition: "Mongolian great chess",
    lines: 1784,
    threeD: true,
    note: "A large Mongolian chess variant whose bodyguard piece constrains movement around the ruler — a rule with no equivalent in modern chess.",
  },
  {
    file: "togyzool_v1.html",
    title: "Togyzool",
    english: "Stones of Patience",
    tradition: "Kazakh sowing game",
    lines: 1164,
    threeD: true,
    note: "A counting-and-sowing game of the togyzkumalak family, where the arithmetic is the strategy.",
  },
  {
    file: "satra_v4.html",
    title: "Şatra",
    english: "Fortress of the Steppe",
    tradition: "Tuvan / Altai board game",
    lines: 3110,
    threeD: true,
    note: "A steppe board game rebuilt from descriptive sources, with the gaps filled by explicit implementation decisions.",
  },
  {
    file: "satranci_rumi_v8_final.html",
    title: "Satrancı Rumi",
    english: "Byzantine chess",
    tradition: "Circular chess",
    lines: 8591,
    threeD: true,
    note: "The round-board variant. The most developed prototype in the lab, with its own opponent.",
  },
  {
    file: "kurt_koyun_v2.html",
    title: "Kurt ve Koyun",
    english: "Wolf and Sheep",
    tradition: "Asymmetric hunt game",
    lines: 2253,
    threeD: true,
    note: "A hunt game: one strong piece against many weak ones. Asymmetric games are where evaluation functions get interesting.",
  },
  {
    file: "buga_shadra_3d.html",
    title: "Buga Shadra",
    english: "Tuvan piece collection",
    tradition: "Tuva",
    lines: 698,
    threeD: true,
    note: "A 3D study of the piece forms rather than a playable game.",
  },
  {
    file: "kalebendi_3d.html",
    title: "Kalebendi",
    english: "The Unbreachable Wall",
    tradition: "Siege game",
    lines: 1015,
    threeD: true,
    note: "A siege-shaped board study, again asymmetric by design.",
  },
  {
    file: "bozkir_katman1.html",
    title: "Bozkır",
    english: "Grand platform",
    tradition: "Shell for the collection",
    lines: 1551,
    threeD: true,
    note: "An attempt at a common shell the individual games could sit inside.",
  },
  {
    file: "timurlenk_v35.html",
    title: "Timurlenk v27 – v35",
    english: "Browser Tamerlane",
    tradition: "Tamerlane chess",
    lines: 19239,
    threeD: true,
    note: "Three generations of browser Tamerlane. This is where the rules were worked out before the C++ engine existed, which made the engine a rewrite rather than a discovery.",
  },
  {
    file: "vitrin_v4.html",
    title: "Taş Vitrini",
    english: "Piece showcase",
    tradition: "Tamerlane chess",
    lines: 2617,
    threeD: true,
    note: "A 3D display of the Tamerlane piece set, built to get the forms right before the board mattered.",
  },
];

export const GAMES_TOTALS = {
  files: 14,
  lines: "~92,000",
  distinctGames: 8,
};
