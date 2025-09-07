export const DEFAULT_STATE = {
  auth:{user:null},
  lang:'en',
  brand:{
    name:'Servants of Compassion', logo:'/src/assets/logo.png',
    address:'Seattle, Washington, USA', email:'bicabdul66@gmail.com', phone:'+1 (555) 123-4567',
    social:{ facebook:'https://www.facebook.com/share/16pQWvHFy4/?mibextid=wwXIfr', instagram:'https://www.instagram.com/vitaliyirina?igsh=b3UybnhqemN1cjlt', twitter:'' }
  },
  donations:{ provider:'givebutter', url:'https://givebutter.com/ZTvE7r', embed:'modal', goal:150000, raised:64250 },
  stats:{ ambulances:18, kits:4200, volunteers:87, regions:9 },
  hero:{ mode:'slideshow', videoUrl:'', slides:[
    {src:'/src/assets/photos/photo_1.jpg', caption:'Ambulance delivered to a frontline hospital'},
    {src:'/src/assets/photos/photo_4.jpg', caption:'Each vehicle stocked with trauma supplies'},
    {src:'/src/assets/photos/photo_11.jpg', caption:'Seattle community rally'}
  ]},
  content:{
    heroTitle:'Together, we deliver hope and emergency care to Ukraine',
    heroTitleUk:'Разом ми доставляємо надію та невідкладну допомогу Україні',
    heroSubtitle:'Your donation funds ambulances, trauma kits, and critical equipment so medics can reach people in time.',
    heroSubtitleUk:'Ваш донат фінансує швидкі, набори для травм і критичне обладнання, щоб медики встигали вчасно.',
    aboutLongEn:`Servants of Compassion is a registered non‑profit founded by CEO Vitaly. Our team hunts for reliable, decommissioned ambulances across the U.S., refurbishes them, loads them with trauma supplies, and coordinates transport to Ukrainian hospitals and volunteer medics. 
For three years we have run convoys, trained drivers, and sourced equipment—from bandages to monitors. We also support Ukrainian immigrants in the U.S. with community care and integration support. We stand for peace, dignity, and the protection of civilian life.`,
    aboutLongUk:`Servants of Compassion — зареєстрована неприбуткова організація, заснована CEO Віталієм. Ми шукаємо надійні швидкі у США, відновлюємо їх, завантажуємо медичними наборами і доправляємо до лікарень та волонтерських медиків України. 
Уже три роки ми організовуємо конвої, навчаємо водіїв та постачаємо обладнання — від бинтів до моніторів. Також підтримуємо українців-іммігрантів у США. Ми за мир, гідність і захист цивільного життя.`,
    missionLongEn:`Our purpose is simple: shorten the time between injury and life‑saving care. We do it by delivering road‑ready ambulances and stocking them with the tools medics ask for. 
We partner with Ukrainian hospitals, chaplains, and volunteer battalions to map needs, ship equipment, and hand off vehicles with training and spare parts. Transparency guides us: every vehicle and shipment is logged and publicly tracked.`,
    missionLongUk:`Наша мета проста: скоротити час між травмою та наданням допомоги. Ми передаємо справні швидкі та комплектуємо їх потрібним обладнанням. 
Працюємо з лікарнями, капеланами та волонтерськими підрозділами, щоб визначати потреби, відправляти вантажі та передавати авто з інструктажем і запчастинами. Прозорість — наш принцип: кожна машина і відправлення фіксується публічно.`
  },
  programs:[
    {id:'p1',titleEn:'Ambulance Acquisition & Refit',titleUk:'Закупівля та підготовка швидких',bodyEn:'We locate well‑maintained vehicles, perform service checks, source stretchers, O2 cylinders, AEDs, and stock meds.',bodyUk:'Ми шукаємо машини у хорошому стані, проводимо сервіс, забезпечуємо ноші, балони O2, дефібрилятори, медикаменти.'},
    {id:'p2',titleEn:'Medical Supply Airlifts',titleUk:'Постачання медзасобів',bodyEn:'From tourniquets to monitors, we palletize critical items and ship through vetted corridors.',bodyUk:'Від турнікетів до моніторів — ми формуємо палети та доставляємо через перевірені коридори.'},
    {id:'p3',titleEn:'Community & Chaplaincy',titleUk:'Громада та капеланство',bodyEn:'We support Ukrainian immigrants in the U.S. with counseling, events, and cultural integration.',bodyUk:'Підтримуємо українців у США: консультації, події, інтеграція.'}
  ],
  testimonials:[
    {id:'t1',name:'Iryna, ER nurse (Dnipro)',text:'The ambulance your donors sent reached us days before a mass casualty incident. It carried suction, O2, and a working defibrillator — we saved three people that night.'},
    {id:'t2',name:'Chaplain Andrii',text:'Your team didn’t just hand over keys — you trained drivers and left spare parts. That kept us rolling for months.'},
    {id:'t3',name:'Oleksii, Volunteer medic',text:'Tourniquets and chest seals went straight to our kits. Thank you to everyone who gave.'}
  ],
  vehicles:[
    {id:'v1',title:'Ford E‑350 Ambulance',date:'2024-11-04',region:'Kharkiv',status:'Delivered',photo:'/src/assets/photos/photo_4.jpg',notes:'Refit with new battery, O2, suction, AED.'},
    {id:'v2',title:'Sprinter Type II',date:'2024-07-15',region:'Zaporizhzhia',status:'Delivered',photo:'/src/assets/photos/photo_1.jpg',notes:'High‑roof, stocked with trauma kits.'},
    {id:'v3',title:'Ford Econoline',date:'2023-12-20',region:'Odesa',status:'Delivered',photo:'/src/assets/photos/photo_12.jpg',notes:'Donor‑funded engine service before handoff.'}
  ],
  partners:[
    {id:'pa1',name:'Seattle Ukrainian Community',url:'#',logo:''},
    {id:'pa2',name:'MedSupply Northwest',url:'#',logo:''},
    {id:'pa3',name:'Global Lifeline Logistics',url:'#',logo:''}
  ],
  press:[
    {id:'pr1',title:'Grassroots team ferries ambulances to Ukraine',outlet:'Local Times',date:'2024-10-12',url:'#',excerpt:'A small non‑profit in Seattle is quietly moving mountains — and vehicles.'},
    {id:'pr2',title:'Donors help stock trauma kits on the frontlines',outlet:'Health Today',date:'2024-06-08',url:'#',excerpt:'From gauze to monitors, supplies reach where they are needed most.'}
  ],
  blog:[
    {id:'b1',title:'From Auction Lot to Lifeline: Refitting a Retired Ambulance',titleUk:'Від аукціону до порятунку',date:'2024-09-05',author:'Team',image:'/src/assets/photos/photo_5.jpg',excerpt:'How we inspect, service, and stock vehicles before a 6,000‑mile journey.',content:`We start with reliability checks — brakes, battery, fluids, belts. Then we source stretchers, O2 systems, suction, and AEDs. The final step is stocking trauma kits and running a 72‑hour shake‑down before shipping.`},
    {id:'b2',title:'Your Gifts in Action: A Night in a Kharkiv ER',titleUk:'Ваші внески в дії',date:'2024-11-21',author:'Vitaly',image:'/src/assets/photos/photo_9.jpg',excerpt:'Three patients. Twenty minutes. One ambulance made the difference.',content:`The radio cracked at 23:14. Within minutes, the crew stabilized two patients using equipment donors helped fund. The ambulance’s working inverter and O2 rig were decisive.`}
  ],
  events:[
    {id:'e1',title:'Benefit Dinner: One More Ambulance',titleUk:'Благодійна вечеря: Ще одна швидка',date:'2025-10-10',location:'Seattle, WA',provides:'Funds to refit a Sprinter ambulance',image:'/src/assets/photos/photo_11.jpg',description:'Join supporters, meet volunteers, and help us send another vehicle with full trauma gear.'},
    {id:'e2',title:'Community Packing Day',titleUk:'День пакування',date:'2025-09-12',location:'Bellevue, WA',provides:'Pallets of supplies, bandages, and monitors',image:'/src/assets/photos/photo_10.jpg',description:'We will assemble kits, label boxes, and load a container bound for Odesa.'},
    {id:'e3',title:'Thank‑You Brunch for Donors',titleUk:'Подячний бранч для донорів',date:'2025-06-01',location:'Seattle, WA',provides:'Recognition and impact briefing',image:'/src/assets/photos/photo_12.jpg',description:'Hear stories from medics, see the latest delivery log, and preview the next convoy.'},
    {id:'e4',title:'Past: Spring Fund Drive 2024',titleUk:'Минуле: Весняний збір 2024',date:'2024-04-20',location:'Online',provides:'$28,300 for equipment',image:'/src/assets/photos/photo_6.jpg',description:'Thanks to you, we stocked four ambulances with suction and AED units.'}
  ],
  resources:[{id:'r1',title:'One‑Pager (EN)',description:'Share our mission with friends and donors.',url:'#',file:''}],
  volunteers:[], contacts:[], newsletter:[]
};