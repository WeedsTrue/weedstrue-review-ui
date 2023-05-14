import {
  Apple,
  Bolt,
  Bottle,
  BrandPeanut,
  Bread,
  Bulb,
  Cheese,
  Cherry,
  Coffee,
  Eye,
  FirstAidKit,
  Flask,
  Flower,
  Focus2,
  GasStation,
  Hearts,
  Lemon,
  Lemon2,
  Messages,
  MoodCry,
  MoodNervous,
  MoodSmile,
  MoodSmileBeam,
  MoodWrrr,
  MoodXd,
  Ripple,
  Salad,
  Shovel,
  Sofa,
  Spiral,
  Star,
  Stars,
  Zzz
} from 'tabler-icons-react';

const USER_POST_EFFECT_TYPE = [
  // AID
  {
    value: 1,
    label: 'ADD/ADHD',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 2,
    label: "Alzheimer's",
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 3,
    label: 'Anorexia',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 4,
    label: 'Anxiety',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 5,
    label: 'Arthritis',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 6,
    label: 'Asthma',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 7,
    label: 'Bipolar disorder',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 8,
    label: 'Cachexia',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 9,
    label: 'Cancer',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 10,
    label: 'Cramps',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 11,
    label: "Crohn's disease",
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 12,
    label: 'Depression',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 13,
    label: 'Epilepsy',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 14,
    label: 'Eye pressure',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 15,
    label: 'Fatigue',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 16,
    label: 'Fibromyalgia',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 17,
    label: 'Gastrointestinal disorder',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 18,
    label: 'Glaucoma',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 19,
    label: 'Headaches',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 20,
    label: 'HIV/AIDS',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },
  {
    value: 21,
    label: 'Hypertension',
    description: 'AID',
    icon: FirstAidKit,
    isPositive: true
  },

  // FEELINGS
  {
    value: 22,
    label: 'Anxious',
    description: 'FEELING',
    icon: MoodCry,
    isPositive: false
  },
  {
    value: 23,
    label: 'Aroused',
    description: 'FEELING',
    icon: Hearts,
    isPositive: true
  },
  {
    value: 24,
    label: 'Creative',
    description: 'FEELING',
    icon: Bulb,
    isPositive: true
  },
  {
    value: 25,
    label: 'Dizzy',
    description: 'FEELING',
    icon: Spiral,
    isPositive: false
  },
  {
    value: 26,
    label: 'Dry Eyes',
    description: 'FEELING',
    icon: Eye,
    isPositive: false
  },
  {
    value: 27,
    label: 'Dry Mouth',
    description: 'FEELING',
    icon: Bottle,
    isPositive: false
  },
  {
    value: 28,
    label: 'Energetic',
    description: 'FEELING',
    icon: Bolt,
    isPositive: true
  },
  {
    value: 29,
    label: 'Euphoric',
    description: 'FEELING',
    icon: Star,
    isPositive: true
  },
  {
    value: 30,
    label: 'Focused',
    description: 'FEELING',
    icon: Focus2,
    isPositive: true
  },
  {
    value: 31,
    label: 'Giggly',
    description: 'FEELING',
    icon: MoodXd,
    isPositive: true
  },
  {
    value: 32,
    label: 'Happy',
    description: 'FEELING',
    icon: MoodSmile,
    isPositive: true
  },
  {
    value: 33,
    label: 'Headache',
    description: 'FEELING',
    icon: MoodWrrr,
    isPositive: false
  },
  {
    value: 34,
    label: 'Hungry',
    description: 'FEELING',
    icon: Salad,
    isPositive: true
  },
  {
    value: 35,
    label: 'Paranoid',
    description: 'FEELING',
    icon: MoodNervous,
    isPositive: false
  },
  {
    value: 36,
    label: 'Relaxed',
    description: 'FEELING',
    icon: Sofa,
    isPositive: true
  },
  {
    value: 37,
    label: 'Sleepy',
    description: 'FEELING',
    icon: Zzz,
    isPositive: true
  },
  {
    value: 38,
    label: 'Talkative',
    description: 'FEELING',
    icon: Messages,
    isPositive: true
  },
  {
    value: 39,
    label: 'Tingly',
    description: 'FEELING',
    icon: Stars,
    isPositive: true
  },
  {
    value: 40,
    label: 'Uplifted',
    description: 'FEELING',
    icon: MoodSmileBeam,
    isPositive: true
  },

  // SMELL
  {
    value: 41,
    label: 'Ammonia',
    description: 'SMELL',
    icon: Ripple,
    isPositive: false
  },
  {
    value: 42,
    label: 'Apple',
    description: 'SMELL',
    icon: Apple,
    isPositive: true
  },
  {
    value: 43,
    label: 'Apricot',
    description: 'SMELL',
    icon: Apple,
    isPositive: true
  },
  {
    value: 44,
    label: 'Berry',
    description: 'SMELL',
    icon: Cherry,
    isPositive: true
  },
  {
    value: 45,
    label: 'Blue Cheese',
    description: 'SMELL',
    icon: Cheese,
    isPositive: true
  },
  {
    value: 46,
    label: 'Blueberry',
    description: 'SMELL',
    icon: Cherry,
    isPositive: true
  },
  {
    value: 47,
    label: 'Butter',
    description: 'SMELL',
    icon: Bread,
    isPositive: true
  },
  {
    value: 48,
    label: 'Cheese',
    description: 'SMELL',
    icon: Cheese,
    isPositive: true
  },
  {
    value: 49,
    label: 'Chemical',
    description: 'SMELL',
    icon: Flask,
    isPositive: false
  },
  {
    value: 50,
    label: 'Chestnut',
    description: 'SMELL',
    icon: BrandPeanut,
    isPositive: true
  },
  {
    value: 51,
    label: 'Citrus',
    description: 'SMELL',
    icon: Lemon2,
    isPositive: true
  },
  {
    value: 52,
    label: 'Coffee',
    description: 'SMELL',
    icon: Coffee,
    isPositive: true
  },
  {
    value: 53,
    label: 'Diesel',
    description: 'SMELL',
    icon: GasStation,
    isPositive: false
  },
  {
    value: 54,
    label: 'Earthy',
    description: 'SMELL',
    icon: Shovel,
    isPositive: true
  },
  {
    value: 55,
    label: 'Flowery',
    description: 'SMELL',
    icon: Flower,
    isPositive: true
  },
  {
    value: 56,
    label: 'Grape',
    description: 'SMELL',
    icon: Cherry,
    isPositive: true
  },
  {
    value: 57,
    label: 'Grapefruit',
    description: 'SMELL',
    icon: Lemon,
    isPositive: true
  },
  {
    value: 58,
    label: 'Honey',
    description: 'SMELL',
    icon: Flower,
    isPositive: true
  }
];

export { USER_POST_EFFECT_TYPE };
