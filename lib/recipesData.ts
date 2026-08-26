export interface Recipe {
  id: string
  title: string
  category: 'Biryani & Rice' | 'Royal Curries' | 'Quick Sabzi & Snacks' | 'Health & Wellness'
  prepTime: string
  cookTime: string
  servings: string
  difficulty: 'Easy' | 'Medium' | 'Master Chef'
  spiceLevel: string
  description: string
  image: string
  spicesUsed: { name: string; slug: string }[]
  ingredients: string[]
  instructions: string[]
  chefTip: string
  isFuture?: boolean
  futureProduct?: string
}

export const ACTIVE_RECIPES: Recipe[] = [
  {
    id: 'hyderabadi-chicken-dum-biryani',
    title: 'Authentic Hyderabadi Chicken Dum Biryani',
    category: 'Biryani & Rice',
    prepTime: '45 mins',
    cookTime: '40 mins',
    servings: '4-5 Persons',
    difficulty: 'Medium',
    spiceLevel: '🌶️🌶️🌶️ (Spicy)',
    description:
      'Fragrant long-grain Basmati rice layered with tender marinated chicken, fresh mint, caramelised onions, and authentic Kura Gold Red Chilli & Garam Masala.',
    image: '/recipes/recipe_hyderabadi_chicken_biryani.png',
    spicesUsed: [
      { name: 'Kura Gold Red Chilli Powder', slug: 'red-chilli-powder' },
      { name: 'Kura Gold Haldi Powder', slug: 'haldi-powder' },
      { name: 'Kura Gold Garam Masala', slug: 'garam-masala' },
    ],
    ingredients: [
      '750g Chicken (curry cut with bone)',
      '500g Premium Aged Basmati Rice',
      '2 tbsp Kura Gold Red Chilli Powder',
      '1 tsp Kura Gold Haldi Powder',
      '1.5 tbsp Kura Gold Garam Masala',
      '1 cup Thick Curd (Yogurt)',
      '1 cup Deep Fried Onions (Birista)',
      '1/2 cup Fresh Mint & Coriander leaves',
      '3 tbsp Pure Ghee & Saffron milk',
    ],
    instructions: [
      'Marinate cleaned chicken with curd, ginger-garlic paste, Kura Gold Red Chilli, Haldi, 1 tbsp Garam Masala, and salt for at least 1 hour.',
      'Boil Basmati rice in salted water with whole spices until 70% cooked, then drain.',
      'In a heavy biryani vessel, spread marinated chicken at the bottom, then layer 70% cooked rice evenly over the top.',
      'Garnish top rice layer with fried onions, mint, coriander, saffron milk, and pure ghee.',
      'Seal vessel with foil or dough and cook on medium flame for 10 mins, then low flame (dum) for 25 mins.',
      'Rest for 10 mins before fluffing and serving hot with mirchi ka salan and raita.',
    ],
    chefTip:
      'Sprinkle a pinch of Kura Gold Garam Masala right over the top rice layer before dum sealing for authentic royal Nizami aroma!',
  },

  {
    id: 'andhra-spicy-red-chilli-mutton-curry',
    title: 'Andhra Fiery Red Chilli Mutton Curry',
    category: 'Royal Curries',
    prepTime: '20 mins',
    cookTime: '50 mins',
    servings: '4 Persons',
    difficulty: 'Medium',
    spiceLevel: '🌶️🌶️🌶️🌶️ (Extra Fiery)',
    description:
      'Bold, authentic Andhra style mutton gravy prepared with sun-dried Kura Gold Red Chilli Powder, slow-roasted coriander, and fresh curry leaves.',
    image: '/recipes/recipe_andhra_mutton_curry.png',
    spicesUsed: [
      { name: 'Kura Gold Red Chilli Powder', slug: 'red-chilli-powder' },
      { name: 'Kura Gold Dhaniya Powder', slug: 'coriander-powder' },
      { name: 'Kura Gold Haldi Powder', slug: 'haldi-powder' },
    ],
    ingredients: [
      '500g Tender Mutton pieces',
      '2.5 tbsp Kura Gold Red Chilli Powder',
      '1.5 tbsp Kura Gold Dhaniya Powder',
      '1 tsp Kura Gold Haldi Powder',
      '2 Large Onions (finely sliced)',
      '2 Tomatoes (pureed)',
      '1 sprig Fresh Curry Leaves',
      '3 tbsp Groundnut Oil',
    ],
    instructions: [
      'Pressure cook mutton with Kura Gold Haldi Powder, 1/2 tsp salt, and 1 cup water for 4 whistles until meat is tender.',
      'Heat oil in a kadai, add curry leaves and sliced onions; saute until golden brown.',
      'Add tomato puree, Kura Gold Red Chilli Powder, and Kura Gold Dhaniya Powder. Saute until oil separates.',
      'Add cooked mutton along with its rich broth. Simmer on medium heat for 15 minutes until gravy thickens.',
      'Garnish with coriander leaves and serve hot with steamed rice or ragi sankati.',
    ],
    chefTip:
      'Use Guntur-origin Kura Gold Red Chilli Powder for the characteristic vibrant red color and authentic spicy Andhra punch.',
  },

  {
    id: 'golden-turmeric-dal-tadka',
    title: 'Golden Turmeric Dal Tadka',
    category: 'Quick Sabzi & Snacks',
    prepTime: '10 mins',
    cookTime: '20 mins',
    servings: '3-4 Persons',
    difficulty: 'Easy',
    spiceLevel: '🌶️ (Mild)',
    description:
      'Comforting yellow lentil soup infused with high-curcumin Kura Gold Haldi Powder, tempered with ghee cumin tadka.',
    image: '/recipes/recipe_golden_dal_tadka.png',
    spicesUsed: [
      { name: 'Kura Gold Haldi Powder', slug: 'haldi-powder' },
      { name: 'Kura Gold Dhaniya Powder', slug: 'coriander-powder' },
    ],
    ingredients: [
      '1 cup Toor Dal (Arhar Dal)',
      '1.5 tsp Kura Gold Haldi Powder',
      '1 tsp Kura Gold Dhaniya Powder',
      '2 tbsp Pure Desi Ghee',
      '1 tsp Cumin seeds & 2 Dry Red Chillies',
      '4 Cloves Garlic (minced)',
    ],
    instructions: [
      'Pressure cook toor dal with Kura Gold Haldi Powder, water, and salt for 3-4 whistles until smooth.',
      'Whisk cooked dal lightly for creamy consistency.',
      'Heat desi ghee in a tadka pan. Add cumin seeds, minced garlic, and dry red chillies until golden.',
      'Add Kura Gold Dhaniya Powder to ghee tadka for 5 seconds and pour immediately over hot dal.',
      'Cover with lid for 2 minutes to trap aromatic flavors before serving with hot basmati rice.',
    ],
    chefTip:
      'High-curcumin Kura Gold Haldi gives your dal a naturally rich golden tone without needing any artificial food dye.',
  },

  {
    id: 'aloo-gobi-dhaniya-fry',
    title: 'Aloo Gobi Dhaniya Fry',
    category: 'Quick Sabzi & Snacks',
    prepTime: '15 mins',
    cookTime: '20 mins',
    servings: '4 Persons',
    difficulty: 'Easy',
    spiceLevel: '🌶️🌶️ (Medium)',
    description:
      'Crispy golden potato cubes and tender cauliflower florets tossed with slow-roasted Kura Gold Dhaniya Powder.',
    image: '/recipes/recipe_aloo_gobi_fry.png',
    spicesUsed: [
      { name: 'Kura Gold Dhaniya Powder', slug: 'coriander-powder' },
      { name: 'Kura Gold Red Chilli Powder', slug: 'red-chilli-powder' },
      { name: 'Kura Gold Haldi Powder', slug: 'haldi-powder' },
    ],
    ingredients: [
      '2 Medium Potatoes (diced)',
      '1 Medium Cauliflower (cut into florets)',
      '2 tbsp Kura Gold Dhaniya Powder',
      '1 tsp Kura Gold Red Chilli Powder',
      '1/2 tsp Kura Gold Haldi Powder',
      '2 tbsp Mustard Oil',
    ],
    instructions: [
      'Heat mustard oil till smoking point. Add diced potatoes and cauliflower florets; pan fry on medium heat until golden and 80% cooked.',
      'Sprinkle Kura Gold Haldi, Red Chilli Powder, and salt. Stir gently to coat vegetables.',
      'Add 2 full tbsp of aromatic Kura Gold Dhaniya Powder last and roast on low flame for 5 minutes until crisp.',
      'Garnish with chopped fresh coriander leaves and ginger juliennes. Serve with hot phulkas or parathas.',
    ],
    chefTip:
      'Adding Kura Gold Dhaniya Powder towards the end creates a delicious roasted spice crust over potatoes without burning.',
  },
]

export const FUTURE_RECIPES: Recipe[] = [
  {
    id: 'future-hyderabadi-mutton-dum-biryani',
    title: 'Hyderabadi Special Mutton Dum Biryani Masterclass',
    category: 'Biryani & Rice',
    prepTime: '60 mins',
    cookTime: '60 mins',
    servings: '6 Persons',
    difficulty: 'Master Chef',
    spiceLevel: '🌶️🌶️🌶️ (Royal Spicy)',
    description:
      'A legendary Nizami royal recipe slow-cooked on dum, formulated to be paired with our upcoming Kura Gold Mutton Biryani Masala.',
    image: '/recipes/recipe_mutton_biryani_masterclass.png',
    spicesUsed: [{ name: 'Kura Gold Mutton Biryani Masala', slug: 'mutton-biryani-masala' }],
    ingredients: ['1kg Tender Mutton', '750g Basmati Rice', 'Kura Gold Mutton Biryani Masala', 'Pure Ghee & Saffron'],
    instructions: [
      'Marinate mutton overnight with raw papaya paste, curd, and Kura Gold Mutton Biryani Masala.',
      'Layer with fragrant Basmati rice and slow cook on dum for 60 minutes.',
    ],
    chefTip: 'Recipe & step-by-step masterclass video dropping soon with product launch!',
    isFuture: true,
    futureProduct: 'Kura Gold Mutton Biryani Masala',
  },

  {
    id: 'future-nizami-garam-masala-chicken-korma',
    title: 'Nizami Garam Masala Royal Chicken Korma',
    category: 'Royal Curries',
    prepTime: '30 mins',
    cookTime: '35 mins',
    servings: '4-5 Persons',
    difficulty: 'Medium',
    spiceLevel: '🌶️🌶️ (Aromatic)',
    description:
      'Velvety cashew gravy enriched with 12 whole royal spices from our upcoming Kura Gold Garam Masala.',
    image: '/recipes/recipe_chicken_korma.png',
    spicesUsed: [{ name: 'Kura Gold Garam Masala', slug: 'garam-masala' }],
    ingredients: ['750g Chicken', 'Kura Gold Garam Masala', 'Cashew Paste & Fresh Cream'],
    instructions: [
      'Cook chicken in rich cashew-onion paste and finish with 1 tsp Kura Gold Garam Masala.',
    ],
    chefTip: 'Full step-by-step masterclass launching with Garam Masala release.',
    isFuture: true,
    futureProduct: 'Kura Gold Garam Masala',
  },

  {
    id: 'future-black-pepper-chicken-roast',
    title: 'Chettinad Spicy Black Pepper Chicken Roast',
    category: 'Quick Sabzi & Snacks',
    prepTime: '20 mins',
    cookTime: '25 mins',
    servings: '4 Persons',
    difficulty: 'Easy',
    spiceLevel: '🌶️🌶️🌶️ (Pungent Pepper Heat)',
    description:
      'Fiery dry chicken roast made with freshly cracked bold Tellicherry black peppercorns.',
    image: '/recipes/recipe_pepper_chicken_roast.png',
    spicesUsed: [{ name: 'Kura Gold Black Pepper', slug: 'black-pepper' }],
    ingredients: ['500g Boneless Chicken', 'Coarse Kura Gold Black Pepper', 'Curry Leaves & Shallots'],
    instructions: [
      'Pan roast chicken with shallots, curry leaves, and freshly cracked black pepper.',
    ],
    chefTip: 'Launching soon with our Whole Peppercorn collection!',
    isFuture: true,
    futureProduct: 'Kura Gold Black Pepper',
  },
]
