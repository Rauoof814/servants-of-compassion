// src/pages/Mission.jsx
import useSite from '../store/useSite';
import { pick } from '../i18n';

export default function Mission() {
    const { state } = useSite();
    const programs = Array.isArray(state.programs) ? state.programs : [];

    return (
        <section className="section">
            <div className="container grid gap-6">
                <div className="card p-6">
                    <div className="h2">Our Mission</div>
                    <p className="opacity-90 mt-2 whitespace-pre-line">
                        {pick(state.content.missionLongEn, state.content.missionLongUk, state.lang)}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {programs.map(p => (
                        <div key={p.id} className="card p-6">
                            <div className="h3">{pick(p.titleEn, p.titleUk, state.lang)}</div>
                            <p className="opacity-90 mt-2">{pick(p.bodyEn, p.bodyUk, state.lang)}</p>
                        </div>
                    ))}
                </div>

                <div className="card p-6">
                    <div className="h3">FAQ</div>
                    <details className="mt-2">
                        <summary>How do you choose ambulances?</summary>
                        <p className="opacity-90">We target low-mileage fleets, inspect in person, and service them before handoff.</p>
                    </details>
                    <details className="mt-2">
                        <summary>Can I donate supplies?</summary>
                        <p className="opacity-90">Yes — contact us for current needs and shipping instructions.</p>
                    </details>
                    <details className="mt-2">
                        <summary>Are you political?</summary>
                        <p className="opacity-90">No. We are humanitarian and support peace.</p>
                    </details>
                </div>
            </div>
        </section>
    );
}
