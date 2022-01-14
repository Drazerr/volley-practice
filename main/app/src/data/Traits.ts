export type Trait = {
  predicate: string;
  description: string;
};

export type Traits = {
  experience: Trait[];
  conscientious: Trait[];
  extraversion: Trait[];
  agreeableness: Trait[];
  neuroticism: Trait[];
};

/**
 * Big Five personality traits
 * Each factor is a scale of different predicates and descriptions for that
 *  factor
 */
const DEFAULT_TRAITS: Traits = {
  experience: [
    {
      predicate: "have an imaginative side",
      description:
        "Your pasta art wasn't put on the fridge. It was framed, auctioned, and studied.",
    },
    {
      predicate: "may be considered curious to a fault",
      description:
        'When you hear someone say that "curiosity killed the cat", you can\'t help but think that it must have been worth it.',
    },
    {
      predicate: "like to learn new things",
      description: "",
    },
    {
      predicate: "prefer routine",
      description: "",
    },
    {
      predicate: "lean on the cautious side",
      description:
        "But you lean only a little. You wouldn't wan't to lose your balance.",
    },
    {
      predicate: "maintain consistency",
      description:
        "You say no to a drink after your Friday night date since it's past your bedtime.",
    },
  ],
  conscientious: [
    {
      predicate: "have a knack for procrastination",
      description:
        "Your iPhone has stopped bothering to ask if you want to install updates.",
    },
    {
      predicate: "have a taste for the extravagant things in life",
      description: "Every party should be a Gatsby party.",
    },
    {
      predicate: "are a bit disorganized",
      description: "",
    },
    {
      predicate: "are a careful person",
      description: "",
    },
    {
      predicate: "like to stay organized",
      description:
        "You never understood what the big deal was with Marie Kondo.",
    },
    {
      predicate: "like to be as efficient as possible",
      description: "Your fridge has not fresh ingredients. Only Soylent.",
    },
  ],
  extraversion: [
    {
      predicate: "dislike making small talk",
      description: "YOU DON'T THINK BIG TALK IS THAT GREAT EITHER.",
    },
    {
      predicate: "prefer not to be the center of attention",
      description: "Don't worry, we can talk about something else soon.",
    },
    {
      predicate: "a little more reserved",
      description: "A good night is a night on the couch with your cat.",
    },
    {
      predicate: "like to go out with friends",
      description: "",
    },
    {
      predicate: "find it easy to make new friends",
      description:
        "Scientists are still waiting on you to share the design of your synthetic womb.",
    },
    {
      predicate: "like to start conversations",
      description: "And you don't seem to like to end them.",
    },
  ],
  agreeableness: [
    {
      predicate: 'are what they call "hard-headed"',
      description: "But no one dares to say that to your hard-face.",
    },
    {
      predicate: "can often be quite skeptical",
      description: "In fact, it's a wonder why you're reading this.",
    },
    {
      predicate: "are a trusting person",
      description:
        "Maybe I should tell you that all this name-mumbo-jumbo is--oh, nevermind.",
    },
    {
      predicate: "don't like to cooperate sometimes",
      description: "",
    },
    {
      predicate:
        "like to help people when you can, sometimes to your own despair",
      description: "On an unrelated note, do you have a few dollars to spare?",
    },
    {
      predicate: "are considered one of the friendliest people around",
      description: "And everyone you encounter is lucky to have met you.",
    },
  ],
  neuroticism: [
    {
      predicate: "ooze confidence",
      description: "Someone ought to get a mop.",
    },
    {
      predicate: "don't have strong emotions overcome you very often",
      description: "Have you been working out?",
    },
    {
      predicate: "are a glass half-full kind of guy",
      description: "",
    },
    {
      predicate: "are a glass half-empty kind of guy",
      description: "",
    },
    {
      predicate: "could be a little sensitive sometimes",
      description: "I'm sorry for saying that. Please don't be mad.",
    },
    {
      predicate: "worry about a lot of things",
      description: "Try to just do your best and focus on the here and now.",
    },
  ],
};

export default DEFAULT_TRAITS;
