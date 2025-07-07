export interface Quote {
  topic: string;
  text: string;
}

export const quotes = [
  // Success
  { topic: "success", text: "Success is the sum of small efforts, repeated day in and day out." },
  { topic: "success", text: "The only place where success comes before work is in the dictionary." },
  { topic: "success", text: "Success is not the absence of obstacles, but the courage to push through them." },
  { topic: "success", text: "Success is building something that outlasts you." },
  { topic: "success", text: "The key to success is to start before you’re ready." },

  // Life
  { topic: "life", text: "Life is a journey, not a race; enjoy the detours." },
  { topic: "life", text: "The beauty of life lies in its surprises." },
  { topic: "life", text: "Life is a canvas; make it a masterpiece." },
  { topic: "life", text: "Live simply so others may simply live." },
  { topic: "life", text: "Life’s greatest lessons come from its toughest moments." },

  // Inspiration
  { topic: "inspiration", text: "Dream big, work hard, stay focused." },
  { topic: "inspiration", text: "The spark of inspiration ignites the fire of achievement." },
  { topic: "inspiration", text: "Every great journey begins with a single inspired step." },
  { topic: "inspiration", text: "Inspiration is the courage to act on your dreams." },
  { topic: "inspiration", text: "Create the life you can’t wait to wake up to." },

  // Motivation
  { topic: "motivation", text: "The only limit to your potential is your determination." },
  { topic: "motivation", text: "Keep moving forward, even if the steps are small." },
  { topic: "motivation", text: "Your dreams are worth every effort you put in." },
  { topic: "motivation", text: "Rise above the excuses and chase your goals." },
  { topic: "motivation", text: "Every effort today is an investment in tomorrow." },

  // Happiness
  { topic: "happiness", text: "Happiness is found in the moments you choose to cherish." },
  { topic: "happiness", text: "A smile is the shortest distance to happiness." },
  { topic: "happiness", text: "Joy is not in things; it is in us." },
  { topic: "happiness", text: "Happiness blooms where kindness is planted." },
  { topic: "happiness", text: "Find joy in the ordinary, and life becomes extraordinary." },

  // Wisdom
  { topic: "wisdom", text: "True wisdom is understanding the value of every moment." },
  { topic: "wisdom", text: "Knowledge speaks, but wisdom listens." },
  { topic: "wisdom", text: "Wisdom is the reward of a curious mind." },
  { topic: "wisdom", text: "The wise learn more from others’ mistakes than their own." },
  { topic: "wisdom", text: "Wisdom is knowing when to speak and when to stay silent." },

  // Courage
  { topic: "courage", text: "Courage is taking the first step into the unknown." },
  { topic: "courage", text: "Fear is a challenge; courage is the answer." },
  { topic: "courage", text: "Bravery is not the lack of fear, but action despite it." },
  { topic: "courage", text: "Courage grows stronger with every bold choice." },
  { topic: "courage", text: "Stand tall, even when the world tries to make you small." },

  // Friendship
  { topic: "friendship", text: "True friends are the ones who lift you up when you can’t." },
  { topic: "friendship", text: "A friend is a treasure that time cannot diminish." },
  { topic: "friendship", text: "Friendship turns ordinary moments into extraordinary memories." },
  { topic: "friendship", text: "Friends are the family you choose for yourself." },
  { topic: "friendship", text: "A true friend sees your heart, not just your face." },

  // Resilience
  { topic: "resilience", text: "Resilience is rising stronger after every fall." },
  { topic: "resilience", text: "The greatest strength is forged in the hardest moments." },
  { topic: "resilience", text: "Bend, don’t break; adapt and overcome." },
  { topic: "resilience", text: "Storms don’t last forever, but your strength can." },
  { topic: "resilience", text: "Resilience is the art of turning setbacks into comebacks." },

  // Discipline
  { topic: "discipline", text: "Discipline turns dreams into reality, one step at a time." },
  { topic: "discipline", text: "Consistency is the bridge between goals and success." },
  { topic: "discipline", text: "Master your habits, and you master your future." },
  { topic: "discipline", text: "Discipline is the fuel for long-term achievement." },
  { topic: "discipline", text: "Small, disciplined actions lead to big results." },

  // Growth
  { topic: "growth", text: "Growth begins where comfort ends." },
  { topic: "growth", text: "Every challenge is a chance to grow stronger." },
  { topic: "growth", text: "The mind that embraces learning never stops growing." },
  { topic: "growth", text: "Growth is the reward for embracing change." },
  { topic: "growth", text: "Plant the seeds of effort, and harvest personal growth." },

  // Mindfulness
  { topic: "mindfulness", text: "Be present; the moment is all you truly have." },
  { topic: "mindfulness", text: "Peace comes from living in the now." },
  { topic: "mindfulness", text: "Mindfulness is the art of savoring the present." },
  { topic: "mindfulness", text: "In stillness, you find clarity." },
  { topic: "mindfulness", text: "The present moment holds all of life’s beauty." },

  // Gratitude
  { topic: "gratitude", text: "Gratitude transforms scarcity into abundance." },
  { topic: "gratitude", text: "A thankful heart finds joy in every moment." },
  { topic: "gratitude", text: "Appreciation is the key to a fulfilled life." },
  { topic: "gratitude", text: "Gratitude is the lens that makes life brighter." },
  { topic: "gratitude", text: "Thankfulness turns ordinary days into blessings." },

  // Purpose
  { topic: "purpose", text: "Find your why, and you’ll find your way." },
  { topic: "purpose", text: "Purpose fuels passion, and passion fuels progress." },
  { topic: "purpose", text: "Your purpose is the compass for your life’s journey." },
  { topic: "purpose", text: "Live with intention, and purpose will guide you." },
  { topic: "purpose", text: "A life of purpose is a life well-lived." },

  // Self-Care
  { topic: "self-care", text: "Nourish your soul to flourish in life." },
  { topic: "self-care", text: "Rest is not weakness; it’s wisdom." },
  { topic: "self-care", text: "Self-care is the foundation of a vibrant life." },
  { topic: "self-care", text: "Prioritize yourself to better serve others." },
  { topic: "self-care", text: "Healing begins with caring for yourself." },

  // Self-Respect
  { topic: "self-respect", text: "Value yourself, and the world will follow." },
  { topic: "self-respect", text: "Self-respect is the armor that protects your worth." },
  { topic: "self-respect", text: "Honor yourself, and others will honor you." },
  { topic: "self-respect", text: "Self-respect is standing firm in your own worth." },
  { topic: "self-respect", text: "Your dignity is your greatest asset." },

  // Emotional Intelligence
  { topic: "emotional-intelligence", text: "Mastering your emotions is mastering your life." },
  { topic: "emotional-intelligence", text: "Empathy is the bridge to understanding others." },
  { topic: "emotional-intelligence", text: "Control your emotions, or they will control you." },
  { topic: "emotional-intelligence", text: "Listen to your heart, but lead with your mind." },
  { topic: "emotional-intelligence", text: "Emotional wisdom builds stronger connections." },

  // Creativity
  { topic: "creativity", text: "Creativity is the spark that lights up new possibilities." },
  { topic: "creativity", text: "Imagination is the playground of the mind." },
  { topic: "creativity", text: "Create something today that didn’t exist yesterday." },
  { topic: "creativity", text: "Every idea is a seed for something extraordinary." },
  { topic: "creativity", text: "Creativity thrives where fear is set free." },

  // Kindness
  { topic: "kindness", text: "Kindness is a gift that multiplies when shared." },
  { topic: "kindness", text: "A kind word can change someone’s entire day." },
  { topic: "kindness", text: "Kindness is the light that brightens the darkest paths." },
  { topic: "kindness", text: "Spread kindness, and watch the world soften." },
  { topic: "kindness", text: "Kindness costs nothing but changes everything." },

  // Connection
  { topic: "connection", text: "We are stronger when we connect with others." },
  { topic: "connection", text: "Meaningful connections make life richer." },
  { topic: "connection", text: "Together, we create moments that matter." },
  { topic: "connection", text: "Connection is the heartbeat of humanity." },
  { topic: "connection", text: "Build bridges, not walls, to connect with others." },

  // Perseverance
  { topic: "perseverance", text: "Perseverance turns dreams into achievements." },
  { topic: "perseverance", text: "Keep going; the finish line is closer than you think." },
  { topic: "perseverance", text: "The path to success is paved with persistence." },
  { topic: "perseverance", text: "Every step forward is a victory over doubt." },
  { topic: "perseverance", text: "Obstacles are just tests of your determination." },

  // Optimism
  { topic: "optimism", text: "Optimism is the faith that leads to achievement." },
  { topic: "optimism", text: "See the possibility in every challenge." },
  { topic: "optimism", text: "A positive mind creates a positive life." },
  { topic: "optimism", text: "Hope is the light that guides you through darkness." },
  { topic: "optimism", text: "Believe in tomorrow, and today will shine." },

  // Integrity
  { topic: "integrity", text: "Integrity is doing the right thing, even when no one is watching." },
  { topic: "integrity", text: "Your character is your greatest legacy." },
  { topic: "integrity", text: "Honesty is the foundation of a meaningful life." },
  { topic: "integrity", text: "Live true to your values, and you’ll never lose your way." },
  { topic: "integrity", text: "Integrity is the courage to stand by your principles." },

  // Passion
  { topic: "passion", text: "Passion is the fire that fuels your purpose." },
  { topic: "passion", text: "Follow your heart, and your path will light up." },
  { topic: "passion", text: "Live for what sets your soul on fire." },
  { topic: "passion", text: "Passion turns work into joy." },
  { topic: "passion", text: "Your passion is the spark that ignites change." },

  // Balance
  { topic: "balance", text: "Balance is the key to a harmonious life." },
  { topic: "balance", text: "Find peace in the rhythm of work and rest." },
  { topic: "balance", text: "A balanced life is a fulfilled life." },
  { topic: "balance", text: "Harmony comes from balancing heart and mind." },
  { topic: "balance", text: "Balance is the art of living well in every moment." },
  
  // Attitude
  { topic: "attitude", text: "Your attitude shapes your reality." },
  { topic: "attitude", text: "A positive attitude turns obstacles into opportunities." },
  { topic: "attitude", text: "Choose your attitude, and you choose your path." },
  { topic: "attitude", text: "Attitude is the paintbrush of your life’s canvas." },
  { topic: "attitude", text: "With the right attitude, every day is a new beginning." }
];