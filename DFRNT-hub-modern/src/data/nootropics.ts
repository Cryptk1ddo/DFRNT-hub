export type Nootropic = {
  id: string;
  name: string;
  description: string;
  formula: string;
  formulaImageUrl: string;
  effects: string[];
  category: string;
  mechanisms: string;
  considerations: string;
};

export const nootropicsData: Nootropic[] = [
  {
    id: 'caffeine',
    name: 'Caffeine',
    description: `The world's most widely consumed psychoactive substance. It blocks adenosine receptors in the brain, preventing feelings of tiredness, and stimulates dopamine and norepinephrine production. Provides acute alertness and energy.`,
    formula: 'C8H10N4O2',
    formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Caffeine+Structure',
    effects: ['Alertness', 'Energy', 'Focus'],
    category: 'Stimulant',
    mechanisms: 'Adenosine receptor antagonism, dopamine/norepinephrine modulation',
    considerations: 'Potential for jitters, anxiety, and sleep disruption with high doses. Tolerance can develop.'
  },
  {
    id: 'modafinil',
    name: 'Modafinil',
    description: 'A prescription wakefulness-promoting agent (eugeroic) used to treat narcolepsy, sleep apnea, and shift work sleep disorder. It is often used off-label for cognitive enhancement, improving alertness, focus, and executive function.',
    formula: 'C15H15NO2S',
    formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Modafinil+Structure',
    effects: ['Wakefulness', 'Alertness', 'Focus', 'Executive Function'],
    category: 'Stimulant (Prescription)',
    mechanisms: 'Exact mechanism is unclear, but it modulates dopamine, norepinephrine, serotonin, histamine, and orexin systems without significant peripheral stimulant effects.',
    considerations: 'Prescription-only medication. Potential for dependence and abuse. Side effects include headache, nausea, anxiety, insomnia, and rare but serious skin reactions. Should only be used under medical supervision.'
  },
  {
    id: 'adderall',
    name: 'Adderall (Amphetamine/Dextroamphetamine)',
    description: 'A prescription central nervous system stimulant used primarily to treat ADHD and narcolepsy. It significantly increases dopamine and norepinephrine levels in the brain, leading to enhanced attention, focus, and impulse control.',
    formula: 'C9H13N (Amphetamine)',
    formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Adderall+Structure',
    effects: ['Attention', 'Focus', 'Impulse Control', 'Wakefulness'],
    category: 'Stimulant (Prescription)',
    mechanisms: 'Increases the release of dopamine and norepinephrine, and blocks their reuptake in the brain.',
    considerations: 'Prescription-only medication, classified as a Schedule II controlled substance due to high potential for abuse and dependence. Side effects include increased heart rate/blood pressure, insomnia, anxiety, psychosis, and addiction. Should ONLY be used under strict medical supervision for diagnosed conditions.'
  },
  {
    id: 'lTheanine',
    name: 'L-Theanine',
    description: 'An amino acid found naturally in green and black teas. It promotes a state of relaxation without inducing sedation and increases alpha brainwaves, associated with enhanced creativity and "relaxed alertness".',
    formula: 'C7H14N2O3',
    formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=L-Theanine+Structure',
    effects: ['Relaxed Alertness', 'Creativity', 'Calm Focus', 'Reduces jitters'],
    category: 'Amino Acid',
    mechanisms: 'Increases alpha brain waves, modulates neurotransmitters like GABA and serotonin.',
    considerations: 'Generally well-tolerated. May cause mild drowsiness in some individuals, best paired with stimulants for balanced effects.'
  },
  {
    id: 'creatine',
    name: 'Creatine',
    description: 'Widely known for muscle growth, but also crucial for fueling the brain\'s energy systems. It helps optimize ATP production, the brain\'s primary energy currency.',
    formula: 'C4H9N3O2',
    formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Creatine+Structure',
    effects: ['Memory', 'Focus', 'Neuroprotection', 'Enhanced Mental Performance'],
    category: 'Metabolic Support',
    mechanisms: 'Replenishes ATP, buffering energy supply in brain cells.',
    considerations: 'Ensure adequate hydration. May cause mild gastrointestinal discomfort in some individuals.'
  },
  {
    id: 'omega3',
    name: 'Omega-3 Fatty Acids (DHA/EPA)',
    description: 'Essential polyunsaturated fats abundant in fatty fish. Indispensable for optimal brain structure, function, and neuroplasticity. DHA is particularly vital for brain development.',
    formula: 'Complex, Varies (e.g., DHA: C22H32O2)',
    formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Omega-3+Complex+Structure',
    effects: ['Brain Development', 'Cognitive Protection', 'Anti-inflammatory', 'Neuroplasticity'],
    category: 'Essential Fatty Acid',
    mechanisms: 'Integrates into cell membranes, reduces inflammation, supports neurotransmitter function.',
    considerations: 'Choose high-quality, mercury-free sources. May cause fishy aftertaste or mild GI upset.'
  },
  {
    id: 'bacopaMonnieri',
    name: 'Bacopa Monnieri',
    description: 'A revered herb in Ayurvedic medicine, traditionally used to enhance memory and intelligence. It promotes neuroplasticity, including neurogenesis and synaptogenesis. Effects build over several weeks of consistent use.',
    formula: 'Contains Bacosides (Complex)',
    formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Bacopa+Complex+Structure',
    effects: ['Memory', 'Learning', 'Stress Reduction', 'Anxiety Relief', 'Neuroplasticity'],
    category: 'Herbal Adaptogen',
    mechanisms: 'Modulates neurotransmitters (acetylcholine, serotonin, dopamine), promotes dendrite proliferation, antioxidant.',
    considerations: 'Effects are cumulative; consistent daily use for weeks is required. May cause mild GI upset, fatigue.'
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    description: 'An adaptogenic plant used in Ayurvedic medicine, helping the body manage stress more effectively. It reduces cortisol levels and improves sleep quality, indirectly benefiting cognitive function.',
    formula: 'Contains Withanolides (Complex)',
    formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Ashwagandha+Complex+Structure',
    effects: ['Stress/Anxiety Reduction', 'Sleep Improvement', 'Memory', 'Cognitive Capacity', 'HPA Axis Regulation'],
    category: 'Herbal Adaptogen',
    mechanisms: 'Reduces cortisol, modulates GABA and serotonin, supports HPA axis function.',
    considerations: 'Generally well-tolerated, but can cause mild GI upset. Avoid if pregnant or breastfeeding, or with certain autoimmune conditions.'
  },
  {
    id: 'lionsMane',
    name: "Lion's Mane Mushroom",
    description: 'A unique fungus with a history in East Asian traditional medicine. It may possess neuroprotective effects and stimulate Nerve Growth Factor (NGF), supporting neurogenesis and nerve health.',
    formula: 'Contains Hericenones & Erinacines (Complex)',
    formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Lion%27s+Mane+Complex+Structure',
    effects: ['Neuroprotection', 'Mood Improvement', 'Cognition', 'Nerve Development'],
    category: 'Medicinal Mushroom',
    mechanisms: 'Stimulates NGF and BDNF, promoting neuronal growth and repair. Anti-inflammatory.',
    considerations: 'Generally safe. May cause mild stomach discomfort. Potential interaction with blood thinners.'
  },
  {
    id: 'piracetam',
    name: 'Piracetam',
    description: 'The first synthesized nootropic. It enhances communication between brain hemispheres, reduces inhibitory GABA, and increases oxygen levels in brain tissue. Effects can be subtle for healthy individuals, more pronounced in those with cognitive decline.',
    formula: 'C6H10N2O2',
    formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Piracetam+Structure',
    effects: ['Memory', 'Learning', 'Attention', 'Brain Communication'],
    category: 'Racetam (Synthetic)',
    mechanisms: 'Positive allosteric modulation of AMPA receptors, improves membrane fluidity.',
    considerations: 'Not FDA approved as a dietary supplement in the US. Often stacked with choline donors to prevent headaches. Legal status varies by country.'
  },
  {
    id: 'coluracetam',
    name: 'Coluracetam',
    description: 'A racetam that specifically increases choline uptake, especially in damaged neurons, leading to elevated acetylcholine levels. It also enhances AMPA potentiation, crucial for cognitive function. Research chemical status.',
    formula: 'C19H21N3O3S',
    formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Coluracetam+Structure',
    effects: ['Memory', 'Attention', 'Alertness'],
    category: 'Racetam (Synthetic)',
    mechanisms: 'High affinity choline uptake (HACU) enhancer, AMPA receptor potentiation.',
    considerations: 'Research chemical, limited human studies. Not for human consumption. Potential side effects similar to other racetams.'
  },
  {
    id: 'alphaGPC',
    name: 'Alpha-GPC',
    description: 'A compound that serves as a precursor to acetylcholine, providing the raw materials needed for synthesis of this crucial neurotransmitter. Readily crosses the blood-brain barrier. Essential for balancing racetam stacks.',
    formula: 'C8H20NO6P',
    formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Alpha-GPC+Structure',
    effects: ['Memory', 'Learning', 'Focus'],
    category: 'Choline Donor',
    mechanisms: 'Directly increases acetylcholine synthesis and release.',
    considerations: 'Generally safe. Essential when using racetams to prevent choline-depletion headaches.'
  }
]; 