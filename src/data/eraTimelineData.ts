export interface EraTimelineItem {
    year: string;
    title: string;
    description: string;
    whatHappened?: string;
    americanSignificance?: string;
}

export interface EraTimelineData {
    eraId: number;
    themeColor: string;
    timelineItems: EraTimelineItem[];
    quote: string;
    quoteAuthor?: string;
    perception: string;
}

export const ERA_TIMELINE_DATA: EraTimelineData[] = [
    {
        eraId: 1,
        themeColor: '#2d5016', // Dark green for foundations/military origins
        timelineItems: [
            {
                year: '1945-1950s',
                title: 'Operation Paperclip - Absorption of German V2 Scientists',
                description: 'Operation Paperclip - Absorption of German V2 Scientists',
                whatHappened: 'At the end of World War II, the United States government ignited Operation Paperclip to secretly kick start America\'s new missile and rocket program. From 1945-1959, this covert operation was responsible for converting over 1,600 German V2 rocket scientists, engineers, and technicians, including the famous Wernher von Braun, to join America\'s space ambitions. While these German minds were pardoned for their previous Nazi involvement, they were recruited by the United States to be the leading competitor to what was then the early Space Race.',
                americanSignificance: 'Operation Paperclip was a clear symbol of Cold War influence propelling the U.S. from having no rocket program to acquiring the world\'s greatest rocket scientists to jump start themselves as the dominant leader in the Space Race and bolster scientific advancements in technology and innovation.'
            },
            {
                year: '1955',
                title: 'United States Announces Satellite Plans',
                description: 'United States Announces Satellite Plans',
                whatHappened: 'In July 1955, United States Press Secretary, James Hagerty, announced the Eisenhower Administration\'s approval to launch \u201Csmall earth-circling satellites as part of the United States participation in the International Geophysical Year\u201D (Nasa.gov, 1). Americans proudly supported the space efforts as a \u201Cunique opportunity for the advancement of science\u201D (Nasa.gov, 1).',
                americanSignificance: 'The public declaration of a U.S. Satellites pushed an image of America being at the forefront of the Space Race.'
            },
            {
                year: '1958',
                title: 'Explorer 1',
                description: 'Explorer 1',
                whatHappened: 'Explorer 1, the U.S.\'s first satellite, was launched by the Army and Jet Propulsion Lab in January 1958 and retrieved the first scientific space data known to the world. Dr. James Van Allen analyzed low radiation readings from Explorer 1 which became fundamental in the discovery of radiation belts of charged particles encompassing Earth\'s magnetic field.',
                americanSignificance: 'Americans viewed the success of Explorer 1 as an emblem of national pride and strong response to the USSR\'s Sputnik satellite reestablishing America\'s place in technological dominance and innovation. JPL Historian Eric Conway emphasized that \u201C[Explorer 1] set in motion the whole idea of public space science, as opposed to allowing space science to be dominated by the Defense Department\u201D (Kelvey 2023, 3).'
            },
            {
                year: '1958',
                title: 'Creation of NASA',
                description: 'Creation of NASA',
                whatHappened: 'The National Aeronautics and Space Administration (NASA) was created as the agency in charge of all non-military focused space exploration. President Eisenhower called NASA the \u201Chistoric step\u201D that would equip the United States for \u201Cleadership in the space age\u201D (Gerhard and Woolley 2025, 1). Furthermore, the Space Act set clear guidelines that U.S. space efforts would be for \u201Cpeaceful purposes for the benefit of all mankind\u201D (Gerhard and Woolley 2025, 5).',
                americanSignificance: 'The American public deeply resonated with NASA as a civilian agency and its mission was that space exploration was a combined initiative of the people for scientific advancement. This connection bolstered American confidence to keep advancing in the Space Race.'
            },
            {
                year: '1961',
                title: 'Alan Shepard (1961) - 1st American in Space',
                description: 'Alan Shepard (1961) - 1st American in Space',
                whatHappened: 'In 1961, Alan Shepard completed a 15 minute suborbital of Earth in his capsule Freedom 7 making him the first American in Space. President John F. Kennedy even awarded Shepard with NASA\'s Distinguished Service Medal for his great feat.',
                americanSignificance: 'Alan Shepard\'s mission was NASA\'s first major spaceflight triumph that presented Shepard as a national hero in the eyes of the American people and directed the country to the next challenge of reaching the Moon.'
            }
        ],
        quote: 'The rocket will free man from his remaining chains, the chains of gravity which still tie him to this planet.',
        quoteAuthor: 'Wernher von Braun',
        perception: 'This era was marked by secrecy and military competition. Space exploration was seen as an extension of military power, with both superpowers viewing rocket technology as a strategic advantage. The public perception was one of technological wonder mixed with Cold War anxiety, as the line between scientific achievement and military capability blurred.'
    },
    {
        eraId: 2,
        themeColor: '#1e3a8a', // Deep blue for the dawn of space
        timelineItems: [
            {
                year: '1965–1966',
                title: 'Gemini Program (1965–1966)',
                description: 'Gemini Program (1965–1966)',
                whatHappened: 'The Gemini Program was the United States\' human spaceflight cohort that trained crews in essential exercises in space walking, orbital practices, and docking vehicles. This rigorous program instilled in American astronauts the skills to \u201Cput the United States in the lead during the Cold War Space Race against the Soviet Union\u201D (Internet Archive 2017, 2).',
                americanSignificance: 'A 1965 Gallup poll showed that \u201Cmore Americans (47%) for the first time believed the U.S. was ahead of the USSR in space\u201D (Lydia 2016, 4), enhancing the perception that the U.S. was destined to lead the Space Race.'
            },
            {
                year: '1968',
                title: 'Apollo 8 (1968)',
                description: 'Apollo 8 (1968)',
                whatHappened: 'NASA\'s space mission Apollo 8 was the world\'s first successful lunar orbit by astronauts Frank Borman, Jim Lovell, and Bill Anders. Anders is famously known for taking \u201CEarthrise\u201D, the photograph capturing the Earth rising over the Moon\'s horizon that later influenced the sense of home for our blue marble planet.',
                americanSignificance: 'The Apollo 8 mission was described as \u201Cthe most fantastic voyage of all times\u201D (Jesse 2015, 3) by the New York Times, which doubled down the American sentiment from the Gemini Program proving that the U.S. had the most advanced space exploration technology in the world.'
            },
            {
                year: '1969',
                title: 'Apollo 11 (1969)',
                description: 'Apollo 11 (1969)',
                whatHappened: '650 million people worldwide had watched on live television astronauts Neil Armstrong and Buzz Aldrin landing on the Moon on July 20, 1969. The American media and scientists all believed Apollo 11 as the \u201CWow\u201D moment of a lifetime, and regarded the mission as \u201Cthe most significant technological achievement of the 20th century\u201D (Asu.edu 2025, 14).',
                americanSignificance: 'Neil Armstrong\'s famous statement \u201Cone small step for man, one giant leap for mankind\u201D became a slogan for the American people roaring at the success of landing on the Moon feeling national pride as well as global dominance as this was an act of human destiny.'
            },
            {
                year: '1993–1998',
                title: 'International Space Station - Global Cooperation',
                description: 'International Space Station - Global Cooperation',
                whatHappened: 'The coalition of the world power, the United States, Russia, Europe, Japan, and Canada, gave birth to the idea of the International Space Station. The ISS\'s goal was to be an orbiting laboratory to expand space exploration on a global scale and continue into gathering more data to learn about the wonders of extraterrestrial void that is outside Earth\'s atmosphere.',
                americanSignificance: 'The ISS was recognized as a great initiative of international cooperation and advancement of science not just for Americans, for all people around the globe. The concept of humankind having a permanent structure in space was only the scratch of the surface as people began to consider the possibilities of humans inhabiting the Moon and the other planets in our solar system.'
            },
            {
                year: 'Early 2000s',
                title: 'Soyuz Space Travel - Start of Space Tourism',
                description: 'Soyuz Space Travel - Start of Space Tourism',
                whatHappened: 'In the early 2000s, American businessman, Dennis Tito, paid $20 million to acquire a seat on Russia\'s mission Soyuz to the International Space Station. The media sphere responded by naming Mr. Tito was the world\'s first \u201Cspace tourist\u201D and hinted at the prospect of ordinary people being trained and sent to see the beauty of space at will.',
                americanSignificance: 'The commercialization of Soyuz seats for public use enhanced the incentive of the average person being able to buy a rocket ticket just like a plane ticket to take a trip to space. This concept even planted the seeds for the creation of private space flight companies such as SpaceX and Blue Origin.'
            }
        ],
        quote: 'I see Earth! It is so beautiful.',
        quoteAuthor: 'Yuri Gagarin',
        perception: 'The world watched in awe as humanity took its first steps into space. This era transformed space exploration from a military secret into a public spectacle of human achievement. The perception shifted from fear to wonder, as people realized that space travel was not just possible, but happening. The space race became a symbol of national pride and technological prowess.'
    },
    {
        eraId: 3,
        themeColor: '#7c2d12', // Rust/bronze for the moon race
        timelineItems: [
            {
                year: '1963',
                title: 'First Woman in Space',
                description: 'Valentina Tereshkova becomes the first woman in space, breaking gender barriers and expanding human presence beyond Earth.'
            },
            {
                year: '1965',
                title: 'First Spacewalk',
                description: 'Alexei Leonov performs the first spacewalk, proving humans can work outside their spacecraft in the vacuum of space.'
            },
            {
                year: '1968',
                title: 'Apollo 8 Orbits Moon',
                description: 'Apollo 8 carries humans around the Moon for the first time, showing Earth as a fragile blue marble in the cosmos.'
            },
            {
                year: '1969',
                title: 'Apollo 11 Moon Landing',
                description: 'Apollo 11 lands Armstrong and Aldrin on the lunar surface, achieving humanity\'s greatest technological achievement and fulfilling Kennedy\'s promise.'
            }
        ],
        quote: 'That\'s one small step for man, one giant leap for mankind.',
        quoteAuthor: 'Neil Armstrong',
        perception: 'This was the golden age of space exploration, when the impossible became reality. The moon landing was watched by over 600 million people worldwide, uniting humanity in a moment of shared achievement. Space exploration was seen as the ultimate expression of human potential, a testament to what we could accomplish when we set our minds to it. The perception was one of boundless optimism and the belief that space was humanity\'s next frontier.'
    },
    {
        eraId: 4,
        themeColor: '#1e40af', // Royal blue for space stations
        timelineItems: [
            {
                year: '1971',
                title: 'Salyut 1 Launches',
                description: 'Salyut 1 inaugurates long-duration orbital laboratories, proving humans can live and work in space for extended periods.'
            },
            {
                year: '1973',
                title: 'Skylab Begins',
                description: 'Skylab begins microgravity science for the US, demonstrating the value of space-based research and long-duration missions.'
            },
            {
                year: '1975',
                title: 'Apollo-Soyuz Handshake',
                description: 'The Apollo-Soyuz Test Project marks the first international space cooperation, foreshadowing future collaboration.'
            },
            {
                year: '1981',
                title: 'Space Shuttle First Flight',
                description: 'The Space Shuttle introduces partial reusability, revolutionizing access to space and making space travel more routine.'
            }
        ],
        quote: 'Space is for everybody. It\'s not just for a few people in science or math, or for a select group of astronauts. That\'s our new frontier out there.',
        quoteAuthor: 'Christa McAuliffe',
        perception: 'Space exploration became more routine and practical. The focus shifted from dramatic firsts to sustained presence in space. Space stations and reusable shuttles made space feel more accessible, though still the domain of highly trained professionals. The perception evolved from awe-inspiring firsts to the practical benefits of space-based research and the routine nature of space travel.'
    },
    {
        eraId: 5,
        themeColor: '#065f46', // Emerald green for cooperation
        timelineItems: [
            {
                year: '1993',
                title: 'ISS Agreement',
                description: 'Five space agencies unite to build the International Space Station, marking the largest international cooperation project in history.'
            },
            {
                year: '1998',
                title: 'ISS Assembly Begins',
                description: 'ISS assembly begins, creating what will become the largest structure ever built in space and a symbol of global unity.'
            },
            {
                year: '2000',
                title: 'First ISS Crew',
                description: 'The first permanent crew arrives at the ISS, beginning continuous human presence in space that continues to this day.'
            },
            {
                year: '2003',
                title: 'Commercial Soyuz',
                description: 'Russia begins commercializing Soyuz seats, seeding private partnerships and opening space to more nations.'
            }
        ],
        quote: 'The International Space Station is a testament to what we can accomplish when we work together across borders and boundaries.',
        quoteAuthor: 'Bill Nelson',
        perception: 'This era represented a shift from competition to cooperation. The Cold War was over, and space became a symbol of international unity. The ISS demonstrated that nations could work together on grand projects despite political differences. Space exploration was seen as a shared human endeavor, transcending national boundaries and representing the best of humanity\'s collaborative spirit.'
    },
    {
        eraId: 6,
        themeColor: '#7c3aed', // Purple for innovation
        timelineItems: [
            {
                year: '2006',
                title: 'NASA COTS Program (2006)',
                description: 'NASA COTS Program (2006)',
                whatHappened: 'The NASA Commercial Orbital Transportation Services (COTS) program was a bridge to partner with private spaceflight companies for ISS deliveries to develop privately funded rockets, instead of developing new rockets.',
                americanSignificance: 'The COTS Program was a strategic shift by NASA from being the supplier to becoming the customer supporting the upcoming space exploration companies and growing the industry of commercial spaceflight to accomplish the common goal of building the most advanced rockets for future space missions.'
            },
            {
                year: '2008',
                title: 'Falcon 1 (2008)',
                description: 'Falcon 1 (2008)',
                whatHappened: 'In September of 2008, SpaceX\'s Falcon 1 rocket broke all records and became the first privately-funded liquid-fueled rocket to reach Earth\'s orbit. The founder of SpaceX, Elon Musk, exclaimed \u201CAs the saying goes, the fourth time\'s the charm\u2026 This is one of the best days of my life\u201D (Malik 2019, 5), proud of SpaceX\'s magnificent feat and paving the road for privatization of rocket launches.',
                americanSignificance: 'Falcon 1 was the stepping stone that shifted the dominance in the aerospace and space exploration industry from proving to the world that private companies were surpassing the U.S. government and NASA and pushing the boundaries and accelerating the possibilities of humans in space and beyond.'
            },
            {
                year: '2015',
                title: 'Falcon 9 (2015)',
                description: 'Falcon 9 (2015)',
                whatHappened: '7 years after the successful launch of the Falcon 1, SpaceX solved the crucial problem of preserving the rocket boosters by executing a perfect landing of the boosters back on Earth and launched 11 satellites into orbit which presented the foundation of rocket reusability.',
                americanSignificance: 'The preservation of rockets changed the game to make launch costs into a fraction of what they were, and solidified in the minds of Americans that private corporations such as SpaceX were the key to the future milestones of the modern day Space Race.'
            },
            {
                year: '2020s',
                title: 'SpaceX Starship',
                description: 'SpaceX Starship',
                whatHappened: 'SpaceX published the next generation launching procedure to make the dreams of deep space exploration a reality. The procedure, Starship, established a two-part plan of the Starship rocket with a super heavy booster when combined made the most powerful, reusable rocket with the capacity to board 100+ passengers and 100 tons of cargo to interstellar missions to the Moon, and even Mars.',
                americanSignificance: 'The true intention of the Starship is to be the rocket of the future that will be the next vehicle used by our astronauts to not only reach the Moon or Mars, but be ready to transport human crews to colonize the base of the great celestial bodies.'
            },
            {
                year: '2030s-2040s',
                title: 'Mission Mars',
                description: 'Mission Mars',
                whatHappened: 'SpaceX and Elon Musk are looking to the future and their vision is Mission Mars. They wish to perfect Starship and its technology to send a crew to Mars by the early 2030-2040s. NASA has also been working alongside with their own mission \u201CMoon to Mars\u201D to first send astronauts to the Moon, then continue their efforts with SpaceX to reach the Red Planet.',
                americanSignificance: 'Mission Mars is an aspirational vision that all the United States space agencies and companies are working towards for the title of \u201C1st American on Mars\u201D. This effort has collected the youth of America and people around the world to push the limits to recreate the worldwide viewing of the Moon and rewrite history with a landing on Mars.'
            }
        ],
        quote: 'I think we\'re at the dawn of a new era in commercial space exploration.',
        quoteAuthor: 'Elon Musk',
        perception: 'Space exploration entered a new phase driven by private enterprise and innovation. The perception shifted from space as a government monopoly to space as a commercial frontier. Entrepreneurs and private companies were seen as the new pioneers, bringing innovation, efficiency, and competition to an industry long dominated by government agencies. Space became more accessible and the costs began to drop dramatically.'
    },
    {
        eraId: 7,
        themeColor: '#dc2626', // Red for corporate conquest
        timelineItems: [
            {
                year: '2015',
                title: 'Falcon 9 Reusability',
                description: 'Falcon 9 and Falcon Heavy prove reusable heavy lift is possible, dramatically reducing the cost of reaching orbit.'
            },
            {
                year: '2020',
                title: 'Crew Dragon Launches',
                description: 'Crew Dragon ushers in commercial astronaut taxis, returning human spaceflight capability to the United States.'
            },
            {
                year: '2021',
                title: 'Starship Testing',
                description: 'Starship testing pushes ultra-heavy fully reusable craft, aiming to make Mars colonization economically feasible.'
            },
            {
                year: '2023',
                title: 'Starlink Mega-Constellation',
                description: 'Starlink mega-constellation scales orbital internet, demonstrating the commercial viability of large-scale space infrastructure.'
            }
        ],
        quote: 'You want to wake up in the morning and think the future is going to be great - and that\'s what being a spacefaring civilization is all about.',
        quoteAuthor: 'Elon Musk',
        perception: 'Corporate space became the dominant force, with private companies achieving what once seemed impossible. The perception was one of rapid innovation and disruption, as companies like SpaceX, Blue Origin, and others pushed boundaries faster than government programs. Space was no longer just about exploration—it became a business opportunity, with commercial space stations, asteroid mining, and space tourism becoming realistic prospects. The era of corporate conquest had begun.'
    },
    {
        eraId: 8,
        themeColor: '#059669', // Teal for the future
        timelineItems: [
            {
                year: '2020s',
                title: 'Artemis Program',
                description: 'NASA Artemis aims to return humans to the Moon, establishing a sustainable lunar presence as a stepping stone to Mars.'
            },
            {
                year: '2020s',
                title: 'Lunar Gateway',
                description: 'Lunar Gateway architecture enables deep-space staging, creating a permanent outpost in lunar orbit for future missions.'
            },
            {
                year: '2020s',
                title: 'Mars-Scale Logistics',
                description: 'Starship targets Mars-scale logistics, making the dream of human settlement on Mars a realistic engineering challenge.'
            },
            {
                year: 'Future',
                title: 'Multi-Planetary Species',
                description: 'Humanity stands on the threshold of becoming a multi-planetary species, with lunar bases, Mars colonies, and deep space exploration within reach.'
            }
        ],
        quote: 'The Earth is the cradle of humanity, but mankind cannot stay in the cradle forever.',
        quoteAuthor: 'Konstantin Tsiolkovsky',
        perception: 'We stand at the threshold of humanity\'s greatest adventure. The perception is one of inevitability—becoming a multi-planetary species is no longer science fiction but a matter of when, not if. Space exploration is seen as essential for humanity\'s long-term survival and growth. The new space race involves multiple nations and private companies, all racing toward the same goal: making humanity a spacefaring civilization. The future of space exploration is bright, ambitious, and within our grasp.'
    }
];








