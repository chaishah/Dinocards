export const PERSONALITIES = {
  apex_predator: {
    key: "apex_predator",
    title: "Apex Predator",
    subtitle: "Born to hunt",
    description: "You're drawn to raw power and dominance. In the Cretaceous, you'd be at the top of the food chain — fierce, calculating, and always a few steps ahead of everyone else. Other dinosaurs don't compete with you. They just survive you.",
    accentColor: "#c29090",
    gradientFrom: "#1a0808",
    gradientTo: "#0f0606",
  },
  gentle_giant: {
    key: "gentle_giant",
    title: "Gentle Giant",
    subtitle: "Peaceful & unstoppable",
    description: "Size doesn't mean scary. You appreciate quiet strength, deep patience, and taking the long view. You'd roam the prehistoric plains without a care — and nothing would dare challenge you anyway.",
    accentColor: "#9bbfa4",
    gradientFrom: "#081308",
    gradientTo: "#060e06",
  },
  sky_ruler: {
    key: "sky_ruler",
    title: "Sky Ruler",
    subtitle: "Above it all",
    description: "The ground is for amateurs. You look up, not down — freedom, elevation, and a bird's-eye view are your natural habitat. The prehistoric skies belong to you, and you've never once looked back.",
    accentColor: "#88b4cc",
    gradientFrom: "#071018",
    gradientTo: "#050b10",
  },
  living_fortress: {
    key: "living_fortress",
    title: "Living Fortress",
    subtitle: "Unbreakable by design",
    description: "Defense is your philosophy. You play the long game — patient, armored, nearly impossible to take down. People underestimate you constantly, and that is exactly how you like it.",
    accentColor: "#a898c0",
    gradientFrom: "#0c091a",
    gradientTo: "#090810",
  },
  feathered_visionary: {
    key: "feathered_visionary",
    title: "Feathered Visionary",
    subtitle: "Ahead of your era",
    description: "You see dinosaurs for what they truly are — the living ancestors of every bird in the sky today. You're an evolutionary thinker who knows extinction is just transformation in disguise.",
    accentColor: "#c8c098",
    gradientFrom: "#141207",
    gradientTo: "#0c0c06",
  },
  titan_chaser: {
    key: "titan_chaser",
    title: "Titan Chaser",
    subtitle: "Size is everything",
    description: "Go big or go home. You're in awe of scale, mass, and sheer prehistoric presence. The biggest, heaviest, most ground-shaking creatures in history are your crowd — and you wouldn't have it any other way.",
    accentColor: "#c0b080",
    gradientFrom: "#131005",
    gradientTo: "#0a0a04",
  },
  speed_freak: {
    key: "speed_freak",
    title: "Speed Freak",
    subtitle: "Born for the sprint",
    description: "Quick-thinking, agile, and always three steps ahead. You live for the chase, not the standoff — built for velocity and thriving in the blur of motion. Standing still isn't really your thing.",
    accentColor: "#c8b898",
    gradientFrom: "#130e07",
    gradientTo: "#0a0a06",
  },
  horn_collector: {
    key: "horn_collector",
    title: "Horn Collector",
    subtitle: "Flair for the dramatic",
    description: "Why blend in when you can be spectacular? You're drawn to dinosaurs with attitude — the more horns, frills, and elaborate headgear, the better. Style and substance, always and forever.",
    accentColor: "#c09898",
    gradientFrom: "#130909",
    gradientTo: "#0a0808",
  },
  deep_diver: {
    key: "deep_diver",
    title: "Deep Diver",
    subtitle: "Depths unknown",
    description: "Half your soul lives underwater. You're drawn to the prehistoric seas — mysterious, ancient, and home to some of the most terrifying creatures that ever existed. The deep calls, and you always answer.",
    accentColor: "#7890b8",
    gradientFrom: "#06091a",
    gradientTo: "#050712",
  },
  paleo_completionist: {
    key: "paleo_completionist",
    title: "Paleo Completionist",
    subtitle: "Gotta love 'em all",
    description: "Not a single dinosaur left behind. Maximum enthusiasm, zero discrimination, pure prehistoric love. You'd have been the happiest person alive in the Mesozoic Era. Every single one of them? A yes from you.",
    accentColor: "#c2cfe0",
    gradientFrom: "#0c0f18",
    gradientTo: "#080a10",
  },
  prehistoric_contrarian: {
    key: "prehistoric_contrarian",
    title: "Prehistoric Contrarian",
    subtitle: "Nothing impresses you",
    description: "150 million years of evolution and none of it moved you. That level of commitment to your own exacting standards is, frankly, kind of admirable. Even the fossils respect it.",
    accentColor: "#90a0b0",
    gradientFrom: "#0a0c10",
    gradientTo: "#080a0c",
  },
  true_explorer: {
    key: "true_explorer",
    title: "True Explorer",
    subtitle: "Complex & unpredictable",
    description: "You refuse to be categorized — and that's the most interesting thing about you. You roam freely across eras, picking what resonates and ignoring the rest. Paleontology itself would approve of your methodology.",
    accentColor: "#98b8c8",
    gradientFrom: "#080f14",
    gradientTo: "#060b10",
  },
};

export function calcPersonality(likedDinos) {
  if (likedDinos.length === 0) return PERSONALITIES.prehistoric_contrarian;
  if (likedDinos.length === 7) return PERSONALITIES.paleo_completionist;

  const tagCount = {};
  likedDinos.forEach(d =>
    d.tags.forEach(t => { tagCount[t] = (tagCount[t] || 0) + 1; })
  );

  if ((tagCount.flying || 0) >= 2) return PERSONALITIES.sky_ruler;
  if ((tagCount.aquatic || 0) >= 2) return PERSONALITIES.deep_diver;
  if ((tagCount.armored || 0) >= 2) return PERSONALITIES.living_fortress;
  if ((tagCount.feathered || 0) >= 2) return PERSONALITIES.feathered_visionary;
  if ((tagCount.giant || 0) >= 3) return PERSONALITIES.titan_chaser;
  if ((tagCount.fast || 0) >= 2) return PERSONALITIES.speed_freak;
  if ((tagCount.horned || 0) >= 2) return PERSONALITIES.horn_collector;

  const carnivores = likedDinos.filter(d => d.diet === 'Carnivore').length;
  const herbivores = likedDinos.filter(d => d.diet === 'Herbivore').length;
  if (carnivores >= 3) return PERSONALITIES.apex_predator;
  if (herbivores >= 3) return PERSONALITIES.gentle_giant;

  return PERSONALITIES.true_explorer;
}
