import React from "react";
import { supabase } from "../utils/supabaseClient";

// ---------- helpers ----------
async function uploadToMedia(folder, file) {
    const path = `${folder}/${crypto.randomUUID()}_${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    return data.publicUrl;
}

async function saveSetting(key, value) {
    const { error } = await supabase.from("settings").upsert({ key, value });
    if (error) throw error;
}

const TABS = [
    { id: "dashboard", label: "Dashboard" },
    { id: "home", label: "Homepage" },
    { id: "donations", label: "Donations" },
    { id: "events", label: "Events" },
    { id: "blog", label: "Blog" },
    { id: "media", label: "Media" },
    { id: "partners", label: "Partners" },
    { id: "press", label: "Press" },
    { id: "resources", label: "Resources" },
    { id: "inbox", label: "Inbox" },
    { id: "i18n", label: "Texts (EN/UK)" },
    { id: "brand", label: "Brand & Social" },
    { id: "data", label: "Danger Zone" },
];

export default function Admin() {
    const [user, setUser] = React.useState(null);
    const [tab, setTab] = React.useState("dashboard");
    const [editingItem, setEditingItem] = React.useState(null);
    const [editingType, setEditingType] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    // data rows
    const [events, setEvents] = React.useState([]);
    const [posts, setPosts] = React.useState([]);
    const [partners, setPartners] = React.useState([]);
    const [press, setPress] = React.useState([]);
    const [resources, setResources] = React.useState([]);

    // content/settings
    const [hero, setHero] = React.useState({
        mode: "slideshow",
        video_url: "",
        slides: [],
    });

    const [donations, setDonations] = React.useState({
        provider: "givebutter",
        embed: "modal",
        url: "",
        goal: 30000,
        raised: 0,
    });

    const [content, setContent] = React.useState({
        heroTitle: "",
        heroTitleUk: "",
        heroSubtitle: "",
        heroSubtitleUk: "",
        missionLongEn: "",
        missionLongUk: "",
        aboutLongEn: "",
        aboutLongUk: "",
    });

    const [brand, setBrand] = React.useState({
        name: "",
        logo: "",
        address: "",
        email: "",
        phone: "",
        social: { facebook: "", instagram: "", twitter: "" },
    });

    // NEW: Dedicated home content state (stored in table `home_content`, single row)
    const [homeContent, setHomeContent] = React.useState({
        id: 1, // ensure upsert targets a single known row
        heroTitle: "",
        heroTitleUk: "",
        heroSubtitle: "",
        heroSubtitleUk: "",
        stats: {
            ambulances: 0,
            kits: 0,
            volunteers: 0,
            communities: 0,
        },
        impactStatement: "",
        impactStatementUk: "",
        // store as array of { type: 'event'|'post', id: number }
        featuredContent: [],
    });

    // ---------- auth ----------
    React.useEffect(() => {
        let ignore = false;
        (async () => {
            const { data } = await supabase.auth.getSession();
            if (!ignore) setUser(data.session?.user ?? null);
        })();
        const sub = supabase.auth.onAuthStateChange((_e, s) =>
            setUser(s?.user ?? null)
        );
        // sign out when leaving admin
        const unload = () => supabase.auth.signOut();
        window.addEventListener("beforeunload", unload);
        return () => {
            sub.data.subscription.unsubscribe();
            window.removeEventListener("beforeunload", unload);
            supabase.auth.signOut();
        };
    }, []);

    // ---------- loaders ----------
    async function loadAll() {
        setLoading(true);
        try {
            const [
                ev,
                bl,
                pa,
                pr,
                re,
                settingsRows,
                homeRow,
            ] = await Promise.all([
                supabase.from("events").select("*").order("date", { ascending: true }),
                supabase.from("blog").select("*").order("date", { ascending: false }),
                supabase
                    .from("partners")
                    .select("*")
                    .order("created_at", { ascending: false }),
                supabase.from("press").select("*").order("date", { ascending: false }),
                supabase
                    .from("resources")
                    .select("*")
                    .order("created_at", { ascending: false }),
                supabase.from("settings").select("key,value"),
                supabase.from("home_content").select("*").eq("id", 1).single(),
            ]);

            if (!ev.error) setEvents(ev.data || []);
            if (!bl.error) setPosts(bl.data || []);
            if (!pa.error) setPartners(pa.data || []);
            if (!pr.error) setPress(pr.data || []);
            if (!re.error) setResources(re.data || []);

            if (!settingsRows.error) {
                const map = Object.fromEntries(
                    (settingsRows.data || []).map((r) => [r.key, r.value])
                );
                if (map.hero)
                    setHero({ mode: "slideshow", slides: [], video_url: "", ...map.hero });
                if (map.donations) setDonations((d) => ({ ...d, ...map.donations }));
                if (map.content) setContent((c) => ({ ...c, ...map.content }));
                if (map.brand) setBrand((b) => ({ ...b, ...map.brand }));
            }

            if (!homeRow.error && homeRow.data) {
                // guard defaults for missing json fields
                setHomeContent((prev) => ({
                    id: homeRow.data.id ?? 1,
                    heroTitle: homeRow.data.heroTitle ?? "",
                    heroTitleUk: homeRow.data.heroTitleUk ?? "",
                    heroSubtitle: homeRow.data.heroSubtitle ?? "",
                    heroSubtitleUk: homeRow.data.heroSubtitleUk ?? "",
                    stats: {
                        ambulances: homeRow.data?.stats?.ambulances ?? 0,
                        kits: homeRow.data?.stats?.kits ?? 0,
                        volunteers: homeRow.data?.stats?.volunteers ?? 0,
                        communities: homeRow.data?.stats?.communities ?? 0,
                    },
                    impactStatement: homeRow.data.impactStatement ?? "",
                    impactStatementUk: homeRow.data.impactStatementUk ?? "",
                    featuredContent: Array.isArray(homeRow.data.featuredContent)
                        ? homeRow.data.featuredContent
                        : [],
                }));
            }
        } catch (error) {
            console.error("Error loading data:", error);
            alert("Failed to load data");
        } finally {
            setLoading(false);
        }
    }
    React.useEffect(() => {
        if (user) loadAll();
    }, [user]);

    // ---------- edit handlers ----------
    const startEdit = (type, item) => {
        setEditingType(type);
        setEditingItem(item);
    };

    const cancelEdit = () => {
        setEditingType(null);
        setEditingItem(null);
    };

    const handleUpdate = async (e, type, id) => {
        e.preventDefault();
        const form = e.currentTarget;
        const f = new FormData(form);

        try {
            let updates = {};
            let image_url = editingItem?.image_url || null;

            // Handle file upload if a new file is selected
            const fileInput = form.querySelector('input[type="file"]');
            if (fileInput && fileInput.files.length > 0) {
                image_url = await uploadToMedia(type, fileInput.files[0]);
            }

            // Build updates object based on form fields
            for (let [key, value] of f.entries()) {
                if (value) updates[key] = value;
            }

            if (image_url) updates.image_url = image_url;

            const { error } = await supabase.from(type).update(updates).eq("id", id);
            if (error) throw error;

            await loadAll();
            cancelEdit();
            alert("Updated successfully");
        } catch (err) {
            alert("Failed to update\n\n" + err.message);
        }
    };

    // ---------- login UI ----------
    if (!user) {
        return <EmailLogin />;
    }

    // helpers for Featured Content (events/posts)
    const getFeaturedIdsByType = (t) =>
        (homeContent.featuredContent || [])
            .filter((x) => x?.type === t)
            .map((x) => x.id);

    const handleFeaturedChange = (type, selectedOptions) => {
        const selectedIds = Array.from(selectedOptions).map((o) =>
            Number(o.value)
        );
        const other = (homeContent.featuredContent || []).filter(
            (x) => x?.type !== type
        );
        const updated = [
            ...other,
            ...selectedIds.map((id) => ({ type, id })),
        ];
        setHomeContent((hc) => ({ ...hc, featuredContent: updated }));
    };

    // ---------- page ----------
    return (
        <main className="pt-28 pb-24">
            <div className="container grid lg:grid-cols-[240px,1fr] gap-6">
                <aside className="sticky top-[84px] self-start rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-3 h-fit">
                    <div className="font-bold text-sm opacity-80 px-2 mb-2">Admin</div>
                    <nav className="grid gap-1">
                        {TABS.map((t) => (
                            <button
                                key={t.id}
                                className={`text-left px-3 py-2 rounded-xl hover:bg-white/10 ${tab === t.id ? "bg-white/10" : ""
                                    }`}
                                onClick={() => setTab(t.id)}
                            >
                                {t.label}
                            </button>
                        ))}
                    </nav>
                    <div className="mt-3 pt-3 border-t border-white/10">
                        <button className="btn w-full" onClick={() => supabase.auth.signOut()}>
                            Logout
                        </button>
                    </div>
                </aside>

                <section className="grid gap-6">
                    {tab === "dashboard" && (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <div className="h3">Welcome</div>
                            <div className="opacity-80 mt-2">
                                Use the sidebar to manage content. Changes save to Supabase and
                                show on the public site.
                            </div>
                            <button className="btn btn-yellow mt-4" onClick={loadAll} disabled={loading}>
                                {loading ? "Refreshing..." : "Refresh Data"}
                            </button>
                        </div>
                    )}

                    {/* ----- HOME (Enhanced) ----- */}
                    {tab === "home" && (
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Hero Section */}
                            <div className="card p-6">
                                <div className="h3 mb-4">Hero Section</div>
                                <div className="grid gap-4">
                                    <div>
                                        <label className="label">Mode</label>
                                        <select
                                            className="input"
                                            value={hero.mode}
                                            onChange={(e) => setHero({ ...hero, mode: e.target.value })}
                                        >
                                            <option value="slideshow">Slideshow</option>
                                            <option value="video">Background Video</option>
                                            <option value="single">Single Image</option>
                                        </select>
                                    </div>

                                    {hero.mode === "video" && (
                                        <>
                                            <div>
                                                <label className="label">Video URL</label>
                                                <input
                                                    className="input"
                                                    value={hero.video_url || ""}
                                                    onChange={(e) =>
                                                        setHero({ ...hero, video_url: e.target.value })
                                                    }
                                                    placeholder="YouTube, Vimeo, or direct .mp4 URL"
                                                />
                                            </div>
                                            <div>
                                                <label className="label">Upload Video File</label>
                                                <input
                                                    className="input"
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={async (e) => {
                                                        const f = e.target.files?.[0];
                                                        if (!f) return;
                                                        try {
                                                            const url = await uploadToMedia("hero", f);
                                                            setHero((h) => ({ ...h, video_url: url }));
                                                            alert("Video uploaded successfully");
                                                        } catch (err) {
                                                            alert("Upload failed\n\n" + err.message);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {(hero.mode === "slideshow" || hero.mode === "single") && (
                                        <div>
                                            <label className="label">Slides (Image URLs)</label>
                                            <div className="grid gap-3">
                                                {(hero.slides || []).map((s, i) => (
                                                    <div key={i} className="flex gap-2 items-center">
                                                        <input
                                                            className="input flex-1"
                                                            value={s.src}
                                                            onChange={(e) => {
                                                                const arr = [...(hero.slides || [])];
                                                                arr[i] = { src: e.target.value };
                                                                setHero({ ...hero, slides: arr });
                                                            }}
                                                            placeholder="https://image.jpg"
                                                        />
                                                        <button
                                                            className="btn btn-sm"
                                                            onClick={() => {
                                                                const arr = [...(hero.slides || [])];
                                                                arr.splice(i, 1);
                                                                setHero({ ...hero, slides: arr });
                                                            }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    className="btn"
                                                    onClick={() =>
                                                        setHero({
                                                            ...hero,
                                                            slides: [...(hero.slides || []), { src: "" }],
                                                        })
                                                    }
                                                >
                                                    + Add Slide
                                                </button>
                                            </div>
                                            <div className="mt-2">
                                                <label className="label">Upload Images</label>
                                                <input
                                                    className="input"
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={async (e) => {
                                                        const files = Array.from(e.target.files || []);
                                                        try {
                                                            const newSlides = [];
                                                            for (const file of files) {
                                                                const url = await uploadToMedia("hero", file);
                                                                newSlides.push({ src: url });
                                                            }
                                                            setHero({
                                                                ...hero,
                                                                slides: [...(hero.slides || []), ...newSlides],
                                                            });
                                                            alert("Images uploaded successfully");
                                                        } catch (err) {
                                                            alert("Upload failed\n\n" + err.message);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        className="btn btn-yellow"
                                        onClick={async () => {
                                            try {
                                                await saveSetting("hero", hero);
                                                alert("Hero settings saved successfully");
                                            } catch (e) {
                                                alert("Failed to save hero settings\n\n" + e.message);
                                            }
                                        }}
                                    >
                                        Save Hero Settings
                                    </button>
                                </div>
                            </div>

                            {/* Homepage Content */}
                            <div className="card p-6">
                                <div className="h3 mb-4">Homepage Content</div>
                                <div className="grid gap-4">
                                    <div>
                                        <label className="label">Headline (EN)</label>
                                        <input
                                            className="input"
                                            value={homeContent.heroTitle || ""}
                                            onChange={(e) =>
                                                setHomeContent({ ...homeContent, heroTitle: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Headline (UK)</label>
                                        <input
                                            className="input"
                                            value={homeContent.heroTitleUk || ""}
                                            onChange={(e) =>
                                                setHomeContent({
                                                    ...homeContent,
                                                    heroTitleUk: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Subtitle (EN)</label>
                                        <textarea
                                            className="input"
                                            rows={3}
                                            value={homeContent.heroSubtitle || ""}
                                            onChange={(e) =>
                                                setHomeContent({
                                                    ...homeContent,
                                                    heroSubtitle: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Subtitle (UK)</label>
                                        <textarea
                                            className="input"
                                            rows={3}
                                            value={homeContent.heroSubtitleUk || ""}
                                            onChange={(e) =>
                                                setHomeContent({
                                                    ...homeContent,
                                                    heroSubtitleUk: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="h4 mt-6">Impact Statistics</div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="label">Ambulances Delivered</label>
                                            <input
                                                className="input"
                                                type="number"
                                                value={homeContent.stats?.ambulances ?? 0}
                                                onChange={(e) =>
                                                    setHomeContent({
                                                        ...homeContent,
                                                        stats: {
                                                            ...homeContent.stats,
                                                            ambulances: parseInt(e.target.value) || 0,
                                                        },
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="label">Medical Kits Provided</label>
                                            <input
                                                className="input"
                                                type="number"
                                                value={homeContent.stats?.kits ?? 0}
                                                onChange={(e) =>
                                                    setHomeContent({
                                                        ...homeContent,
                                                        stats: {
                                                            ...homeContent.stats,
                                                            kits: parseInt(e.target.value) || 0,
                                                        },
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="label">Active Volunteers</label>
                                            <input
                                                className="input"
                                                type="number"
                                                value={homeContent.stats?.volunteers ?? 0}
                                                onChange={(e) =>
                                                    setHomeContent({
                                                        ...homeContent,
                                                        stats: {
                                                            ...homeContent.stats,
                                                            volunteers: parseInt(e.target.value) || 0,
                                                        },
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="label">Communities Served</label>
                                            <input
                                                className="input"
                                                type="number"
                                                value={homeContent.stats?.communities ?? 0}
                                                onChange={(e) =>
                                                    setHomeContent({
                                                        ...homeContent,
                                                        stats: {
                                                            ...homeContent.stats,
                                                            communities: parseInt(e.target.value) || 0,
                                                        },
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label">Impact Statement (EN)</label>
                                        <textarea
                                            className="input"
                                            rows={4}
                                            value={homeContent.impactStatement || ""}
                                            onChange={(e) =>
                                                setHomeContent({
                                                    ...homeContent,
                                                    impactStatement: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Impact Statement (UK)</label>
                                        <textarea
                                            className="input"
                                            rows={4}
                                            value={homeContent.impactStatementUk || ""}
                                            onChange={(e) =>
                                                setHomeContent({
                                                    ...homeContent,
                                                    impactStatementUk: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <button
                                        className="btn btn-yellow"
                                        onClick={async () => {
                                            try {
                                                const payload = {
                                                    ...homeContent,
                                                    id: homeContent.id || 1,
                                                };
                                                const { error } = await supabase
                                                    .from("home_content")
                                                    .upsert(payload);
                                                if (error) throw error;
                                                alert("Homepage content saved successfully");
                                            } catch (e) {
                                                alert("Failed to save homepage content\n\n" + e.message);
                                            }
                                        }}
                                    >
                                        Save Homepage Content
                                    </button>
                                </div>
                            </div>

                            {/* Featured Content Section */}
                            <div className="card p-6 lg:col-span-2">
                                <div className="h3 mb-4">Featured Content</div>
                                <div className="grid gap-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="label">Featured Events</label>
                                            <select
                                                className="input"
                                                multiple
                                                value={getFeaturedIdsByType("event")}
                                                onChange={(e) =>
                                                    handleFeaturedChange("event", e.target.selectedOptions)
                                                }
                                            >
                                                {events.map((ev) => (
                                                    <option key={ev.id} value={ev.id}>
                                                        {ev.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="label">Featured Blog Posts</label>
                                            <select
                                                className="input"
                                                multiple
                                                value={getFeaturedIdsByType("post")}
                                                onChange={(e) =>
                                                    handleFeaturedChange("post", e.target.selectedOptions)
                                                }
                                            >
                                                {posts.map((post) => (
                                                    <option key={post.id} value={post.id}>
                                                        {post.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-yellow"
                                        onClick={async () => {
                                            try {
                                                const payload = {
                                                    ...homeContent,
                                                    id: homeContent.id || 1,
                                                };
                                                const { error } = await supabase
                                                    .from("home_content")
                                                    .upsert(payload);
                                                if (error) throw error;
                                                alert("Featured content updated");
                                            } catch (e) {
                                                alert("Failed to update featured content\n\n" + e.message);
                                            }
                                        }}
                                    >
                                        Update Featured Content
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ----- DONATIONS ----- */}
                    {tab === "donations" && (
                        <div className="card p-6">
                            <div className="h3">Donation settings</div>
                            <div className="grid md:grid-cols-2 gap-3 mt-2">
                                <label className="label">Provider</label>
                                <select
                                    className="input"
                                    value={donations.provider}
                                    onChange={(e) =>
                                        setDonations({ ...donations, provider: e.target.value })
                                    }
                                >
                                    <option value="givebutter">Givebutter</option>
                                    <option value="paypal">PayPal</option>
                                </select>
                                <label className="label">Embed mode</label>
                                <select
                                    className="input"
                                    value={donations.embed}
                                    onChange={(e) =>
                                        setDonations({ ...donations, embed: e.target.value })
                                    }
                                >
                                    <option value="modal">Modal</option>
                                    <option value="inline">Inline</option>
                                    <option value="link">Open in new tab</option>
                                </select>
                                <label className="label">Donation URL</label>
                                <input
                                    className="input"
                                    value={donations.url || ""}
                                    onChange={(e) =>
                                        setDonations({ ...donations, url: e.target.value })
                                    }
                                />
                                <label className="label">Goal</label>
                                <input
                                    className="input"
                                    type="number"
                                    value={donations.goal || 0}
                                    onChange={(e) =>
                                        setDonations({
                                            ...donations,
                                            goal: +e.target.value || 0,
                                        })
                                    }
                                />
                                <label className="label">Raised</label>
                                <input
                                    className="input"
                                    type="number"
                                    value={donations.raised || 0}
                                    onChange={(e) =>
                                        setDonations({
                                            ...donations,
                                            raised: +e.target.value || 0,
                                        })
                                    }
                                />
                            </div>
                            <button
                                className="btn btn-yellow mt-3"
                                onClick={async () => {
                                    try {
                                        await saveSetting("donations", donations);
                                        alert("Donations saved");
                                    } catch (e) {
                                        alert("Failed to save donations\n\n" + e.message);
                                    }
                                }}
                            >
                                Save Donations
                            </button>
                        </div>
                    )}

                    {/* ----- EVENTS ----- */}
                    {tab === "events" && (
                        <div className="card p-6">
                            <div className="h3">
                                {editingType === "events" ? "Edit Event" : "Add Event"}
                            </div>
                            <form
                                className="grid md:grid-cols-2 gap-3 mt-2"
                                onSubmit={
                                    editingType === "events"
                                        ? (e) => handleUpdate(e, "events", editingItem.id)
                                        : handleInsertEvent(setEvents)
                                }
                            >
                                <input
                                    className="input"
                                    name="title"
                                    placeholder="Title (EN)"
                                    required
                                    defaultValue={
                                        editingType === "events" ? editingItem.title : ""
                                    }
                                />
                                <input
                                    className="input"
                                    name="title_uk"
                                    placeholder="Title (UK) (optional)"
                                    defaultValue={
                                        editingType === "events" ? editingItem.title_uk || "" : ""
                                    }
                                />
                                <input
                                    className="input"
                                    name="date"
                                    type="date"
                                    required
                                    defaultValue={
                                        editingType === "events" ? editingItem.date : ""
                                    }
                                />
                                <input
                                    className="input"
                                    name="location"
                                    placeholder="Location"
                                    defaultValue={
                                        editingType === "events"
                                            ? editingItem.location || ""
                                            : ""
                                    }
                                />
                                <input
                                    className="input"
                                    name="provides"
                                    placeholder="What this event provides"
                                    defaultValue={
                                        editingType === "events"
                                            ? editingItem.provides || ""
                                            : ""
                                    }
                                />
                                <input className="input" name="image" type="file" accept="image/*" />
                                <input
                                    className="input md:col-span-2"
                                    name="video_url"
                                    placeholder="(Optional) YouTube/Vimeo/Instagram/.mp4"
                                    defaultValue={
                                        editingType === "events"
                                            ? editingItem.video_url || ""
                                            : ""
                                    }
                                />
                                <textarea
                                    className="input md:col-span-2"
                                    name="description"
                                    placeholder="Description"
                                    defaultValue={
                                        editingType === "events"
                                            ? editingItem.description || ""
                                            : ""
                                    }
                                />
                                <button className="btn btn-yellow md:col-span-2">
                                    {editingType === "events" ? "Update Event" : "Add Event"}
                                </button>
                                {editingType === "events" && (
                                    <button
                                        className="btn md:col-span-2"
                                        type="button"
                                        onClick={cancelEdit}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </form>

                            <div className="h3 mt-6">Current Events</div>
                            <div className="grid md:grid-cols-3 gap-3 mt-2">
                                {events.map((ev) => (
                                    <div key={ev.id} className="card p-3 grid gap-2">
                                        <b>{ev.title}</b>
                                        <div className="text-xs opacity-70">
                                            {ev.date} • {ev.location || "TBA"}
                                        </div>
                                        {ev.image_url && (
                                            <img
                                                src={ev.image_url}
                                                alt=""
                                                className="rounded-xl border border-white/10"
                                            />
                                        )}
                                        <div className="flex gap-2">
                                            <button
                                                className="btn flex-1"
                                                onClick={() => startEdit("events", ev)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn flex-1"
                                                onClick={async () => {
                                                    if (confirm("Delete this event?")) {
                                                        const { error } = await supabase
                                                            .from("events")
                                                            .delete()
                                                            .eq("id", ev.id);
                                                        if (error) return alert(error.message);
                                                        loadAll();
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ----- BLOG ----- */}
                    {tab === "blog" && (
                        <div className="card p-6">
                            <div className="h3">
                                {editingType === "blog" ? "Edit Post" : "Add Post"}
                            </div>
                            <form
                                className="grid md:grid-cols-2 gap-3 mt-2"
                                onSubmit={
                                    editingType === "blog"
                                        ? (e) => handleUpdate(e, "blog", editingItem.id)
                                        : handleInsertGeneric({
                                            table: "blog",
                                            fileField: "image",
                                            fileFolder: "blog",
                                            map: (f, image_url) => ({
                                                title: f.get("title")?.toString() || "",
                                                title_uk: f.get("title_uk")?.toString() || null,
                                                date:
                                                    f.get("date")?.toString() ||
                                                    new Date().toISOString().slice(0, 10),
                                                author: f.get("author")?.toString() || null,
                                                video_url: f.get("video_url")?.toString() || null,
                                                content: f.get("content")?.toString() || null,
                                                image_url,
                                            }),
                                            after: () => loadAll(),
                                        })
                                }
                            >
                                <input
                                    className="input"
                                    name="title"
                                    placeholder="Title (EN)"
                                    required
                                    defaultValue={
                                        editingType === "blog" ? editingItem.title : ""
                                    }
                                />
                                <input
                                    className="input"
                                    name="title_uk"
                                    placeholder="Title (UK) (optional)"
                                    defaultValue={
                                        editingType === "blog" ? editingItem.title_uk || "" : ""
                                    }
                                />
                                <input
                                    className="input"
                                    name="date"
                                    type="date"
                                    defaultValue={
                                        editingType === "blog" ? editingItem.date : ""
                                    }
                                />
                                <input
                                    className="input"
                                    name="author"
                                    placeholder="Author"
                                    defaultValue={
                                        editingType === "blog" ? editingItem.author || "" : ""
                                    }
                                />
                                <input className="input" type="file" name="image" accept="image/*" />
                                <input
                                    className="input md:col-span-2"
                                    name="video_url"
                                    placeholder="(Optional) YouTube/Vimeo/.mp4/Instagram"
                                    defaultValue={
                                        editingType === "blog"
                                            ? editingItem.video_url || ""
                                            : ""
                                    }
                                />
                                <textarea
                                    className="input md:col-span-2"
                                    rows={6}
                                    name="content"
                                    placeholder="Article content"
                                    defaultValue={
                                        editingType === "blog"
                                            ? editingItem.content || ""
                                            : ""
                                    }
                                />
                                <button className="btn btn-yellow md:col-span-2">
                                    {editingType === "blog" ? "Update Post" : "Publish"}
                                </button>
                                {editingType === "blog" && (
                                    <button
                                        className="btn md:col-span-2"
                                        type="button"
                                        onClick={cancelEdit}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </form>

                            <div className="h3 mt-6">Current Posts</div>
                            <div className="grid md:grid-cols-3 gap-3 mt-2">
                                {posts.map((p) => (
                                    <div key={p.id} className="card p-3 grid gap-2">
                                        <b>{p.title}</b>
                                        <div className="text-xs opacity-70">
                                            {p.date} • {p.author || ""}
                                        </div>
                                        {p.image_url && (
                                            <img
                                                src={p.image_url}
                                                alt=""
                                                className="rounded-xl border border-white/10"
                                            />
                                        )}
                                        <div className="flex gap-2">
                                            <button
                                                className="btn flex-1"
                                                onClick={() => startEdit("blog", p)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn flex-1"
                                                onClick={async () => {
                                                    if (confirm("Delete this post?")) {
                                                        const { error } = await supabase
                                                            .from("blog")
                                                            .delete()
                                                            .eq("id", p.id);
                                                        if (error) return alert(error.message);
                                                        loadAll();
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ----- MEDIA (videos/images into resources table) ----- */}
                    {tab === "media" && (
                        <div className="card p-6">
                            <div className="h3">Media Library</div>
                            <form
                                className="grid md:grid-cols-2 gap-3 mt-2"
                                onSubmit={handleInsertGeneric({
                                    table: "resources",
                                    fileField: "file",
                                    fileFolder: "resources",
                                    map: (f, file_url) => ({
                                        kind: f.get("video_url") ? "video" : "image",
                                        title: f.get("title")?.toString() || null,
                                        video_url: f.get("video_url")?.toString() || null,
                                        file_url,
                                    }),
                                    after: () => loadAll(),
                                })}
                            >
                                <input className="input" name="title" placeholder="Title/Caption" />
                                <input
                                    className="input"
                                    name="video_url"
                                    placeholder="(Optional) Paste YouTube/Instagram/Facebook link"
                                />
                                <input className="input" type="file" name="file" accept="image/*,video/*" />
                                <button className="btn btn-yellow md:col-span-2">Add media</button>
                            </form>

                            <div className="h3 mt-6">Current Media</div>
                            <div className="grid md:grid-cols-3 gap-3 mt-2">
                                {(resources || [])
                                    .filter((r) => r.kind === "video" || r.video_url)
                                    .map((r) => (
                                        <div key={r.id} className="card p-3 grid gap-2">
                                            <b>{r.title || r.video_url}</b>
                                            {r.file_url && (
                                                <img
                                                    src={r.file_url}
                                                    alt=""
                                                    className="rounded-xl border border-white/10"
                                                />
                                            )}
                                            <div className="flex gap-2">
                                                <button
                                                    className="btn flex-1"
                                                    onClick={() => startEdit("resources", r)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn flex-1"
                                                    onClick={async () => {
                                                        if (confirm("Delete this media?")) {
                                                            const { error } = await supabase
                                                                .from("resources")
                                                                .delete()
                                                                .eq("id", r.id);
                                                            if (error) return alert(error.message);
                                                            loadAll();
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* ----- PARTNERS ----- */}
                    {tab === "partners" && (
                        <div className="card p-6">
                            <div className="h3">
                                {editingType === "partners" ? "Edit Partner" : "Add Partner"}
                            </div>
                            <form
                                className="grid md:grid-cols-2 gap-3 mt-2"
                                onSubmit={
                                    editingType === "partners"
                                        ? (e) => handleUpdate(e, "partners", editingItem.id)
                                        : handleInsertGeneric({
                                            table: "partners",
                                            fileField: "logo",
                                            fileFolder: "partners",
                                            map: (f, logo_url) => ({
                                                name: f.get("name")?.toString() || "",
                                                url: f.get("url")?.toString() || null,
                                                logo_url,
                                            }),
                                            after: () => loadAll(),
                                        })
                                }
                            >
                                <input
                                    className="input"
                                    name="name"
                                    placeholder="Name"
                                    required
                                    defaultValue={
                                        editingType === "partners" ? editingItem.name : ""
                                    }
                                />
                                <input
                                    className="input"
                                    name="url"
                                    placeholder="Website"
                                    defaultValue={
                                        editingType === "partners" ? editingItem.url || "" : ""
                                    }
                                />
                                <input className="input" type="file" name="logo" accept="image/*" />
                                <button className="btn btn-yellow">
                                    {editingType === "partners" ? "Update Partner" : "Add Partner"}
                                </button>
                                {editingType === "partners" && (
                                    <button className="btn" type="button" onClick={cancelEdit}>
                                        Cancel
                                    </button>
                                )}
                            </form>

                            <div className="h3 mt-6">Current Partners</div>
                            <div className="grid md:grid-cols-3 gap-3 mt-2">
                                {partners.map((p) => (
                                    <div key={p.id} className="card p-3 grid gap-2">
                                        <b>{p.name}</b>
                                        {p.logo_url && (
                                            <img
                                                src={p.logo_url}
                                                alt=""
                                                className="rounded-xl border border-white/10"
                                            />
                                        )}
                                        <div className="flex gap-2">
                                            <button
                                                className="btn flex-1"
                                                onClick={() => startEdit("partners", p)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn flex-1"
                                                onClick={async () => {
                                                    if (confirm("Delete this partner?")) {
                                                        const { error } = await supabase
                                                            .from("partners")
                                                            .delete()
                                                            .eq("id", p.id);
                                                        if (error) return alert(error.message);
                                                        loadAll();
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ----- PRESS ----- */}
                    {tab === "press" && (
                        <div className="card p-6">
                            <div className="h3">
                                {editingType === "press" ? "Edit Press Item" : "Add Press Item"}
                            </div>
                            <form
                                className="grid md:grid-cols-2 gap-3 mt-2"
                                onSubmit={
                                    editingType === "press"
                                        ? (e) => handleUpdate(e, "press", editingItem.id)
                                        : handleInsertGeneric({
                                            table: "press",
                                            map: (f) => ({
                                                title: f.get("title")?.toString() || "",
                                                date:
                                                    f.get("date")?.toString() ||
                                                    new Date().toISOString().slice(0, 10),
                                                outlet: f.get("outlet")?.toString() || null,
                                                url: f.get("url")?.toString() || null,
                                                excerpt: f.get("excerpt")?.toString() || null,
                                            }),
                                            after: () => loadAll(),
                                        })
                                }
                            >
                                <input
                                    className="input"
                                    name="title"
                                    placeholder="Title"
                                    required
                                    defaultValue={
                                        editingType === "press" ? editingItem.title : ""
                                    }
                                />
                                <input
                                    className="input"
                                    name="date"
                                    type="date"
                                    required
                                    defaultValue={
                                        editingType === "press" ? editingItem.date : ""
                                    }
                                />
                                <input
                                    className="input"
                                    name="outlet"
                                    placeholder="Outlet"
                                    defaultValue={
                                        editingType === "press" ? editingItem.outlet || "" : ""
                                    }
                                />
                                <input
                                    className="input"
                                    name="url"
                                    placeholder="Link URL"
                                    defaultValue={
                                        editingType === "press" ? editingItem.url || "" : ""
                                    }
                                />
                                <textarea
                                    className="input md:col-span-2"
                                    name="excerpt"
                                    placeholder="Short excerpt"
                                    defaultValue={
                                        editingType === "press" ? editingItem.excerpt || "" : ""
                                    }
                                />
                                <button className="btn btn-yellow md:col-span-2">
                                    {editingType === "press" ? "Update Press" : "Add Press"}
                                </button>
                                {editingType === "press" && (
                                    <button
                                        className="btn md:col-span-2"
                                        type="button"
                                        onClick={cancelEdit}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </form>

                            <div className="h3 mt-6">Current Press Items</div>
                            <div className="grid md:grid-cols-3 gap-3 mt-2">
                                {press.map((p) => (
                                    <div key={p.id} className="card p-3 grid gap-2">
                                        <b>{p.title}</b>
                                        <div className="text-xs opacity-70">
                                            {p.date} • {p.outlet || ""}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                className="btn flex-1"
                                                onClick={() => startEdit("press", p)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn flex-1"
                                                onClick={async () => {
                                                    if (confirm("Delete this press item?")) {
                                                        const { error } = await supabase
                                                            .from("press")
                                                            .delete()
                                                            .eq("id", p.id);
                                                        if (error) return alert(error.message);
                                                        loadAll();
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ----- RESOURCES (docs/links) ----- */}
                    {tab === "resources" && (
                        <div className="card p-6">
                            <div className="h3">
                                {editingType === "resources" ? "Edit Resource" : "Add Resource"}
                            </div>
                            <form
                                className="grid md:grid-cols-2 gap-3 mt-2"
                                onSubmit={
                                    editingType === "resources"
                                        ? (e) => handleUpdate(e, "resources", editingItem.id)
                                        : handleInsertGeneric({
                                            table: "resources",
                                            fileField: "file",
                                            fileFolder: "resources",
                                            map: (f, file_url) => ({
                                                kind: "doc",
                                                title: f.get("title")?.toString() || "",
                                                url: f.get("url")?.toString() || null,
                                                description: f.get("description")?.toString() || null,
                                                file_url,
                                            }),
                                            after: () => loadAll(),
                                        })
                                }
                            >
                                <input
                                    className="input"
                                    name="title"
                                    placeholder="Title"
                                    required
                                    defaultValue={
                                        editingType === "resources" ? editingItem.title : ""
                                    }
                                />
                                <input
                                    className="input"
                                    name="url"
                                    placeholder="Link URL (optional)"
                                    defaultValue={
                                        editingType === "resources" ? editingItem.url || "" : ""
                                    }
                                />
                                <input className="input" type="file" name="file" />
                                <textarea
                                    className="input md:col-span-2"
                                    name="description"
                                    placeholder="Description"
                                    defaultValue={
                                        editingType === "resources" ? editingItem.description || "" : ""
                                    }
                                />
                                <button className="btn btn-yellow md:col-span-2">
                                    {editingType === "resources" ? "Update Resource" : "Add Resource"}
                                </button>
                                {editingType === "resources" && (
                                    <button
                                        className="btn md:col-span-2"
                                        type="button"
                                        onClick={cancelEdit}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </form>

                            <div className="h3 mt-6">Current Resources</div>
                            <div className="grid md:grid-cols-3 gap-3 mt-2">
                                {(resources || [])
                                    .filter((r) => r.kind === "doc")
                                    .map((r) => (
                                        <div key={r.id} className="card p-3 grid gap-2">
                                            <b>{r.title}</b>
                                            <div className="text-xs opacity-70">
                                                {r.description || ""}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    className="btn flex-1"
                                                    onClick={() => startEdit("resources", r)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn flex-1"
                                                    onClick={async () => {
                                                        if (confirm("Delete this resource?")) {
                                                            const { error } = await supabase
                                                                .from("resources")
                                                                .delete()
                                                                .eq("id", r.id);
                                                            if (error) return alert(error.message);
                                                            loadAll();
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* ----- INBOX (read only placeholders) ----- */}
                    {tab === "inbox" && (
                        <div className="card p-6">
                            <div className="h3">Inbox</div>
                            <div className="opacity-70">
                                Connect your forms to Supabase tables (contacts, volunteers) and
                                list them here.
                            </div>
                        </div>
                    )}

                    {/* ----- I18N ----- */}
                    {tab === "i18n" && (
                        <div className="card p-6 grid gap-2">
                            <div className="h3">Texts (EN/UK)</div>
                            <label className="label">About long (EN)</label>
                            <textarea
                                className="input"
                                value={content.aboutLongEn || ""}
                                onChange={(e) =>
                                    setContent({ ...content, aboutLongEn: e.target.value })
                                }
                            />
                            <label className="label">About long (UK)</label>
                            <textarea
                                className="input"
                                value={content.aboutLongUk || ""}
                                onChange={(e) =>
                                    setContent({ ...content, aboutLongUk: e.target.value })
                                }
                            />
                            <label className="label">Mission long (EN)</label>
                            <textarea
                                className="input"
                                value={content.missionLongEn || ""}
                                onChange={(e) =>
                                    setContent({ ...content, missionLongEn: e.target.value })
                                }
                            />
                            <label className="label">Mission long (UK)</label>
                            <textarea
                                className="input"
                                value={content.missionLongUk || ""}
                                onChange={(e) =>
                                    setContent({ ...content, missionLongUk: e.target.value })
                                }
                            />
                            <button
                                className="btn btn-yellow mt-2"
                                onClick={async () => {
                                    try {
                                        await saveSetting("content", content);
                                        alert("Texts saved");
                                    } catch (e) {
                                        alert("Failed to save texts\n\n" + e.message);
                                    }
                                }}
                            >
                                Save Texts
                            </button>
                        </div>
                    )}

                    {/* ----- BRAND & SOCIAL ----- */}

                    {tab === "brand" && (
                        <div className="card p-6">
                            <div className="h3 mb-6">Brand & Social Settings</div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Brand Information */}
                                <div className="space-y-4">
                                    <h4 className="h4 text-ukYellow">Brand Identity</h4>

                                    <div>
                                        <label className="label">Organization Name</label>
                                        <input
                                            className="input"
                                            value={brand.name || ""}
                                            onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                                            placeholder="Servants of Compassion"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">Logo</label>
                                        <div className="flex items-center gap-4 mb-3">
                                            {brand.logo && (
                                                <img
                                                    src={brand.logo}
                                                    alt="Current logo"
                                                    className="w-16 h-16 rounded-lg object-contain border border-white/10"
                                                    onError={(e) => e.target.style.display = 'none'}
                                                />
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="input"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        try {
                                                            const logoUrl = await uploadToMedia("brand", file);
                                                            setBrand({ ...brand, logo: logoUrl });
                                                            alert("Logo uploaded successfully!");
                                                        } catch (error) {
                                                            alert("Failed to upload logo: " + error.message);
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label">Address</label>
                                        <input
                                            className="input"
                                            value={brand.address || ""}
                                            onChange={(e) => setBrand({ ...brand, address: e.target.value })}
                                            placeholder="123 Main St, Seattle, WA"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">Email</label>
                                        <input
                                            className="input"
                                            type="email"
                                            value={brand.email || ""}
                                            onChange={(e) => setBrand({ ...brand, email: e.target.value })}
                                            placeholder="info@servantsofcompassion.org"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">Phone</label>
                                        <input
                                            className="input"
                                            type="tel"
                                            value={brand.phone || ""}
                                            onChange={(e) => setBrand({ ...brand, phone: e.target.value })}
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="space-y-4">
                                    <h4 className="h4 text-ukYellow">Social Media</h4>

                                    <div>
                                        <label className="label">Facebook URL</label>
                                        <input
                                            className="input"
                                            value={brand.social?.facebook || ""}
                                            onChange={(e) => setBrand({
                                                ...brand,
                                                social: { ...brand.social, facebook: e.target.value }
                                            })}
                                            placeholder="https://facebook.com/yourpage"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">Instagram URL</label>
                                        <input
                                            className="input"
                                            value={brand.social?.instagram || ""}
                                            onChange={(e) => setBrand({
                                                ...brand,
                                                social: { ...brand.social, instagram: e.target.value }
                                            })}
                                            placeholder="https://instagram.com/yourprofile"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">Twitter/X URL</label>
                                        <input
                                            className="input"
                                            value={brand.social?.twitter || ""}
                                            onChange={(e) => setBrand({
                                                ...brand,
                                                social: { ...brand.social, twitter: e.target.value }
                                            })}
                                            placeholder="https://twitter.com/yourprofile"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">YouTube URL</label>
                                        <input
                                            className="input"
                                            value={brand.social?.youtube || ""}
                                            onChange={(e) => setBrand({
                                                ...brand,
                                                social: { ...brand.social, youtube: e.target.value }
                                            })}
                                            placeholder="https://youtube.com/yourchannel"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">LinkedIn URL</label>
                                        <input
                                            className="input"
                                            value={brand.social?.linkedin || ""}
                                            onChange={(e) => setBrand({
                                                ...brand,
                                                social: { ...brand.social, linkedin: e.target.value }
                                            })}
                                            placeholder="https://linkedin.com/company/yourcompany"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <button
                                    className="btn btn-yellow"
                                    onClick={async () => {
                                        try {
                                            await saveSetting("brand", brand);
                                            alert("Brand settings saved successfully!");
                                        } catch (e) {
                                            alert("Failed to save brand settings\n\n" + e.message);
                                        }
                                    }}
                                >
                                    Save Brand Settings
                                </button>
                            </div>

                            {/* Preview Section */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <h4 className="h4 mb-4">Preview</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="card p-4">
                                        <h5 className="font-semibold mb-2">Brand Preview</h5>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={brand.logo || "/logo.png"}
                                                alt="Logo preview"
                                                className="w-12 h-12 rounded-lg object-contain border border-white/10"
                                                onError={(e) => e.target.src = "/logo.png"}
                                            />
                                            <div>
                                                <div className="font-bold">{brand.name || "Organization Name"}</div>
                                                <div className="text-sm opacity-70">{brand.email || "email@example.com"}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card p-4">
                                        <h5 className="font-semibold mb-2">Social Links Preview</h5>
                                        <div className="flex gap-2">
                                            {brand.social?.facebook && (
                                                <a href={brand.social.facebook} className="p-2 bg-white/10 rounded-lg">
                                                    <Facebook className="w-4 h-4" />
                                                </a>
                                            )}
                                            {brand.social?.instagram && (
                                                <a href={brand.social.instagram} className="p-2 bg-white/10 rounded-lg">
                                                    <Instagram className="w-4 h-4" />
                                                </a>
                                            )}
                                            {brand.social?.twitter && (
                                                <a href={brand.social.twitter} className="p-2 bg-white/10 rounded-lg">
                                                    <Twitter className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ----- Danger zone ----- */}
                    {tab === "data" && (
                        <div className="card p-6">
                            <div className="h3">Export / Danger Zone</div>
                            <button
                                className="btn"
                                onClick={() => {
                                    if (
                                        confirm(
                                            "Clear all local data (this browser only)? You will be logged out."
                                        )
                                    ) {
                                        localStorage.clear();
                                        sessionStorage.clear();
                                        location.reload();
                                    }
                                }}
                            >
                                Wipe local data
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

function EmailLogin() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    return (
        <main className="pt-28 pb-20 min-h-screen">
            <div className="container">
                <div className="mx-auto max-w-md">
                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-glass overflow-hidden">
                        <div className="px-6 pt-5 pb-4 text-xs uppercase tracking-wide opacity-70">
                            Admin
                        </div>
                        <div className="px-6 pb-6">
                            <div className="text-2xl md:text-3xl font-black mb-3">
                                Secure Sign-in
                            </div>
                            <form
                                className="grid gap-3"
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const { error } = await supabase.auth.signInWithPassword({
                                        email,
                                        password,
                                    });
                                    if (error) alert(error.message);
                                }}
                            >
                                <input
                                    className="input"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                />
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="btn btn-yellow w-full">Sign in</button>
                            </form>
                        </div>
                        <div className="h-3 w-full bg-gradient-to-r from-ukBlue/30 via-ukYellow/30 to-ukBlue/30" />
                    </div>
                </div>
            </div>
        </main>
    );
}

// -------- universal generic insert handlers --------
function handleInsertEvent(setter) {
    return async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        try {
            const f = new FormData(form);
            const file = form.image?.files?.[0] ?? null;
            let image_url = null;
            if (file) image_url = await uploadToMedia("events", file);
            const row = {
                title: f.get("title")?.toString() || "",
                title_uk: f.get("title_uk")?.toString() || null,
                date: f.get("date")?.toString() || "",
                location: f.get("location")?.toString() || null,
                provides: f.get("provides")?.toString() || null,
                description: f.get("description")?.toString() || null,
                video_url: f.get("video_url")?.toString() || null,
                image_url,
            };
            const { error } = await supabase.from("events").insert(row).select();
            if (error) throw error;
            form.reset();
            const res = await supabase
                .from("events")
                .select("*")
                .order("date", { ascending: true });
            if (!res.error) setter(res.data || []);
            alert("Event added");
        } catch (err) {
            alert("Failed to add event\n\n" + err.message);
        }
    };
}

function handleInsertGeneric({ table, fileField, fileFolder, map, after }) {
    return async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        try {
            const f = new FormData(form);
            const file = fileField ? form[fileField]?.files?.[0] ?? null : null;
            let uploadedUrl = null;
            if (file) uploadedUrl = await uploadToMedia(fileFolder || table, file);
            const row = map(f, uploadedUrl);
            const { error } = await supabase.from(table).insert(row);
            if (error) throw error;
            form.reset();
            if (after) await after();
            alert("Saved");
        } catch (err) {
            alert("Failed to save\n\n" + err.message);
        }
    };
}
