// Destructure React hooks for browser use
const { useState, useEffect } = React;

// Add custom CSS for sliders
const sliderStyles = `
    .slider::-webkit-slider-thumb {
        appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #ea580c;
        cursor: pointer;
        box-shadow: 0 0 10px rgba(234, 88, 12, 0.3);
    }
    
    .slider::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #ea580c;
        cursor: pointer;
        border: none;
        box-shadow: 0 0 10px rgba(234, 88, 12, 0.3);
    }
    
    .slider::-webkit-slider-track {
        background: #374151;
        border-radius: 8px;
        height: 8px;
    }
    
    .slider::-moz-range-track {
        background: #374151;
        border-radius: 8px;
        height: 8px;
        border: none;
    }
`;

    // Main App Component
    const App = () => {
        const [view, setView] = useState('nootropics'); // 'nootropics', 'binauralBeats', 'pomodoro', 'training', 'bravermanTest'
        const [selectedGoal, setSelectedGoal] = useState(null);
        const [showModal, setShowModal] = useState(false); // State for modal visibility
        const [selectedNootropicForModal, setSelectedNootropicForModal] = useState(null); // State for nootropic in modal
        const [bravermanResults, setBravermanResults] = useState(null); // State for Braverman test results

        // Telegram Web App Integration
        useEffect(() => {
            // Check if running in Telegram Web App
            if (window.Telegram && window.Telegram.WebApp) {
                const tg = window.Telegram.WebApp;
                tg.ready();
                tg.expand();
                
                // Set theme colors
                tg.setHeaderColor('#ea580c');
                tg.setBackgroundColor('#111827');
                
                // Enable closing confirmation
                tg.enableClosingConfirmation();
                
                console.log('Telegram Web App initialized');
            }
        }, []);

    // Navigation component
    const Navigation = () => (
        <nav className="bg-gray-900 border-b border-orange-800 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-orange-400">Productivity Hub</h1>
                    </div>
                    <div className="flex space-x-1">
                        <NavButton
                            active={view === 'nootropics'}
                            onClick={() => setView('nootropics')}
                            icon="🧠"
                            label="Nootropics"
                        />
                        <NavButton
                            active={view === 'binauralBeats'}
                            onClick={() => setView('binauralBeats')}
                            icon="🎵"
                            label="Binaural Beats"
                        />
                        <NavButton
                            active={view === 'pomodoro'}
                            onClick={() => setView('pomodoro')}
                            icon="⏰"
                            label="Pomodoro"
                        />
                        <NavButton
                            active={view === 'training'}
                            onClick={() => setView('training')}
                            icon="💪"
                            label="Training"
                        />
                        <NavButton
                            active={view === 'bravermanTest'}
                            onClick={() => setView('bravermanTest')}
                            icon="🧬"
                            label="Brain Type"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );

    const NavButton = ({ active, onClick, icon, label }) => (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                active
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-orange-400 hover:bg-gray-800'
            }`}
        >
            <span className="text-lg">{icon}</span>
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    // Data for Nootropic Library and Stacks
    const nootropicsData = [
        {
            id: 'caffeine',
            name: 'Caffeine',
            description: 'The world\'s most widely consumed psychoactive substance. It blocks adenosine receptors in the brain, preventing feelings of tiredness, and stimulates dopamine and norepinephrine production. Provides acute alertness and energy.',
            formula: 'C8H10N4O2',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Caffeine+Structure', // Dark theme placeholder with red-orange text
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
            name: 'Lion\'s Mane Mushroom',
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
        },
        {
            id: 'citicoline',
            name: 'Citicoline (CDP-Choline)',
            description: 'Another compound that provides choline, a precursor to acetylcholine. Supports brain function and is involved in phospholipid synthesis, essential for cell membrane health. May also increase dopamine receptor density.',
            formula: 'C14H26N4O11P2',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Citicoline+Structure',
            effects: ['Memory', 'Brain Function', 'Learning', 'Focus'],
            category: 'Choline Donor',
            mechanisms: 'Increases acetylcholine synthesis, supports phospholipid synthesis for neuronal membranes, may increase dopamine receptor density.',
            considerations: 'Generally well-tolerated. Can cause mild GI upset, headache. Potential for stimulant-like effects at high doses.'
        },
        {
            id: 'phenylpiracetam',
            name: 'Phenylpiracetam',
            description: 'A more potent derivative of Piracetam, known for its stimulant-like effects on focus, motivation, and physical performance. Users often report increased energy and drive. Often used for demanding cognitive tasks.',
            formula: 'C12H14N2O2',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Phenylpiracetam+Structure',
            effects: ['Focus', 'Motivation', 'Physical Performance', 'Energetic Drive'],
            category: 'Racetam (Synthetic)',
            mechanisms: 'Modulates dopamine and norepinephrine, affects acetylcholine system. Has a phenyl group allowing easier blood-brain barrier crossing.',
            considerations: 'Potent; start with low doses. May cause insomnia or overstimulation. Potential for tolerance development. Not FDA approved.'
        },
        {
            id: 'nalt',
            name: 'N-Acetyl L-Tyrosine (NALT)',
            description: 'A highly bioavailable form of L-Tyrosine, an amino acid precursor to dopamine and norepinephrine. Useful for maintaining cognitive performance under stressful or demanding situations, as stress depletes these neurotransmitters.',
            formula: 'C11H13NO5',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=NALT+Structure',
            effects: ['Cognitive Performance Under Stress', 'Dopamine Support', 'Focus', 'Resilience'],
            category: 'Amino Acid',
            mechanisms: 'Provides building blocks for dopamine and norepinephrine synthesis, which are critical for stress response and cognitive function.',
            considerations: 'Most effective when neurotransmitter levels are depleted (e.g., during stress, sleep deprivation). Less noticeable effects in a rested state.'
        },
        {
            id: 'rhodiolaRosea',
            name: 'Rhodiola Rosea',
            description: 'An adaptogenic herb that helps the body adapt to stress, reducing fatigue and improving mood and cognitive performance, especially under stressful conditions. Also known for endurance support and mental clarity.',
            formula: 'Contains Rosavins & Salidroside (Complex)',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Rhodiola+Complex+Structure',
            effects: ['Stress Reduction', 'Fatigue Reduction', 'Mood Improvement', 'Cognitive Performance Under Stress', 'Endurance'],
            category: 'Herbal Adaptogen',
            mechanisms: 'Influences monoamine neurotransmitters (dopamine, serotonin, norepinephrine) and reduces stress hormone (cortisol) response.',
            considerations: 'Generally well-tolerated. May cause overstimulation if taken too late in the day. Look for extracts standardized for rosavins and salidroside.'
        },
        {
            id: 'vinpocetine',
            name: 'Vinpocetine',
            description: 'A synthetic derivative of the Vinca minor plant. It acts as a vasodilator, widening blood vessels to enhance cerebral blood flow, increasing delivery of oxygen and nutrients to brain cells. May also have neuroprotective properties.',
            formula: 'C22H26N2O2',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Vinpocetine+Structure',
            effects: ['Increased Cerebral Blood Flow', 'Oxygen Delivery', 'Nutrient Delivery to Brain', 'Neuroprotection'],
            category: 'Vascular Agent (Synthetic)',
            mechanisms: 'Increases ATP production in brain, inhibits phosphodiesterase type 1 (PDE1), improving blood flow.',
            considerations: 'Avoid if on blood thinners or blood pressure medication. Not recommended for pregnant or breastfeeding women. Mild side effects like dizziness, nausea, stomach ache.'
        },
        {
            id: 'magnesiumLThreonate',
            name: 'Magnesium L-Threonate',
            description: 'A unique form of magnesium specifically designed to cross the blood-brain barrier effectively. It is thought to enhance synaptic plasticity and improve memory, particularly beneficial for brain magnesium levels and sleep quality.',
            formula: 'C8H14MgO10',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Mag+L-Threonate+Structure',
            effects: ['Memory Improvement', 'Synaptic Plasticity', 'Brain Magnesium Levels', 'Sleep Quality'],
            category: 'Mineral',
            mechanisms: 'Increases magnesium concentrations in the brain, supporting synaptic density and plasticity.',
            considerations: 'Generally well-tolerated. High doses of any magnesium can cause GI issues. Often taken in the evening to aid sleep.'
        },
        {
            id: 'vitaminD3',
            name: 'Vitamin D3 (Cholecalciferol)',
            description: 'Often called the "sunshine vitamin," Vitamin D3 is crucial for bone health, immune function, and plays a significant role in various endocrine functions, indirectly supporting hormonal balance. Many people are deficient.',
            formula: 'C27H44O',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Vitamin+D3+Structure',
            effects: ['Immune Support', 'Bone Health', 'Mood Regulation', 'Indirect Hormonal Support'],
            category: 'Vitamin',
            mechanisms: 'Acts as a prohormone, influencing gene expression in various tissues, including those involved in hormone production and immune response.',
            considerations: 'Best taken with a fatty meal for absorption. Monitor levels with blood tests. High doses can lead to toxicity.'
        },
        {
            id: 'zinc',
            name: 'Zinc',
            description: 'An essential trace mineral vital for over 300 enzymatic reactions in the body. It plays a critical role in immune function, protein synthesis, DNA repair, and is important for healthy testosterone production and overall endocrine function. Common deficiency.',
            formula: 'Zn',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Zinc+Structure',
            effects: ['Immune Support', 'Hormonal Balance', 'Cell Growth & Repair', 'Metabolism'],
            category: 'Mineral',
            mechanisms: 'Cofactor for numerous enzymes, involved in testosterone synthesis, immune cell function, and antioxidant defense.',
            considerations: 'Avoid high doses, as it can interfere with copper absorption. Best taken with food to reduce nausea. Common deficiency, especially in vegetarians.'
        },
        {
            id: 'tongkatAli',
            name: 'Tongkat Ali (Eurycoma longifolia)',
            description: 'An herbal remedy from Southeast Asia, traditionally used to enhance male vitality and libido. It is believed to support healthy testosterone levels by reducing cortisol (stress hormone) and influencing specific pathways, improving the testosterone-to-cortisol ratio.',
            formula: 'Contains Quassinoids (Complex)',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Tongkat+Ali+Complex+Structure',
            effects: ['Male Vitality', 'Libido', 'Stress Reduction', 'Mood'],
            category: 'Herbal Extract',
            mechanisms: 'Increases free testosterone by reducing sex hormone-binding globulin (SHBG) and inhibiting aromatase. Reduces stress hormones.',
            considerations: 'May cause insomnia or irritability in some individuals. Start with lower doses. Effects are often subtle and require consistent use.'
        },
        {
            id: 'dim',
            name: 'DIM (Diindolylmethane)',
            description: 'A compound naturally found in cruciferous vegetables like broccoli and cauliflower. It helps promote healthy estrogen metabolism by converting "bad" estrogens into "good" forms, contributing to hormonal balance for both men and women. Supports cellular health.',
            formula: 'C9H9NO',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=DIM+Structure',
            effects: ['Estrogen Metabolism', 'Hormonal Balance', 'Antioxidant', 'Cellular Health'],
            category: 'Metabolite',
            mechanisms: 'Promotes beneficial estrogen metabolites (2-hydroxy estrogens) over less favorable ones (16-hydroxy estrogens).',
            considerations: 'May cause urine darkening (harmless). Avoid if pregnant or breastfeeding. Consult a doctor if on hormonal medications.'
        },
        {
            id: 'pterostilbene',
            name: 'Pterostilbene',
            description: 'A stilbenoid, structurally similar to resveratrol, found in blueberries. It is a powerful antioxidant and anti-inflammatory agent, believed to have neuroprotective effects and support cellular health. Higher bioavailability than resveratrol.',
            formula: 'C14H12O3',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Pterostilbene+Structure',
            effects: ['Antioxidant', 'Anti-inflammatory', 'Neuroprotection', 'Cellular Health'],
            category: 'Flavonoid/Polyphenol',
            mechanisms: 'Activates sirtuins (longevity pathways), reduces oxidative stress, modulates inflammatory pathways.',
            considerations: 'Generally safe. Research is ongoing; long-term effects not fully understood. May interact with blood thinners.'
        },
        {
            id: 'sulbutiamine',
            name: 'Sulbutiamine',
            description: 'A synthetic derivative of Thiamine (Vitamin B1). It is lipophilic, allowing it to cross the blood-brain barrier more effectively than Thiamine, and is often used for reducing fatigue, improving memory, and boosting mood. May enhance cholinergic and dopaminergic systems.',
            formula: 'C32H46N8O6S2',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Sulbutiamine+Structure',
            effects: ['Fatigue Reduction', 'Memory', 'Alertness', 'Mood'],
            category: 'Synthetic Vitamin Derivative',
            mechanisms: 'Increases thiamine levels in the brain, modulates cholinergic and dopaminergic systems.',
            considerations: 'Short-term use is generally safe. Potential for mild overstimulation or sleep disturbances. Tolerance may develop with prolonged daily use, cycling often recommended.'
        },
        {
            id: 'ginkgoBiloba',
            name: 'Ginkgo Biloba',
            description: 'One of the oldest living tree species, its leaves are used in traditional medicine. It is known to improve blood flow to the brain, act as an antioxidant, and may support memory and cognitive speed. Often used for age-related cognitive decline.',
            formula: 'Contains Flavonoids & Terpenoids (Complex)',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Ginkgo+Complex+Structure',
            effects: ['Cerebral Blood Flow', 'Memory', 'Antioxidant', 'Cognitive Speed'],
            category: 'Herbal Extract',
            mechanisms: 'Acts as a vasodilator, improves blood rheology, scavenges free radicals, inhibits platelet aggregation.',
            considerations: 'May interact with blood thinners. Mild side effects include headache, nausea, dizziness. Effects may take weeks to become noticeable.'
        },
        {
            id: 'semax',
            name: 'Semax',
            description: 'A synthetic peptide derived from a fragment of ACTH. It is extensively studied for its nootropic and neuroprotective effects, including improving memory, attention, and executive function. Often administered intranasally. Classified as a research chemical outside clinical settings.',
            formula: 'C37H51N9O10S',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Semax+Structure',
            effects: ['Memory', 'Attention', 'Executive Function', 'Neuroprotection', 'Mood Improvement'],
            category: 'Peptide (Synthetic)',
            mechanisms: 'Modulates brain-derived neurotrophic factor (BDNF), enhances activity of brain neurotransmitter systems (dopamine, serotonin, acetylcholine).',
            considerations: 'Research chemical status. Not approved for human use outside of specific countries (e.g., Russia). Limited long-term safety data.'
        },
        {
            id: 'selank',
            name: 'Selank',
            description: 'A synthetic peptide with anxiolytic (anti-anxiety) and nootropic properties. It is believed to modulate the immune system and increase levels of brain-derived neurotrophic factor (BDNF), supporting neuroplasticity and stress resilience. Often administered intranasally.',
            formula: 'C33H57N11O9',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Selank+Structure',
            effects: ['Anxiety Reduction', 'Stress Resilience', 'Cognitive Enhancement', 'Mood', 'Immune Modulation'],
            category: 'Peptide (Synthetic)',
            mechanisms: 'Modulates GABAergic and serotonergic systems, increases BDNF, influences immune-related peptides.',
            considerations: 'Research chemical status. Not approved for human use outside of specific countries. Limited long-term safety data.'
        },
        {
            id: 'bpc157',
            name: 'BPC-157',
            description: 'A synthetic peptide derived from human gastric juice. While primarily known for its regenerative and healing properties across various tissues (muscles, tendons, gut), it also exhibits neuroprotective effects and may indirectly support brain health by reducing systemic inflammation. Classified as a research chemical.',
            formula: 'C62H98N16O22',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=BPC-157+Structure',
            effects: ['Tissue Healing', 'Anti-inflammatory', 'Neuroprotection (indirect)', 'Gut Health'],
            category: 'Peptide (Synthetic)',
            mechanisms: 'Promotes angiogenesis, modulates growth factors and nitric oxide synthesis, anti-inflammatory.',
            considerations: 'Research chemical status. Not approved for human use. Limited clinical data on long-term effects. Often administered via injection or orally.'
        },
        {
            id: 'vitaminBComplex',
            name: 'Vitamin B Complex (Overview)',
            description: 'A group of essential water-soluble vitamins vital for cellular metabolism, energy production, and the proper functioning of the nervous system. Individual B vitamins play distinct yet interconnected roles in brain health.',
            formula: 'Complex, Varies',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Vitamin+B+Complex',
            effects: ['Overall Energy Metabolism', 'Neurotransmitter Support', 'Nervous System Health'],
            category: 'Vitamin',
            mechanisms: 'Co-factors in enzymatic reactions critical for energy production, DNA synthesis, and neurotransmitter formation.',
            considerations: 'While generally safe, high doses of individual B vitamins can have specific adverse effects. Best obtained from a balanced diet and/or a well-formulated complex unless a specific deficiency is present.'
        },
        {
            id: 'vitaminB1',
            name: 'Vitamin B1 (Thiamine)',
            description: 'Essential for energy metabolism, converting carbohydrates into energy. Crucial for nerve function and brain health. Deficiency can lead to cognitive impairment (e.g., Wernicke-Korsakoff syndrome).',
            formula: 'C12H17N4OS+',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Thiamine+Structure',
            effects: ['Energy Production', 'Nerve Function', 'Cognitive Clarity'],
            category: 'Vitamin',
            mechanisms: 'Key coenzyme in glucose metabolism (e.g., pyruvate dehydrogenase, alpha-ketoglutarate dehydrogenase). Essential for neurotransmitter synthesis.',
            considerations: 'Water-soluble, excess is excreted. Generally non-toxic even at high doses. Deficiency more common in alcoholics or those with malabsorption issues.'
        },
        {
            id: 'vitaminB2',
            name: 'Vitamin B2 (Riboflavin)',
            description: 'Plays a central role in energy metabolism and cellular respiration. Important for healthy vision, skin, and nervous system function. Acts as a precursor for FAD and FMN coenzymes.',
            formula: 'C17H20N4O6',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Riboflavin+Structure',
            effects: ['Energy Production', 'Cellular Respiration', 'Antioxidant Support'],
            category: 'Vitamin',
            mechanisms: 'Precursor to flavin adenine dinucleotide (FAD) and flavin mononucleotide (FMN), which are crucial for electron transport chain and redox reactions.',
            considerations: 'Water-soluble. Generally safe. High doses may cause bright yellow urine (harmless). Light sensitive, so store supplements in opaque containers.'
        },
        {
            id: 'vitaminB3',
            name: 'Vitamin B3 (Niacin / Nicotinic Acid / Niacinamide)',
            description: 'Crucial for energy metabolism, DNA repair, and antioxidant defense. Used therapeutically to lower cholesterol. Can cause a "niacin flush" (redness, itching, tingling) depending on the form.',
            formula: 'C6H5NO2 (Nicotinic Acid)',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Niacin+Structure',
            effects: ['Energy Metabolism', 'DNA Repair', 'Antioxidant Defense', 'Cholesterol Regulation'],
            category: 'Vitamin',
            mechanisms: 'Precursor to NAD+ and NADP+, critical coenzymes in over 400 enzymatic reactions involved in energy production and redox processes.',
            considerations: 'Nicotinic acid (one form of B3) can cause a temporary "flush." Niacinamide (another form) generally does not. High doses can cause liver damage, especially with sustained-release forms. Consult doctor before high-dose use.'
        },
        {
            id: 'vitaminB5',
            name: 'Vitamin B5 (Pantothenic Acid)',
            description: 'Essential for the synthesis of coenzyme A (CoA), which is vital for fatty acid metabolism and the synthesis of neurotransmitters, hormones, and hemoglobin. Supports adrenal function and stress response.',
            formula: 'C9H17NO5',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Pantothenic+Acid+Structure',
            effects: ['Energy Metabolism', 'Neurotransmitter Synthesis', 'Hormone Production', 'Stress Response'],
            category: 'Vitamin',
            mechanisms: 'Component of coenzyme A, essential for the Krebs cycle (energy production), and acetylcholine synthesis.',
            considerations: 'Water-soluble. Generally considered very safe, even at high doses. Deficiency is rare due to its widespread presence in foods.'
        },
        {
            id: 'vitaminB6',
            name: 'Vitamin B6 (Pyridoxine / P5P)',
            description: 'Crucial for neurotransmitter synthesis (dopamine, serotonin, GABA), amino acid metabolism, and red blood cell formation. Supports cognitive function and mood regulation. Pyridoxal 5\'-phosphate (P5P) is its active form.',
            formula: 'C8H11NO3 (Pyridoxine)',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Pyridoxine+Structure',
            effects: ['Neurotransmitter Synthesis', 'Mood Regulation', 'Cognitive Function', 'Energy Metabolism'],
            category: 'Vitamin',
            mechanisms: 'Coenzyme for over 100 enzymatic reactions, including decarboxylation for neurotransmitter synthesis and transamination for amino acid metabolism.',
            considerations: 'Water-soluble. High doses (over ~200mg/day long-term) can cause peripheral neuropathy (nerve damage), though this is usually reversible upon discontinuation. Best used in active P5P form.'
        },
        {
            id: 'vitaminB7',
            name: 'Vitamin B7 (Biotin)',
            description: 'Plays a role in fatty acid synthesis, amino acid metabolism, and gluconeogenesis (glucose production). Best known for its support of healthy hair, skin, and nails, but also contributes to nervous system function.',
            formula: 'C10H16N2O3S',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Biotin+Structure',
            effects: ['Metabolic Health', 'Hair/Skin/Nail Health', 'Nervous System Support'],
            category: 'Vitamin',
            mechanisms: 'Cofactor for carboxylase enzymes involved in major metabolic pathways (fat, protein, carb metabolism).',
            considerations: 'Water-soluble. Generally very safe, even at high doses. Can interfere with certain lab tests (e.g., thyroid hormones, troponin), leading to falsely high or low results.'
        },
        {
            id: 'vitaminB9',
            name: 'Vitamin B9 (Folate / Folic Acid)',
            description: 'Essential for DNA synthesis and repair, cell growth, and red blood cell formation. Crucial for neural tube development during pregnancy. Works with B12 to reduce homocysteine, supporting cardiovascular and brain health. L-Methylfolate is its active form.',
            formula: 'C19H19N7O6 (Folic Acid)',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Folic+Acid+Structure',
            effects: ['DNA Synthesis', 'Cell Growth', 'Brain Health', 'Mood Regulation (indirect)', 'Homocysteine Reduction'],
            category: 'Vitamin',
            mechanisms: 'Coenzyme in one-carbon metabolism, crucial for nucleotide synthesis (DNA/RNA) and methylation reactions (important for neurotransmitter synthesis).',
            considerations: 'Folic acid (synthetic) needs conversion to active L-Methylfolate. Some individuals have MTHFR gene variations affecting this conversion. High doses of folic acid can mask B12 deficiency. Best to use folate or L-Methylfolate.'
        },
        {
            id: 'vitaminB12',
            name: 'Vitamin B12 (Cobalamin)',
            description: 'Vital for nerve tissue health, brain function, and red blood cell production. Essential for DNA synthesis and works with folate to reduce homocysteine levels. Deficiency can lead to severe neurological and cognitive issues.',
            formula: 'C63H88CoN14O14P',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Cobalamin+Structure',
            effects: ['Nerve Health', 'Brain Function', 'Energy Production', 'DNA Synthesis', 'Homocysteine Reduction'],
            category: 'Vitamin',
            mechanisms: 'Coenzyme in two key metabolic pathways: methylmalonyl-CoA mutase (energy) and methionine synthase (folate metabolism, homocysteine recycling, S-adenosylmethionine for methylation).',
            considerations: 'Water-soluble. Generally safe even at high doses. Oral absorption can be poor, especially for older adults or those with digestive issues (e.g., pernicious anemia). Common deficiency in vegetarians/vegans. Injections or sublingual forms may be needed.'
        },
        {
            id: 'iron',
            name: 'Iron',
            description: 'An essential mineral crucial for oxygen transport in the blood (hemoglobin) and for various metabolic processes, including energy production in the brain. Iron deficiency can lead to fatigue, impaired cognitive function, and restless leg syndrome.',
            formula: 'Fe',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Iron+Structure',
            effects: ['Oxygen Transport', 'Energy Production', 'Cognitive Function (prevents deficiency)', 'Red Blood Cell Formation'],
            category: 'Mineral',
            mechanisms: 'Component of hemoglobin (oxygen transport) and various enzymes involved in oxidative phosphorylation and neurotransmitter synthesis.',
            considerations: 'Do not supplement unless diagnosed with deficiency, as iron overload can be toxic. May cause constipation or stomach upset.'
        },
        {
            id: 'selenium',
            name: 'Selenium',
            description: 'A trace mineral with powerful antioxidant properties, important for thyroid function, immune health, and protecting the brain from oxidative damage. It plays a role in cognitive health and may offer neuroprotective benefits. Often deficient in modern diets.',
            formula: 'Se',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Selenium+Structure',
            effects: ['Antioxidant', 'Thyroid Function', 'Immune Support', 'Neuroprotection'],
            category: 'Mineral',
            mechanisms: 'Component of selenoproteins, which have antioxidant and anti-inflammatory roles. Essential for thyroid hormone metabolism.',
            considerations: 'Excessive intake can lead to selenium toxicity (selenosis), characterized by hair loss, nail brittleness, and neurological symptoms.'
        },
        {
            id: 'potassium',
            name: 'Potassium',
            description: 'An essential electrolyte critical for maintaining fluid balance, nerve signals, and muscle contractions. While not a direct nootropic, its role in nerve function and blood pressure regulation indirectly supports overall brain health and electrical signaling.',
            formula: 'K',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Potassium+Structure',
            effects: ['Electrolyte Balance', 'Nerve Function', 'Muscle Contraction', 'Blood Pressure Regulation'],
            category: 'Mineral',
            mechanisms: 'Maintains resting membrane potential in neurons, essential for nerve impulse transmission and muscle contraction.',
            considerations: 'Usually obtained sufficiently through diet. Supplementation should be approached with caution, especially if on certain medications or with kidney issues, due to risk of hyperkalemia.'
        },
        {
            id: 'vitaminC',
            name: 'Vitamin C (Ascorbic Acid)',
            description: 'A powerful antioxidant and essential cofactor for various enzymatic reactions, including the synthesis of neurotransmitters like norepinephrine. Crucial for immune function and collagen production.',
            formula: 'C6H8O6',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Vitamin+C+Structure',
            effects: ['Antioxidant', 'Immune Support', 'Neurotransmitter Production', 'Mood Regulation', 'Collagen Synthesis'],
            category: 'Vitamin',
            mechanisms: 'Potent electron donor, involved in hydroxylation reactions for dopamine beta-hydroxylase and collagen synthesis. Reduces oxidative stress.',
            considerations: 'Generally safe; high doses (over 2g) may cause gastrointestinal upset, diarrhea. Risk of kidney stones in susceptible individuals. Water-soluble, so excess is typically excreted.'
        },
        {
            id: 'vitaminE',
            name: 'Vitamin E (Tocopherols & Tocotrienols)',
            description: 'A group of fat-soluble vitamins with potent antioxidant properties. Primarily protects cell membranes from oxidative damage caused by free radicals. Important for immune function and skin health.',
            formula: 'Complex',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Vitamin+E+Structure',
            effects: ['Antioxidant', 'Cell Protection', 'Immune Function', 'Skin Health', 'Anti-inflammatory'],
            category: 'Vitamin',
            mechanisms: 'Lipid-soluble antioxidant, integrates into cell membranes to prevent lipid peroxidation.',
            considerations: 'Generally safe within recommended daily allowances. High doses can increase bleeding risk, especially for individuals on anticoagulant medications. Store away from light and heat as it degrades easily.'
        },
        {
            id: 'vitaminK',
            name: 'Vitamin K (K1 & K2)',
            description: 'Essential for blood clotting and bone health. Vitamin K2 (menaquinones, e.g., MK-4, MK-7) is gaining recognition for its role in cardiovascular health and its emerging, indirect contributions to brain health.',
            formula: 'Complex',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Vitamin+K+Structure',
            effects: ['Blood Clotting', 'Bone Health', 'Cardiovascular Health', 'Potential Brain Health'],
            category: 'Vitamin',
            mechanisms: 'Cofactor for gamma-carboxylation of proteins (e.g., osteocalcin, matrix Gla protein) involved in calcium regulation and coagulation. K2 may protect brain cells from oxidative stress and inflammation.',
            considerations: 'Strong interaction with blood-thinning medications (e.g., Warfarin); consult a doctor before supplementing. Generally safe from food sources. High doses are rarely toxic but can interfere with certain medications.'
        },
        {
            id: 'vitaminA',
            name: 'Vitamin A (Retinoids & Carotenoids)',
            description: 'A fat-soluble vitamin crucial for vision, immune function, cell growth, and differentiation. Important for healthy skin and mucous membranes. Plays a role in neurodevelopment and maintaining cognitive function.',
            formula: 'Complex',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Vitamin+A+Structure',
            effects: ['Vision', 'Immune Function', 'Cell Growth', 'Brain Development', 'Skin Health'],
            category: 'Vitamin',
            mechanisms: 'Active forms (retinoids) bind to nuclear receptors, influencing gene expression critical for neural development, synaptic plasticity, and antioxidant defense.',
            considerations: 'Excessive intake of preformed Vitamin A (retinoids) can be toxic (hypervitaminosis A), leading to liver damage, bone issues, and birth defects. Carotenoids (e.g., beta-carotene) are generally safe. Avoid high-dose supplementation without medical supervision.'
        },
        {
            id: 'melatonin',
            name: 'Melatonin',
            description: 'A hormone primarily produced by the pineal gland, crucial for regulating the sleep-wake cycle (circadian rhythm). While not a nootropic in the traditional sense, optimizing sleep is fundamental for cognitive function.',
            formula: 'C13H16N2O2',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Melatonin+Structure',
            effects: ['Sleep Regulation', 'Antioxidant', 'Circadian Rhythm Sync'],
            category: 'Hormone (Endogenous)',
            mechanisms: 'Binds to melatonin receptors in the brain (MT1, MT2), signaling darkness and promoting sleep onset. Also acts as a powerful antioxidant.',
            considerations: 'Can cause drowsiness, dizziness, nausea. May interact with blood thinners, immunosuppressants, and diabetes medications. Use cautiously; effects on endogenous production with long-term use are debated. Always consult a doctor.'
        },
        {
            id: 'testosterone',
            name: 'Testosterone (Endogenous)',
            description: 'The primary male sex hormone, also present in females. Essential for reproductive development, muscle growth, bone density, and influences mood, energy, and cognitive functions like spatial memory and attention.',
            formula: 'C19H28O2',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Testosterone+Structure',
            effects: ['Muscle Mass', 'Bone Density', 'Mood', 'Energy', 'Cognitive Function (spatial memory)'],
            category: 'Hormone (Endogenous)',
            mechanisms: 'Androgen receptor activation, influencing gene expression in various tissues. Indirectly modulated by stress and sleep.',
            considerations: 'Direct supplementation (e.g., TRT) should ONLY be done under strict medical supervision and for diagnosed deficiency. Supplements like Tongkat Ali may indirectly support healthy levels by modulating other pathways. Side effects of direct therapy are significant.'
        },
        {
            id: 'estrogen',
            name: 'Estrogen (Endogenous)',
            description: 'The primary female sex hormone, also present in males. Crucial for reproductive health, bone density, and influences mood, cognition, and cardiovascular health. Plays a role in memory and neuroprotection in females.',
            formula: 'C18H24O2 (Estradiol)',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Estrogen+Structure',
            effects: ['Reproductive Health', 'Bone Density', 'Mood', 'Cognition (memory)', 'Cardiovascular Health'],
            category: 'Hormone (Endogenous)',
            mechanisms: 'Estrogen receptor activation, influencing gene expression. Important for synaptic plasticity and neuroprotection.',
            considerations: 'Direct supplementation (e.g., HRT) should ONLY be done under strict medical supervision. Supplements like DIM may indirectly support healthy estrogen metabolism. Imbalances can have significant health impacts.'
        },
        {
            id: 'cortisol',
            name: 'Cortisol (Endogenous)',
            description: 'A primary stress hormone produced by the adrenal glands. Essential for regulating metabolism, immune response, and helping the body respond to stress. Chronic high levels can negatively impact cognitive function and overall health.',
            formula: 'C21H30O5',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Cortisol+Structure',
            effects: ['Stress Response', 'Metabolism Regulation', 'Inflammation Control'],
            category: 'Hormone (Endogenous)',
            mechanisms: 'Binds to glucocorticoid receptors, influencing gene expression. Part of the HPA axis regulating stress.',
            considerations: 'Elevated chronic cortisol can impair memory, sleep, and immune function. Adaptogens like Ashwagandha and Rhodiola Rosea aim to modulate the body\'s stress response, indirectly supporting healthy cortisol levels. Direct manipulation is complex and risky.'
        },
        {
            id: 'dhea',
            name: 'DHEA (Dehydroepiandrosterone)',
            description: 'A steroid hormone produced by the adrenal glands, serving as a precursor to other hormones like testosterone and estrogen. Levels naturally decline with age. May influence mood, energy, and libido.',
            formula: 'C19H28O2',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=DHEA+Structure',
            effects: ['Hormone Precursor', 'Mood', 'Energy', 'Libido', 'Bone Density (indirect)'],
            category: 'Hormone (Endogenous)',
            mechanisms: 'Converted into androgens and estrogens. Also acts as a neurosteroid, directly influencing brain receptors.',
            considerations: 'Often marketed as an anti-aging supplement, but evidence is mixed. Direct supplementation should only be considered under medical guidance and with regular monitoring due to potential for hormonal imbalances and side effects (e.g., acne, hair loss, mood changes).'
        },
        {
            id: 'dopamineNT',
            name: 'Dopamine (Endogenous Neurotransmitter)',
            description: 'A crucial neurotransmitter and hormone in the brain, essential for reward, motivation, pleasure, motor control, and executive functions like attention and decision-making.',
            formula: 'C8H11NO2',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Dopamine+Structure',
            effects: ['Motivation', 'Reward', 'Pleasure', 'Focus', 'Motor Control'],
            category: 'Neurotransmitter (Endogenous)',
            mechanisms: 'Activates dopamine receptors (D1-D5), influencing neuronal signaling pathways related to reward circuitry and executive control. Precursors include L-Tyrosine (NALT).',
            considerations: 'Direct oral supplementation is ineffective as it does not cross the blood-brain barrier. Many nootropics (e.g., stimulants, NALT) aim to modulate its synthesis, release, or receptor sensitivity. Imbalances are linked to various neurological and psychological conditions.'
        },
        {
            id: 'serotoninNT',
            name: 'Serotonin (Endogenous Neurotransmitter)',
            description: 'A key neurotransmitter that influences mood, well-being, happiness, sleep, digestion, and appetite. Plays a significant role in emotional regulation and stress response.',
            formula: 'C10H12N2O',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Serotonin+Structure',
            effects: ['Mood Regulation', 'Well-being', 'Sleep Quality', 'Appetite Control', 'Emotional Stability'],
            category: 'Neurotransmitter (Endogenous)',
            mechanisms: 'Activates various serotonin receptors (5-HT receptors), influencing neuronal activity in widespread brain regions. Precursor is L-Tryptophan (or 5-HTP).',
            considerations: 'Direct oral supplementation is ineffective as it does not cross the blood-brain barrier. Supplements like 5-HTP (a precursor) can increase brain serotonin. Interactions with antidepressants (SSRIs) can be serious (serotonin syndrome).'
        },
        {
            id: 'gabaNT',
            name: 'GABA (Gamma-Aminobutyric Acid - Endogenous Neurotransmitter)',
            description: 'The primary inhibitory neurotransmitter in the central nervous system. It reduces neuronal excitability throughout the nervous system, promoting calmness, relaxation, and reducing anxiety and stress.',
            formula: 'C4H9NO2',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=GABA+Structure',
            effects: ['Calmness', 'Relaxation', 'Anxiety Reduction', 'Stress Relief', 'Sleep Support'],
            category: 'Neurotransmitter (Endogenous)',
            mechanisms: 'Binds to GABA receptors (GABA-A, GABA-B), increasing chloride ion influx into neurons, leading to hyperpolarization and reduced excitability.',
            considerations: 'Oral GABA generally does not effectively cross the blood-brain barrier. Some supplements (e.g., L-Theanine, certain adaptogens) can modulate GABAergic activity or enhance GABA production. Often targeted by anxiolytic medications.'
        },
        {
            id: 'glutamateNT',
            name: 'Glutamate (Endogenous Neurotransmitter)',
            description: 'The primary excitatory neurotransmitter in the central nervous system. Crucial for learning, memory, synaptic plasticity, and long-term potentiation (LTP), the cellular basis of learning.',
            formula: 'C5H9NO4',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Glutamate+Structure',
            effects: ['Learning', 'Memory Formation', 'Synaptic Plasticity', 'Cognitive Processing'],
            category: 'Neurotransmitter (Endogenous)',
            mechanisms: 'Activates various glutamate receptors (AMPA, NMDA, Kainate), leading to neuronal depolarization and excitatory signaling. Imbalances can lead to excitotoxicity or cognitive impairment.',
            considerations: 'Too much glutamate can be neurotoxic ("excitotoxicity"). Nootropics like racetams often modulate glutamate receptors. Direct oral supplementation is not practical for brain effects; it\'s primarily a dietary amino acid.'
        },
        {
            id: 'acetylcholineNT',
            name: 'Acetylcholine (Endogenous Neurotransmitter)',
            description: 'A vital neurotransmitter involved in memory, learning, attention, and muscle contraction. It is the primary neurotransmitter of the parasympathetic nervous system and a key player in cognitive processes.',
            formula: 'C7H16NO2+',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Acetylcholine+Structure',
            effects: ['Memory', 'Learning', 'Attention', 'Muscle Control', 'Cognitive Processing'],
            category: 'Neurotransmitter (Endogenous)',
            mechanisms: 'Activates nicotinic and muscarinic acetylcholine receptors, influencing diverse brain functions. Synthesized from choline (Alpha-GPC, Citicoline are precursors).',
            considerations: 'Crucial for memory function; decline is implicated in Alzheimer\'s disease. Supplements often focus on providing precursors (choline donors) or inhibiting its breakdown (acetylcholinesterase inhibitors). Direct oral supplementation is ineffective.'
        },
        {
            id: 'magnesiumLThreonate',
            name: 'Magnesium L-Threonate',
            description: 'A unique form of magnesium that can cross the blood-brain barrier more effectively than other forms. It supports cognitive function, memory, and learning by increasing magnesium levels in the brain.',
            formula: 'C8H16MgO10',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Magnesium+L-Threonate+Structure',
            effects: ['Memory', 'Learning', 'Cognitive Function', 'Sleep Quality', 'Stress Reduction'],
            category: 'Mineral',
            mechanisms: 'Increases magnesium levels in the brain, supports synaptic plasticity, enhances NMDA receptor function, and promotes neurogenesis.',
            considerations: 'Generally well-tolerated. May cause mild GI upset. Take in the evening for better sleep benefits. Ensure adequate calcium intake as magnesium and calcium work together.'
        },
        {
            id: 'vitaminD3',
            name: 'Vitamin D3 (Cholecalciferol)',
            description: 'A fat-soluble vitamin that acts as a hormone in the body. Essential for numerous bodily functions including brain health, mood regulation, and immune function.',
            formula: 'C27H44O',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Vitamin+D3+Structure',
            effects: ['Mood Support', 'Immune Function', 'Bone Health', 'Cognitive Function', 'Hormonal Balance'],
            category: 'Vitamin',
            mechanisms: 'Binds to vitamin D receptors throughout the body, including the brain. Supports serotonin production, regulates calcium absorption, and modulates immune responses.',
            considerations: 'Best absorbed with fat-containing meals. Many people are deficient, especially in winter months or with limited sun exposure. Regular blood testing recommended to monitor levels.'
        },
        {
            id: 'zinc',
            name: 'Zinc',
            description: 'An essential trace mineral involved in over 300 enzymatic reactions in the body. Critical for brain function, immune health, and numerous metabolic processes.',
            formula: 'Zn',
            formulaImageUrl: 'https://placehold.co/200x80/2A2A2A/FF8C00?text=Zinc+Element',
            effects: ['Immune Support', 'Cognitive Function', 'Hormonal Balance', 'Antioxidant', 'Wound Healing'],
            category: 'Mineral',
            mechanisms: 'Cofactor for numerous enzymes, supports neurotransmitter function, regulates gene expression, and acts as an antioxidant.',
            considerations: 'Take on empty stomach for better absorption. May cause nausea if taken without food. Avoid taking with calcium or iron supplements as they can interfere with absorption.'
        }
    ];

    const recommendations = {
        energyEndurance: {
            goal: 'More Energy and Physical Endurance',
            stack: [
                { id: 'caffeine', dosage: '200mg' },
                { id: 'lTheanine', dosage: '400mg' },
                { id: 'creatine', dosage: '5g' },
                { id: 'nalt', dosage: '500mg-1g' },
                { id: 'rhodiolaRosea', dosage: '200-400mg' }
            ],
            blueprint: `
                <p class="font-semibold text-lg mb-2 text-orange-400">Blueprint for Energy & Endurance:</p>
                <ul class="list-disc list-inside text-gray-300 space-y-2">
                    <li><strong class="font-medium">Morning (Pre-Workout/Early Day):</strong> Caffeine (200mg) + L-Theanine (400mg). This 1:2 ratio creates focused energy without jitters.</li>
                    <li><strong class="font-medium">Pre-Workout (30-60 mins before):</strong> Creatine (5g), N-Acetyl L-Tyrosine (500mg-1g), Rhodiola Rosea (200-400mg). This combination fuels your muscles and mind, enhancing resilience under physical stress.</li>
                    <li><strong class="font-medium">Foundational Habits:</b> Prioritize 7-9 hours of consistent, quality sleep. Hydrate generously throughout the day. Maintain a balanced diet rich in complex carbohydrates and lean proteins to sustain energy levels.</li>
                </ul>
                <p class="mt-4 text-sm text-gray-400 italic">
                    <strong class="text-orange-400">Analogy:</strong> This stack is like upgrading your internal engine (Creatine for ATP), optimizing fuel delivery (NALT for neurotransmitters), and installing a high-performance cooling system (L-Theanine, Rhodiola for stress) to maximize output and recovery.
                </p>
            `
        },
        cognitiveMemory: {
            goal: 'Cognitive Boost and Memory Enhancement',
            stack: [
                { id: 'bacopaMonnieri', dosage: '300-600mg' },
                { id: 'citicoline', dosage: '250-500mg' },
                { id: 'omega3', dosage: '1g EPA+DHA' },
                { id: 'lionsMane', dosage: '1g-3g' }
            ],
            blueprint: `
                <p class="font-semibold text-lg mb-2 text-orange-400">Blueprint for Cognitive & Memory Enhancement:</p>
                <ul class="list-disc list-inside text-gray-300 space-y-2">
                    <li><strong class="font-medium">Daily Consistency:</strong> Take Bacopa Monnieri (300-600mg), Citicoline (250-500mg), Omega-3s (e.g., 1g EPA+DHA), and Lion's Mane Mushroom (1g-3g). The effects of Bacopa and Lion's Mane build over several weeks of consistent use.</li>
                    <li><strong class="font-medium">Foundational Habits:</strong> Engage in continuous learning (e.g., a new language, musical instrument, or skill). Practice mindfulness or meditation to reduce mental clutter. Ensure adequate, high-quality sleep nightly, as sleep is crucial for memory consolidation and cognitive repair.</li>
                </ul>
                <p class="mt-4 text-sm text-gray-400 italic">
                    <strong class="text-orange-400">Analogy:</strong> This stack is like upgrading your brain's operating system (Citicoline for Acetylcholine), installing robust memory storage (Bacopa), ensuring premium hardware (Omega-3s), and enabling continuous software updates (Lion's Mane for neurogenesis).
                </p>
            `
        },
        hormonalUpregulation: {
            goal: 'Hormonal Balance & Vitality Support',
            stack: [
                { id: 'ashwagandha', dosage: '300-600mg (evening)' },
                { id: 'rhodiolaRosea', dosage: '200-400mg (morning)' },
                { id: 'omega3', dosage: '1g EPA+DHA' },
                { id: 'magnesiumLThreonate', dosage: '145mg elemental Magnesium (evening)' },
                { id: 'vitaminD3', dosage: '2000-5000 IU' },
                { id: 'zinc', dosage: '15-30mg' },
                { id: 'tongkatAli', dosage: '200-400mg' },
                { id: 'dim', dosage: '100-200mg' }
            ],
            blueprint: `
                <p class="font-semibold text-lg mb-2 text-orange-400">Blueprint for Hormonal Balance & Vitality Support:</p>
                <ul class="list-disc list-inside text-gray-300 space-y-2">
                    <li><strong class="font-medium">Daily Core:</strong> Ashwagandha (300-600mg in the evening for stress/sleep), Rhodiola Rosea (200-400mg in the morning for adaptogenic benefits), Omega-3s (e.g., 1g EPA+DHA), and Magnesium L-Threonate (145mg elemental Magnesium in the evening for brain support and relaxation).</li>
                    <li><strong class="font-medium">Foundational Micronutrients:</strong> Ensure adequate Vitamin D3 (2000-5000 IU, especially if sun exposure is limited) and Zinc (15-30mg). These are crucial cofactors for numerous hormonal pathways.</li>
                    <li><strong class="font-medium">Targeted Herbal Support:</strong> Tongkat Ali (200-400mg) for general vitality and stress response, and DIM (100-200mg) to support healthy estrogen metabolism.</li>
                    <li><strong class="font-medium">Foundational Habits:</strong> Prioritize stress reduction techniques like meditation, deep breathing exercises, or spending time in nature. Optimize sleep quality, as hormonal balance is heavily influenced by sleep. Maintain a healthy weight and a balanced, nutrient-dense diet rich in fruits, vegetables, lean proteins, and healthy fats. Regular, moderate exercise is crucial for systemic hormonal equilibrium. Avoid excessive alcohol and processed foods.</li>
                    <li><strong class="font-bold text-red-400">Crucial Warning:</strong> This stack *supports* the body's natural stress response, nutrient status, and overall well-being, which *indirectly* influences hormonal balance. It is NOT a direct hormonal manipulation or replacement therapy. For any specific hormonal concerns, symptoms, or diagnosed imbalances, you MUST consult with a qualified healthcare professional or endocrinologist. Self-treating hormonal conditions can be dangerous.</li>
                </ul>
                <p class="mt-4 text-sm text-gray-400 italic">
                    <strong class="text-orange-400">Analogy:</strong> This stack is like providing a state-of-the-art climate control system (Ashwagandha, Rhodiola for stress), premium construction materials (Omega-3s, Vitamin D3, Zinc), and specialized waste management (DIM for estrogen) for your body's intricate hormonal "ecosystem." It creates an optimal internal environment, allowing your body's natural regulatory systems to thrive and maintain balance.
                </p>
            `
        }
    };

    const handleGoalSelect = (goalId) => {
        setSelectedGoal(goalId);
    };

    const GoalSelection = () => (
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
            <h1 className="text-4xl font-extrabold text-orange-400 mb-8 text-center leading-tight">
                Your Nootropic Navigator
            </h1>
            <p className="text-xl text-gray-300 mb-10 text-center max-w-2xl">
                Embark on your journey to cognitive optimization. What's your primary goal today?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                <GoalCard
                    title="Boost Energy & Endurance"
                    description="Ignite your physical stamina and mental drive for peak performance."
                    icon="⚡"
                    onClick={() => handleGoalSelect('energyEndurance')}
                />
                <GoalCard
                    title="Enhance Cognition & Memory"
                    description="Sharpen your focus, accelerate learning, and strengthen recall."
                    icon="🧠"
                    onClick={() => handleGoalSelect('cognitiveMemory')}
                />
                <GoalCard
                    title="Support Hormonal Balance & Vitality"
                    description="Optimize your body's natural equilibrium through comprehensive well-being support."
                    icon="⚖️"
                    onClick={() => handleGoalSelect('hormonalUpregulation')}
                />
            </div>
            <button
                onClick={() => setSelectedGoal('library')}
                className="mt-12 px-8 py-3 bg-orange-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-orange-700 transition duration-300 transform hover:scale-105"
            >
                Explore the Nootropic Library
            </button>
        </div>
    );

    const GoalCard = ({ title, description, icon, onClick }) => (
        <div
            className="bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl border-b-4 border-orange-700 hover:border-orange-500"
            onClick={onClick}
        >
            <div className="text-5xl mb-4">{icon}</div>
            <h2 className="text-2xl font-bold text-orange-400 mb-3">{title}</h2>
            <p className="text-gray-300 text-base">{description}</p>
        </div>
    );

    const RecommendationDisplay = () => {
        const recommendation = recommendations[selectedGoal];
        if (!recommendation) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-900 to-black text-gray-100">
                    <p className="text-2xl text-red-400 mb-4">No recommendation found. Please select a goal.</p>
                    <button
                        onClick={() => setSelectedGoal(null)}
                        className="mt-6 px-6 py-2 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition duration-300"
                    >
                        Go Back to Goal Selection
                    </button>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
                <h1 className="text-4xl font-extrabold text-orange-400 mb-6 text-center leading-tight">
                    Your Personalized Blueprint for <br />"{recommendation.goal}"
                </h1>
                <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-4xl w-full border-b-4 border-orange-700">
                    <h2 className="text-3xl font-bold text-orange-400 mb-6 border-b pb-4 border-orange-800">
                        Recommended Stack
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {recommendation.stack.map(item => {
                            const nootropic = nootropicsData.find(n => n.id === item.id);
                            return nootropic ? (
                                <div key={nootropic.id} className="bg-gray-900 p-5 rounded-xl shadow-md border-l-4 border-orange-600">
                                    <h3 className="text-xl font-bold text-orange-300 mb-1">{nootropic.name}</h3>
                                    <p className="text-lg text-gray-300">
                                        <span className="font-semibold">Dosage:</span> {item.dosage}
                                    </p>
                                    <p className="text-sm text-gray-400 mt-2">{nootropic.description.split('. ')[0]}.</p>
                                    <button
                                        onClick={() => {
                                            setSelectedNootropicForModal(nootropic);
                                            setShowModal(true);
                                        }}
                                        className="text-orange-500 text-sm hover:underline mt-2 inline-block"
                                    >
                                        View Details &raquo;
                                    </button>
                                </div>
                            ) : null;
                        })}
                    </div>
                    <h2 className="text-3xl font-bold text-orange-400 mb-6 border-b pb-4 border-orange-800">
                        Usage Blueprint
                    </h2>
                    <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: recommendation.blueprint }}></div>
                </div>
                <div className="flex mt-10 space-x-4">
                    <button
                        onClick={() => setSelectedGoal(null)}
                        className="px-8 py-3 bg-orange-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-orange-700 transition duration-300 transform hover:scale-105"
                    >
                        Choose Another Goal
                    </button>
                    <button
                        onClick={() => setSelectedGoal('library')}
                        className="px-8 py-3 bg-red-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
                    >
                        Explore the Nootropic Library
                    </button>
                </div>
            </div>
        );
    };

    const SupplementLibrary = () => {
        // Group nootropics by category
        const categorizedNootropics = nootropicsData.reduce((acc, nootropic) => {
            const category = nootropic.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(nootropic);
            return acc;
        }, {});

        return (
            <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
                <h1 className="text-4xl font-extrabold text-orange-400 mb-8 text-center leading-tight">
                    The Nootropic Library: Your Arsenal of Cognitive Tools
                </h1>
                <p className="text-xl text-gray-300 mb-10 text-center max-w-3xl">
                    Dive deep into the individual components. Each card offers a glimpse into how these amazing substances work.
                </p>
                
                {Object.keys(categorizedNootropics).map(category => (
                    <div key={category} className="w-full max-w-6xl mb-12">
                        <h2 className="text-3xl font-bold text-orange-300 mb-6 border-b pb-2 border-orange-800">{category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categorizedNootropics[category].map(nootropic => (
                                <SupplementCard
                                    key={nootropic.id} // Use nootropic.id as the key
                                    nootropic={nootropic}
                                    onClick={() => {
                                        setSelectedNootropicForModal(nootropic);
                                        setShowModal(true);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => setSelectedGoal(null)}
                    className="mt-12 px-8 py-3 bg-orange-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-orange-700 transition duration-300 transform hover:scale-105"
                >
                    Back to Goal Selection
                </button>
                {showModal && selectedNootropicForModal && (
                    <NootropicModal
                        nootropic={selectedNootropicForModal}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </div>
        );
    };

    const SupplementCard = ({ nootropic, onClick }) => (
        <div
            className="bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col border-b-4 border-orange-700 hover:border-orange-500 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer text-gray-200"
            onClick={onClick}
        >
            <h3 className="text-2xl font-bold text-orange-300 mb-3 text-center">{nootropic.name}</h3>
            <p className="text-sm font-semibold text-orange-400 mb-4 text-center">{nootropic.category}</p>
            
            {nootropic.formulaImageUrl && (
                <div className="flex justify-center items-center my-4 h-20 w-full">
                    <img
                        src={nootropic.formulaImageUrl}
                        alt={`Chemical structure for ${nootropic.name}`}
                        className="max-w-full max-h-full object-contain rounded-md shadow-inner bg-gray-900" // Darker background for image
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x80/333333/AAAAAA?text=Image+Error'; }} // Darker error image
                    />
                </div>
            )}

            <p className="text-gray-300 text-base mb-4 flex-grow text-center">{nootropic.description.split('. ')[0]}.</p>
            
            <div className="bg-gray-900 rounded-lg p-3 mt-auto">
                <p className="text-gray-200 font-semibold mb-1">Primary Effects:</p>
                <ul className="list-disc list-inside text-gray-300 text-sm">
                    {nootropic.effects.map((effect, index) => (
                        <li key={index}>{effect}</li>
                    ))}
                </ul>
            </div>
        </div>
    );

    const NootropicModal = ({ nootropic, onClose }) => {
        if (!nootropic) return null; // Ensure nootropic data is available

        return (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 overflow-auto">
                <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-3xl w-full relative transform scale-95 md:scale-100 transition-transform duration-300 ease-out text-gray-100">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 text-3xl font-bold"
                    >
                        &times;
                    </button>
                    <h2 className="text-4xl font-extrabold text-orange-300 mb-4 text-center leading-tight">{nootropic.name}</h2>
                    <p className="text-lg font-semibold text-orange-400 mb-6 text-center">{nootropic.category}</p>

                    {nootropic.formulaImageUrl && (
                        <div className="flex justify-center items-center my-6 h-32 w-full">
                            <img
                                src={nootropic.formulaImageUrl}
                                alt={`Chemical structure for ${nootropic.name}`}
                                className="max-w-full max-h-full object-contain rounded-md shadow-inner bg-gray-900 border border-gray-700"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x120/333333/AAAAAA?text=Image+Error'; }}
                            />
                        </div>
                    )}
                    
                    <h3 className="text-2xl font-bold text-orange-300 mb-3 border-b pb-2 border-orange-800">Overview</h3>
                    <p className="text-gray-300 text-base mb-6 leading-relaxed">{nootropic.description}</p>
                    
                    {nootropic.mechanisms && (
                        <>
                            <h3 className="text-2xl font-bold text-orange-300 mb-3 border-b pb-2 border-orange-800">Potential Mechanisms</h3>
                            <p className="text-gray-300 text-base mb-6 leading-relaxed">{nootropic.mechanisms}</p>
                        </>
                    )}

                    <div className="bg-gray-900 rounded-xl p-4 mb-4">
                        <p className="text-gray-200 font-semibold mb-2">Chemical Formula:</p>
                        <code className="block text-orange-400 font-mono text-base break-words">{nootropic.formula}</code>
                    </div>

                    <div className="bg-gray-900 rounded-xl p-4 mb-4">
                        <p className="text-gray-200 font-semibold mb-2">Primary Effects:</p>
                        <ul className="list-disc list-inside text-gray-300 text-base space-y-1">
                            {nootropic.effects.map((effect, index) => (
                                <li key={index}>{effect}</li>
                            ))}
                        </ul>
                    </div>

                    {nootropic.considerations && (
                        <div className="bg-red-900 rounded-xl p-4 border border-red-700">
                            <p className="text-red-300 font-semibold mb-2">Important Considerations:</p>
                            <p className="text-red-200 text-base leading-relaxed">{nootropic.considerations}</p>
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className="mt-8 w-full px-6 py-3 bg-orange-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-orange-700 transition duration-300 transform hover:scale-105"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    };

    // Binaural Beats Component
    const BinauralBeats = () => {
        const [isPlaying, setIsPlaying] = useState(false);
        const [currentFrequency, setCurrentFrequency] = useState(10);
        const [volume, setVolume] = useState(0.5);
        const [audioContext, setAudioContext] = useState(null);
        const [oscillators, setOscillators] = useState({ left: null, right: null });
        const [gainNodes, setGainNodes] = useState({ left: null, right: null });

        const frequencyPresets = [
            { name: 'Deep Sleep', frequency: 0.5, description: 'Delta waves for deep restorative sleep' },
            { name: 'Light Sleep', frequency: 4, description: 'Theta waves for light sleep and meditation' },
            { name: 'Relaxation', frequency: 8, description: 'Alpha waves for relaxation and stress relief' },
            { name: 'Focus', frequency: 10, description: 'Alpha waves for enhanced focus and concentration' },
            { name: 'Creativity', frequency: 12, description: 'Alpha waves for creative thinking' },
            { name: 'Alertness', frequency: 16, description: 'Beta waves for alertness and active thinking' },
            { name: 'High Focus', frequency: 20, description: 'Beta waves for high concentration tasks' },
            { name: 'Problem Solving', frequency: 25, description: 'Beta waves for analytical thinking' },
            { name: 'Insight', frequency: 40, description: 'Gamma waves for insight and peak performance' }
        ];

        const startBinauralBeats = async () => {
            try {
                // Create new audio context if it doesn't exist
                if (!audioContext) {
                    const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
                    setAudioContext(newAudioContext);
                    
                    // Resume context if it's suspended (browser autoplay policy)
                    if (newAudioContext.state === 'suspended') {
                        await newAudioContext.resume();
                    }
                }

                // Stop any existing oscillators
                if (oscillators.left && oscillators.right) {
                    oscillators.left.stop();
                    oscillators.right.stop();
                }

                const ctx = audioContext || new (window.AudioContext || window.webkitAudioContext)();
                
                // Create oscillators
                const leftOsc = ctx.createOscillator();
                const rightOsc = ctx.createOscillator();
                
                // Create gain nodes for volume control
                const leftGain = ctx.createGain();
                const rightGain = ctx.createGain();
                
                // Create stereo panner for left and right channels
                const leftPanner = ctx.createStereoPanner();
                const rightPanner = ctx.createStereoPanner();
                
                // Set up left channel
                leftOsc.frequency.setValueAtTime(200, ctx.currentTime);
                leftOsc.connect(leftGain);
                leftGain.connect(leftPanner);
                leftPanner.pan.setValueAtTime(-1, ctx.currentTime); // Full left
                leftPanner.connect(ctx.destination);
                leftGain.gain.setValueAtTime(volume, ctx.currentTime);

                // Set up right channel
                rightOsc.frequency.setValueAtTime(200 + currentFrequency, ctx.currentTime);
                rightOsc.connect(rightGain);
                rightGain.connect(rightPanner);
                rightPanner.pan.setValueAtTime(1, ctx.currentTime); // Full right
                rightPanner.connect(ctx.destination);
                rightGain.gain.setValueAtTime(volume, ctx.currentTime);

                // Start oscillators
                leftOsc.start();
                rightOsc.start();

                setOscillators({ left: leftOsc, right: rightOsc });
                setGainNodes({ left: leftGain, right: rightGain });
                setIsPlaying(true);
                
                console.log('Binaural beats started:', currentFrequency, 'Hz');
            } catch (error) {
                console.error('Error starting binaural beats:', error);
                alert('Please allow audio playback and try again.');
            }
        };

        const stopBinauralBeats = () => {
            try {
                if (oscillators.left && oscillators.right) {
                    oscillators.left.stop();
                    oscillators.right.stop();
                    setOscillators({ left: null, right: null });
                    setGainNodes({ left: null, right: null });
                }
                if (audioContext && audioContext.state === 'running') {
                    audioContext.suspend();
                }
                setIsPlaying(false);
                console.log('Binaural beats stopped');
            } catch (error) {
                console.error('Error stopping binaural beats:', error);
            }
        };

        const updateFrequency = (freq) => {
            setCurrentFrequency(freq);
            if (isPlaying && oscillators.left && oscillators.right && audioContext) {
                try {
                    oscillators.left.frequency.setValueAtTime(200, audioContext.currentTime);
                    oscillators.right.frequency.setValueAtTime(200 + freq, audioContext.currentTime);
                    console.log('Frequency updated to:', freq, 'Hz');
                } catch (error) {
                    console.error('Error updating frequency:', error);
                }
            }
        };

        const updateVolume = (vol) => {
            setVolume(vol);
            if (isPlaying && gainNodes.left && gainNodes.right) {
                try {
                    gainNodes.left.gain.setValueAtTime(vol, audioContext.currentTime);
                    gainNodes.right.gain.setValueAtTime(vol, audioContext.currentTime);
                    console.log('Volume updated to:', vol);
                } catch (error) {
                    console.error('Error updating volume:', error);
                }
            }
        };

        // Cleanup on unmount
        useEffect(() => {
            return () => {
                if (oscillators.left && oscillators.right) {
                    oscillators.left.stop();
                    oscillators.right.stop();
                }
                if (audioContext) {
                    audioContext.close();
                }
            };
        }, []);

        const handleUserInteraction = async () => {
            if (audioContext && audioContext.state === 'suspended') {
                try {
                    await audioContext.resume();
                    console.log('Audio context resumed');
                } catch (error) {
                    console.error('Error resuming audio context:', error);
                }
            }
        };

        return (
            <div 
                className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100"
                onClick={handleUserInteraction}
            >
                <h1 className="text-4xl font-extrabold text-orange-400 mb-8 text-center leading-tight">
                    Binaural Beats Generator
                </h1>
                <p className="text-xl text-gray-300 mb-10 text-center max-w-3xl">
                    Harness the power of brainwave entrainment to optimize your mental state for different activities.
                </p>

                <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-4xl w-full border-b-4 border-orange-700">
                    {/* Frequency Presets */}
                    <h2 className="text-3xl font-bold text-orange-400 mb-6 border-b pb-4 border-orange-800">
                        Frequency Presets
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {frequencyPresets.map((preset, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                                    currentFrequency === preset.frequency
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                }`}
                                onClick={() => updateFrequency(preset.frequency)}
                            >
                                <h3 className="font-bold text-lg mb-1">{preset.name}</h3>
                                <p className="text-sm opacity-80">{preset.frequency} Hz</p>
                                <p className="text-xs mt-2 opacity-70">{preset.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Custom Frequency Control */}
                    <h2 className="text-3xl font-bold text-orange-400 mb-6 border-b pb-4 border-orange-800">
                        Custom Controls
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <label className="block text-gray-200 font-semibold mb-2">
                                Frequency: {currentFrequency} Hz
                            </label>
                            <input
                                type="range"
                                min="0.5"
                                max="40"
                                step="0.5"
                                value={currentFrequency}
                                onChange={(e) => updateFrequency(parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>0.5 Hz</span>
                                <span>40 Hz</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-200 font-semibold mb-2">
                                Volume: {Math.round(volume * 100)}%
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={(e) => updateVolume(parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>0%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>

                    {/* Status and Playback Controls */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg">
                            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                            <span className="text-gray-300">
                                {isPlaying ? `Playing ${currentFrequency} Hz` : 'Ready to play'}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={isPlaying ? stopBinauralBeats : startBinauralBeats}
                            className={`px-8 py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${
                                isPlaying
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                        >
                            {isPlaying ? '⏹️ Stop' : '▶️ Start'}
                        </button>
                    </div>

                    {/* Information Panel */}
                    <div className="mt-8 bg-gray-900 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-orange-300 mb-4">How Binaural Beats Work</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Binaural beats occur when two slightly different frequencies are presented to each ear. 
                            Your brain perceives a third frequency equal to the difference between the two, 
                            which can help entrain your brainwaves to specific states.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <h4 className="font-semibold text-orange-400 mb-2">Brainwave States:</h4>
                                <ul className="text-gray-300 space-y-1">
                                    <li><strong>Delta (0.5-4 Hz):</strong> Deep sleep, healing</li>
                                    <li><strong>Theta (4-8 Hz):</strong> Meditation, creativity</li>
                                    <li><strong>Alpha (8-13 Hz):</strong> Relaxation, focus</li>
                                    <li><strong>Beta (13-30 Hz):</strong> Alertness, concentration</li>
                                    <li><strong>Gamma (30-100 Hz):</strong> Insight, peak performance</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-orange-400 mb-2">Usage Tips:</h4>
                                <ul className="text-gray-300 space-y-1">
                                    <li>• Use headphones for best results</li>
                                    <li>• Start with 10-15 minute sessions</li>
                                    <li>• Find a quiet, comfortable environment</li>
                                    <li>• Be patient - effects may take time</li>
                                    <li>• Don't use while driving or operating machinery</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Enhanced Pomodoro Timer with Team Collaboration & Task Management
    const PomodoroTimer = () => {
        const [timeLeft, setTimeLeft] = useState(25 * 60);
        const [isRunning, setIsRunning] = useState(false);
        const [isBreak, setIsBreak] = useState(false);
        const [sessions, setSessions] = useState(0);
        const [timerMode, setTimerMode] = useState('work');
        const [tasks, setTasks] = useState([]);
        const [newTask, setNewTask] = useState('');
        const [currentTask, setCurrentTask] = useState(null);
        const [showTaskModal, setShowTaskModal] = useState(false);
        const [taskStats, setTaskStats] = useState({
            completed: 0,
            totalPomodoros: 0,
            totalTime: 0
        });
        
        // Team Collaboration Features
        const [isTeamMode, setIsTeamMode] = useState(false);
        const [teamCode, setTeamCode] = useState('');
        const [teamMembers, setTeamMembers] = useState([]);
        const [sharedTasks, setSharedTasks] = useState([]);
        const [teamStats, setTeamStats] = useState({});
        const [showTeamModal, setShowTeamModal] = useState(false);
        const [userProfile, setUserProfile] = useState({
            id: Date.now(),
            name: 'Anonymous User',
            avatar: '👤',
            color: '#ea580c'
        });

        const timerSettings = {
            work: 25 * 60,
            shortBreak: 5 * 60,
            longBreak: 15 * 60
        };

        // Load data from localStorage
        useEffect(() => {
            const savedTasks = localStorage.getItem('pomodoroTasks');
            const savedStats = localStorage.getItem('pomodoroStats');
            const savedTeamData = localStorage.getItem('pomodoroTeamData');
            const savedUserProfile = localStorage.getItem('pomodoroUserProfile');
            
            if (savedTasks) setTasks(JSON.parse(savedTasks));
            if (savedStats) setTaskStats(JSON.parse(savedStats));
            if (savedTeamData) {
                const teamData = JSON.parse(savedTeamData);
                setTeamMembers(teamData.members || []);
                setSharedTasks(teamData.tasks || []);
                setTeamStats(teamData.stats || {});
                setIsTeamMode(teamData.isTeamMode || false);
                setTeamCode(teamData.teamCode || '');
            }
            if (savedUserProfile) setUserProfile(JSON.parse(savedUserProfile));
        }, []);

        // Save data to localStorage
        useEffect(() => {
            localStorage.setItem('pomodoroTasks', JSON.stringify(tasks));
            localStorage.setItem('pomodoroStats', JSON.stringify(taskStats));
            localStorage.setItem('pomodoroUserProfile', JSON.stringify(userProfile));
            
            const teamData = {
                members: teamMembers,
                tasks: sharedTasks,
                stats: teamStats,
                isTeamMode,
                teamCode
            };
            localStorage.setItem('pomodoroTeamData', JSON.stringify(teamData));
        }, [tasks, taskStats, teamMembers, sharedTasks, teamStats, isTeamMode, teamCode, userProfile]);

        useEffect(() => {
            let interval = null;
            if (isRunning && timeLeft > 0) {
                interval = setInterval(() => {
                    setTimeLeft(timeLeft - 1);
                }, 1000);
            } else if (timeLeft === 0) {
                setIsRunning(false);
                
                // Play notification sound
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('Pomodoro Timer', {
                        body: isBreak ? 'Break time is over! Time to work!' : 'Work session complete! Take a break!',
                        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ea580c"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
                    });
                }

                // Update task progress when work session completes
                if (!isBreak && currentTask) {
                    const updatedTasks = tasks.map(task => 
                        task.id === currentTask.id 
                            ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
                            : task
                    );
                    setTasks(updatedTasks);
                    setTaskStats(prev => ({
                        ...prev,
                        totalPomodoros: prev.totalPomodoros + 1,
                        totalTime: prev.totalTime + timerSettings.work
                    }));
                }

                // Auto-switch to next mode
                if (!isBreak) {
                    setSessions(sessions + 1);
                    if (sessions % 4 === 3) {
                        setTimerMode('longBreak');
                        setTimeLeft(timerSettings.longBreak);
                    } else {
                        setTimerMode('shortBreak');
                        setTimeLeft(timerSettings.shortBreak);
                    }
                    setIsBreak(true);
                } else {
                    setTimerMode('work');
                    setTimeLeft(timerSettings.work);
                    setIsBreak(false);
                }
            }
            return () => clearInterval(interval);
        }, [isRunning, timeLeft, isBreak, sessions, timerMode, currentTask, tasks]);

        const addTask = () => {
            if (newTask.trim()) {
                const task = {
                    id: Date.now(),
                    title: newTask.trim(),
                    description: '',
                    priority: 'medium',
                    completedPomodoros: 0,
                    estimatedPomodoros: 1,
                    completed: false,
                    createdAt: new Date().toISOString(),
                    category: 'work'
                };
                setTasks([...tasks, task]);
                setNewTask('');
            }
        };

        const deleteTask = (taskId) => {
            setTasks(tasks.filter(task => task.id !== taskId));
            if (currentTask && currentTask.id === taskId) {
                setCurrentTask(null);
            }
        };

        const completeTask = (taskId) => {
            const updatedTasks = tasks.map(task => 
                task.id === taskId 
                    ? { ...task, completed: true, completedAt: new Date().toISOString() }
                    : task
            );
            setTasks(updatedTasks);
            setTaskStats(prev => ({
                ...prev,
                completed: prev.completed + 1
            }));
        };

        const startTask = (task) => {
            setCurrentTask(task);
            setTimerMode('work');
            setTimeLeft(timerSettings.work);
            setIsBreak(false);
            setIsRunning(false);
        };

        const startTimer = () => {
            setIsRunning(true);
            if ('Notification' in window && Notification.permission === 'default') {
                Notification.requestPermission();
            }
        };

        const pauseTimer = () => {
            setIsRunning(false);
        };

        const resetTimer = () => {
            setIsRunning(false);
            setTimeLeft(timerSettings[timerMode]);
        };

        const switchMode = (mode) => {
            setTimerMode(mode);
            setTimeLeft(timerSettings[mode]);
            setIsRunning(false);
            setIsBreak(mode !== 'work');
        };

        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };

        const getProgress = () => {
            const total = timerSettings[timerMode];
            return ((total - timeLeft) / total) * 100;
        };

        const getPriorityColor = (priority) => {
            switch (priority) {
                case 'high': return 'text-red-400';
                case 'medium': return 'text-yellow-400';
                case 'low': return 'text-green-400';
                default: return 'text-gray-400';
            }
        };

        const getPriorityIcon = (priority) => {
            switch (priority) {
                case 'high': return '🔴';
                case 'medium': return '🟡';
                case 'low': return '🟢';
                default: return '⚪';
            }
        };

        // Team Collaboration Functions
        const generateTeamCode = () => {
            return Math.random().toString(36).substring(2, 8).toUpperCase();
        };

        const createTeam = () => {
            const newTeamCode = generateTeamCode();
            setTeamCode(newTeamCode);
            setIsTeamMode(true);
            setTeamMembers([userProfile]);
            setShowTeamModal(false);
        };

        const joinTeam = (code) => {
            if (code.trim()) {
                setTeamCode(code.trim().toUpperCase());
                setIsTeamMode(true);
                // Simulate joining existing team
                const mockTeamMembers = [
                    { id: 1, name: 'Team Leader', avatar: '👨‍💼', color: '#3b82f6', pomodoros: 12, tasks: 8 },
                    { id: 2, name: 'Designer', avatar: '🎨', color: '#8b5cf6', pomodoros: 9, tasks: 6 },
                    { id: 3, name: 'Developer', avatar: '👨‍💻', color: '#10b981', pomodoros: 15, tasks: 10 },
                    userProfile
                ];
                setTeamMembers(mockTeamMembers);
                setShowTeamModal(false);
            }
        };

        const leaveTeam = () => {
            setIsTeamMode(false);
            setTeamCode('');
            setTeamMembers([]);
            setSharedTasks([]);
            setTeamStats({});
        };

        const addSharedTask = () => {
            if (newTask.trim()) {
                const task = {
                    id: Date.now(),
                    title: newTask.trim(),
                    description: '',
                    priority: 'medium',
                    completedPomodoros: 0,
                    estimatedPomodoros: 1,
                    completed: false,
                    createdAt: new Date().toISOString(),
                    category: 'work',
                    assignedTo: userProfile.id,
                    createdBy: userProfile.id
                };
                setSharedTasks([...sharedTasks, task]);
                setNewTask('');
            }
        };

        const completeSharedTask = (taskId) => {
            const updatedTasks = sharedTasks.map(task => 
                task.id === taskId 
                    ? { ...task, completed: true, completedAt: new Date().toISOString() }
                    : task
            );
            setSharedTasks(updatedTasks);
            
            // Update team stats
            setTeamStats(prev => ({
                ...prev,
                [userProfile.id]: {
                    ...prev[userProfile.id],
                    completed: (prev[userProfile.id]?.completed || 0) + 1,
                    pomodoros: (prev[userProfile.id]?.pomodoros || 0) + 1
                }
            }));
        };

        const getTeamLeaderboard = () => {
            return teamMembers
                .map(member => ({
                    ...member,
                    pomodoros: teamStats[member.id]?.pomodoros || 0,
                    completed: teamStats[member.id]?.completed || 0,
                    score: (teamStats[member.id]?.pomodoros || 0) * 10 + (teamStats[member.id]?.completed || 0) * 50
                }))
                .sort((a, b) => b.score - a.score);
        };

        const TaskModal = ({ task, onClose, onSave }) => {
            const [editedTask, setEditedTask] = useState(task);

            const handleSave = () => {
                const updatedTasks = tasks.map(t => 
                    t.id === task.id ? editedTask : t
                );
                setTasks(updatedTasks);
                onSave();
            };

            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold text-orange-400 mb-4">Edit Task</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={editedTask.title}
                                    onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                <textarea
                                    value={editedTask.description}
                                    onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                                <select
                                    value={editedTask.priority}
                                    onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Estimated Pomodoros</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={editedTask.estimatedPomodoros}
                                    onChange={(e) => setEditedTask({...editedTask, estimatedPomodoros: parseInt(e.target.value) || 1})}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={handleSave}
                                className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium"
                            >
                                Save
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            );
        };

        const TeamModal = ({ onClose }) => {
            const [joinCode, setJoinCode] = useState('');
            const [userName, setUserName] = useState(userProfile.name);
            const [userAvatar, setUserAvatar] = useState(userProfile.avatar);

            const avatars = ['👤', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '🎨', '🔬', '📚', '🚀', '⭐'];

            const handleCreateTeam = () => {
                if (userName.trim()) {
                    setUserProfile({
                        ...userProfile,
                        name: userName.trim(),
                        avatar: userAvatar
                    });
                    createTeam();
                }
            };

            const handleJoinTeam = () => {
                if (userName.trim() && joinCode.trim()) {
                    setUserProfile({
                        ...userProfile,
                        name: userName.trim(),
                        avatar: userAvatar
                    });
                    joinTeam(joinCode);
                }
            };

            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4">
                        <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">Team Collaboration</h3>
                        
                        {/* User Profile Setup */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Choose Avatar</label>
                            <div className="grid grid-cols-5 gap-2">
                                {avatars.map((avatar, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setUserAvatar(avatar)}
                                        className={`p-2 rounded-lg text-2xl ${
                                            userAvatar === avatar 
                                                ? 'bg-blue-600 border-2 border-blue-400' 
                                                : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    >
                                        {avatar}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Create Team */}
                        <div className="mb-6 p-4 bg-blue-900 rounded-lg border border-blue-700">
                            <h4 className="font-semibold text-blue-300 mb-3">Create New Team</h4>
                            <p className="text-blue-200 text-sm mb-3">Start a new team and invite others to join</p>
                            <button
                                onClick={handleCreateTeam}
                                disabled={!userName.trim()}
                                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium"
                            >
                                Create Team
                            </button>
                        </div>

                        {/* Join Team */}
                        <div className="mb-6 p-4 bg-green-900 rounded-lg border border-green-700">
                            <h4 className="font-semibold text-green-300 mb-3">Join Existing Team</h4>
                            <p className="text-green-200 text-sm mb-3">Enter the team code to join</p>
                            <input
                                type="text"
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                placeholder="Enter team code"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500 mb-3"
                            />
                            <button
                                onClick={handleJoinTeam}
                                disabled={!userName.trim() || !joinCode.trim()}
                                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium"
                            >
                                Join Team
                            </button>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            );
        };

        return (
            <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
                <h1 className="text-4xl font-extrabold text-orange-400 mb-4 text-center leading-tight">
                    Pomodoro Timer & Task Manager
                </h1>
                <p className="text-xl text-gray-300 mb-6 text-center max-w-3xl">
                    Master focused work with timed sessions and intelligent task management.
                </p>

                {/* Team Collaboration Controls */}
                <div className="mb-8 flex items-center space-x-4">
                    {!isTeamMode ? (
                        <button
                            onClick={() => setShowTeamModal(true)}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            👥 Join Team Session
                        </button>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <div className="px-4 py-2 bg-blue-900 rounded-lg border border-blue-700">
                                <span className="text-blue-300 font-medium">Team: {teamCode}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">{userProfile.avatar} {userProfile.name}</span>
                            </div>
                            <button
                                onClick={leaveTeam}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
                            >
                                Leave Team
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl w-full">
                    {/* Timer Section */}
                    <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border-b-4 border-orange-700">
                        {/* Current Task Display */}
                        {currentTask && (
                            <div className="mb-6 p-4 bg-orange-900 rounded-lg border border-orange-700">
                                <h3 className="text-lg font-semibold text-orange-300 mb-2">Current Task:</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-orange-200">{currentTask.title}</span>
                                    <button
                                        onClick={() => setCurrentTask(null)}
                                        className="text-orange-400 hover:text-orange-300"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="text-sm text-orange-300 mt-2">
                                    {currentTask.completedPomodoros}/{currentTask.estimatedPomodoros} pomodoros
                                </div>
                            </div>
                        )}

                        {/* Timer Display */}
                        <div className="text-center mb-8">
                            <div className="relative w-48 h-48 mx-auto mb-6">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#374151"
                                        strokeWidth="6"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#ea580c"
                                        strokeWidth="6"
                                        strokeDasharray={`${2 * Math.PI * 40}`}
                                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - getProgress() / 100)}`}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-linear"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-orange-400 mb-2">
                                            {formatTime(timeLeft)}
                                        </div>
                                        <div className="text-sm text-gray-300 capitalize">
                                            {timerMode === 'work' ? 'Work Time' : 
                                             timerMode === 'shortBreak' ? 'Short Break' : 'Long Break'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mode Selection */}
                        <div className="flex justify-center space-x-2 mb-6">
                            <button
                                onClick={() => switchMode('work')}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    timerMode === 'work'
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                }`}
                            >
                                Work
                            </button>
                            <button
                                onClick={() => switchMode('shortBreak')}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    timerMode === 'shortBreak'
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                }`}
                            >
                                Short Break
                            </button>
                            <button
                                onClick={() => switchMode('longBreak')}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    timerMode === 'longBreak'
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                }`}
                            >
                                Long Break
                            </button>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-center space-x-4 mb-6">
                            {!isRunning ? (
                                <button
                                    onClick={startTimer}
                                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    ▶️ Start
                                </button>
                            ) : (
                                <button
                                    onClick={pauseTimer}
                                    className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    ⏸️ Pause
                                </button>
                            )}
                            <button
                                onClick={resetTimer}
                                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                                🔄 Reset
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="bg-gray-900 rounded-xl p-4">
                            <h3 className="text-lg font-bold text-orange-300 mb-3 text-center">Today's Stats</h3>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-xl font-bold text-orange-400">{sessions}</div>
                                    <div className="text-xs text-gray-400">Work Sessions</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-orange-400">
                                        {Math.floor((timerSettings.work * sessions) / 60)}
                                    </div>
                                    <div className="text-xs text-gray-400">Minutes Focused</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Task Management Section */}
                    <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border-b-4 border-blue-700">
                        <h2 className="text-2xl font-bold text-blue-400 mb-6">
                            {isTeamMode ? 'Team Task Management' : 'Task Management'}
                        </h2>
                        
                        {/* Add Task */}
                        <div className="mb-6">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (isTeamMode ? addSharedTask() : addTask())}
                                    placeholder={isTeamMode ? "Add a team task..." : "Add a new task..."}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    onClick={isTeamMode ? addSharedTask : addTask}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        {/* Team Leaderboard */}
                        {isTeamMode && (
                            <div className="mb-6 bg-purple-900 rounded-xl p-4 border border-purple-700">
                                <h3 className="text-lg font-bold text-purple-300 mb-3 text-center">🏆 Team Leaderboard</h3>
                                <div className="space-y-2">
                                    {getTeamLeaderboard().map((member, index) => (
                                        <div key={member.id} className="flex items-center justify-between p-2 bg-purple-800 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-lg">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}</span>
                                                <span className="text-2xl">{member.avatar}</span>
                                                <div>
                                                    <div className="font-medium text-purple-200">{member.name}</div>
                                                    <div className="text-xs text-purple-300">
                                                        {member.pomodoros} pomodoros • {member.completed} tasks
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-purple-300">{member.score}</div>
                                                <div className="text-xs text-purple-400">points</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Task List */}
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {(isTeamMode ? sharedTasks : tasks).filter(task => !task.completed).map(task => (
                                <div
                                    key={task.id}
                                    className={`p-4 rounded-lg border-l-4 ${
                                        currentTask?.id === task.id 
                                            ? 'bg-blue-900 border-blue-500' 
                                            : 'bg-gray-700 border-gray-600'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <span className={getPriorityColor(task.priority)}>
                                                {getPriorityIcon(task.priority)}
                                            </span>
                                            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                                                {task.title}
                                            </h3>
                                            {isTeamMode && task.assignedTo && (
                                                <span className="text-xs text-gray-400">
                                                    {teamMembers.find(m => m.id === task.assignedTo)?.avatar || '👤'}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-400">
                                                {task.completedPomodoros}/{task.estimatedPomodoros}
                                            </span>
                                            <button
                                                onClick={() => startTask(task)}
                                                className="text-blue-400 hover:text-blue-300 text-sm"
                                            >
                                                ▶️
                                            </button>
                                            {!isTeamMode && (
                                                <button
                                                    onClick={() => setShowTaskModal(task)}
                                                    className="text-gray-400 hover:text-gray-300 text-sm"
                                                >
                                                    ✏️
                                                </button>
                                            )}
                                            <button
                                                onClick={() => isTeamMode ? completeSharedTask(task.id) : completeTask(task.id)}
                                                className="text-green-400 hover:text-green-300 text-sm"
                                            >
                                                ✓
                                            </button>
                                            {!isTeamMode && (
                                                <button
                                                    onClick={() => deleteTask(task.id)}
                                                    className="text-red-400 hover:text-red-300 text-sm"
                                                >
                                                    🗑️
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {task.description && (
                                        <p className="text-sm text-gray-400 mb-2">{task.description}</p>
                                    )}
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                                        <span>Priority: {task.priority}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Completed Tasks */}
                        {(isTeamMode ? sharedTasks : tasks).filter(task => task.completed).length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-green-400 mb-3">Completed Tasks</h3>
                                <div className="space-y-2 max-h-24 overflow-y-auto">
                                    {(isTeamMode ? sharedTasks : tasks).filter(task => task.completed).map(task => (
                                        <div key={task.id} className="p-3 bg-gray-700 rounded-lg opacity-75">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-300 line-through">{task.title}</span>
                                                <span className="text-xs text-gray-500">
                                                    {task.completedPomodoros} pomodoros
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Task Stats */}
                        <div className="mt-6 bg-gray-900 rounded-xl p-4">
                            <h3 className="text-lg font-bold text-blue-300 mb-3 text-center">
                                {isTeamMode ? 'Team Statistics' : 'Task Statistics'}
                            </h3>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-xl font-bold text-blue-400">
                                        {isTeamMode ? Object.values(teamStats).reduce((sum, stat) => sum + (stat.completed || 0), 0) : taskStats.completed}
                                    </div>
                                    <div className="text-xs text-gray-400">Completed</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-blue-400">
                                        {isTeamMode ? Object.values(teamStats).reduce((sum, stat) => sum + (stat.pomodoros || 0), 0) : taskStats.totalPomodoros}
                                    </div>
                                    <div className="text-xs text-gray-400">Total Pomodoros</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-blue-400">
                                        {Math.floor((isTeamMode ? Object.values(teamStats).reduce((sum, stat) => sum + (stat.pomodoros || 0), 0) : taskStats.totalPomodoros) * 25 / 60)}
                                    </div>
                                    <div className="text-xs text-gray-400">Minutes</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-8 bg-blue-900 rounded-xl p-4 border border-blue-700 max-w-4xl w-full">
                    <h4 className="font-semibold text-blue-300 mb-2">💡 Enhanced Pomodoro Tips:</h4>
                    <ul className="text-blue-200 text-sm space-y-1">
                        <li>• Break large tasks into smaller, manageable pomodoros</li>
                        <li>• Use task priority to focus on what matters most</li>
                        <li>• Track your progress to build momentum and motivation</li>
                        <li>• Take breaks to maintain mental clarity and prevent burnout</li>
                        <li>• Review completed tasks to celebrate your progress</li>
                    </ul>
                </div>

                {/* Task Modal */}
                {showTaskModal && (
                    <TaskModal
                        task={showTaskModal}
                        onClose={() => setShowTaskModal(false)}
                        onSave={() => setShowTaskModal(false)}
                    />
                )}

                {/* Team Modal */}
                {showTeamModal && (
                    <TeamModal onClose={() => setShowTeamModal(false)} />
                )}
            </div>
        );
    };

    const TrainingHub = () => {
        const [selectedTraining, setSelectedTraining] = useState(null);
        const [currentSession, setCurrentSession] = useState(null);
        const [sessionProgress, setSessionProgress] = useState({});
        const [trainingProgress, setTrainingProgress] = useState(() => {
            const saved = localStorage.getItem('trainingProgress');
            return saved ? JSON.parse(saved) : {};
        });

        // Save progress to localStorage whenever it changes
        useEffect(() => {
            localStorage.setItem('trainingProgress', JSON.stringify(trainingProgress));
        }, [trainingProgress]);

        // Save achievements to localStorage whenever they change
        useEffect(() => {
            localStorage.setItem('achievements', JSON.stringify(achievements));
        }, [achievements]);

        // Save user profile to localStorage whenever it changes
        useEffect(() => {
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
        }, [userProfile]);

        // Save user settings to localStorage whenever they change
        useEffect(() => {
            localStorage.setItem('userSettings', JSON.stringify(userSettings));
        }, [userSettings]);

        // AI-powered difficulty adaptation
        const getAdaptiveDifficulty = () => {
            const stats = achievements.stats;
            const recentScores = Object.values(trainingProgress)
                .filter(data => data.completed)
                .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
                .slice(0, 5)
                .map(data => data.score);
            
            const avgRecentScore = recentScores.length > 0 ? 
                recentScores.reduce((a, b) => a + b, 0) / recentScores.length : 0;
            
            if (avgRecentScore >= 90) return 'advanced';
            if (avgRecentScore >= 70) return 'intermediate';
            return 'beginner';
        };

        const getEffectiveDifficulty = () => {
            if (userSettings.difficulty === 'adaptive') {
                return getAdaptiveDifficulty();
            }
            return userSettings.difficulty;
        };

        // Custom exercise builder
        const createCustomExercise = (exerciseData) => {
            const newExercise = {
                id: `custom-${Date.now()}`,
                ...exerciseData,
                isCustom: true,
                createdBy: userProfile.username,
                createdAt: new Date().toISOString()
            };
            
            setUserSettings(prev => ({
                ...prev,
                customExercises: [...prev.customExercises, newExercise]
            }));
            
            return newExercise;
        };

        // Integration with other app features
        const getNootropicRecommendations = () => {
            const stats = achievements.stats;
            const recommendations = [];
            
            // Based on performance patterns
            if (stats.averageScore < 70) {
                recommendations.push({
                    nootropic: 'caffeine',
                    reason: 'Boost focus and energy for better performance',
                    priority: 'high'
                });
            }
            
            if (stats.streakDays < 3) {
                recommendations.push({
                    nootropic: 'lTheanine',
                    reason: 'Promote consistency and reduce stress',
                    priority: 'medium'
                });
            }
            
            if (stats.totalSessions < 10) {
                recommendations.push({
                    nootropic: 'creatine',
                    reason: 'Support cognitive energy for new learners',
                    priority: 'medium'
                });
            }
            
            return recommendations;
        };

        const getPomodoroIntegration = () => {
            const stats = achievements.stats;
            const recommendations = {
                workDuration: 25,
                breakDuration: 5,
                longBreakDuration: 15,
                sessionsBeforeLongBreak: 4,
                autoStart: false
            };
            
            // Adjust based on user's focus patterns
            if (stats.averageScore >= 90) {
                recommendations.workDuration = 45; // Longer sessions for high performers
                recommendations.breakDuration = 10;
            } else if (stats.averageScore < 60) {
                recommendations.workDuration = 15; // Shorter sessions for struggling users
                recommendations.breakDuration = 3;
            }
            
            return recommendations;
        };

        const getBravermanIntegration = () => {
            // Suggest training programs based on Braverman test results
            if (bravermanResults) {
                const dominantType = bravermanResults.dominantType;
                const recommendations = {
                    primaryProgram: null,
                    secondaryProgram: null,
                    focusAreas: []
                };
                
                switch (dominantType) {
                    case 'dopamine':
                        recommendations.primaryProgram = 'focus';
                        recommendations.secondaryProgram = 'productivity';
                        recommendations.focusAreas = ['attention span', 'impulse control'];
                        break;
                    case 'acetylcholine':
                        recommendations.primaryProgram = 'memory';
                        recommendations.secondaryProgram = 'creativity';
                        recommendations.focusAreas = ['memory retention', 'creative thinking'];
                        break;
                    case 'gaba':
                        recommendations.primaryProgram = 'focus';
                        recommendations.secondaryProgram = 'productivity';
                        recommendations.focusAreas = ['stress management', 'consistency'];
                        break;
                    case 'serotonin':
                        recommendations.primaryProgram = 'creativity';
                        recommendations.secondaryProgram = 'memory';
                        recommendations.focusAreas = ['social learning', 'positive reinforcement'];
                        break;
                }
                
                return recommendations;
            }
            
            return null;
        };

        // Smart recommendations system
        const getSmartRecommendations = () => {
            const recommendations = {
                nextSession: null,
                focusArea: null,
                tips: [],
                nootropics: getNootropicRecommendations(),
                pomodoro: getPomodoroIntegration(),
                braverman: getBravermanIntegration()
            };
            
            // Determine next best session
            const programProgress = trainingPrograms.map(program => ({
                ...program,
                progress: getProgramProgress(program.id)
            }));
            
            const incompletePrograms = programProgress.filter(p => p.progress < 100);
            if (incompletePrograms.length > 0) {
                // Find program with lowest progress
                const nextProgram = incompletePrograms.reduce((a, b) => 
                    a.progress < b.progress ? a : b
                );
                
                const nextSession = nextProgram.sessions.find(session => 
                    !getSessionProgress(session.id).completed
                );
                
                if (nextSession) {
                    recommendations.nextSession = {
                        program: nextProgram,
                        session: nextSession
                    };
                }
            }
            
            // Identify focus areas based on performance
            const stats = achievements.stats;
            if (stats.averageScore < 70) {
                recommendations.focusArea = 'performance';
                recommendations.tips.push('Focus on accuracy over speed');
                recommendations.tips.push('Take more breaks between sessions');
            } else if (stats.streakDays < 3) {
                recommendations.focusArea = 'consistency';
                recommendations.tips.push('Set daily reminders for training');
                recommendations.tips.push('Start with shorter sessions');
            } else if (stats.totalSessions < 20) {
                recommendations.focusArea = 'foundation';
                recommendations.tips.push('Complete beginner programs first');
                recommendations.tips.push('Practice regularly to build habits');
            }
            
            return recommendations;
        };

        // Gamification system
        const experienceToLevel = (exp) => {
            return Math.floor(exp / 100) + 1;
        };

        const levelToExperience = (level) => {
            return (level - 1) * 100;
        };

        const calculateSessionRewards = (score, duration, difficulty) => {
            const basePoints = Math.floor(score / 10); // 1-10 points based on score
            const timeBonus = Math.floor(duration / 5); // Bonus for longer sessions
            const difficultyMultiplier = {
                'Beginner': 1,
                'Intermediate': 1.5,
                'Advanced': 2
            }[difficulty] || 1;
            
            const totalPoints = Math.round((basePoints + timeBonus) * difficultyMultiplier);
            const experience = Math.round(totalPoints * 1.5); // 1.5x exp to points ratio
            
            return { points: totalPoints, experience };
        };

        const addExperience = (exp) => {
            const newExperience = userProfile.experience + exp;
            const newLevel = experienceToLevel(newExperience);
            const levelUp = newLevel > userProfile.level;
            
            setUserProfile(prev => ({
                ...prev,
                experience: newExperience,
                level: newLevel,
                points: prev.points + Math.floor(exp / 1.5)
            }));
            
            if (levelUp) {
                showLevelUpNotification(newLevel);
            }
        };

        const showLevelUpNotification = (level) => {
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white z-50 animate-bounce';
            notification.innerHTML = `
                <div class="flex items-center space-x-3">
                    <span class="text-3xl">🎉</span>
                    <div>
                        <div class="font-bold text-lg">Level Up!</div>
                        <div class="text-sm">You reached level ${level}</div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 3000);
        };

        // Mock leaderboard data (in real app, this would come from a backend)
        const mockLeaderboard = [
            { username: 'BrainMaster', level: 25, points: 12500, avatar: '🧠', streak: 45 },
            { username: 'FocusPro', level: 18, points: 8900, avatar: '🎯', streak: 32 },
            { username: 'MemoryKing', level: 22, points: 11000, avatar: '👑', streak: 28 },
            { username: 'ProductivityGuru', level: 20, points: 9500, avatar: '⚡', streak: 15 },
            { username: 'CreativeMind', level: 16, points: 7800, avatar: '✨', streak: 22 },
            { username: userProfile.username, level: userProfile.level, points: userProfile.points, avatar: userProfile.avatar, streak: achievements.stats.streakDays }
        ].sort((a, b) => b.points - a.points);

        // Challenge system
        const challengeTypes = {
            daily: {
                title: 'Daily Challenge',
                description: 'Complete a training session today',
                reward: 50,
                icon: '📅'
            },
            streak: {
                title: 'Streak Challenge',
                description: 'Maintain a 7-day training streak',
                reward: 200,
                icon: '🔥'
            },
            perfect: {
                title: 'Perfect Score',
                description: 'Achieve 100% on any session',
                reward: 100,
                icon: '💎'
            },
            marathon: {
                title: 'Training Marathon',
                description: 'Complete 5 sessions in one day',
                reward: 300,
                icon: '🏃'
            }
        };

        const generateDailyChallenge = () => {
            const challenges = Object.keys(challengeTypes);
            const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
            return {
                id: Date.now(),
                type: randomChallenge,
                ...challengeTypes[randomChallenge],
                progress: 0,
                target: randomChallenge === 'marathon' ? 5 : 1,
                completed: false,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
            };
        };

        const checkChallengeCompletion = (challenge) => {
            const stats = achievements.stats;
            
            switch (challenge.type) {
                case 'daily':
                    return stats.lastSessionDate === new Date().toISOString().split('T')[0] ? 1 : 0;
                case 'streak':
                    return Math.min(stats.streakDays, 7);
                case 'perfect':
                    return stats.highestScore >= 100 ? 1 : 0;
                case 'marathon':
                    // Count sessions completed today
                    const today = new Date().toISOString().split('T')[0];
                    const todaySessions = Object.values(trainingProgress).filter(data => 
                        data.completed && data.completedAt.startsWith(today)
                    ).length;
                    return Math.min(todaySessions, 5);
                default:
                    return 0;
            }
        };

        const completeChallenge = (challengeId) => {
            setUserProfile(prev => ({
                ...prev,
                points: prev.points + challengeTypes[challenge.type].reward,
                challenges: prev.challenges.map(c => 
                    c.id === challengeId ? { ...c, completed: true } : c
                )
            }));
            
            addExperience(challengeTypes[challenge.type].reward * 1.5);
        };

        // Achievement definitions
        const achievementDefinitions = {
            // Session-based achievements
            firstSession: {
                id: 'firstSession',
                title: 'First Steps',
                description: 'Complete your first training session',
                icon: '🎯',
                color: 'green',
                condition: (stats) => stats.totalSessions >= 1
            },
            tenSessions: {
                id: 'tenSessions',
                title: 'Dedicated Learner',
                description: 'Complete 10 training sessions',
                icon: '🔥',
                color: 'orange',
                condition: (stats) => stats.totalSessions >= 10
            },
            fiftySessions: {
                id: 'fiftySessions',
                title: 'Training Master',
                description: 'Complete 50 training sessions',
                icon: '👑',
                color: 'purple',
                condition: (stats) => stats.totalSessions >= 50
            },
            hundredSessions: {
                id: 'hundredSessions',
                title: 'Cognitive Legend',
                description: 'Complete 100 training sessions',
                icon: '🌟',
                color: 'gold',
                condition: (stats) => stats.totalSessions >= 100
            },
            
            // Streak achievements
            threeDayStreak: {
                id: 'threeDayStreak',
                title: 'Consistency Starter',
                description: 'Maintain a 3-day training streak',
                icon: '📈',
                color: 'blue',
                condition: (stats) => stats.streakDays >= 3
            },
            sevenDayStreak: {
                id: 'sevenDayStreak',
                title: 'Week Warrior',
                description: 'Maintain a 7-day training streak',
                icon: '⚡',
                color: 'green',
                condition: (stats) => stats.streakDays >= 7
            },
            thirtyDayStreak: {
                id: 'thirtyDayStreak',
                title: 'Monthly Master',
                description: 'Maintain a 30-day training streak',
                icon: '🏆',
                color: 'purple',
                condition: (stats) => stats.streakDays >= 30
            },
            
            // Score-based achievements
            perfectScore: {
                id: 'perfectScore',
                title: 'Perfect Performance',
                description: 'Achieve a perfect score in any session',
                icon: '💎',
                color: 'gold',
                condition: (stats) => stats.highestScore >= 100
            },
            highAchiever: {
                id: 'highAchiever',
                title: 'High Achiever',
                description: 'Maintain an average score above 90%',
                icon: '🎖️',
                color: 'orange',
                condition: (stats) => stats.averageScore >= 90
            },
            
            // Program completion achievements
            focusMaster: {
                id: 'focusMaster',
                title: 'Focus Master',
                description: 'Complete all Focus & Concentration sessions',
                icon: '🎯',
                color: 'red',
                condition: (stats) => stats.completedPrograms?.includes('focus')
            },
            memoryMaster: {
                id: 'memoryMaster',
                title: 'Memory Master',
                description: 'Complete all Memory Enhancement sessions',
                icon: '🧠',
                color: 'blue',
                condition: (stats) => stats.completedPrograms?.includes('memory')
            },
            creativityMaster: {
                id: 'creativityMaster',
                title: 'Creativity Master',
                description: 'Complete all Creative Thinking sessions',
                icon: '✨',
                color: 'purple',
                condition: (stats) => stats.completedPrograms?.includes('creativity')
            },
            productivityMaster: {
                id: 'productivityMaster',
                title: 'Productivity Master',
                description: 'Complete all Productivity Mastery sessions',
                icon: '⚡',
                color: 'orange',
                condition: (stats) => stats.completedPrograms?.includes('productivity')
            },
            allProgramsMaster: {
                id: 'allProgramsMaster',
                title: 'Cognitive Grandmaster',
                description: 'Complete all training programs',
                icon: '👑',
                color: 'gold',
                condition: (stats) => stats.completedPrograms?.length >= 4
            }
        };

        const checkAndUpdateAchievements = (newStats) => {
            const newAchievements = [];
            
            Object.values(achievementDefinitions).forEach(achievement => {
                if (!achievements.unlocked.includes(achievement.id) && achievement.condition(newStats)) {
                    newAchievements.push(achievement);
                }
            });
            
            if (newAchievements.length > 0) {
                setAchievements(prev => ({
                    ...prev,
                    unlocked: [...prev.unlocked, ...newAchievements.map(a => a.id)]
                }));
                
                // Show achievement notification
                newAchievements.forEach(achievement => {
                    showAchievementNotification(achievement);
                });
            }
        };

        const showAchievementNotification = (achievement) => {
            // Create a temporary notification element
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-gray-800 border border-orange-500 rounded-lg p-4 text-white z-50 transform translate-x-full transition-transform duration-500';
            notification.innerHTML = `
                <div class="flex items-center space-x-3">
                    <span class="text-2xl">${achievement.icon}</span>
                    <div>
                        <div class="font-bold text-orange-400">${achievement.title}</div>
                        <div class="text-sm text-gray-300">${achievement.description}</div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.classList.remove('translate-x-full');
            }, 100);
            
            // Animate out and remove
            setTimeout(() => {
                notification.classList.add('translate-x-full');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        };

        const updateStats = (sessionId, score, duration) => {
            const today = new Date().toISOString().split('T')[0];
            const lastSessionDate = achievements.stats.lastSessionDate;
            
            let newStreakDays = achievements.stats.streakDays;
            if (lastSessionDate) {
                const lastDate = new Date(lastSessionDate);
                const todayDate = new Date(today);
                const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    newStreakDays += 1;
                } else if (diffDays > 1) {
                    newStreakDays = 1;
                }
            } else {
                newStreakDays = 1;
            }
            
            const newStats = {
                totalSessions: achievements.stats.totalSessions + 1,
                totalTime: achievements.stats.totalTime + duration,
                averageScore: Math.round((achievements.stats.averageScore * achievements.stats.totalSessions + score) / (achievements.stats.totalSessions + 1)),
                streakDays: newStreakDays,
                lastSessionDate: today,
                highestScore: Math.max(achievements.stats.highestScore || 0, score),
                completedPrograms: getCompletedPrograms()
            };
            
            setAchievements(prev => ({
                ...prev,
                stats: newStats
            }));
            
            // Add gamification rewards
            const session = trainingPrograms.flatMap(p => p.sessions).find(s => s.id === sessionId);
            const difficulty = session ? trainingPrograms.find(p => p.sessions.includes(session))?.difficulty : 'Beginner';
            const rewards = calculateSessionRewards(score, duration, difficulty);
            
            addExperience(rewards.experience);
            
            // Check and update challenges
            if (userProfile.challenges.length > 0) {
                userProfile.challenges.forEach(challenge => {
                    if (!challenge.completed) {
                        const progress = checkChallengeCompletion(challenge);
                        if (progress >= challenge.target) {
                            completeChallenge(challenge.id);
                        }
                    }
                });
            }
            
            checkAndUpdateAchievements(newStats);
        };

        const getCompletedPrograms = () => {
            const completed = [];
            trainingPrograms.forEach(program => {
                const progress = getProgramProgress(program.id);
                if (progress === 100) {
                    completed.push(program.id);
                }
            });
            return completed;
        };

        const getAchievementProgress = (achievementId) => {
            const achievement = achievementDefinitions[achievementId];
            if (!achievement) return 0;
            
            const stats = achievements.stats;
            
            switch (achievementId) {
                case 'firstSession':
                    return Math.min(100, (stats.totalSessions / 1) * 100);
                case 'tenSessions':
                    return Math.min(100, (stats.totalSessions / 10) * 100);
                case 'fiftySessions':
                    return Math.min(100, (stats.totalSessions / 50) * 100);
                case 'hundredSessions':
                    return Math.min(100, (stats.totalSessions / 100) * 100);
                case 'threeDayStreak':
                    return Math.min(100, (stats.streakDays / 3) * 100);
                case 'sevenDayStreak':
                    return Math.min(100, (stats.streakDays / 7) * 100);
                case 'thirtyDayStreak':
                    return Math.min(100, (stats.streakDays / 30) * 100);
                case 'perfectScore':
                    return stats.highestScore >= 100 ? 100 : Math.min(100, (stats.highestScore / 100) * 100);
                case 'highAchiever':
                    return Math.min(100, (stats.averageScore / 90) * 100);
                case 'focusMaster':
                    return getProgramProgress('focus');
                case 'memoryMaster':
                    return getProgramProgress('memory');
                case 'creativityMaster':
                    return getProgramProgress('creativity');
                case 'productivityMaster':
                    return getProgramProgress('productivity');
                case 'allProgramsMaster':
                    const completed = getCompletedPrograms().length;
                    return Math.min(100, (completed / 4) * 100);
                default:
                    return 0;
            }
        };

        const formatTime = (minutes) => {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            if (hours > 0) {
                return `${hours}h ${mins}m`;
            }
            return `${mins}m`;
        };

        const LeaderboardComponent = () => {
            const userRank = mockLeaderboard.findIndex(user => user.username === userProfile.username) + 1;
            
            return (
                <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-4xl w-full border-b-4 border-orange-700">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-orange-400">Leaderboard</h2>
                        <button
                            onClick={() => setShowLeaderboard(false)}
                            className="text-orange-400 hover:text-orange-300 font-semibold"
                        >
                            ← Back
                        </button>
                    </div>

                    {/* User's Rank */}
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 mb-8 text-center">
                        <div className="text-2xl font-bold text-white mb-2">Your Rank</div>
                        <div className="text-6xl font-bold text-white mb-2">#{userRank}</div>
                        <div className="text-white opacity-90">
                            {userProfile.username} • Level {userProfile.level} • {userProfile.points} points
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="space-y-3">
                        {mockLeaderboard.slice(0, 10).map((user, index) => (
                            <div 
                                key={user.username}
                                className={`bg-gray-700 rounded-lg p-4 flex items-center justify-between ${
                                    user.username === userProfile.username ? 'border-2 border-orange-500' : ''
                                }`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="text-2xl font-bold text-orange-400 w-8">
                                        #{index + 1}
                                    </div>
                                    <div className="text-2xl">{user.avatar}</div>
                                    <div>
                                        <div className="font-semibold text-gray-200">{user.username}</div>
                                        <div className="text-sm text-gray-400">
                                            Level {user.level} • {user.streak} day streak
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-orange-400">{user.points.toLocaleString()}</div>
                                    <div className="text-sm text-gray-400">points</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        const CustomizationComponent = () => {
            const [newExercise, setNewExercise] = useState({
                title: '',
                description: '',
                duration: 15,
                type: 'guided',
                instructions: [''],
                tips: ''
            });

            const addInstruction = () => {
                setNewExercise(prev => ({
                    ...prev,
                    instructions: [...prev.instructions, '']
                }));
            };

            const updateInstruction = (index, value) => {
                setNewExercise(prev => ({
                    ...prev,
                    instructions: prev.instructions.map((inst, i) => i === index ? value : inst)
                }));
            };

            const removeInstruction = (index) => {
                setNewExercise(prev => ({
                    ...prev,
                    instructions: prev.instructions.filter((_, i) => i !== index)
                }));
            };

            const saveCustomExercise = () => {
                if (newExercise.title && newExercise.description) {
                    createCustomExercise(newExercise);
                    setNewExercise({
                        title: '',
                        description: '',
                        duration: 15,
                        type: 'guided',
                        instructions: [''],
                        tips: ''
                    });
                }
            };

            return (
                <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-4xl w-full border-b-4 border-orange-700">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-orange-400">Customization & Settings</h2>
                        <button
                            onClick={() => setShowCustomization(false)}
                            className="text-orange-400 hover:text-orange-300 font-semibold"
                        >
                            ← Back
                        </button>
                    </div>

                    {/* Difficulty Settings */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-orange-300 mb-4">Difficulty Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { value: 'beginner', label: 'Beginner', description: 'Start with basic exercises' },
                                { value: 'intermediate', label: 'Intermediate', description: 'Moderate challenge level' },
                                { value: 'advanced', label: 'Advanced', description: 'High difficulty exercises' },
                                { value: 'adaptive', label: 'Adaptive', description: 'AI adjusts based on performance' }
                            ].map(option => (
                                <div
                                    key={option.value}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                        userSettings.difficulty === option.value
                                            ? 'border-orange-500 bg-orange-900/20'
                                            : 'border-gray-600 hover:border-gray-500'
                                    }`}
                                    onClick={() => setUserSettings(prev => ({ ...prev, difficulty: option.value }))}
                                >
                                    <div className="font-semibold text-gray-200">{option.label}</div>
                                    <div className="text-sm text-gray-400">{option.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Custom Exercise Builder */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-orange-300 mb-4">Create Custom Exercise</h3>
                        <div className="bg-gray-700 rounded-xl p-6 space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-2">Exercise Title</label>
                                <input
                                    type="text"
                                    value={newExercise.title}
                                    onChange={(e) => setNewExercise(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                                    placeholder="Enter exercise title..."
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-300 mb-2">Description</label>
                                <textarea
                                    value={newExercise.description}
                                    onChange={(e) => setNewExercise(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                                    rows="3"
                                    placeholder="Describe the exercise..."
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 mb-2">Duration (minutes)</label>
                                    <input
                                        type="number"
                                        value={newExercise.duration}
                                        onChange={(e) => setNewExercise(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                                        min="5"
                                        max="60"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-gray-300 mb-2">Type</label>
                                    <select
                                        value={newExercise.type}
                                        onChange={(e) => setNewExercise(prev => ({ ...prev, type: e.target.value }))}
                                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                                    >
                                        <option value="guided">Guided</option>
                                        <option value="interactive">Interactive</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-gray-300 mb-2">Instructions</label>
                                <div className="space-y-2">
                                    {newExercise.instructions.map((instruction, index) => (
                                        <div key={index} className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={instruction}
                                                onChange={(e) => updateInstruction(index, e.target.value)}
                                                className="flex-1 px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                                                placeholder={`Instruction ${index + 1}...`}
                                            />
                                            <button
                                                onClick={() => removeInstruction(index)}
                                                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={addInstruction}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                    >
                                        + Add Instruction
                                    </button>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-gray-300 mb-2">Pro Tip</label>
                                <input
                                    type="text"
                                    value={newExercise.tips}
                                    onChange={(e) => setNewExercise(prev => ({ ...prev, tips: e.target.value }))}
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                                    placeholder="Add a helpful tip..."
                                />
                            </div>
                            
                            <button
                                onClick={saveCustomExercise}
                                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                            >
                                💾 Save Custom Exercise
                            </button>
                        </div>
                    </div>

                    {/* Custom Exercises List */}
                    {userSettings.customExercises.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-bold text-orange-300 mb-4">Your Custom Exercises</h3>
                            <div className="space-y-4">
                                {userSettings.customExercises.map(exercise => (
                                    <div key={exercise.id} className="bg-gray-700 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-lg font-semibold text-gray-200">{exercise.title}</h4>
                                            <span className="text-sm text-gray-400">{exercise.duration}m</span>
                                        </div>
                                        <p className="text-gray-400 mb-2">{exercise.description}</p>
                                        <div className="text-sm text-gray-500">
                                            Created: {new Date(exercise.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
        };

        const IntegrationComponent = () => {
            const recommendations = getSmartRecommendations();
            
            return (
                <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-6xl w-full border-b-4 border-orange-700">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-orange-400">Smart Integration</h2>
                        <button
                            onClick={() => setShowIntegration(false)}
                            className="text-orange-400 hover:text-orange-300 font-semibold"
                        >
                            ← Back
                        </button>
                    </div>

                    {/* AI Recommendations */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-orange-300 mb-4">🤖 AI Recommendations</h3>
                        
                        {/* Next Session Recommendation */}
                        {recommendations.nextSession && (
                            <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 mb-6 border border-blue-700">
                                <h4 className="text-xl font-bold text-blue-300 mb-2">Recommended Next Session</h4>
                                <div className="flex items-center space-x-4">
                                    <span className="text-3xl">{recommendations.nextSession.program.icon}</span>
                                    <div>
                                        <div className="text-lg font-semibold text-white">
                                            {recommendations.nextSession.session.title}
                                        </div>
                                        <div className="text-blue-200">
                                            {recommendations.nextSession.program.title} • {recommendations.nextSession.session.duration} minutes
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowIntegration(false);
                                            startSession(recommendations.nextSession.session);
                                        }}
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                                    >
                                        Start Session
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Focus Area */}
                        {recommendations.focusArea && (
                            <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-xl p-6 mb-6 border border-green-700">
                                <h4 className="text-xl font-bold text-green-300 mb-2">Focus Area: {recommendations.focusArea}</h4>
                                <div className="space-y-2">
                                    {recommendations.tips.map((tip, index) => (
                                        <div key={index} className="flex items-start">
                                            <span className="text-green-400 mr-2">•</span>
                                            <span className="text-green-200">{tip}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Nootropics Integration */}
                    {recommendations.nootropics.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-orange-300 mb-4">🧪 Nootropic Recommendations</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recommendations.nootropics.map((rec, index) => {
                                    const nootropic = nootropicsData.find(n => n.id === rec.nootropic);
                                    return nootropic ? (
                                        <div key={index} className="bg-gray-700 rounded-lg p-4 border-l-4 border-orange-600">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-orange-300">{nootropic.name}</h4>
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                    rec.priority === 'high' ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'
                                                }`}>
                                                    {rec.priority} priority
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-300 mb-2">{rec.reason}</p>
                                            <button
                                                onClick={() => {
                                                    setSelectedNootropicForModal(nootropic);
                                                    setShowModal(true);
                                                    setShowIntegration(false);
                                                }}
                                                className="text-orange-400 text-sm hover:underline"
                                            >
                                                View Details &raquo;
                                            </button>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}

                    {/* Pomodoro Integration */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-orange-300 mb-4">⏰ Pomodoro Settings</h3>
                        <div className="bg-gray-700 rounded-xl p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-gray-300 mb-2">Work Duration</label>
                                    <div className="text-2xl font-bold text-orange-400">
                                        {recommendations.pomodoro.workDuration}m
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Break Duration</label>
                                    <div className="text-2xl font-bold text-green-400">
                                        {recommendations.pomodoro.breakDuration}m
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Long Break</label>
                                    <div className="text-2xl font-bold text-blue-400">
                                        {recommendations.pomodoro.longBreakDuration}m
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setView('pomodoro');
                                    setShowIntegration(false);
                                }}
                                className="mt-4 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg"
                            >
                                Open Pomodoro Timer
                            </button>
                        </div>
                    </div>

                    {/* Braverman Test Integration */}
                    {recommendations.braverman && (
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-orange-300 mb-4">🧬 Brain Type Recommendations</h3>
                            <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-xl p-6 border border-purple-700">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-purple-300 mb-2">Recommended Programs</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-purple-400">1.</span>
                                                <span className="text-white">
                                                    {trainingPrograms.find(p => p.id === recommendations.braverman.primaryProgram)?.title}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-purple-400">2.</span>
                                                <span className="text-white">
                                                    {trainingPrograms.find(p => p.id === recommendations.braverman.secondaryProgram)?.title}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-purple-300 mb-2">Focus Areas</h4>
                                        <div className="space-y-1">
                                            {recommendations.braverman.focusAreas.map((area, index) => (
                                                <div key={index} className="text-purple-200">• {area}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        };

        const ChallengesComponent = () => {
            const [currentChallenge, setCurrentChallenge] = useState(null);
            
            // Generate daily challenge if none exists
            useEffect(() => {
                if (userProfile.challenges.length === 0) {
                    setUserProfile(prev => ({
                        ...prev,
                        challenges: [generateDailyChallenge()]
                    }));
                }
            }, []);

            const getChallengeProgress = (challenge) => {
                return checkChallengeCompletion(challenge);
            };

            return (
                <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-4xl w-full border-b-4 border-orange-700">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-orange-400">Daily Challenges</h2>
                        <button
                            onClick={() => setShowChallenges(false)}
                            className="text-orange-400 hover:text-orange-300 font-semibold"
                        >
                            ← Back
                        </button>
                    </div>

                    <div className="space-y-6">
                        {userProfile.challenges.map(challenge => {
                            const progress = getChallengeProgress(challenge);
                            const isCompleted = challenge.completed || progress >= challenge.target;
                            
                            return (
                                <div 
                                    key={challenge.id}
                                    className={`bg-gray-700 rounded-xl p-6 border-2 ${
                                        isCompleted ? 'border-green-500 bg-green-900/20' : 'border-gray-600'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-3xl">{challenge.icon}</span>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-200">{challenge.title}</h3>
                                                <p className="text-gray-400">{challenge.description}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-orange-400">{challenge.reward}</div>
                                            <div className="text-sm text-gray-400">points</div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                                            <span>Progress</span>
                                            <span>{progress}/{challenge.target}</span>
                                        </div>
                                        <div className="w-full bg-gray-600 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    isCompleted ? 'bg-green-500' : 'bg-orange-500'
                                                }`}
                                                style={{ width: `${Math.min(100, (progress / challenge.target) * 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {isCompleted && !challenge.completed && (
                                        <button
                                            onClick={() => completeChallenge(challenge.id)}
                                            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200"
                                        >
                                            🎉 Claim Reward
                                        </button>
                                    )}

                                    {challenge.completed && (
                                        <div className="text-center text-green-400 font-semibold">
                                            ✅ Challenge Completed!
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        };

        const AnalyticsDashboard = () => {
            const stats = achievements.stats;
            const unlockedCount = achievements.unlocked.length;
            const totalAchievements = Object.keys(achievementDefinitions).length;
            
            return (
                <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-6xl w-full border-b-4 border-orange-700">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-orange-400">Analytics Dashboard</h2>
                        <button
                            onClick={() => setShowAnalytics(false)}
                            className="text-orange-400 hover:text-orange-300 font-semibold"
                        >
                            ← Back to Training
                        </button>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gray-700 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-orange-400 mb-2">{stats.totalSessions}</div>
                            <div className="text-gray-300">Total Sessions</div>
                        </div>
                        <div className="bg-gray-700 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">{formatTime(stats.totalTime)}</div>
                            <div className="text-gray-300">Total Time</div>
                        </div>
                        <div className="bg-gray-700 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-2">{stats.averageScore}%</div>
                            <div className="text-gray-300">Average Score</div>
                        </div>
                        <div className="bg-gray-700 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">{stats.streakDays}</div>
                            <div className="text-gray-300">Day Streak</div>
                        </div>
                    </div>

                    {/* Program Progress */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-orange-300 mb-4">Program Progress</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {trainingPrograms.map(program => {
                                const progress = getProgramProgress(program.id);
                                return (
                                    <div key={program.id} className="bg-gray-700 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <span className="text-xl mr-2">{program.icon}</span>
                                                <span className="font-semibold text-gray-200">{program.title}</span>
                                            </div>
                                            <span className="text-orange-400 font-semibold">{progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-600 rounded-full h-2">
                                            <div 
                                                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-orange-300 mb-4">
                            Achievements ({unlockedCount}/{totalAchievements})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.values(achievementDefinitions).map(achievement => {
                                const isUnlocked = achievements.unlocked.includes(achievement.id);
                                const progress = getAchievementProgress(achievement.id);
                                
                                return (
                                    <div 
                                        key={achievement.id} 
                                        className={`bg-gray-700 rounded-lg p-4 border-2 transition-all duration-200 ${
                                            isUnlocked 
                                                ? 'border-orange-500 bg-orange-900/20' 
                                                : 'border-gray-600'
                                        }`}
                                    >
                                        <div className="flex items-center mb-3">
                                            <span className={`text-2xl mr-3 ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                                                {achievement.icon}
                                            </span>
                                            <div className="flex-1">
                                                <div className={`font-semibold ${isUnlocked ? 'text-orange-300' : 'text-gray-400'}`}>
                                                    {achievement.title}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {achievement.description}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {!isUnlocked && (
                                            <div className="mb-2">
                                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                                    <span>Progress</span>
                                                    <span>{Math.round(progress)}%</span>
                                                </div>
                                                <div className="w-full bg-gray-600 rounded-full h-1">
                                                    <div 
                                                        className="bg-orange-500 h-1 rounded-full transition-all duration-300"
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {isUnlocked && (
                                            <div className="text-green-400 text-sm font-semibold">
                                                ✅ Unlocked
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                        <h3 className="text-2xl font-bold text-orange-300 mb-4">Recent Activity</h3>
                        <div className="bg-gray-700 rounded-lg p-4">
                            <div className="space-y-3">
                                {Object.entries(trainingProgress)
                                    .filter(([_, data]) => data.completed)
                                    .sort(([_, a], [__, b]) => new Date(b.completedAt) - new Date(a.completedAt))
                                    .slice(0, 5)
                                    .map(([sessionId, data]) => {
                                        const session = trainingPrograms.flatMap(p => p.sessions).find(s => s.id === sessionId);
                                        return (
                                            <div key={sessionId} className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <span className="text-orange-400 mr-3">✅</span>
                                                    <div>
                                                        <div className="text-gray-200 font-semibold">
                                                            {session?.title || 'Training Session'}
                                                        </div>
                                                        <div className="text-sm text-gray-400">
                                                            {new Date(data.completedAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-orange-400 font-semibold">
                                                    {data.score}%
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        const trainingPrograms = [
            {
                id: 'focus',
                title: 'Focus & Concentration',
                description: 'Improve your ability to maintain attention and concentration',
                duration: '4 weeks',
                difficulty: 'Beginner',
                sessions: [
                    {
                        id: 'focus-1',
                        title: 'Mindful Breathing Foundation',
                        duration: '10 minutes',
                        type: 'guided',
                        description: 'Learn the basics of mindful breathing to improve focus',
                        instructions: [
                            'Find a comfortable seated position',
                            'Close your eyes and take a deep breath',
                            'Focus on your breath for 10 minutes',
                            'When your mind wanders, gently return to your breath'
                        ],
                        tips: 'Practice this daily for best results'
                    },
                    {
                        id: 'focus-2',
                        title: 'Attention Span Training',
                        duration: '15 minutes',
                        type: 'interactive',
                        description: 'Train your attention span with focused exercises',
                        instructions: [
                            'Choose a single object to focus on',
                            'Maintain attention for 5 minutes without distraction',
                            'Gradually increase focus time',
                            'Practice in different environments'
                        ],
                        tips: 'Start with 5 minutes and gradually increase'
                    },
                    {
                        id: 'focus-3',
                        title: 'Distraction Elimination',
                        duration: '20 minutes',
                        type: 'workshop',
                        description: 'Learn to identify and eliminate distractions',
                        instructions: [
                            'Audit your environment for distractions',
                            'Create a distraction-free workspace',
                            'Use the Pomodoro technique',
                            'Practice single-tasking'
                        ],
                        tips: 'Create a dedicated focus environment'
                    },
                    {
                        id: 'focus-4',
                        title: 'Deep Work Protocol',
                        duration: '30 minutes',
                        type: 'advanced',
                        description: 'Master the art of deep, focused work',
                        instructions: [
                            'Schedule 90-minute deep work blocks',
                            'Eliminate all interruptions',
                            'Work on cognitively demanding tasks',
                            'Take strategic breaks between sessions'
                        ],
                        tips: 'Start with shorter sessions and build up'
                    }
                ],
                icon: '🎯',
                color: 'red'
            },
            {
                id: 'memory',
                title: 'Memory Enhancement',
                description: 'Boost your memory retention and recall abilities',
                duration: '6 weeks',
                difficulty: 'Intermediate',
                sessions: [
                    {
                        id: 'memory-1',
                        title: 'Memory Palace Basics',
                        duration: '15 minutes',
                        type: 'guided',
                        description: 'Learn the ancient technique of memory palaces',
                        instructions: [
                            'Choose a familiar location (your home)',
                            'Identify 10 distinct locations within it',
                            'Create vivid mental images for each item',
                            'Practice recalling items in order'
                        ],
                        tips: 'Use familiar places for better recall'
                    },
                    {
                        id: 'memory-2',
                        title: 'Spaced Repetition Practice',
                        duration: '20 minutes',
                        type: 'interactive',
                        description: 'Master the science of optimal learning intervals',
                        instructions: [
                            'Create flashcards for important information',
                            'Review at increasing intervals (1, 3, 7, 14 days)',
                            'Focus on difficult items more frequently',
                            'Use apps like Anki for systematic review'
                        ],
                        tips: 'Consistency is key for spaced repetition'
                    },
                    {
                        id: 'memory-3',
                        title: 'Association Methods',
                        duration: '25 minutes',
                        type: 'workshop',
                        description: 'Learn to create powerful memory associations',
                        instructions: [
                            'Connect new information to existing knowledge',
                            'Use vivid imagery and emotions',
                            'Create acronyms and mnemonics',
                            'Practice linking related concepts'
                        ],
                        tips: 'The more vivid the association, the better'
                    },
                    {
                        id: 'memory-4',
                        title: 'Visual Memory Training',
                        duration: '30 minutes',
                        type: 'advanced',
                        description: 'Enhance your visual memory capabilities',
                        instructions: [
                            'Study detailed images for 30 seconds',
                            'Recall as many details as possible',
                            'Practice with faces, objects, and scenes',
                            'Use visualization techniques for abstract concepts'
                        ],
                        tips: 'Practice with increasingly complex images'
                    }
                ],
                icon: '🧠',
                color: 'blue'
            },
            {
                id: 'creativity',
                title: 'Creative Thinking',
                description: 'Unlock your creative potential and innovative thinking',
                duration: '4 weeks',
                difficulty: 'Beginner',
                sessions: [
                    {
                        id: 'creativity-1',
                        title: 'Divergent Thinking Exercises',
                        duration: '15 minutes',
                        type: 'guided',
                        description: 'Expand your thinking beyond conventional boundaries',
                        instructions: [
                            'Generate 20 uses for a common object',
                            'Think of alternative solutions to problems',
                            'Combine unrelated concepts',
                            'Practice "what if" scenarios'
                        ],
                        tips: 'Quantity over quality - generate many ideas'
                    },
                    {
                        id: 'creativity-2',
                        title: 'Creative Problem Solving',
                        duration: '20 minutes',
                        type: 'interactive',
                        description: 'Apply creative thinking to real problems',
                        instructions: [
                            'Define the problem clearly',
                            'Brainstorm multiple solutions',
                            'Evaluate ideas without judgment',
                            'Prototype and test solutions'
                        ],
                        tips: 'Don\'t judge ideas during brainstorming'
                    },
                    {
                        id: 'creativity-3',
                        title: 'Mind Mapping Techniques',
                        duration: '25 minutes',
                        type: 'workshop',
                        description: 'Master visual thinking and idea organization',
                        instructions: [
                            'Start with a central concept',
                            'Branch out with related ideas',
                            'Use colors and images',
                            'Connect related branches'
                        ],
                        tips: 'Use visual elements to enhance memory'
                    },
                    {
                        id: 'creativity-4',
                        title: 'Idea Generation Methods',
                        duration: '30 minutes',
                        type: 'advanced',
                        description: 'Systematic approaches to generating ideas',
                        instructions: [
                            'Use SCAMPER technique (Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse)',
                            'Apply lateral thinking methods',
                            'Use random word stimulation',
                            'Practice reverse thinking'
                        ],
                        tips: 'Combine multiple techniques for best results'
                    }
                ],
                icon: '✨',
                color: 'purple'
            },
            {
                id: 'productivity',
                title: 'Productivity Mastery',
                description: 'Master time management and productivity systems',
                duration: '8 weeks',
                difficulty: 'Advanced',
                sessions: [
                    {
                        id: 'productivity-1',
                        title: 'Time Blocking Strategies',
                        duration: '20 minutes',
                        type: 'guided',
                        description: 'Learn to allocate time effectively',
                        instructions: [
                            'Audit your current time usage',
                            'Identify your most productive hours',
                            'Block time for important tasks',
                            'Schedule breaks and buffer time'
                        ],
                        tips: 'Start with your most important tasks first'
                    },
                    {
                        id: 'productivity-2',
                        title: 'Task Prioritization Methods',
                        duration: '25 minutes',
                        type: 'interactive',
                        description: 'Master the art of prioritization',
                        instructions: [
                            'Use the Eisenhower Matrix',
                            'Apply the 80/20 rule',
                            'Rank tasks by impact and effort',
                            'Eliminate or delegate low-value tasks'
                        ],
                        tips: 'Focus on high-impact, low-effort tasks'
                    },
                    {
                        id: 'productivity-3',
                        title: 'Energy Management Techniques',
                        duration: '30 minutes',
                        type: 'workshop',
                        description: 'Optimize your energy for peak performance',
                        instructions: [
                            'Track your energy levels throughout the day',
                            'Match tasks to your energy cycles',
                            'Practice energy restoration techniques',
                            'Optimize your environment for focus'
                        ],
                        tips: 'Work with your natural energy rhythms'
                    },
                    {
                        id: 'productivity-4',
                        title: 'Workflow Optimization',
                        duration: '35 minutes',
                        type: 'advanced',
                        description: 'Streamline your work processes',
                        instructions: [
                            'Map your current workflows',
                            'Identify bottlenecks and inefficiencies',
                            'Automate repetitive tasks',
                            'Create standard operating procedures'
                        ],
                        tips: 'Measure and optimize your processes'
                    }
                ],
                icon: '⚡',
                color: 'orange'
            }
        ];

        const getSessionProgress = (sessionId) => {
            return trainingProgress[sessionId] || { completed: false, score: 0, attempts: 0 };
        };

        const getProgramProgress = (programId) => {
            const program = trainingPrograms.find(p => p.id === programId);
            if (!program) return 0;
            
            const completedSessions = program.sessions.filter(session => 
                getSessionProgress(session.id).completed
            ).length;
            
            return Math.round((completedSessions / program.sessions.length) * 100);
        };

        const getTypeColor = (type) => {
            const colors = {
                guided: 'blue',
                interactive: 'green',
                workshop: 'purple',
                advanced: 'orange'
            };
            return colors[type] || 'gray';
        };

        const getTypeIcon = (type) => {
            const icons = {
                guided: '🎧',
                interactive: '🎮',
                workshop: '🔧',
                advanced: '🚀'
            };
            return icons[type] || '📚';
        };

        const [sessionTimer, setSessionTimer] = useState(null);
        const [exerciseState, setExerciseState] = useState({});
        const [currentExercise, setCurrentExercise] = useState(0);
        const [sessionScore, setSessionScore] = useState(0);
        const [showAnalytics, setShowAnalytics] = useState(false);
        const [showSocial, setShowSocial] = useState(false);
        const [showLeaderboard, setShowLeaderboard] = useState(false);
        const [showChallenges, setShowChallenges] = useState(false);
        const [showCustomization, setShowCustomization] = useState(false);
        const [showIntegration, setShowIntegration] = useState(false);
        const [userSettings, setUserSettings] = useState(() => {
            const saved = localStorage.getItem('userSettings');
            return saved ? JSON.parse(saved) : {
                difficulty: 'adaptive', // 'beginner', 'intermediate', 'advanced', 'adaptive'
                theme: 'dark', // 'dark', 'light', 'auto'
                customExercises: [],
                notifications: true,
                autoStart: false,
                sessionDuration: 15,
                preferredPrograms: [],
                integrationSettings: {
                    nootropics: true,
                    pomodoro: true,
                    bravermanTest: true
                }
            };
        });
        const [userProfile, setUserProfile] = useState(() => {
            const saved = localStorage.getItem('userProfile');
            return saved ? JSON.parse(saved) : {
                username: 'User' + Math.floor(Math.random() * 1000),
                level: 1,
                experience: 0,
                points: 0,
                avatar: '👤',
                joinDate: new Date().toISOString(),
                friends: [],
                challenges: [],
                achievements: []
            };
        });
        const [achievements, setAchievements] = useState(() => {
            const saved = localStorage.getItem('achievements');
            return saved ? JSON.parse(saved) : {
                unlocked: [],
                progress: {},
                stats: {
                    totalSessions: 0,
                    totalTime: 0,
                    averageScore: 0,
                    streakDays: 0,
                    lastSessionDate: null
                }
            };
        });

        const startSession = (session) => {
            setCurrentSession(session);
            setSessionProgress({});
            setExerciseState({});
            setCurrentExercise(0);
            setSessionScore(0);
            setSessionTimer(null);
        };

        const completeSession = (sessionId, score = 100) => {
            // Get session duration from the session data
            const session = trainingPrograms.flatMap(p => p.sessions).find(s => s.id === sessionId);
            const duration = session ? parseInt(session.duration) : 15; // Default 15 minutes
            
            setTrainingProgress(prev => ({
                ...prev,
                [sessionId]: {
                    completed: true,
                    score: score,
                    attempts: (prev[sessionId]?.attempts || 0) + 1,
                    completedAt: new Date().toISOString()
                }
            }));
            
            // Update stats and check achievements
            updateStats(sessionId, score, duration);
            
            setCurrentSession(null);
            setSessionTimer(null);
        };

        const startTimer = (duration) => {
            const endTime = Date.now() + (duration * 60 * 1000); // Convert minutes to milliseconds
            setSessionTimer(endTime);
        };

        const stopTimer = () => {
            setSessionTimer(null);
        };

        const getTimeRemaining = () => {
            if (!sessionTimer) return null;
            const remaining = sessionTimer - Date.now();
            if (remaining <= 0) {
                setSessionTimer(null);
                return null;
            }
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            return { minutes, seconds };
        };

        const updateScore = (points) => {
            setSessionScore(prev => Math.min(100, prev + points));
        };

        const getSessionExercises = (session) => {
            const exerciseMap = {
                'focus-1': [
                    {
                        type: 'breathing',
                        title: 'Mindful Breathing Exercise',
                        duration: 10,
                        instructions: 'Follow the breathing pattern shown below',
                        data: {
                            inhale: 4,
                            hold: 4,
                            exhale: 6,
                            cycles: 10
                        }
                    }
                ],
                'focus-2': [
                    {
                        type: 'attention',
                        title: 'Attention Span Test',
                        duration: 5,
                        instructions: 'Focus on the center dot and click when it changes color',
                        data: {
                            trials: 20,
                            minInterval: 2000,
                            maxInterval: 8000
                        }
                    }
                ],
                'memory-1': [
                    {
                        type: 'memory',
                        title: 'Memory Palace Practice',
                        duration: 15,
                        instructions: 'Memorize the sequence of objects and recall them in order',
                        data: {
                            items: ['apple', 'book', 'car', 'dog', 'elephant', 'flower', 'guitar', 'house', 'ice cream', 'jacket'],
                            sequenceLength: 5
                        }
                    }
                ],
                'memory-2': [
                    {
                        type: 'flashcards',
                        title: 'Spaced Repetition Practice',
                        duration: 20,
                        instructions: 'Review flashcards and rate your confidence level',
                        data: {
                            cards: [
                                { front: 'What is the capital of France?', back: 'Paris', difficulty: 'easy' },
                                { front: 'What is 7 x 8?', back: '56', difficulty: 'medium' },
                                { front: 'What year did World War II end?', back: '1945', difficulty: 'hard' },
                                { front: 'What is the chemical symbol for gold?', back: 'Au', difficulty: 'medium' },
                                { front: 'Who wrote "Romeo and Juliet"?', back: 'William Shakespeare', difficulty: 'easy' }
                            ]
                        }
                    }
                ],
                'creativity-1': [
                    {
                        type: 'brainstorm',
                        title: 'Divergent Thinking Exercise',
                        duration: 15,
                        instructions: 'Generate as many uses as possible for a common object',
                        data: {
                            object: 'paperclip',
                            timeLimit: 900,
                            targetIdeas: 20
                        }
                    }
                ],
                'creativity-2': [
                    {
                        type: 'problem-solving',
                        title: 'Creative Problem Solving',
                        duration: 20,
                        instructions: 'Solve the given problem using creative thinking',
                        data: {
                            problem: 'How can you make a building more environmentally friendly?',
                            timeLimit: 1200,
                            categories: ['Energy', 'Materials', 'Design', 'Technology']
                        }
                    }
                ],
                'productivity-1': [
                    {
                        type: 'time-audit',
                        title: 'Time Audit Exercise',
                        duration: 20,
                        instructions: 'Analyze how you spend your time and identify improvements',
                        data: {
                            activities: ['Work', 'Social Media', 'Exercise', 'Reading', 'Sleep', 'Commuting', 'Cooking', 'Entertainment'],
                            timeSlots: ['Morning', 'Afternoon', 'Evening', 'Night']
                        }
                    }
                ],
                'productivity-2': [
                    {
                        type: 'prioritization',
                        title: 'Eisenhower Matrix Exercise',
                        duration: 25,
                        instructions: 'Categorize tasks using the Eisenhower Matrix',
                        data: {
                            tasks: [
                                'Check emails', 'Plan next week', 'Call client', 'Organize desk',
                                'Exercise', 'Watch TV', 'Read industry news', 'Network with colleagues'
                            ]
                        }
                    }
                ]
            };
            return exerciseMap[session.id] || [];
        };

        // Interactive Exercise Components
        const BreathingExercise = ({ exercise, onComplete }) => {
            const [currentPhase, setCurrentPhase] = useState('inhale');
            const [timeLeft, setTimeLeft] = useState(exercise.data.inhale);
            const [cycle, setCycle] = useState(1);
            const [isActive, setIsActive] = useState(false);

            useEffect(() => {
                if (!isActive) return;

                const timer = setInterval(() => {
                    setTimeLeft(prev => {
                        if (prev <= 1) {
                            // Move to next phase
                            if (currentPhase === 'inhale') {
                                setCurrentPhase('hold');
                                return exercise.data.hold;
                            } else if (currentPhase === 'hold') {
                                setCurrentPhase('exhale');
                                return exercise.data.exhale;
                            } else {
                                // Completed exhale, move to next cycle
                                if (cycle < exercise.data.cycles) {
                                    setCycle(cycle + 1);
                                    setCurrentPhase('inhale');
                                    return exercise.data.inhale;
                                } else {
                                    // Exercise complete
                                    setIsActive(false);
                                    onComplete(100);
                                    return 0;
                                }
                            }
                        }
                        return prev - 1;
                    });
                }, 1000);

                return () => clearInterval(timer);
            }, [currentPhase, cycle, isActive, exercise.data, onComplete]);

            const startExercise = () => {
                setIsActive(true);
            };

            const getPhaseColor = () => {
                switch (currentPhase) {
                    case 'inhale': return 'text-green-400';
                    case 'hold': return 'text-yellow-400';
                    case 'exhale': return 'text-red-400';
                    default: return 'text-gray-400';
                }
            };

            const getPhaseIcon = () => {
                switch (currentPhase) {
                    case 'inhale': return '🫁';
                    case 'hold': return '⏸️';
                    case 'exhale': return '💨';
                    default: return '🫁';
                }
            };

            return (
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-orange-300 mb-6">{exercise.title}</h3>
                    
                    {!isActive ? (
                        <button
                            onClick={startExercise}
                            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-full shadow-lg transition-all duration-300"
                        >
                            🚀 Start Breathing Exercise
                        </button>
                    ) : (
                        <div className="space-y-6">
                            <div className="text-6xl mb-4">{getPhaseIcon()}</div>
                            <div className={`text-4xl font-bold ${getPhaseColor()}`}>
                                {currentPhase.toUpperCase()}
                            </div>
                            <div className="text-6xl font-bold text-orange-400">
                                {timeLeft}
                            </div>
                            <div className="text-gray-300">
                                Cycle {cycle} of {exercise.data.cycles}
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-3">
                                <div 
                                    className="bg-orange-500 h-3 rounded-full transition-all duration-1000"
                                    style={{ width: `${((cycle - 1) / exercise.data.cycles) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            );
        };

        const AttentionExercise = ({ exercise, onComplete }) => {
            const [isActive, setIsActive] = useState(false);
            const [currentTrial, setCurrentTrial] = useState(0);
            const [dotColor, setDotColor] = useState('gray');
            const [reactionTime, setReactionTime] = useState(0);
            const [startTime, setStartTime] = useState(0);
            const [scores, setScores] = useState([]);

            const startExercise = () => {
                setIsActive(true);
                setCurrentTrial(1);
                scheduleNextTrial();
            };

            const scheduleNextTrial = () => {
                const interval = Math.random() * (exercise.data.maxInterval - exercise.data.minInterval) + exercise.data.minInterval;
                setTimeout(() => {
                    if (currentTrial <= exercise.data.trials) {
                        setDotColor('red');
                        setStartTime(Date.now());
                    }
                }, interval);
            };

            const handleClick = () => {
                if (dotColor === 'red') {
                    const time = Date.now() - startTime;
                    setReactionTime(time);
                    setScores(prev => [...prev, time]);
                    setDotColor('gray');
                    
                    if (currentTrial < exercise.data.trials) {
                        setCurrentTrial(currentTrial + 1);
                        scheduleNextTrial();
                    } else {
                        // Exercise complete
                        const avgReactionTime = scores.reduce((a, b) => a + b, time) / (scores.length + 1);
                        const score = Math.max(0, 100 - Math.floor(avgReactionTime / 10));
                        onComplete(score);
                    }
                }
            };

            return (
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-orange-300 mb-6">{exercise.title}</h3>
                    
                    {!isActive ? (
                        <button
                            onClick={startExercise}
                            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-full shadow-lg transition-all duration-300"
                        >
                            🎯 Start Attention Test
                        </button>
                    ) : (
                        <div className="space-y-6">
                            <div className="text-gray-300">
                                Trial {currentTrial} of {exercise.data.trials}
                            </div>
                            <div 
                                className={`w-32 h-32 mx-auto rounded-full cursor-pointer transition-all duration-300 ${
                                    dotColor === 'red' ? 'bg-red-500' : 'bg-gray-500'
                                }`}
                                onClick={handleClick}
                            ></div>
                            <div className="text-gray-300">
                                Click when the dot turns red
                            </div>
                            {reactionTime > 0 && (
                                <div className="text-green-400">
                                    Reaction time: {reactionTime}ms
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        };

        const MemoryExercise = ({ exercise, onComplete }) => {
            const [phase, setPhase] = useState('study'); // 'study' or 'recall'
            const [currentIndex, setCurrentIndex] = useState(0);
            const [sequence, setSequence] = useState([]);
            const [userInput, setUserInput] = useState('');
            const [score, setScore] = useState(0);

            useEffect(() => {
                // Generate random sequence
                const items = exercise.data.items;
                const newSequence = [];
                for (let i = 0; i < exercise.data.sequenceLength; i++) {
                    newSequence.push(items[Math.floor(Math.random() * items.length)]);
                }
                setSequence(newSequence);
            }, []);

            const startRecall = () => {
                setPhase('recall');
                setCurrentIndex(0);
            };

            const handleRecall = () => {
                if (userInput.toLowerCase() === sequence[currentIndex].toLowerCase()) {
                    setScore(score + 1);
                }
                
                if (currentIndex < sequence.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                    setUserInput('');
                } else {
                    // Exercise complete
                    const finalScore = Math.round((score + (userInput.toLowerCase() === sequence[currentIndex].toLowerCase() ? 1 : 0)) / sequence.length * 100);
                    onComplete(finalScore);
                }
            };

            return (
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-orange-300 mb-6">{exercise.title}</h3>
                    
                    {phase === 'study' ? (
                        <div className="space-y-6">
                            <div className="text-gray-300">
                                Memorize this sequence:
                            </div>
                            <div className="text-4xl font-bold text-orange-400">
                                {sequence[currentIndex]}
                            </div>
                            <div className="text-gray-300">
                                Item {currentIndex + 1} of {sequence.length}
                            </div>
                            <button
                                onClick={() => {
                                    if (currentIndex < sequence.length - 1) {
                                        setCurrentIndex(currentIndex + 1);
                                    } else {
                                        startRecall();
                                    }
                                }}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                            >
                                {currentIndex < sequence.length - 1 ? 'Next Item' : 'Start Recall'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="text-gray-300">
                                Recall item {currentIndex + 1} of {sequence.length}:
                            </div>
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleRecall()}
                                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-center text-lg"
                                placeholder="Type the item..."
                                autoFocus
                            />
                            <button
                                onClick={handleRecall}
                                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                            >
                                Submit
                            </button>
                            <div className="text-green-400">
                                Score: {score}/{currentIndex}
                            </div>
                        </div>
                    )}
                </div>
            );
        };

        const FlashcardExercise = ({ exercise, onComplete }) => {
            const [currentCard, setCurrentCard] = useState(0);
            const [showAnswer, setShowAnswer] = useState(false);
            const [ratings, setRatings] = useState([]);

            const handleRating = (rating) => {
                setRatings([...ratings, rating]);
                
                if (currentCard < exercise.data.cards.length - 1) {
                    setCurrentCard(currentCard + 1);
                    setShowAnswer(false);
                } else {
                    // Exercise complete
                    const avgRating = ratings.reduce((a, b) => a + b, rating) / (ratings.length + 1);
                    const score = Math.round((avgRating / 5) * 100);
                    onComplete(score);
                }
            };

            const card = exercise.data.cards[currentCard];

            return (
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-orange-300 mb-6">{exercise.title}</h3>
                    
                    <div className="space-y-6">
                        <div className="text-gray-300">
                            Card {currentCard + 1} of {exercise.data.cards.length}
                        </div>
                        
                        <div className="bg-gray-700 rounded-xl p-8 border border-gray-600">
                            <div className="text-2xl font-bold text-gray-200 mb-4">
                                {card.front}
                            </div>
                            
                            {showAnswer ? (
                                <div className="space-y-4">
                                    <div className="text-xl text-green-400">
                                        {card.back}
                                    </div>
                                    <div className="text-gray-300">
                                        How well did you know this?
                                    </div>
                                    <div className="flex justify-center space-x-2">
                                        {[1, 2, 3, 4, 5].map(rating => (
                                            <button
                                                key={rating}
                                                onClick={() => handleRating(rating)}
                                                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white"
                                            >
                                                {rating}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowAnswer(true)}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                                >
                                    Show Answer
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            );
        };

        const BrainstormExercise = ({ exercise, onComplete }) => {
            const [ideas, setIdeas] = useState([]);
            const [newIdea, setNewIdea] = useState('');
            const [timeLeft, setTimeLeft] = useState(exercise.data.timeLimit);
            const [isActive, setIsActive] = useState(false);

            useEffect(() => {
                if (!isActive) return;

                const timer = setInterval(() => {
                    setTimeLeft(prev => {
                        if (prev <= 1) {
                            setIsActive(false);
                            const score = Math.min(100, Math.round((ideas.length / exercise.data.targetIdeas) * 100));
                            onComplete(score);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                return () => clearInterval(timer);
            }, [isActive, timeLeft, ideas.length, exercise.data.targetIdeas, onComplete]);

            const startExercise = () => {
                setIsActive(true);
            };

            const addIdea = () => {
                if (newIdea.trim() && isActive) {
                    setIdeas([...ideas, newIdea.trim()]);
                    setNewIdea('');
                }
            };

            const formatTime = (seconds) => {
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                return `${mins}:${secs.toString().padStart(2, '0')}`;
            };

            return (
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-orange-300 mb-6">{exercise.title}</h3>
                    
                    {!isActive ? (
                        <button
                            onClick={startExercise}
                            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-full shadow-lg transition-all duration-300"
                        >
                            💡 Start Brainstorming
                        </button>
                    ) : (
                        <div className="space-y-6">
                            <div className="text-2xl font-bold text-red-400">
                                {formatTime(timeLeft)}
                            </div>
                            <div className="text-gray-300">
                                Generate uses for: <span className="text-orange-400 font-bold">{exercise.data.object}</span>
                            </div>
                            
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={newIdea}
                                    onChange={(e) => setNewIdea(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addIdea()}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    placeholder="Enter your idea..."
                                />
                                <button
                                    onClick={addIdea}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                                >
                                    Add
                                </button>
                            </div>
                            
                            <div className="text-gray-300">
                                Ideas: {ideas.length} / {exercise.data.targetIdeas}
                            </div>
                            
                            <div className="bg-gray-700 rounded-lg p-4 max-h-40 overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {ideas.map((idea, index) => (
                                        <div key={index} className="text-left text-gray-200 text-sm">
                                            {index + 1}. {idea}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        };

        // Render current session if active
        if (currentSession) {
            const exercises = getSessionExercises(currentSession);
            const currentExerciseData = exercises[currentExercise];

            return (
                <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
                    <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-4xl w-full border-b-4 border-orange-700">
                        <button
                            onClick={() => setCurrentSession(null)}
                            className="mb-6 text-orange-400 hover:text-orange-300 font-semibold flex items-center"
                        >
                            ← Back to Program
                        </button>

                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">{getTypeIcon(currentSession.type)}</div>
                            <h2 className="text-3xl font-bold text-orange-400 mb-2">{currentSession.title}</h2>
                            <p className="text-gray-300 mb-2">{currentSession.description}</p>
                            <div className="flex items-center justify-center space-x-4">
                                <span className="text-orange-400 font-semibold">{currentSession.duration}</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${getTypeColor(currentSession.type)}-900 text-${getTypeColor(currentSession.type)}-300`}>
                                    {currentSession.type.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* Session Progress */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-300">Session Progress</span>
                                <span className="text-orange-400 font-semibold">{sessionScore}%</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-2">
                                <div 
                                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${sessionScore}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Interactive Exercise */}
                        {currentExerciseData ? (
                            <div className="bg-gray-900 rounded-xl p-8 mb-6">
                                {currentExerciseData.type === 'breathing' && (
                                    <BreathingExercise 
                                        exercise={currentExerciseData} 
                                        onComplete={(score) => {
                                            updateScore(score);
                                            if (currentExercise < exercises.length - 1) {
                                                setCurrentExercise(currentExercise + 1);
                                            } else {
                                                completeSession(currentSession.id, sessionScore + score);
                                            }
                                        }}
                                    />
                                )}
                                {currentExerciseData.type === 'attention' && (
                                    <AttentionExercise 
                                        exercise={currentExerciseData} 
                                        onComplete={(score) => {
                                            updateScore(score);
                                            if (currentExercise < exercises.length - 1) {
                                                setCurrentExercise(currentExercise + 1);
                                            } else {
                                                completeSession(currentSession.id, sessionScore + score);
                                            }
                                        }}
                                    />
                                )}
                                {currentExerciseData.type === 'memory' && (
                                    <MemoryExercise 
                                        exercise={currentExerciseData} 
                                        onComplete={(score) => {
                                            updateScore(score);
                                            if (currentExercise < exercises.length - 1) {
                                                setCurrentExercise(currentExercise + 1);
                                            } else {
                                                completeSession(currentSession.id, sessionScore + score);
                                            }
                                        }}
                                    />
                                )}
                                {currentExerciseData.type === 'flashcards' && (
                                    <FlashcardExercise 
                                        exercise={currentExerciseData} 
                                        onComplete={(score) => {
                                            updateScore(score);
                                            if (currentExercise < exercises.length - 1) {
                                                setCurrentExercise(currentExercise + 1);
                                            } else {
                                                completeSession(currentSession.id, sessionScore + score);
                                            }
                                        }}
                                    />
                                )}
                                {currentExerciseData.type === 'brainstorm' && (
                                    <BrainstormExercise 
                                        exercise={currentExerciseData} 
                                        onComplete={(score) => {
                                            updateScore(score);
                                            if (currentExercise < exercises.length - 1) {
                                                setCurrentExercise(currentExercise + 1);
                                            } else {
                                                completeSession(currentSession.id, sessionScore + score);
                                            }
                                        }}
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="bg-gray-900 rounded-xl p-6 mb-6">
                                <h3 className="text-xl font-bold text-orange-300 mb-4">Session Instructions</h3>
                                <div className="space-y-4">
                                    {currentSession.instructions.map((instruction, index) => (
                                        <div key={index} className="flex items-start">
                                            <span className="text-orange-400 font-bold mr-3 mt-1">{index + 1}</span>
                                            <span className="text-gray-200 leading-relaxed">{instruction}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-blue-900 rounded-xl p-4 border border-blue-700 mb-6">
                            <h4 className="font-semibold text-blue-300 mb-2">💡 Pro Tip:</h4>
                            <p className="text-blue-200">{currentSession.tips}</p>
                        </div>

                        {!currentExerciseData && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => completeSession(currentSession.id, sessionScore)}
                                    className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-full shadow-lg transition-all duration-300"
                                >
                                    ✅ Complete Session
                                </button>
                                <button
                                    onClick={() => setCurrentSession(null)}
                                    className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg rounded-full shadow-lg transition-all duration-300"
                                >
                                    ⏸️ Pause Session
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // Show different views based on state
        if (showAnalytics) {
            return (
                <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
                    <AnalyticsDashboard />
                </div>
            );
        }

        if (showLeaderboard) {
            return (
                <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
                    <LeaderboardComponent />
                </div>
            );
        }

        if (showChallenges) {
            return (
                <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
                    <ChallengesComponent />
                </div>
            );
        }

        if (showCustomization) {
            return (
                <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
                    <CustomizationComponent />
                </div>
            );
        }

        if (showIntegration) {
            return (
                <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
                    <IntegrationComponent />
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
                <h1 className="text-4xl font-extrabold text-orange-400 mb-8 text-center leading-tight">
                    Training Hub
                </h1>
                <p className="text-xl text-gray-300 mb-10 text-center max-w-3xl">
                    Comprehensive training programs for cognitive enhancement and productivity.
                </p>

                {/* User Profile & Progress Summary */}
                <div className="mb-8 bg-gray-800 rounded-xl p-6 max-w-4xl w-full border border-orange-700">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="text-4xl">{userProfile.avatar}</div>
                            <div>
                                <h2 className="text-2xl font-bold text-orange-400">{userProfile.username}</h2>
                                <div className="text-gray-400">Level {userProfile.level} • {userProfile.points} points</div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setShowChallenges(true)}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200"
                            >
                                🎯 Challenges
                            </button>
                            <button
                                onClick={() => setShowLeaderboard(true)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
                            >
                                🏆 Leaderboard
                            </button>
                            <button
                                onClick={() => setShowAnalytics(true)}
                                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-200"
                            >
                                📊 Analytics
                            </button>
                            <button
                                onClick={() => setShowCustomization(true)}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200"
                            >
                                ⚙️ Customize
                            </button>
                            <button
                                onClick={() => setShowIntegration(true)}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200"
                            >
                                🤖 AI Integration
                            </button>
                        </div>
                    </div>
                    
                    {/* Level Progress */}
                    <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                            <span>Level Progress</span>
                            <span>{userProfile.experience - levelToExperience(userProfile.level)}/100 XP</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((userProfile.experience - levelToExperience(userProfile.level)) / 100) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-400">{achievements.stats.totalSessions}</div>
                            <div className="text-sm text-gray-400">Sessions</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{formatTime(achievements.stats.totalTime)}</div>
                            <div className="text-sm text-gray-400">Total Time</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">{achievements.stats.averageScore}%</div>
                            <div className="text-sm text-gray-400">Avg Score</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">{achievements.stats.streakDays}</div>
                            <div className="text-sm text-gray-400">Day Streak</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                            Achievements: {achievements.unlocked.length}/{Object.keys(achievementDefinitions).length}
                        </div>
                        <div className="text-sm text-gray-400">
                            {achievements.stats.lastSessionDate ? 
                                `Last session: ${new Date(achievements.stats.lastSessionDate).toLocaleDateString()}` : 
                                'No sessions yet'
                            }
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-4xl w-full border-b-4 border-orange-700">
                    {!selectedTraining ? (
                        <div>
                            <h2 className="text-3xl font-bold text-orange-400 mb-6 border-b pb-4 border-orange-800">
                                Choose Your Training Program
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {trainingPrograms.map(program => {
                                    const progress = getProgramProgress(program.id);
                                    return (
                                        <div
                                            key={program.id}
                                            className="bg-gray-700 rounded-xl p-6 cursor-pointer hover:bg-gray-600 transition-all duration-200 border-l-4 border-orange-600"
                                            onClick={() => setSelectedTraining(program)}
                                        >
                                            <div className="flex items-center mb-4">
                                                <span className="text-3xl mr-3">{program.icon}</span>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-orange-300">{program.title}</h3>
                                                    <div className="flex items-center space-x-2">
                                                        <p className="text-sm text-orange-400">{program.duration}</p>
                                                        <span className={`px-2 py-1 rounded text-xs font-semibold bg-${program.color}-900 text-${program.color}-300`}>
                                                            {program.difficulty}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-300 mb-4">{program.description}</p>
                                            
                                            {/* Progress Bar */}
                                            <div className="mb-4">
                                                <div className="flex justify-between text-sm text-gray-400 mb-1">
                                                    <span>Progress</span>
                                                    <span>{progress}%</span>
                                                </div>
                                                <div className="w-full bg-gray-600 rounded-full h-2">
                                                    <div 
                                                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            
                                            <button className="text-orange-400 hover:text-orange-300 font-semibold">
                                                {progress > 0 ? 'Continue Training →' : 'Start Training →'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <button
                                onClick={() => setSelectedTraining(null)}
                                className="mb-6 text-orange-400 hover:text-orange-300 font-semibold flex items-center"
                            >
                                ← Back to Programs
                            </button>
                            
                            <div className="text-center mb-8">
                                <span className="text-4xl mb-4 block">{selectedTraining.icon}</span>
                                <h2 className="text-3xl font-bold text-orange-400 mb-2">{selectedTraining.title}</h2>
                                <p className="text-gray-300 mb-2">{selectedTraining.description}</p>
                                <div className="flex items-center justify-center space-x-4">
                                    <span className="text-orange-400 font-semibold">{selectedTraining.duration}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${selectedTraining.color}-900 text-${selectedTraining.color}-300`}>
                                        {selectedTraining.difficulty}
                                    </span>
                                </div>
                            </div>

                            {/* Program Progress */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-bold text-orange-300">Program Progress</h3>
                                    <span className="text-orange-400 font-semibold">{getProgramProgress(selectedTraining.id)}% Complete</span>
                                </div>
                                <div className="w-full bg-gray-600 rounded-full h-3">
                                    <div 
                                        className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${getProgramProgress(selectedTraining.id)}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-orange-300 mb-4">Training Sessions</h3>
                                <div className="space-y-4">
                                    {selectedTraining.sessions.map((session, index) => {
                                        const progress = getSessionProgress(session.id);
                                        return (
                                            <div key={session.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center">
                                                        <span className="text-2xl mr-3">{getTypeIcon(session.type)}</span>
                                                        <div>
                                                            <h4 className="text-lg font-semibold text-gray-200">{session.title}</h4>
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-sm text-gray-400">{session.duration}</span>
                                                                <span className={`px-2 py-1 rounded text-xs font-semibold bg-${getTypeColor(session.type)}-900 text-${getTypeColor(session.type)}-300`}>
                                                                    {session.type}
                                                                </span>
                                                                {progress.completed && (
                                                                    <span className="text-green-400">✅</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => startSession(session)}
                                                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                                                            progress.completed
                                                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                                                : 'bg-orange-600 hover:bg-orange-700 text-white'
                                                        }`}
                                                    >
                                                        {progress.completed ? 'Review' : 'Start'}
                                                    </button>
                                                </div>
                                                <p className="text-gray-300 text-sm mb-3">{session.description}</p>
                                                
                                                {progress.completed && (
                                                    <div className="bg-green-900 rounded-lg p-3 border border-green-700">
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-green-300">Completed</span>
                                                            <span className="text-green-200">Score: {progress.score}%</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-6 bg-green-900 rounded-xl p-4 border border-green-700">
                                <h4 className="font-semibold text-green-300 mb-2">💡 Training Tips:</h4>
                                <ul className="text-green-200 text-sm space-y-1">
                                    <li>• Complete sessions in order for best results</li>
                                    <li>• Practice exercises daily for optimal improvement</li>
                                    <li>• Combine with nootropics for enhanced effects</li>
                                    <li>• Track your progress and celebrate milestones</li>
                                    <li>• Be patient - cognitive improvements take time</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Braverman Test Component
    const BravermanTest = () => {
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [answers, setAnswers] = useState({});
        const [showResults, setShowResults] = useState(false);
        const [testStarted, setTestStarted] = useState(false);

        // Braverman Test Questions - 8 questions per brain type (32 total)
        const bravermanQuestions = [
            // Dopamine Questions (Energy, Motivation, Drive)
            {
                id: 1,
                question: "I often feel energized and motivated to tackle new challenges",
                category: "dopamine",
                trait: "energy"
            },
            {
                id: 2,
                question: "I have a strong drive to achieve my goals and complete tasks",
                category: "dopamine",
                trait: "motivation"
            },
            {
                id: 3,
                question: "I enjoy taking risks and trying new things",
                category: "dopamine",
                trait: "risk-taking"
            },
            {
                id: 4,
                question: "I have a competitive nature and like to win",
                category: "dopamine",
                trait: "competitiveness"
            },
            {
                id: 5,
                question: "I feel restless when I'm not actively doing something",
                category: "dopamine",
                trait: "restlessness"
            },
            {
                id: 6,
                question: "I have a strong desire for rewards and recognition",
                category: "dopamine",
                trait: "reward-seeking"
            },
            {
                id: 7,
                question: "I can be impulsive and act on my immediate desires",
                category: "dopamine",
                trait: "impulsivity"
            },
            {
                id: 8,
                question: "I have a high sex drive and enjoy physical activities",
                category: "dopamine",
                trait: "libido"
            },

            // Acetylcholine Questions (Memory, Learning, Creativity)
            {
                id: 9,
                question: "I have a strong memory and can easily recall information",
                category: "acetylcholine",
                trait: "memory"
            },
            {
                id: 10,
                question: "I enjoy learning new things and acquiring knowledge",
                category: "acetylcholine",
                trait: "learning"
            },
            {
                id: 11,
                question: "I have a vivid imagination and creative thinking",
                category: "acetylcholine",
                trait: "creativity"
            },
            {
                id: 12,
                question: "I can easily visualize things in my mind",
                category: "acetylcholine",
                trait: "visualization"
            },
            {
                id: 13,
                question: "I enjoy reading and intellectual discussions",
                category: "acetylcholine",
                trait: "intellectual"
            },
            {
                id: 14,
                question: "I can quickly make connections between different ideas",
                category: "acetylcholine",
                trait: "pattern-recognition"
            },
            {
                id: 15,
                question: "I have good verbal skills and can express myself clearly",
                category: "acetylcholine",
                trait: "verbal-skills"
            },
            {
                id: 16,
                question: "I enjoy solving complex problems and puzzles",
                category: "acetylcholine",
                trait: "problem-solving"
            },

            // GABA Questions (Calm, Relaxation, Inhibition)
            {
                id: 17,
                question: "I generally feel calm and relaxed in most situations",
                category: "gaba",
                trait: "calmness"
            },
            {
                id: 18,
                question: "I can easily fall asleep and get good quality sleep",
                category: "gaba",
                trait: "sleep"
            },
            {
                id: 19,
                question: "I have good self-control and can resist temptations",
                category: "gaba",
                trait: "self-control"
            },
            {
                id: 20,
                question: "I prefer routine and structure in my daily life",
                category: "gaba",
                trait: "routine"
            },
            {
                id: 21,
                question: "I rarely feel anxious or worried about things",
                category: "gaba",
                trait: "anxiety"
            },
            {
                id: 22,
                question: "I can easily relax and let go of stress",
                category: "gaba",
                trait: "stress-relief"
            },
            {
                id: 23,
                question: "I have good impulse control and think before acting",
                category: "gaba",
                trait: "impulse-control"
            },
            {
                id: 24,
                question: "I enjoy peaceful and quiet environments",
                category: "gaba",
                trait: "peacefulness"
            },

            // Serotonin Questions (Mood, Social, Satisfaction)
            {
                id: 25,
                question: "I generally feel happy and content with my life",
                category: "serotonin",
                trait: "happiness"
            },
            {
                id: 26,
                question: "I enjoy socializing and spending time with others",
                category: "serotonin",
                trait: "socializing"
            },
            {
                id: 27,
                question: "I feel satisfied and fulfilled after completing tasks",
                category: "serotonin",
                trait: "satisfaction"
            },
            {
                id: 28,
                question: "I have a good appetite and enjoy eating",
                category: "serotonin",
                trait: "appetite"
            },
            {
                id: 29,
                question: "I feel connected to others and have meaningful relationships",
                category: "serotonin",
                trait: "connection"
            },
            {
                id: 30,
                question: "I can easily forgive and let go of grudges",
                category: "serotonin",
                trait: "forgiveness"
            },
            {
                id: 31,
                question: "I feel optimistic about the future",
                category: "serotonin",
                trait: "optimism"
            },
            {
                id: 32,
                question: "I enjoy helping others and feel good when I do",
                category: "serotonin",
                trait: "altruism"
            }
        ];

        const brainTypes = {
            dopamine: {
                name: "Dopamine",
                color: "red",
                icon: "⚡",
                description: "The Energy & Motivation Brain Type",
                characteristics: [
                    "High energy and drive",
                    "Motivated and goal-oriented",
                    "Risk-taking and adventurous",
                    "Competitive nature",
                    "Impulsive tendencies",
                    "Strong reward-seeking behavior"
                ],
                strengths: [
                    "Excellent at starting projects",
                    "Natural leadership abilities",
                    "Quick decision making",
                    "High energy for physical activities",
                    "Strong competitive drive"
                ],
                challenges: [
                    "May struggle with follow-through",
                    "Can be impulsive",
                    "May have difficulty with routine tasks",
                    "Can become easily bored",
                    "May have addictive tendencies"
                ]
            },
            acetylcholine: {
                name: "Acetylcholine",
                color: "blue",
                icon: "🧠",
                description: "The Memory & Learning Brain Type",
                characteristics: [
                    "Strong memory and recall",
                    "Excellent learning abilities",
                    "Creative and imaginative",
                    "Good verbal skills",
                    "Pattern recognition",
                    "Intellectual curiosity"
                ],
                strengths: [
                    "Excellent memory and recall",
                    "Quick learning abilities",
                    "Creative problem solving",
                    "Strong analytical thinking",
                    "Good communication skills"
                ],
                challenges: [
                    "May overthink decisions",
                    "Can be perfectionistic",
                    "May struggle with practical tasks",
                    "Can become mentally exhausted",
                    "May have difficulty with routine"
                ]
            },
            gaba: {
                name: "GABA",
                color: "green",
                icon: "🕊️",
                description: "The Calm & Relaxed Brain Type",
                characteristics: [
                    "Naturally calm and relaxed",
                    "Good sleep quality",
                    "Strong self-control",
                    "Preference for routine",
                    "Low anxiety levels",
                    "Good stress management"
                ],
                strengths: [
                    "Excellent stress management",
                    "Good sleep quality",
                    "Strong self-discipline",
                    "Reliable and consistent",
                    "Good at maintaining routines"
                ],
                challenges: [
                    "May be resistant to change",
                    "Can be overly cautious",
                    "May miss opportunities due to hesitation",
                    "Can be seen as too conservative",
                    "May struggle with spontaneity"
                ]
            },
            serotonin: {
                name: "Serotonin",
                color: "purple",
                icon: "💝",
                description: "The Social & Satisfied Brain Type",
                characteristics: [
                    "Generally happy and content",
                    "Social and outgoing",
                    "Satisfied with achievements",
                    "Good appetite and sleep",
                    "Strong social connections",
                    "Optimistic outlook"
                ],
                strengths: [
                    "Excellent social skills",
                    "Natural empathy and compassion",
                    "Good team player",
                    "Positive attitude",
                    "Strong relationship building"
                ],
                challenges: [
                    "May avoid conflict",
                    "Can be overly dependent on others",
                    "May struggle with assertiveness",
                    "Can be too accommodating",
                    "May have difficulty with criticism"
                ]
            }
        };

        const handleAnswer = (answer) => {
            const question = bravermanQuestions[currentQuestion];
            console.log(`Answering question ${question.id} with value ${answer}`);
            
            setAnswers(prev => ({
                ...prev,
                [question.id]: answer
            }));
            
            if (currentQuestion < bravermanQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                console.log('Last question answered, calculating results...');
                // Use setTimeout to ensure state updates are processed
                setTimeout(() => calculateResults(), 50);
            }
        };

        const calculateResults = () => {
            console.log('Calculating results...', answers);
            
            const scores = {
                dopamine: 0,
                acetylcholine: 0,
                gaba: 0,
                serotonin: 0
            };

            bravermanQuestions.forEach(question => {
                const answer = answers[question.id];
                if (answer) {
                    scores[question.category] += answer;
                }
            });

            console.log('Raw scores:', scores);

            // Normalize scores to percentages
            const maxScore = 8 * 5; // 8 questions per category, max score of 5 per question
            const percentages = {};
            Object.keys(scores).forEach(category => {
                percentages[category] = Math.round((scores[category] / maxScore) * 100);
            });

            console.log('Percentages:', percentages);

            const results = {
                scores: percentages,
                dominantType: Object.keys(percentages).reduce((a, b) => 
                    percentages[a] > percentages[b] ? a : b
                ),
                recommendations: generateRecommendations(percentages)
            };

            console.log('Final results:', results);

            // Set both states together to ensure they update properly
            setBravermanResults(results);
            setShowResults(true);
            
            // Force a re-render after a short delay to ensure results display
            setTimeout(() => {
                console.log('Ensuring results display...');
                setBravermanResults(prev => prev || results);
                setShowResults(true);
            }, 100);
        };

        const generateRecommendations = (scores) => {
            const recommendations = {
                nootropics: [],
                lifestyle: [],
                productivity: [],
                summary: ''
            };

            // Find dominant and weakest brain types
            const sortedTypes = Object.entries(scores).sort(([,a], [,b]) => b - a);
            const dominantType = sortedTypes[0][0];
            const weakestType = sortedTypes[3][0];
            const dominantScore = sortedTypes[0][1];
            const weakestScore = sortedTypes[3][1];

            // Generate summary
            recommendations.summary = `Your dominant brain type is ${brainTypes[dominantType].name} (${dominantScore}%), indicating strong ${brainTypes[dominantType].description.toLowerCase()}. Your ${brainTypes[weakestType].name} score (${weakestScore}%) suggests areas for optimization.`;

            // Generate recommendations for each brain type based on their scores
            Object.entries(scores).forEach(([type, score]) => {
                const brainType = brainTypes[type];
                
                if (score < 50) { // Very low score - needs significant support
                    switch(type) {
                        case 'dopamine':
                            recommendations.nootropics.push(
                                { id: 'nalt', reason: 'Supports dopamine synthesis for energy and motivation' },
                                { id: 'rhodiolaRosea', reason: 'Adaptogen that supports energy and stress resilience' },
                                { id: 'caffeine', reason: 'Provides immediate energy and focus boost' }
                            );
                            recommendations.lifestyle.push(
                                'Engage in regular exercise to boost dopamine naturally',
                                'Set clear, achievable goals to maintain motivation',
                                'Try new activities to stimulate dopamine release',
                                'Create a reward system for completing tasks'
                            );
                            recommendations.productivity.push(
                                'Use time-blocking techniques to maintain focus',
                                'Break large tasks into smaller, rewarding milestones',
                                'Create a stimulating work environment with music',
                                'Set deadlines to create urgency and motivation'
                            );
                            break;
                        case 'acetylcholine':
                            recommendations.nootropics.push(
                                { id: 'citicoline', reason: 'Supports acetylcholine synthesis for memory and learning' },
                                { id: 'bacopaMonnieri', reason: 'Enhances memory and cognitive function' },
                                { id: 'alphaGPC', reason: 'Provides choline for acetylcholine production' }
                            );
                            recommendations.lifestyle.push(
                                'Practice memory exercises and brain training',
                                'Read regularly to stimulate cognitive function',
                                'Learn new skills or languages',
                                'Play strategy games and puzzles'
                            );
                            recommendations.productivity.push(
                                'Use spaced repetition for learning new information',
                                'Take detailed notes and review them regularly',
                                'Practice active recall techniques',
                                'Create mind maps for complex topics'
                            );
                            break;
                        case 'gaba':
                            recommendations.nootropics.push(
                                { id: 'lTheanine', reason: 'Promotes relaxation and reduces anxiety' },
                                { id: 'ashwagandha', reason: 'Adaptogen that supports stress management' },
                                { id: 'magnesiumLThreonate', reason: 'Supports relaxation and sleep quality' }
                            );
                            recommendations.lifestyle.push(
                                'Practice meditation and mindfulness daily',
                                'Establish a consistent sleep schedule',
                                'Create a calm, organized environment',
                                'Limit caffeine and stimulants'
                            );
                            recommendations.productivity.push(
                                'Use the Pomodoro technique for focused work sessions',
                                'Create detailed plans to reduce uncertainty',
                                'Take regular breaks to maintain calm focus',
                                'Work in quiet, distraction-free environments'
                            );
                            break;
                        case 'serotonin':
                            recommendations.nootropics.push(
                                { id: 'omega3', reason: 'Supports mood and emotional well-being' },
                                { id: 'vitaminD3', reason: 'Essential for serotonin production' },
                                { id: 'ashwagandha', reason: 'Supports stress management and mood' }
                            );
                            recommendations.lifestyle.push(
                                'Spend time in nature and get sunlight exposure',
                                'Maintain strong social connections',
                                'Practice gratitude and positive thinking',
                                'Engage in activities that bring joy'
                            );
                            recommendations.productivity.push(
                                'Work in collaborative environments when possible',
                                'Celebrate small wins and achievements',
                                'Create a positive and supportive work culture',
                                'Take time to help others and build relationships'
                            );
                            break;
                    }
                } else if (score < 70) { // Moderate score - could use some support
                    switch(type) {
                        case 'dopamine':
                            recommendations.nootropics.push(
                                { id: 'lTheanine', reason: 'Balances energy with calm focus' },
                                { id: 'creatine', reason: 'Supports mental energy and performance' }
                            );
                            recommendations.lifestyle.push(
                                'Incorporate regular physical activity',
                                'Set specific, measurable goals'
                            );
                            break;
                        case 'acetylcholine':
                            recommendations.nootropics.push(
                                { id: 'omega3', reason: 'Supports brain health and cognitive function' },
                                { id: 'creatine', reason: 'Enhances mental performance and memory' }
                            );
                            recommendations.lifestyle.push(
                                'Engage in continuous learning',
                                'Practice active reading and note-taking'
                            );
                            break;
                        case 'gaba':
                            recommendations.nootropics.push(
                                { id: 'magnesiumLThreonate', reason: 'Supports relaxation and sleep' },
                                { id: 'omega3', reason: 'Supports mood and stress resilience' }
                            );
                            recommendations.lifestyle.push(
                                'Practice stress management techniques',
                                'Maintain consistent sleep patterns'
                            );
                            break;
                        case 'serotonin':
                            recommendations.nootropics.push(
                                { id: 'vitaminD3', reason: 'Essential for mood and well-being' },
                                { id: 'omega3', reason: 'Supports emotional balance' }
                            );
                            recommendations.lifestyle.push(
                                'Spend time outdoors and socializing',
                                'Practice gratitude and mindfulness'
                            );
                            break;
                    }
                } else { // High score - optimization recommendations
                    switch(type) {
                        case 'dopamine':
                            recommendations.lifestyle.push(
                                'Leverage your high energy for challenging projects',
                                'Take on leadership roles that match your drive',
                                'Channel your competitive nature into productive goals'
                            );
                            recommendations.productivity.push(
                                'Use your natural motivation to tackle complex tasks',
                                'Set ambitious goals that challenge your capabilities',
                                'Lead team projects that require high energy'
                            );
                            break;
                        case 'acetylcholine':
                            recommendations.lifestyle.push(
                                'Use your strong memory for learning new skills',
                                'Share your knowledge through teaching others',
                                'Take on intellectually challenging projects'
                            );
                            recommendations.productivity.push(
                                'Leverage your analytical skills for problem-solving',
                                'Use your creativity for innovative solutions',
                                'Take on research and analysis tasks'
                            );
                            break;
                        case 'gaba':
                            recommendations.lifestyle.push(
                                'Use your calm nature to help others manage stress',
                                'Create structured environments for teams',
                                'Take on planning and organization roles'
                            );
                            recommendations.productivity.push(
                                'Use your reliability for consistent project delivery',
                                'Create detailed plans and systems',
                                'Take on quality control and review tasks'
                            );
                            break;
                        case 'serotonin':
                            recommendations.lifestyle.push(
                                'Use your social skills to build team cohesion',
                                'Create positive work environments',
                                'Take on mentoring and support roles'
                            );
                            recommendations.productivity.push(
                                'Leverage your empathy for customer service roles',
                                'Use your optimism to motivate teams',
                                'Take on collaborative and team-building tasks'
                            );
                            break;
                    }
                }
            });

            // Add personalized stack recommendations based on dominant type
            if (dominantScore >= 70) {
                recommendations.nootropics.push(
                    { id: 'creatine', reason: `Optimizes your strong ${brainTypes[dominantType].name} brain type for peak performance` },
                    { id: 'omega3', reason: 'Supports overall brain health and function' }
                );
            }

            return recommendations;
        };

        const resetTest = () => {
            setCurrentQuestion(0);
            setAnswers({});
            setShowResults(false);
            setTestStarted(false);
            setBravermanResults(null);
        };

        const getColorClass = (type) => {
            const colors = {
                dopamine: 'text-red-400',
                acetylcholine: 'text-blue-400',
                gaba: 'text-green-400',
                serotonin: 'text-purple-400'
            };
            return colors[type] || 'text-gray-400';
        };

        const getProgressPercentage = () => {
            return ((currentQuestion + 1) / bravermanQuestions.length) * 100;
        };

        // Debug useEffect to monitor state changes
        useEffect(() => {
            console.log('State changed:', { 
                currentQuestion, 
                showResults, 
                bravermanResults: !!bravermanResults,
                answersCount: Object.keys(answers).length,
                testCompleted: currentQuestion >= bravermanQuestions.length
            });
            
            // If test is completed but results aren't showing, force calculation
            if (currentQuestion >= bravermanQuestions.length && !showResults && Object.keys(answers).length === bravermanQuestions.length) {
                console.log('Test completed but results not showing, forcing calculation...');
                setTimeout(() => calculateResults(), 100);
            }
        }, [currentQuestion, showResults, bravermanResults, answers]);

        if (!testStarted) {
            return (
                <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
                    <h1 className="text-4xl font-extrabold text-orange-400 mb-8 text-center leading-tight">
                        🧬 Braverman Brain Type Test
                    </h1>
                    <p className="text-xl text-gray-300 mb-10 text-center max-w-3xl">
                        Discover your dominant brain type and get personalized recommendations for optimal cognitive performance.
                    </p>

                    <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-4xl w-full border-b-4 border-orange-700">
                        <h2 className="text-3xl font-bold text-orange-400 mb-6 border-b pb-4 border-orange-800">
                            About the Test
                        </h2>
                        <div className="text-gray-300 space-y-4">
                            <p>
                                The Braverman Test evaluates four primary brain types based on neurotransmitter dominance:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(brainTypes).map(([key, type]) => (
                                    <div key={key} className="bg-gray-700 rounded-lg p-4 border-l-4 border-orange-600">
                                        <div className="flex items-center mb-2">
                                            <span className="text-2xl mr-2">{type.icon}</span>
                                            <h3 className={`text-lg font-bold ${getColorClass(key)}`}>{type.name}</h3>
                                        </div>
                                        <p className="text-sm text-gray-300">{type.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-blue-900 rounded-lg p-4 border border-blue-700">
                                <h4 className="font-semibold text-blue-300 mb-2">📋 Test Details:</h4>
                                <ul className="text-blue-200 text-sm space-y-1">
                                    <li>• 32 questions total (8 per brain type)</li>
                                    <li>• Takes approximately 10-15 minutes</li>
                                    <li>• Rate each statement on a scale of 1-5</li>
                                    <li>• Be honest - there are no right or wrong answers</li>
                                    <li>• Results include personalized recommendations</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setTestStarted(true)}
                                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                                🚀 Start Brain Type Test
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        if (showResults && bravermanResults) {
            console.log('Rendering results:', bravermanResults);
            console.log('showResults:', showResults, 'bravermanResults:', !!bravermanResults);
            const dominantType = brainTypes[bravermanResults.dominantType];
            const scores = bravermanResults.scores;

            return (
                <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
                    <h1 className="text-4xl font-extrabold text-orange-400 mb-8 text-center leading-tight">
                        🧬 Your Brain Type Results
                    </h1>

                    <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-4xl w-full border-b-4 border-orange-700">
                        {/* Dominant Brain Type */}
                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">{dominantType.icon}</div>
                            <h2 className={`text-3xl font-bold mb-2 ${getColorClass(bravermanResults.dominantType)}`}>
                                {dominantType.name} Brain Type
                            </h2>
                            <p className="text-xl text-gray-300">{dominantType.description}</p>
                        </div>

                        {/* Score Breakdown */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-orange-400 mb-4 border-b pb-2 border-orange-800">
                                Your Brain Type Scores
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(scores).map(([type, score]) => (
                                    <div key={type} className="bg-gray-700 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <span className="text-xl mr-2">{brainTypes[type].icon}</span>
                                                <span className={`font-semibold ${getColorClass(type)}`}>
                                                    {brainTypes[type].name}
                                                </span>
                                            </div>
                                            <span className="text-lg font-bold">{score}%</span>
                                        </div>
                                        <div className="w-full bg-gray-600 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full ${score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                style={{ width: `${score}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Characteristics */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-orange-400 mb-4 border-b pb-2 border-orange-800">
                                Your Characteristics
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-lg font-semibold text-green-400 mb-2">💪 Strengths</h4>
                                    <ul className="text-gray-300 space-y-1">
                                        {dominantType.strengths.map((strength, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-green-400 mr-2">•</span>
                                                {strength}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-orange-400 mb-2">🎯 Growth Areas</h4>
                                    <ul className="text-gray-300 space-y-1">
                                        {dominantType.challenges.map((challenge, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-orange-400 mr-2">•</span>
                                                {challenge}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Personalized Recommendations */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-orange-400 mb-4 border-b pb-2 border-orange-800">
                                Personalized Recommendations
                            </h3>
                            
                            {/* Summary */}
                            {bravermanResults.recommendations.summary && (
                                <div className="mb-6">
                                    <div className="bg-blue-900 rounded-xl p-4 border border-blue-700">
                                        <h4 className="font-semibold text-blue-300 mb-2">📊 Your Brain Profile Summary</h4>
                                        <p className="text-blue-200 text-base leading-relaxed">{bravermanResults.recommendations.summary}</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Nootropic Recommendations */}
                            {bravermanResults.recommendations.nootropics.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-blue-400 mb-3">🧪 Recommended Nootropics</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {bravermanResults.recommendations.nootropics.map((rec, index) => {
                                            const nootropic = nootropicsData.find(n => n.id === rec.id);
                                            return nootropic ? (
                                                <div key={index} className="bg-gray-700 rounded-lg p-4 border-l-4 border-blue-600">
                                                    <h5 className="font-semibold text-blue-300 mb-1">{nootropic.name}</h5>
                                                    <p className="text-sm text-gray-300">{rec.reason}</p>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedNootropicForModal(nootropic);
                                                            setShowModal(true);
                                                        }}
                                                        className="text-blue-400 text-sm hover:underline mt-2 inline-block"
                                                    >
                                                        View Details &raquo;
                                                    </button>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Lifestyle Recommendations */}
                            {bravermanResults.recommendations.lifestyle.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-green-400 mb-3">🌱 Lifestyle Recommendations</h4>
                                    <div className="bg-gray-700 rounded-lg p-4">
                                        <ul className="text-gray-300 space-y-2">
                                            {bravermanResults.recommendations.lifestyle.map((rec, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-green-400 mr-2">•</span>
                                                    {rec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Productivity Recommendations */}
                            {bravermanResults.recommendations.productivity.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-purple-400 mb-3">⚡ Productivity Strategies</h4>
                                    <div className="bg-gray-700 rounded-lg p-4">
                                        <ul className="text-gray-300 space-y-2">
                                            {bravermanResults.recommendations.productivity.map((rec, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-purple-400 mr-2">•</span>
                                                    {rec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* No Recommendations Message */}
                            {bravermanResults.recommendations.nootropics.length === 0 && 
                             bravermanResults.recommendations.lifestyle.length === 0 && 
                             bravermanResults.recommendations.productivity.length === 0 && (
                                <div className="mb-6">
                                    <div className="bg-green-900 rounded-xl p-4 border border-green-700">
                                        <h4 className="font-semibold text-green-300 mb-2">🎉 Excellent Brain Balance!</h4>
                                        <p className="text-green-200 text-base leading-relaxed">
                                            Your brain type scores are well-balanced! This indicates good neurotransmitter harmony. 
                                            Focus on maintaining your current healthy habits and consider exploring the nootropics library 
                                            for optimization rather than correction.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setView('nootropics')}
                                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
                            >
                                🧠 Explore Nootropics
                            </button>
                            <button
                                onClick={() => setView('training')}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
                            >
                                💪 Start Training
                            </button>
                            <button
                                onClick={resetTest}
                                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
                            >
                                🔄 Retake Test
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        // Debug: Check if we should be showing results but aren't
        if (currentQuestion >= bravermanQuestions.length && !showResults) {
            console.log('Debug: Test completed but results not showing, forcing calculation...');
            setTimeout(() => calculateResults(), 100);
        }

        const currentQ = bravermanQuestions[currentQuestion];
        const progress = getProgressPercentage();

        return (
            <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
                <h1 className="text-4xl font-extrabold text-orange-400 mb-8 text-center leading-tight">
                    🧬 Braverman Brain Type Test
                </h1>

                <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl w-full border-b-4 border-orange-700">
                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Question {currentQuestion + 1} of {bravermanQuestions.length}</span>
                            <span>{Math.round(progress)}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                            <div 
                                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-200 mb-6">
                            {currentQ.question}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Rate how much this statement applies to you
                        </p>
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-3">
                        {[
                            { value: 1, label: "Strongly Disagree", description: "This doesn't describe me at all" },
                            { value: 2, label: "Disagree", description: "This rarely applies to me" },
                            { value: 3, label: "Neutral", description: "This sometimes applies to me" },
                            { value: 4, label: "Agree", description: "This often applies to me" },
                            { value: 5, label: "Strongly Agree", description: "This describes me perfectly" }
                        ].map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleAnswer(option.value)}
                                className="w-full bg-gray-700 hover:bg-gray-600 rounded-lg p-4 text-left transition-all duration-200 border border-gray-600 hover:border-orange-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold text-gray-200">{option.label}</div>
                                        <div className="text-sm text-gray-400">{option.description}</div>
                                    </div>
                                    <div className="text-2xl text-orange-400">{option.value}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Back Button */}
                    {currentQuestion > 0 && (
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                className="text-orange-400 hover:text-orange-300 font-semibold"
                            >
                                ← Previous Question
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Main render with navigation
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
            <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
            <Navigation />
            <div className="pt-16">
                {view === 'nootropics' && (
                    <div>
                        {selectedGoal ? (
                            selectedGoal === 'library' ? <SupplementLibrary /> : <RecommendationDisplay />
                        ) : (
                            <GoalSelection />
                        )}
                    </div>
                )}
                {view === 'binauralBeats' && <BinauralBeats />}
                {view === 'pomodoro' && <PomodoroTimer />}
                {view === 'training' && <TrainingHub />}
                {view === 'bravermanTest' && <BravermanTest />}
            </div>
            {showModal && selectedNootropicForModal && (
                <NootropicModal
                    nootropic={selectedNootropicForModal}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

// Make App available globally for browser use
window.App = App;
