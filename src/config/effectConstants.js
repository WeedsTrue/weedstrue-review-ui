const USER_POST_EFFECT_TYPE = [
  // AID
  {
    value: 1,
    label: 'ADD/ADHD',
    description: 'AID',
    isPositive: true
  },
  {
    value: 2,
    label: "Alzheimer's",
    description: 'AID',
    isPositive: true
  },
  {
    value: 3,
    label: 'Anorexia',
    description: 'AID',
    isPositive: true
  },
  {
    value: 4,
    label: 'Anxiety',
    description: 'AID',
    isPositive: true
  },
  {
    value: 5,
    label: 'Arthritis',
    description: 'AID',
    isPositive: true
  },
  {
    value: 6,
    label: 'Asthma',
    description: 'AID',
    isPositive: true
  },
  {
    value: 7,
    label: 'Bipolar disorder',
    description: 'AID',
    isPositive: true
  },
  {
    value: 8,
    label: 'Cachexia',
    description: 'AID',
    isPositive: true
  },
  {
    value: 9,
    label: 'Cancer',
    description: 'AID',
    isPositive: true
  },
  {
    value: 10,
    label: 'Cramps',
    description: 'AID',
    isPositive: true
  },
  {
    value: 11,
    label: "Crohn's disease",
    description: 'AID',
    isPositive: true
  },
  {
    value: 12,
    label: 'Depression',
    description: 'AID',
    isPositive: true
  },
  {
    value: 13,
    label: 'Epilepsy',
    description: 'AID',
    isPositive: true
  },
  {
    value: 14,
    label: 'Eye pressure',
    description: 'AID',
    isPositive: true
  },
  {
    value: 15,
    label: 'Fatigue',
    description: 'AID',
    isPositive: true
  },
  {
    value: 16,
    label: 'Fibromyalgia',
    description: 'AID',
    isPositive: true
  },
  {
    value: 17,
    label: 'Gastrointestinal disorder',
    description: 'AID',
    isPositive: true
  },
  {
    value: 18,
    label: 'Glaucoma',
    description: 'AID',
    isPositive: true
  },
  {
    value: 19,
    label: 'Headaches',
    description: 'AID',
    isPositive: true
  },
  {
    value: 20,
    label: 'HIV/AIDS',
    description: 'AID',
    isPositive: true
  },
  {
    value: 21,
    label: 'Hypertension',
    description: 'AID',
    isPositive: true
  },

  // FEELINGS
  {
    value: 22,
    label: 'Anxious',
    description: 'FEELING',
    isPositive: false
  },
  {
    value: 23,
    label: 'Aroused',
    description: 'FEELING',
    isPositive: true
  },
  {
    value: 24,
    label: 'Creative',
    description: 'FEELING',
    isPositive: true
  },
  {
    value: 25,
    label: 'Dizzy',
    description: 'FEELING',
    isPositive: false
  },
  {
    value: 26,
    label: 'Dry Eyes',
    description: 'FEELING',
    isPositive: false
  },
  {
    value: 27,
    label: 'Dry Mouth',
    description: 'FEELING',
    isPositive: false
  },
  {
    value: 28,
    label: 'Energetic',
    description: 'FEELING',
    isPositive: true
  },
  {
    value: 29,
    label: 'Euphoric',
    description: 'FEELING',
    isPositive: true
  },
  {
    value: 30,
    label: 'Focused',
    description: 'FEELING',
    isPositive: true
  },
  {
    value: 31,
    label: 'Giggly',
    description: 'FEELING',
    isPositive: true
  },
  {
    value: 32,
    label: 'Happy',
    description: 'FEELING',
    isPositive: true
  },
  {
    value: 33,
    label: 'Headache',
    description: 'FEELING',
    isPositive: false
  },
  {
    value: 34,
    label: 'Hungry',
    description: 'FEELING',
    isPositive: true
  },
  {
    value: 35,
    label: 'Paranoid',
    description: 'FEELING',
    isPositive: false
  },
  {
    value: 36,
    label: 'Relaxed',
    description: 'FEELING',
    isPositive: true
  },
  {
    value: 37,
    label: 'Sleepy',
    description: 'FEELING',
    isPositive: true
  },
  {
    value: 38,
    label: 'Talkative',
    description: 'FEELING',
    isPositive: true
  },
  {
    value: 39,
    label: 'Tingly',
    description: 'FEELING',
    isPositive: true
  },
  {
    value: 40,
    label: 'Uplifted',
    description: 'FEELING',
    isPositive: true
  },

  // SMELL
  {
    value: 41,
    label: 'Ammonia',
    description: 'SMELL',
    isPositive: false
  },
  {
    value: 42,
    label: 'Apple',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 43,
    label: 'Apricot',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 44,
    label: 'Berry',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 45,
    label: 'Blue Cheese',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 46,
    label: 'Blueberry',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 47,
    label: 'Butter',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 48,
    label: 'Cheese',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 49,
    label: 'Chemical',
    description: 'SMELL',
    isPositive: false
  },
  {
    value: 50,
    label: 'Chestnut',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 51,
    label: 'Citrus',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 52,
    label: 'Coffee',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 53,
    label: 'Diesel',
    description: 'SMELL',
    isPositive: false
  },
  {
    value: 54,
    label: 'Earthy',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 55,
    label: 'Flowery',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 56,
    label: 'Grape',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 57,
    label: 'Grapefruit',
    description: 'SMELL',
    isPositive: true
  },
  {
    value: 58,
    label: 'Honey',
    description: 'SMELL',
    isPositive: true
  }
];

export { USER_POST_EFFECT_TYPE };
