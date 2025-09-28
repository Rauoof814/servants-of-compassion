// src/components/LanguageToggle.jsx
import React from 'react';
import useSite from '../store/useSite';

export default function LanguageToggle() {
    const { state, setLang } = useSite();

    return (
        <div className="inline-flex rounded-xl border border-white/10 overflow-hidden">
            <button
                className={`px-3 py-1 ${state.lang === 'en' ? 'bg-white/15' : ''}`}
                onClick={() => setLang('en')}
                aria-pressed={state.lang === 'en'}
            >
                EN
            </button>
            <button
                className={`px-3 py-1 ${state.lang === 'uk' ? 'bg-white/15' : ''}`}
                onClick={() => setLang('uk')}
                aria-pressed={state.lang === 'uk'}
            >
                UK
            </button>
        </div>
    );
}
