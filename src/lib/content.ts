export interface Verse {
  ref: string;
  text: string;
  reflection: string;
}

export interface DailyTask {
  id: string;
  title: string;
  hint: string;
}

export interface PrayerCategory {
  id: string;
  icon: string;
  title: string;
  decree: string;
  verses: Array<{ ref: string; text: string }>;
}

export interface DailyPrayer {
  id: string;
  moment: string;
  title: string;
  text: string;
}

export const DAILY_VERSES: Verse[] = [
  {
    ref: "Philippians 4:19",
    text: "And my God will meet all your needs according to the riches of His glory in Christ Jesus.",
    reflection: "Today, release the weight of lack. Your Provider is not limited by your circumstances.",
  },
  {
    ref: "Jeremiah 29:11",
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reflection: "Your story is still being written by loving hands.",
  },
  {
    ref: "Psalm 23:1",
    text: "The Lord is my shepherd; I shall not want.",
    reflection: "A guided sheep never walks alone. Rest in His leading.",
  },
  {
    ref: "Isaiah 41:10",
    text: "Do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.",
    reflection: "Fear speaks loudly, but His presence speaks last.",
  },
  {
    ref: "Deuteronomy 8:18",
    text: "Remember the Lord your God, for it is He who gives you the ability to produce wealth.",
    reflection: "Every skill in your hands is a gift. Offer it back to Him today.",
  },
  {
    ref: "Proverbs 3:5-6",
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to Him, and He will make your paths straight.",
    reflection: "You don't need the whole map — only the next faithful step.",
  },
  {
    ref: "Psalm 91:11",
    text: "For He will command His angels concerning you to guard you in all your ways.",
    reflection: "Heaven's protection surrounds your going out and coming in.",
  },
  {
    ref: "Matthew 6:33",
    text: "But seek first His kingdom and His righteousness, and all these things will be given to you as well.",
    reflection: "When priorities align with Heaven, provision naturally follows.",
  },
];

export const DAILY_TASKS: DailyTask[] = [
  { id: "pray", title: "Morning prosperity prayer", hint: "Pray one prayer from your library." },
  { id: "listen", title: "Listen to today's blessing", hint: "Open the Sanctuary and play a blessing." },
  { id: "declare", title: "Declare your faith out loud", hint: "Read today's verse aloud three times." },
];

export const PRAYER_CATEGORIES: PrayerCategory[] = [
  {
    id: "finances",
    icon: "💰",
    title: "Finances & Provision",
    decree: "I declare that lack has no authority over my home. My God supplies every need.",
    verses: [
      {
        ref: "Philippians 4:19",
        text: "And my God will meet all your needs according to the riches of His glory in Christ Jesus.",
      },
      {
        ref: "Proverbs 10:22",
        text: "The blessing of the Lord brings wealth, without painful toil for it.",
      },
      {
        ref: "Malachi 3:10",
        text: "Test me in this, says the Lord Almighty, and see if I will not throw open the floodgates of heaven and pour out so much blessing.",
      },
      {
        ref: "Psalm 34:10",
        text: "Those who seek the Lord lack no good thing.",
      },
    ],
  },
  {
    id: "health",
    icon: "🌿",
    title: "Health & Healing",
    decree: "I receive strength for my body and peace for my heart, in Jesus' name.",
    verses: [
      {
        ref: "Jeremiah 30:17",
        text: "But I will restore you to health and heal your wounds, declares the Lord.",
      },
      {
        ref: "Psalm 103:2-3",
        text: "Praise the Lord, my soul, and forget not all His benefits — who forgives all your sins and heals all your diseases.",
      },
      {
        ref: "Isaiah 53:5",
        text: "By His wounds we are healed.",
      },
      {
        ref: "3 John 1:2",
        text: "I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well.",
      },
    ],
  },
  {
    id: "family",
    icon: "🏡",
    title: "Family & Harmony",
    decree: "My home is covered in peace. Love, unity and blessing dwell under my roof.",
    verses: [
      {
        ref: "Joshua 24:15",
        text: "But as for me and my household, we will serve the Lord.",
      },
      {
        ref: "Acts 16:31",
        text: "Believe in the Lord Jesus, and you will be saved — you and your household.",
      },
      {
        ref: "Colossians 3:14",
        text: "And over all these virtues put on love, which binds them all together in perfect unity.",
      },
      {
        ref: "Psalm 127:1",
        text: "Unless the Lord builds the house, the builders labor in vain.",
      },
    ],
  },
  {
    id: "peace",
    icon: "🕊️",
    title: "Anxiety & Inner Peace",
    decree: "I cast every worry on Him. His peace guards my heart and my mind.",
    verses: [
      {
        ref: "Philippians 4:6-7",
        text: "Do not be anxious about anything... And the peace of God, which transcends all understanding, will guard your hearts and your minds.",
      },
      {
        ref: "John 14:27",
        text: "Peace I leave with you; my peace I give you. Do not let your hearts be troubled and do not be afraid.",
      },
      {
        ref: "1 Peter 5:7",
        text: "Cast all your anxiety on Him because He cares for you.",
      },
      {
        ref: "Psalm 4:8",
        text: "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
      },
    ],
  },
  {
    id: "work",
    icon: "⚒️",
    title: "Work & Purpose",
    decree: "The work of my hands is blessed. Doors open that no one can shut.",
    verses: [
      {
        ref: "Psalm 90:17",
        text: "May the favor of the Lord our God rest on us; establish the work of our hands.",
      },
      {
        ref: "Colossians 3:23",
        text: "Whatever you do, work at it with all your heart, as working for the Lord.",
      },
      {
        ref: "Revelation 3:8",
        text: "See, I have placed before you an open door that no one can shut.",
      },
      {
        ref: "Proverbs 16:3",
        text: "Commit to the Lord whatever you do, and He will establish your plans.",
      },
    ],
  },
  {
    id: "protection",
    icon: "🛡️",
    title: "Protection",
    decree: "Archangel Michael and the hosts of heaven stand guard over me and my family.",
    verses: [
      {
        ref: "Psalm 91:1-2",
        text: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.",
      },
      {
        ref: "Isaiah 54:17",
        text: "No weapon forged against you will prevail.",
      },
      {
        ref: "2 Thessalonians 3:3",
        text: "But the Lord is faithful, and He will strengthen you and protect you from the evil one.",
      },
      {
        ref: "Psalm 121:7-8",
        text: "The Lord will keep you from all harm — He will watch over your life.",
      },
    ],
  },
];

export const DAILY_PRAYERS: DailyPrayer[] = [
  {
    id: "morning",
    moment: "Morning",
    title: "Blessing for a New Day",
    text: "Lord, I give You this new day. Go before me in every step. Open the doors that are meant for me and close the doors that would harm me. Let Your favor surround me like a shield. I am blessed when I come in and blessed when I go out. In Jesus' name, amen.",
  },
  {
    id: "prosperity",
    moment: "Prosperity",
    title: "Decree of Abundance",
    text: "Father, I break every agreement with scarcity. I declare that You are my Provider. The work of my hands is blessed. Provision flows to my home, and I will be a channel of generosity for others. My needs are met according to Your riches in glory. Amen.",
  },
  {
    id: "protection",
    moment: "Protection",
    title: "Shield of Archangel Michael",
    text: "Lord of hosts, I ask that You send Your angels to guard me and my family. May Archangel Michael stand at the doors of my home. No weapon formed against us will prosper. We rest under the shadow of the Almighty, safe and at peace. Amen.",
  },
  {
    id: "peace",
    moment: "Peace",
    title: "Release of Anxiety",
    text: "Jesus, I lay every worry at Your feet. Breathe Your peace into my mind and my heart. I do not carry tomorrow alone. You hold my life in Your hands, and Your peace guards my thoughts. I receive Your rest now. Amen.",
  },
  {
    id: "night",
    moment: "Night",
    title: "Evening Prayer of Rest",
    text: "Father, thank You for carrying me through this day. Forgive me where I fell short. As I lie down, cover my home with peace and my sleep with sweetness. Restore my strength through the night, and wake me with new hope. Amen.",
  },
];

export function getVerseOfTheDay(): Verse {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length] ?? DAILY_VERSES[0];
}
