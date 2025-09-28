// src / store / useSite.jsx
// src/store/useSite.jsx
// import React from 'react';
// import { DEFAULT_STATE } from './defaultState';
// import { supabase } from '../utils/supabase'; // keep your path

// export const SiteContext = React.createContext(null);
// export const STORAGE_KEY = 'soc_state_v3'; // bump to v3 to discard the huge v2 blob

// const PERSIST_KEYS = ['auth', 'lang', 'brand', 'content', 'hero', 'donations']; // small only

// function pickPersistable(state) {
//   const out = {};
//   for (const k of PERSIST_KEYS) out[k] = state[k];
//   return out;
// }

// export function SiteProvider({ children }) {
//   // load only small subset from localStorage
//   const [state, setState] = React.useState(() => {
//     try {
//       const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
//       return saved ? { ...DEFAULT_STATE, ...saved } : DEFAULT_STATE;
//     } catch {
//       return DEFAULT_STATE;
//     }
//   });

//   // 🚫 DO NOT store large arrays in localStorage (they come from Supabase)
//   React.useEffect(() => {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(pickPersistable(state)));
//     } catch (e) {
//       // swallow quota errors so the app never crashes
//       console.warn('Persist skipped:', e?.name || e);
//     }
//   }, [state.auth, state.lang, state.brand, state.content, state.hero, state.donations]);

//   // ---------- AUTH ----------
//   const login = async (email, password) => {
//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) return false;
//     setState(s => ({ ...s, auth: { user: data.user } }));
//     return true;
//   };

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setState(s => ({ ...s, auth: { user: null } }));
//   };

//   // ---------- READ (initial load) ----------
//   const loadTable = async (table, orderCol = 'created_at') => {
//     let q = supabase.from(table).select('*', { head: false, count: 'exact' });
//     // if created_at doesn't exist, fall back to id
//     const { data: test, error: testErr } = await supabase
//       .from(table).select(orderCol).limit(1);
//     if (testErr) orderCol = 'id';
//     const { data, error } = await supabase.from(table).select('*').order(orderCol, { ascending: false });
//     if (error) { console.error(`load ${table} failed`, error); return []; }
//     return data || [];
//   };

//   const refreshAll = React.useCallback(async () => {
//     const [events, blog, partners, press, resources] = await Promise.all([
//       loadTable('events'), loadTable('blog'), loadTable('partners'),
//       loadTable('press'), loadTable('resources'),
//     ]);
//     setState(s => ({ ...s, events, blog, partners, press, resources }));
//   }, []);

//   React.useEffect(() => { refreshAll(); }, [refreshAll]);

//   // ---------- WRITE helpers ----------
//   const insert = async (table, row) => {
//     const { data, error } = await supabase.from(table).insert(row).select().single();
//     if (error) throw error;
//     setState(s => ({ ...s, [table]: [data, ...(s[table] || [])] }));
//     return data;
//   };

//   const remove = async (table, id) => {
//     await supabase.from(table).delete().eq('id', id);
//     setState(s => ({ ...s, [table]: (s[table] || []).filter(x => x.id !== id) }));
//   };

//   // Small setters for brand/hero/donations/content: write to DB settings table if you have one,
//   // but keep local update so UI stays responsive
//   const patch = (p) => setState(s => ({ ...s, ...p }));
//   const setBrand = (b) => setState(s => ({ ...s, brand: b }));
//   const setHero = (h) => setState(s => ({ ...s, hero: h }));
//   const setDonations = (d) => setState(s => ({ ...s, donations: d }));

//   // Expose specific insert/remove for Admin
//   const addEvent = (o) => insert('events', o);
//   const addBlog = (o) => insert('blog', o);
//   const addPartner = (o) => insert('partners', o);
//   const addPress = (o) => insert('press', o);
//   const addResource = (o) => insert('resources', o);

//   const removeItem = (table, id) => remove(table, id);

//   const value = {
//     state, setState,
//     login, logout,
//     refreshAll,
//     patch, setBrand, setHero, setDonations,
//     addEvent, addBlog, addPartner, addPress, addResource, removeItem,
//   };

//   return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
// }

// export default function useSite() { return React.useContext(SiteContext); }





// // src/store/useSite.jsx
// import React from 'react';
// import { createClient } from '@supabase/supabase-js';

// // ---- Supabase client ----
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// export const supabase = createClient(supabaseUrl, supabaseKey);

// export const SiteContext = React.createContext(null);
// const TABLES = ['events', 'blog', 'partners', 'press', 'resources'];
// const SESSION_KEY = 'soc_admin_session';

// const DEFAULT_STATE = {
//   auth: { user: null },
//   lang: 'en',
//   brand: { name: 'Servants of Compassion', logo: '', address: '', email: '', phone: '', social: {} },
//   content: {},
//   hero: { mode: 'slideshow', videoUrl: '', slides: [] },
//   donations: { provider: 'givebutter', embed: 'modal', url: '', goal: 30000, raised: 0 },
//   stats: { ambulances: 18, kits: 4200, volunteers: 87 },
//   events: [], blog: [], partners: [], press: [], resources: [], contacts: [], volunteers: []
// };

// export function SiteProvider({ children }) {
//   const [state, setState] = React.useState(DEFAULT_STATE);

//   // ---- Load all data from Supabase ----
//   const loadAllData = React.useCallback(async () => {
//     try {
//       // Load table data
//       const tablePromises = TABLES.map(async (table) => {
//         let query = supabase.from(table).select('*');

//         // Apply appropriate ordering
//         if (table === 'events') query = query.order('date', { ascending: true });
//         else if (table === 'blog' || table === 'press') query = query.order('date', { ascending: false });
//         else query = query.order('created_at', { ascending: false });

//         const { data, error } = await query;
//         if (error) throw error;
//         return { table, data: data || [] };
//       });

//       // Load settings
//       const settingsPromise = supabase.from('settings').select('key,value');

//       const results = await Promise.all([...tablePromises, settingsPromise]);

//       // Process table data
//       const newState = { ...state };
//       for (let i = 0; i < TABLES.length; i++) {
//         const { table, data } = results[i];
//         newState[table] = data;
//       }

//       // Process settings
//       const settingsData = results[results.length - 1];
//       if (!settingsData.error && settingsData.data) {
//         const settingsMap = Object.fromEntries(
//           settingsData.data.map((r) => [r.key, r.value])
//         );

//         if (settingsMap.hero) newState.hero = { ...newState.hero, ...settingsMap.hero };
//         if (settingsMap.donations) newState.donations = { ...newState.donations, ...settingsMap.donations };
//         if (settingsMap.content) newState.content = { ...newState.content, ...settingsMap.content };
//         if (settingsMap.brand) newState.brand = { ...newState.brand, ...settingsMap.brand };
//       }

//       setState(newState);
//     } catch (error) {
//       console.error('Error loading data:', error);
//     }
//   }, []);

//   // Initial data load
//   React.useEffect(() => {
//     loadAllData();
//   }, [loadAllData]);

//   // ---- Auth functions ----
//   const login = async (email, password) => {
//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) return false;
//     setState(s => ({ ...s, auth: { user: data.user } }));
//     sessionStorage.setItem(SESSION_KEY, String(Date.now() + 60 * 60 * 1000));
//     return true;
//   };

//   const logout = () => {
//     sessionStorage.removeItem(SESSION_KEY);
//     supabase.auth.signOut().finally(() => {
//       setState(s => ({ ...s, auth: { user: null } }));
//     });
//   };

//   // ---- Data management functions ----
//   const addItem = async (table, payload) => {
//     const { data, error } = await supabase.from(table).insert(payload).select().single();
//     if (error) throw error;
//     setState(s => ({ ...s, [table]: [data, ...s[table]] }));
//     return data;
//   };

//   const removeItem = async (table, id) => {
//     const { error } = await supabase.from(table).delete().eq('id', id);
//     if (error) throw error;
//     setState(s => ({ ...s, [table]: s[table].filter(item => item.id !== id) }));
//   };

//   const updateItem = async (table, id, updates) => {
//     const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single();
//     if (error) throw error;
//     setState(s => ({
//       ...s,
//       [table]: s[table].map(item => item.id === id ? data : item)
//     }));
//     return data;
//   };

//   return (
//     <SiteContext.Provider value={{
//       state,
//       loadAllData,
//       login,
//       logout,
//       addItem,
//       removeItem,
//       updateItem,
//       SESSION_KEY
//     }}>
//       {children}
//     </SiteContext.Provider>
//   );
// }

// export default function useSite() {
//   return React.useContext(SiteContext);
// }




// src/store/useSite.jsx
import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const SiteContext = React.createContext(null);

// Add pages/team/milestones/programs later if you already have them.
// For now keep what you use today:
const TABLES = ['events', 'blog', 'partners', 'press', 'resources'];

const SESSION_KEY = 'soc_admin_session';

const DEFAULT_STATE = {
  auth: { user: null },
  // ✅ make lang explicit & persisted
  lang: 'en',
  // ✅ brand comes from settings; keep safe defaults
  brand: { name: 'Servants of Compassion', logo: '', address: '', email: '', phone: '', social: {} },
  content: {},
  // ✅ normalize hero key (videoUrl—not video_url)
  hero: { mode: 'slideshow', videoUrl: '', slides: [] },
  donations: { provider: 'givebutter', embed: 'modal', url: '', goal: 30000, raised: 0 },
  stats: { ambulances: 18, kits: 4200, volunteers: 87 },
  events: [], blog: [], partners: [], press: [], resources: [],
  contacts: [], volunteers: []
};

function normalizeHero(h = {}) {
  // accept either videoUrl or video_url coming from settings
  return {
    ...h,
    videoUrl: h.videoUrl ?? h.video_url ?? '',
  };
}

export function SiteProvider({ children }) {
  const [state, setState] = React.useState(DEFAULT_STATE);

  // ---- Load all data from Supabase ----
  const loadAllData = React.useCallback(async () => {
    try {
      // tables
      const tablePromises = TABLES.map(async (table) => {
        let q = supabase.from(table).select('*');
        if (table === 'events') q = q.order('date', { ascending: true });
        else if (table === 'blog' || table === 'press') q = q.order('date', { ascending: false });
        else q = q.order('created_at', { ascending: false });
        const { data, error } = await q;
        if (error) throw error;
        return { table, data: data || [] };
      });

      // settings
      const settingsPromise = supabase.from('settings').select('key,value');

      const results = await Promise.all([...tablePromises, settingsPromise]);

      // ✅ functional setState to avoid stale closure
      setState((prev) => {
        const next = { ...prev };

        // tables
        for (let i = 0; i < TABLES.length; i++) {
          const { table, data } = results[i];
          next[table] = data;
        }

        // settings
        const settingsRes = results[results.length - 1];
        if (!settingsRes.error && settingsRes.data) {
          const map = Object.fromEntries((settingsRes.data || []).map(r => [r.key, r.value]));
          if (map.hero) next.hero = { ...next.hero, ...normalizeHero(map.hero) };
          if (map.donations) next.donations = { ...next.donations, ...map.donations };
          if (map.content) next.content = { ...next.content, ...map.content };
          if (map.brand) next.brand = { ...next.brand, ...map.brand };
        }

        return next;
      });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, []);

  // initial load
  React.useEffect(() => {
    // restore saved language
    const saved = localStorage.getItem('soc_lang');
    if (saved === 'uk' || saved === 'en') {
      setState(s => ({ ...s, lang: saved }));
    }
    loadAllData();
  }, [loadAllData]);

  // ✅ realtime: refresh site when settings change (solves navbar/footer not updating)
  React.useEffect(() => {
    const ch = supabase
      .channel('settings-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, () => {
        loadAllData();
      })
      .subscribe();

    return () => supabase.removeChannel(ch);
  }, [loadAllData]);

  // ---- Auth helpers (if you use them in Admin area) ----
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return false;
    setState(s => ({ ...s, auth: { user: data.user } }));
    sessionStorage.setItem(SESSION_KEY, String(Date.now() + 60 * 60 * 1000));
    return true;
  };
  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    supabase.auth.signOut().finally(() => {
      setState(s => ({ ...s, auth: { user: null } }));
    });
  };

  // ✅ language setter (used by LanguageToggle)
  const setLang = (lang) => {
    setState(s => ({ ...s, lang }));
    localStorage.setItem('soc_lang', lang);
  };

  // CRUD passthroughs you already had
  const addItem = async (table, payload) => {
    const { data, error } = await supabase.from(table).insert(payload).select().single();
    if (error) throw error;
    setState(s => ({ ...s, [table]: [data, ...s[table]] }));
    return data;
  };
  const removeItem = async (table, id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
    setState(s => ({ ...s, [table]: s[table].filter(i => i.id !== id) }));
  };
  const updateItem = async (table, id, updates) => {
    const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single();
    if (error) throw error;
    setState(s => ({ ...s, [table]: s[table].map(i => i.id === id ? data : i) }));
    return data;
  };

  return (
    <SiteContext.Provider value={{
      state,
      setLang,    // ✅ expose
      loadAllData,
      login, logout,
      addItem, removeItem, updateItem,
      SESSION_KEY
    }}>
      {children}
    </SiteContext.Provider>
  );
}

export default function useSite() {
  return React.useContext(SiteContext);
}
