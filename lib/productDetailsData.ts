export interface ProductFullDetail {
  slug: string
  headline: string
  overview: string
  description: string
  keyFeatures: string[]
  healthBenefits: { title: string; desc: string }[]
  activeCompounds?: { compound: string; benefit: string }[]
  culinaryUses: string[]
  storageInfo: string
}

export const PRODUCT_FULL_DETAILS: Record<string, ProductFullDetail> = {
  'red-chilli-powder': {
    slug: 'red-chilli-powder',
    headline: 'Kura Gold Red Chilli Powder | Sun-Dried Fiery Heat & Deep Crimson Color',
    overview:
      'Sourced directly from the legendary chilli growing regions of Guntur and Telangana, Kura Gold Red Chilli Powder delivers the perfect balance of fiery heat and vibrant natural red color. Carefully sun-dried and ground at low temperatures to lock in natural capsaicin and essential oils.',
    description:
      'Our Red Chilli Powder is processed under strict hygienic standards without any added colors, synthetic oils, or preservatives. Every pinch brings authentic pungency and rich color to your daily curries, biryanis, marinades, and chutneys.',
    keyFeatures: [
      '100% Pure & Unadulterated: Free from Sudan Red, artificial dyes, or added chemicals.',
      'Sun-Dried Pods: Handpicked premium red chillies sun-dried for rich flavor retention.',
      'Cold-Milled Process: Low-temperature grinding preserves natural capsaicin and volatile oils.',
      'Vibrant Natural Color: Imparts a deep crimson color to dishes naturally without artificial color.',
      'Hygienically Sealed: Packed in food-grade moisture-lock pouches to retain freshness.',
    ],
    healthBenefits: [
      { title: 'Capsaicin Boost', desc: 'Natural capsaicin supports healthy metabolic rate and calorie burning.' },
      { title: 'Rich in Vitamin C & A', desc: 'Contains essential vitamins that support immunity and eye health.' },
      { title: 'Digestive Stimulation', desc: 'Promotes enzyme secretion and aids healthy gastric digestion.' },
      { title: 'Anti-Inflammatory', desc: 'Contains natural antioxidants that assist joint mobility and systemic wellness.' },
    ],
    activeCompounds: [
      { compound: 'Capsaicin', benefit: 'Provides natural heat, metabolic boost, and digestive support.' },
      { compound: 'Capsanthin', benefit: 'Delivers deep natural red color and antioxidant protection.' },
      { compound: 'Vitamin C & Beta-Carotene', benefit: 'Enhances cellular immunity and skin health.' },
    ],
    culinaryUses: [
      'Daily Curries & Gravies: Fundamental base for Hyderabadi mutton curry, chicken curry, and dal tadka.',
      'Tandoori Marinades: Ideal dry rub for tandoori chicken, fish fry, and paneer tikka.',
      'Spicy Dips & Pickles: Adds bold color and kick to Andhra style pickles and chutney blends.',
    ],
    storageInfo:
      'Store in a cool, dry place away from direct sunlight. Transfer to an airtight stainless steel or glass container after opening. Avoid moist spoons.',
  },

  'haldi-powder': {
    slug: 'haldi-powder',
    headline: 'Kura Gold Haldi Powder | High-Curcumin Golden Turmeric Powder',
    overview:
      'Sourced from premium turmeric rhizomes cultivated in rich Telangana soil, Kura Gold Haldi Powder is celebrated for its high natural curcumin content, golden hue, and therapeutic earthy aroma.',
    description:
      'Our turmeric powder undergoes minimal processing to preserve its potent curcuminoids and essential bio-compounds. Free from lead chromate, chalk powder, or artificial colorings, Kura Gold Haldi is as pure as nature intended.',
    keyFeatures: [
      'High Natural Curcumin: Naturally rich in curcuminoids for maximum wellness and warmth.',
      'Pure Finger Selection: Milled exclusively from polished, mature turmeric finger rhizomes.',
      'Zero Lead Chromate or Dyes: 100% unadulterated golden spice with zero chemical additives.',
      'Rich Earthy Aroma: Imparts authentic golden warmth and subtle aroma to everyday meals.',
      'Micro-Fine Milled: Smooth texture that dissolves seamlessly into warm milk, tea, or gravies.',
    ],
    healthBenefits: [
      { title: 'Potent Antioxidant', desc: 'Curcumin neutralizes free radicals and supports cellular health.' },
      { title: 'Anti-Inflammatory Power', desc: 'Supports joint comfort, muscle recovery, and overall vitality.' },
      { title: 'Immunity Shield', desc: 'Traditional Ayurvedic remedy for seasonal cold, cough, and throat relief.' },
      { title: 'Natural Detoxifier', desc: 'Promotes healthy liver function and natural blood purification.' },
    ],
    activeCompounds: [
      { compound: 'Curcumin', benefit: 'Primary anti-inflammatory compound providing health & golden color.' },
      { compound: 'Turmerone', benefit: 'Essential aromatic oil supporting brain and cellular health.' },
      { compound: 'Atractylone', benefit: 'Aids digestive wellness and metabolic balance.' },
    ],
    culinaryUses: [
      'Daily Cooking: Essential base for yellow dal, vegetable stir-fries, and biryani rice.',
      'Golden Turmeric Milk: Whisk 1/2 tsp into warm milk with black pepper and honey for bedtime wellness.',
      'Immunity Brew: Boil with ginger, cinnamon, and lemon for a morning wellness tea.',
    ],
    storageInfo:
      'Keep in a cool, dark pantry in a sealed airtight container. Exposure to direct light may fade natural curcumin color.',
  },

  'coriander-powder': {
    slug: 'coriander-powder',
    headline: 'Kura Gold Dhaniya Powder | Freshly Roasted Fragrant Coriander Powder',
    overview:
      'Kura Gold Dhaniya Powder is milled from slow-roasted, whole green coriander seeds. It offers a delightfully mild, sweet citrus aroma and nutty flavor that forms the heart of authentic Indian curry bases.',
    description:
      'We select plump, oil-rich coriander seeds and gently roast them before fine grinding. This locks in the aromatic linalool essential oils, providing thick, flavorful gravies without overwhelming heat.',
    keyFeatures: [
      'Slow-Roasted Seeds: Gently toasted to unlock subtle citrus-lemon fragrance.',
      'Gravy Thickener: Naturally adds body, rich texture, and consistency to curry gravies.',
      'Zero Starch Fillers: 100% pure coriander powder with no husk filler or synthetic scents.',
      'Essential Oil Locked: Rich in natural linalool for long-lasting aroma in cooking.',
      'Cooling Culinary Profile: Perfectly balances fiery chilli heat in heavy dishes.',
    ],
    healthBenefits: [
      { title: 'Digestive Comfort', desc: 'Helps soothe stomach lining, reduce bloating, and assist digestion.' },
      { title: 'Cholesterol Wellness', desc: 'Contains natural compounds that aid healthy lipid levels.' },
      { title: 'Blood Sugar Balance', desc: 'Supports healthy glucose metabolism naturally.' },
      { title: 'Cooling Properties', desc: 'Known in Ayurveda for balancing internal body heat (Pitta).' },
    ],
    activeCompounds: [
      { compound: 'Linalool', benefit: 'Aromatic essential oil providing citrus fragrance & stomach soothing.' },
      { compound: 'Geraniol', benefit: 'Natural antioxidant supporting gastrointestinal health.' },
      { compound: 'Flavonoic Acid', benefit: 'Supports cardiovascular wellness.' },
    ],
    culinaryUses: [
      'Curry Base: Combine with Haldi and Red Chilli for the foundational Indian gravy trinity.',
      'Sambar & Rasam: Key aromatic component in South Indian lentil soups and spice broths.',
      'Dry Vegetable Sabzi: Sprinkle over roasted aloo gobi, bhindi fry, and paneer dishes.',
    ],
    storageInfo:
      'Store in a tightly closed container away from heat and moisture to retain volatile aromatic oils.',
  },

  'combo-pack': {
    slug: 'combo-pack',
    headline: 'Kura Gold Essential Spice Trio | Red Chilli, Haldi & Dhaniya Pure Pack',
    overview:
      'The complete kitchen staple set! Kura Gold Essential Spice Trio combines our three core pure grounded spices — Red Chilli Powder, Haldi Powder, and Dhaniya Powder — giving you everything needed for daily authentic Indian cooking.',
    description:
      'Why buy individually when you can get the freshest trio together? Available in 3x100g and 3x500g configurations, this combo ensures your kitchen is always stocked with 100% pure, unadulterated spices at maximum value.',
    keyFeatures: [
      'Complete Kitchen Foundation: Covers 95% of daily Indian spice requirements.',
      'Maximum Value Savings: Economical bundle of farm-fresh pure grounded spices.',
      'Dual Pack Size Options: Available in 3x100g (₹117) and 3x500g (₹587) family packs.',
      'Guaranteed Unadulterated Purity: All 3 spices are 100% pure and FSSAI certified.',
      'Matching Freshness: Milled in synchronized small batches for consistent quality.',
    ],
    healthBenefits: [
      { title: 'Comprehensive Wellness', desc: 'Combines capsaicin heat, curcumin anti-inflammatory, and linalool digestive benefits.' },
      { title: 'Antioxidant Defense', desc: 'Triple antioxidant shield for daily health and immunity.' },
      { title: 'Pure Home Cooking', desc: 'Eliminates adulterated commercial spice risks for family health.' },
    ],
    culinaryUses: [
      'Daily 3-Spice Base: Use equal parts as the foundation for curries, dal, gravies, and marinades.',
      'Custom Blend Preparation: Combine to prepare fresh homemade kadai, sambar, and curry pastes.',
    ],
    storageInfo:
      'Keep unopened pouches in a cool dry area. Once opened, transfer each spice into its respective labeled airtight jar.',
  },

  'garam-masala': {
    slug: 'garam-masala',
    headline: 'Kura Gold Garam Masala | Royal Hyderabadi Whole Spice Garam Blend',
    overview:
      'An exquisite blend of 12 premium whole spices, hand-roasted and coarse ground to capture the authentic royal aroma of Hyderabadi cuisine.',
    description:
      'Featuring green cardamom, black cardamom, cinnamon bark, cloves, star anise, nutmeg, mace, cumin, and black pepper, Kura Gold Garam Masala adds warmth and complex aroma to finished dishes without bitterness.',
    keyFeatures: [
      '12 Whole Royal Spices: 100% whole spice blend with zero coriander or chilli fillers.',
      'Artisanal Roast: Gently toasted in small batches to release deep aromatic essential oils.',
      'Finishing Fragrance: Designed to be sprinkled at the end of cooking for captivating aroma.',
      'Authentic Telangana Recipe: Formulated following traditional royal kitchen ratios.',
    ],
    healthBenefits: [
      { title: 'Digestive Warmth', desc: 'Stimulates agni (digestive fire) and enhances nutrient absorption.' },
      { title: 'Metabolic Support', desc: 'Thermogenic whole spices assist natural calorie expenditure.' },
    ],
    culinaryUses: [
      'Finishing Touch: Sprinkle 1/2 tsp over mutton curry, paneer butter masala, or dal makhani in the last 2 minutes.',
      'Biryani Layering: Sprinkle over biryani rice layers before dum cooking.',
    ],
    storageInfo: 'Store in an airtight glass jar in a dark cabinet to preserve delicate aromatic notes.',
  },

  'chicken-biryani-masala': {
    slug: 'chicken-biryani-masala',
    headline: 'Kura Gold Chicken Biryani Masala | Authentic Hyderabadi Dum Biryani Blend',
    overview:
      'Crafted specifically for authentic Hyderabadi Chicken Dum Biryani. Combines aromatic whole spices, dried mint notes, saffron highlights, and balanced heat.',
    description:
      'Elevate home biryani to restaurant excellence. Our master formulation tenderizes chicken while infusing every grain of basmati rice with irresistible royal fragrance.',
    keyFeatures: [
      'Authentic Hyderabadi Recipe: Formulated for genuine dum biryani flavor.',
      'Balanced Spicing: Perfectly proportioned heat, floral notes, and warmth.',
      'Zero Preservatives: 100% natural spices without MSG or artificial flavor enhancers.',
    ],
    healthBenefits: [
      { title: 'Aromatic Digestion', desc: 'Whole spices like cardamom and clove reduce heavy meal bloating.' },
    ],
    culinaryUses: [
      'Chicken Biryani Marinade: Mix 2 tbsp with curd, ginger-garlic paste, and lemon juice for chicken marinade.',
      'Biryani Gravy Base: Add to onions and tomatoes when preparing the biryani masala base.',
    ],
    storageInfo: 'Keep sealed in an airtight container in a cool, dry pantry.',
  },

  'mutton-biryani-masala': {
    slug: 'mutton-biryani-masala',
    headline: 'Kura Gold Mutton Biryani Masala | Rich Royal Spice Blend for Slow-Cooked Meat',
    overview:
      'Formulated for slow-cooked mutton biryani and rich meat gravies. Infused with black cardamom, star anise, nutmeg, and mace for deep tenderization and aroma.',
    description:
      'Designed for rich, robust meats. The deep notes of nutmeg, black cardamom, and clove penetrate tender mutton cuts to deliver iconic Nizami flavor.',
    keyFeatures: [
      'Deep Flavor Profile: Rich whole spices engineered for long slow-cooking (Dum).',
      'Meat Tenderizing Notes: Natural spice enzymes assist in meat tenderness.',
      'Royal Court Heritage: Traditional ratio crafted by veteran Hyderabadi cooks.',
    ],
    healthBenefits: [
      { title: 'Gastric Support', desc: 'Nutmeg and mace aid gastric comfort during rich meat feasts.' },
    ],
    culinaryUses: [
      'Mutton Biryani Dum: Key spice mix for marinated mutton, layered with ghee basmati rice.',
      'Mutton Curry & Korma: Enhances slow-cooked mutton rassa and spicy meat kormas.',
    ],
    storageInfo: 'Store in a cool dry cabinet sealed away from moisture.',
  },

  'coriander-seeds': {
    slug: 'coriander-seeds',
    headline: 'Kura Gold Whole Coriander Seeds | Sun-Dried Aromatic Whole Seeds',
    overview:
      'Plump, sun-dried whole coriander seeds with citrusy essential oil aroma for tadka, pickles, and homemade spice grinding.',
    description:
      'Selected from clean, whole coriander harvests. Excellent for crush tempering in dal or grinding fresh spice powders at home.',
    keyFeatures: [
      'Whole Sun-Dried Seeds: Rich in natural essential oils and crisp texture.',
      'Multi-Purpose Spice: Ideal for crushing, roasting, or tempering.',
    ],
    healthBenefits: [
      { title: 'Digestive Tea', desc: 'Boil whole seeds in water for a refreshing digestive detox tea.' },
    ],
    culinaryUses: [
      'Tadka Tempering: Crack in warm oil for dal, kadai dishes, and kachori fillings.',
    ],
    storageInfo: 'Store in airtight containers in a cool dry pantry.',
  },

  'black-pepper': {
    slug: 'black-pepper',
    headline: 'Kura Gold Whole Black Pepper | Bold Premium Black Peppercorns',
    overview:
      'Bold, pungent black peppercorns packed with natural piperine for intense warmth and culinary depth.',
    description:
      'Harvested at peak maturity, our black peppercorns deliver sharp heat, woody aroma, and intense flavor for freshly cracked pepper mills.',
    keyFeatures: [
      'Bold Tellicherry Size: Uniform, oil-dense peppercorns with maximum bite.',
      'High Piperine Content: Strong natural heat and health benefits.',
    ],
    healthBenefits: [
      { title: 'Bioavailability Enhancer', desc: 'Piperine increases nutrient absorption (like curcumin in turmeric) by up to 2000%.' },
    ],
    culinaryUses: [
      'Fresh Grinding: Use in pepper mills for steaks, soups, rasam, and eggs.',
    ],
    storageInfo: 'Store in a dry airtight jar or direct pepper grinder canister.',
  },

  'cumin': {
    slug: 'cumin',
    headline: 'Kura Gold Whole Cumin Seeds | High-Oil Jeera Seeds',
    overview:
      'Selected whole jeera seeds rich in cuminaldehyde essential oil for tempered tadka and aromatic jeera rice.',
    description:
      'Clean, dark brown whole cumin seeds with an intense warm earthy aroma. Splutters perfectly in hot ghee to release classic Indian temper scent.',
    keyFeatures: [
      'Clean & Machine-Cleaned: Zero dust, stones, or foreign seeds.',
      'Rich Essential Oil: High cuminaldehyde for distinct earthy fragrance.',
    ],
    healthBenefits: [
      { title: 'Jeera Water Detox', desc: 'Soak overnight and boil for natural weight management and digestive ease.' },
    ],
    culinaryUses: [
      'Jeera Rice & Tadka: Splutter in hot ghee for rice, dal fry, and curries.',
    ],
    storageInfo: 'Keep sealed in an airtight container in a dry location.',
  },
}
