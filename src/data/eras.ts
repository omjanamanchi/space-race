export type EraCategory = 'us' | 'ussr' | 'joint' | 'other';

export interface Era {
    id: number;
    title: string;
    years: string;
    accomplishments: Partial<Record<EraCategory, string[]>>;
}

export const ERA_DATA: Era[] = [
    {
        id: 1,
        title: 'ERA 1 — Foundations',
        years: '1945–1957',
        accomplishments: {
            us: [
                'German V-2 expertise absorbed into Army Ballistic Missile Agency',
                'ICBM research accelerates: Redstone → Jupiter series'
            ],
            ussr: [
                'Korolev leads R-7 Semyorka, the rocket that will launch Sputnik',
                'Reverse-engineering V-2 hardware jump-starts Soviet design bureaus'
            ],
            other: [
                '1955: Both nations announce plans to launch an artificial satellite'
            ]
        }
    },
    {
        id: 2,
        title: 'ERA 2 — Dawn of Spaceflight',
        years: '1957–1961',
        accomplishments: {
            ussr: [
                'Sputnik 1 signals the dawn of the space age',
                'Laika becomes the first living passenger to orbit Earth',
                'Yuri Gagarin completes first human orbital flight'
            ],
            us: [
                'Explorer 1 discovers the Van Allen radiation belts',
                'NASA is established to coordinate the civilian space program',
                'Alan Shepard completes the first American crewed flight'
            ]
        }
    },
    {
        id: 3,
        title: 'ERA 3 — Moon Race & Human Spaceflight',
        years: '1961–1969',
        accomplishments: {
            ussr: [
                'Valentina Tereshkova becomes the first woman in space',
                'Alexei Leonov performs the first spacewalk'
            ],
            us: [
                'Gemini program masters rendezvous, docking, EVA techniques',
                'Apollo 8 carries humans around the Moon for the first time',
                'Apollo 11 lands Armstrong and Aldrin on the lunar surface'
            ]
        }
    },
    {
        id: 4,
        title: 'ERA 4 — Space Stations & Shuttle Era',
        years: '1970–1991',
        accomplishments: {
                ussr: [
                'Salyut 1 inaugurates long-duration orbital labs',
                'Mir demonstrates modular station operations'
            ],
            us: [
                'Skylab begins microgravity science for the US',
                'Space Shuttle introduces partial reusability'
            ],
            joint: [
                'Apollo–Soyuz handsake foreshadows cooperation'
            ]
        }
    },
    {
        id: 5,
        title: 'ERA 5 — International Cooperation',
        years: '1991–2006',
        accomplishments: {
            joint: [
                '1993 ISS agreement unites five space agencies',
                '1998 begins ISS assembly — still the largest structure in space'
            ],
            ussr: [
                'Russia commercializes Soyuz seats, seeding private partnerships'
            ],
            us: [
                'Shuttle fleet constructs and services ISS modules'
            ]
        }
    },
    {
        id: 6,
        title: 'ERA 6 — Rise of Commercial Space',
        years: '2006–2015',
        accomplishments: {
            us: [
                'NASA COTS and CRS programs invest in private launchers',
                'SpaceX Falcon 1 reaches orbit in 2008',
                'Space Shuttle retires in 2011, opening lanes for commercial crew',
                'Blue Origin successfully lands New Shepard in 2015'
            ]
        }
    },
    {
        id: 7,
        title: 'ERA 7 — Corporate Conquest Era',
        years: '2015–Present',
        accomplishments: {
            us: [
                'Falcon 9 and Falcon Heavy prove reusable heavy lift',
                'Crew Dragon ushers in commercial astronaut taxis',
                'Starship testing pushes ultra-heavy fully reusable craft',
                'Starlink mega-constellation scales orbital internet'
            ],
            other: [
                'China: Tiangong station, Chang’e lunar series, Tianwen-1 Mars',
                'India: Chandrayaan-3 achieves south-pole landing'
            ]
        }
    },
    {
        id: 8,
        title: 'ERA 8 — The New Space Race',
        years: '2020s–Future',
        accomplishments: {
            us: [
                'NASA Artemis aims to return humans to the Moon',
                'Lunar Gateway architecture enables deep-space staging',
                'Starship targets Mars-scale logistics',
                'Blue Origin Blue Moon and lunar base concepts mature'
            ],
            other: [
                'China–Russia outline a lunar research station',
                'Private ventures explore space tourism and asteroid mining'
            ]
        }
    }
];
















