import { useState } from 'react';

const SymptomChecker = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    // Expert System Knowledge Base (Rule-Based AI)
    const knowledgeBase = [
        // Respiratory & ENT
        {
            keywords: ['headache', 'head', 'throbbing', 'migraine', 'light'],
            condition: 'Tension Headache or Migraine',
            remedy: 'Rest in a quiet, dark room. Drink plenty of water. Apply a cold or warm compress to your head. Consider OTC pain relief like ibuprofen.',
            severity: 'Low'
        },
        {
            keywords: ['cough', 'throat', 'sore', 'sneeze', 'runny', 'cold', 'stuffy'],
            condition: 'Common Cold or Upper Respiratory Infection',
            remedy: 'Gargle warm salt water. Drink warm fluids with honey. Use a humidifier. Rest your voice.',
            severity: 'Low'
        },
        {
            keywords: ['sinus', 'pressure', 'nose', 'face', 'congestion'],
            condition: 'Sinus Infection (Sinusitis)',
            remedy: 'Use saline nasal spray. Inhale steam. Stay hydrated. Apply warm compress to face.',
            severity: 'Low'
        },
        {
            keywords: ['ear', 'pain', 'hearing', 'fluid', 'ache'],
            condition: 'Otitis Media (Ear Infection)',
            remedy: 'Apply warm cloth to ear. Keep head elevated. Avoid getting water in ear. Consult doctor if pain persists.',
            severity: 'Moderate'
        },
        {
            keywords: ['allergy', 'allergies', 'pollen', 'eyes', 'itchy'],
            condition: 'Seasonal Allergies (Hay Fever)',
            remedy: 'Avoid known triggers. Use over-the-counter antihistamines. Keep windows closed during high pollen days.',
            severity: 'Low'
        },
        {
            keywords: ['nose', 'bleed', 'blood', 'nostril'],
            condition: 'Nosebleed (Epistaxis)',
            remedy: 'Sit up and lean forward slightly. Pinch soft part of nose for 10-15 mins. Do not lie down.',
            severity: 'Low'
        },

        // Fever & Viral
        {
            keywords: ['fever', 'hot', 'cold', 'shiver', 'temperature', 'chills'],
            condition: 'Viral Fever or Flu',
            remedy: 'Stay hydrated with water/electrolytes. Rest often. Take acetaminophen for fever. Use a damp cloth to cool down.',
            severity: 'Moderate'
        },

        // Digestive & Abdominal
        {
            keywords: ['thirsty', 'mouth', 'dry', 'urine', 'dizzy', 'fatigue'],
            condition: 'Dehydration',
            remedy: 'Drink water immediately. Sip electrolyte drinks (sports drinks/ORS). Avoid caffeine and alcohol.',
            severity: 'Moderate'
        },
        {
            keywords: ['stomach', 'pain', 'vomit', 'nausea', 'belly', 'food'],
            condition: 'Gastritis or Food Poisoning',
            remedy: 'Avoid solid foods for a few hours. Sip clear fluids (ginger ale, water). Eat bland foods (toast, rice) when ready.',
            severity: 'Moderate'
        },
        {
            keywords: ['burn', 'acid', 'throat', 'chest', 'bloating', 'reflux'],
            condition: 'Acid Reflux (GERD) or Heartburn',
            remedy: 'Avoid lying down immediately after eating. Eat smaller meals. Avoid spicy, fatty, or acidic foods.',
            severity: 'Low'
        },
        {
            keywords: ['constipation', 'poop', 'hard', 'stuck', 'bowel'],
            condition: 'Constipation',
            remedy: 'Drink more water. Eat high-fiber foods (fruits, vegetables). Try warm prune juice or gentle exercise.',
            severity: 'Low'
        },
        {
            keywords: ['diarrhea', 'runny', 'cramps', 'loose'],
            condition: 'Diarrhea',
            remedy: 'Stay hydrated with electrolytes. Avoid dairy and greasy foods. Eat BRAT diet (Bananas, Rice, Applesauce, Toast).',
            severity: 'Moderate'
        },
        {
            keywords: ['bloated', 'gas', 'fart', 'full'],
            condition: 'Bloating and Gas',
            remedy: 'Eat slowly. Avoid carbonated drinks and chewing gum. Peppermint tea may help.',
            severity: 'Low'
        },

        // Cardiac & Critical (Keep existing critical rule)
        {
            keywords: ['chest', 'pain', 'heart', 'tightness', 'pressure', 'breath'],
            condition: 'Potential Cardiac Event (Angina/Heart Attack)',
            remedy: 'Sit down and rest immediately. Loosen tight clothing. If pain persists >5 mins, CALL EMERGENCY SERVICES (911/112). Chew aspirin if available.',
            severity: 'CRITICAL'
        },

        // Pain & Musculoskeletal
        {
            keywords: ['joint', 'pain', 'knee', 'back', 'stiff', 'ache'],
            condition: 'Arthritis or Muscle Strain',
            remedy: 'Rest the affected area. Apply ice for acute pain or heat for stiffness. Gentle stretching may help.',
            severity: 'Low'
        },
        {
            keywords: ['swollen', 'bruise', 'twist', 'ankle', 'wrist', 'sprain'],
            condition: 'Muscle Sprain or Strain',
            remedy: 'Follow R.I.C.E: Rest, Ice, Compression, Elevation. Take OTC pain relievers if needed.',
            severity: 'Low'
        },
        {
            keywords: ['lower', 'spine', 'lumbago'],
            condition: 'Lower Back Pain',
            remedy: 'Maintain good posture. Apply heat. Do gentle back stretches. Avoid heavy lifting.',
            severity: 'Low'
        },
        {
            keywords: ['neck', 'turn', 'hyperextension', 'whiplash'],
            condition: 'Neck Strain',
            remedy: 'Apply plain heat or ice. Gentle neck rotations. Adjust pillow height for sleep.',
            severity: 'Low'
        },
        {
            keywords: ['period', 'menstrual', 'uterus', 'cycle'],
            condition: 'Menstrual Cramps (Dysmenorrhea)',
            remedy: 'Use a heating pad on lower belly. Take ibuprofen/naproxen. Rest and stay hydrated.',
            severity: 'Low'
        },
        {
            keywords: ['tooth', 'gum', 'chew', 'dental'],
            condition: 'Toothache',
            remedy: 'Rinse mouth with salt water. Floss gently to remove debris. Apply cold compress to cheek. See a dentist.',
            severity: 'Moderate'
        },

        // Skin & Dermatology
        {
            keywords: ['rash', 'skin', 'itch', 'red', 'bumps'],
            condition: 'Dermatitis or Allergic Reaction',
            remedy: 'Apply cool compress. Avoid scratching. Use OTC hydrocortisone cream or antihistamines. Identify and avoid triggers.',
            severity: 'Low'
        },
        {
            keywords: ['sun', 'peel', 'uv', 'beach'],
            condition: 'Sunburn',
            remedy: 'Apply aloe vera gel. Take cool baths. Drink water. Avoid further sun exposure until healed.',
            severity: 'Low'
        },
        {
            keywords: ['pimple', 'zit', 'breakout', 'face'],
            condition: 'Acne',
            remedy: 'Wash face gently twice a day. Use non-comedogenic products. Avoid touching your face. Apply benzoyl peroxide.',
            severity: 'Low'
        },
        {
            keywords: ['bite', 'sting', 'insect', 'bug'],
            condition: 'Insect Bite or Sting',
            remedy: 'Remove stinger if present. Wash area with soap. Apply weak ammonia or baking soda paste. Use ice for swelling.',
            severity: 'Low'
        },
        {
            keywords: ['lip', 'blister', 'tingle'],
            condition: 'Cold Sore',
            remedy: 'Apply antiviral cream if caught early. Apply ice. Avoid acidic foods. Wash hands to prevent spread.',
            severity: 'Low'
        },
        {
            keywords: ['flake', 'scalp', 'white', 'dandruff'],
            condition: 'Dandruff',
            remedy: 'Use a medicated anti-dandruff shampoo containing zinc pyrithione or selenium sulfide.',
            severity: 'Low'
        },

        // Mental Health & Neurological
        {
            keywords: ['nervous', 'panic', 'sweat', 'fear', 'scared', 'anxious'],
            condition: 'Anxiety or Panic Episode',
            remedy: 'Try "box breathing" (inhale 4s, hold 4s, exhale 4s). Find a quiet place. Focus on physical objects around you.',
            severity: 'Moderate'
        },
        {
            keywords: ['sleep', 'tired', 'awake', 'night', 'restless'],
            condition: 'Insomnia',
            remedy: 'Stick to a sleep schedule. Avoid screens before bed. Create a relaxing bedtime routine. Avoid caffeine late in the day.',
            severity: 'Low'
        },
        {
            keywords: ['spin', 'lightheaded', 'balance'],
            condition: 'Dizziness or Vertigo',
            remedy: 'Sit or lie down immediately. Avoid sudden movements. Drink water. Avoid bright lights.',
            severity: 'Moderate'
        },
        {
            keywords: ['car', 'motion', 'sea'],
            condition: 'Motion Sickness',
            remedy: 'Look at the horizon. Get fresh air. Avoid reading in moving vehicles. Eat light crackers.',
            severity: 'Low'
        },

        // General / Other
        {
            keywords: ['tired', 'exhausted', 'weak', 'energy', 'drain'],
            condition: 'General Fatigue',
            remedy: 'Ensure you are getting 7-8 hours of sleep. Check diet for iron/vitamins. Stay hydrated. Exercise moderately.',
            severity: 'Low'
        },
        {
            keywords: ['heat', 'faint', 'pulse'],
            condition: 'Heat Exhaustion',
            remedy: 'Move to a cool place. Loosen clothes. Sip cool water. Put cool wet cloths on body.',
            severity: 'Moderate'
        },
        {
            keywords: ['drink', 'alcohol', 'hangover', 'party'],
            condition: 'Hangover',
            remedy: 'Drink water and fruit juice. Eat carbohydrates (toast/crackers). Sleep it off. Avoid "hair of the dog".',
            severity: 'Low'
        },
        {
            keywords: ['breath', 'smell', 'stink'],
            condition: 'Bad Breath (Halitosis)',
            remedy: 'Brush and floss teeth. Brush tongue. Drink water. Chew sugar-free gum.',
            severity: 'Low'
        },
        {
            keywords: ['cut', 'scratch', 'bleeding'],
            condition: 'Minor Cut or Abrasion',
            remedy: 'Clean wound with water. Apply antibiotic ointment. Cover with a sterile bandage.',
            severity: 'Low'
        },
        {
            keywords: ['bubble', 'rub', 'shoe'],
            condition: 'Blister',
            remedy: 'Do not pop it. Cover with a bandage or moleskin pad. Keep the area clean.',
            severity: 'Low'
        },
        {
            keywords: ['stroke', 'paralysis', 'slurred', 'speech', 'weak', 'arm', 'face'],
            condition: 'Stroke (Cerebrovascular Accident)',
            remedy: 'Call emergency services immediately. Note time of onset. Do not delay medical care.',
            severity: 'CRITICAL'
        },
        {
            keywords: ['wheeze', 'breathless', 'tight', 'inhaler', 'allergy'],
            condition: 'Asthma Attack',
            remedy: 'Use prescribed inhaler. Sit upright. Seek emergency care if symptoms do not improve.',
            severity: 'High'
        },
        {
            keywords: ['sugar', 'diabetes', 'thirst', 'urination', 'blurred', 'vision'],
            condition: 'Diabetes (Hyperglycemia)',
            remedy: 'Monitor blood sugar. Drink water. Consult doctor for medication adjustment.',
            severity: 'Moderate'
        },
        {
            keywords: ['thyroid', 'weight', 'fatigue', 'hair', 'cold', 'heat'],
            condition: 'Thyroid Disorder (Hypo/Hyperthyroidism)',
            remedy: 'Consult endocrinologist. Monitor thyroid levels. Adjust diet and medication as prescribed.',
            severity: 'Moderate'
        },
        {
            keywords: ['rash', 'swelling', 'hives', 'allergic', 'reaction', 'anaphylaxis'],
            condition: 'Severe Allergic Reaction (Anaphylaxis)',
            remedy: 'Use epinephrine auto-injector if available. Call emergency services immediately.',
            severity: 'CRITICAL'
        }
    ];

    const analyzeSymptoms = async(e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);

        // Simulate AI processing delay
        setTimeout(() => {
            const input = prompt.toLowerCase();
            let bestMatch = null;
            let maxScore = 0;

            // Rule-based Scoring Algorithm
            knowledgeBase.forEach(entry => {
                let score = 0;
                entry.keywords.forEach(keyword => {
                    if (input.includes(keyword)) score++;
                });

                if (score > maxScore) {
                    maxScore = score;
                    bestMatch = entry;
                }
            });

            if (maxScore > 0) {
                setResponse(bestMatch);
            } else {
                setResponse({
                    condition: 'Unclear / Complex Symptoms',
                    remedy: 'Your symptoms didn\'t match our common home-remedy database. Please consult a doctor directly for a proper evaluation.',
                    severity: 'Unknown'
                });
            }
            setLoading(false);
        }, 1000);
    };

    return ( <
        div className = "card"
        style = {
            { marginTop: '20px', borderTop: '4px solid #6366f1' }
        } >
        <
        div style = {
            { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }
        } >
        <
        span style = {
            { fontSize: '2rem' }
        } > 🤖 < /span> <
        div >
        <
        h3 style = {
            { margin: 0 }
        } > AI Health Assistant < /h3> <
        small style = {
            { color: '#6b7280' }
        } > Powered by Rule - Based Expert System < /small> < /
        div > <
        /div>

        <
        p > Describe how you are feeling(e.g., < em > "I have a bad headache and feel dizzy" < /em>).</p >

            <
            form onSubmit = { analyzeSymptoms } >
            <
            div className = "form-group" >
            <
            textarea rows = "3"
            style = {
                { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }
            }
            placeholder = "Type your symptoms here..."
            value = { prompt }
            onChange = {
                (e) => setPrompt(e.target.value)
            }
            required /
            >
            <
            /div> <
            button type = "submit"
            className = "btn btn-primary"
            disabled = { loading } > { loading ? 'Analyzing...' : 'Analyze Symptoms' } <
            /button> < /
            form >

            {
                response && ( <
                    div style = {
                        { marginTop: '20px', animation: 'fadeIn 0.5s' }
                    } >
                    <
                    div style = {
                        {
                            padding: '15px',
                            borderRadius: '8px',
                            backgroundColor: response.severity === 'CRITICAL' ? '#fee2e2' : '#f0f9ff',
                            border: `1px solid ${response.severity === 'CRITICAL' ? '#ef4444' : '#bae6fd'}`
                        }
                    } >
                    <
                    h4 style = {
                        { color: '#1f2937', marginBottom: '10px' }
                    } > Analysis Result: < /h4>

                    <
                    div style = {
                        { marginBottom: '10px' }
                    } >
                    <
                    strong > Condition: < /strong> <span style={{ fontSize: '1.1em', color: '#4f46e5' }}>{response.condition}</span >
                    <
                    /div>

                    <
                    div style = {
                        { marginBottom: '10px' }
                    } >
                    <
                    strong > Severity: < /strong> <
                    span style = {
                        {
                            marginLeft: '8px',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.85em',
                            background: response.severity === 'CRITICAL' ? 'red' : '#e0e7ff',
                            color: response.severity === 'CRITICAL' ? 'white' : '#4338ca'
                        }
                    } > { response.severity } <
                    /span> < /
                    div >

                    <
                    div style = {
                        { marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(0,0,0,0.1)' }
                    } >
                    <
                    strong > 💊Home Remedies & Advice: < /strong> <
                    p style = {
                        { marginTop: '5px', lineHeight: '1.5' }
                    } > { response.remedy } < /p> < /
                    div > <
                    /div> {
                    response.severity === 'CRITICAL' && ( <
                        p style = {
                            { color: 'red', fontWeight: 'bold', marginTop: '10px' }
                        } >
                        DISCLAIMER: This is a critical warning.Please seek professional help immediately. <
                        /p>
                    )
                } <
                /div>
            )
        } <
        /div>
    );
};

export default SymptomChecker;