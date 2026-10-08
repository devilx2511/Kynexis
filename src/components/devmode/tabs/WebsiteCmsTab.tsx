import React, { useState } from 'react';
import { PageCmsItem, BlogPost } from '../../../types';
import { useLiveData } from '../../../context/LiveDataContext';
import {
  FileText,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Layers,
  Layout,
  CheckCircle2,
  Clock,
  Globe,
  Sparkles,
  Palette,
  ArrowRight,
  Cloud,
  Radio,
  Check,
  RotateCcw
} from 'lucide-react';

interface WebsiteCmsTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const WebsiteCmsTab: React.FC<WebsiteCmsTabProps> = ({ onNavigateTab }) => {
  const {
    cmsConfig,
    updateCmsConfig,
    toggleCmsSection,
    reorderCmsSections,
    resetCmsConfig,
    isSavingLiveData,
    lastLiveDataSyncedAt,
  } = useLiveData();

  const [activeSubTab, setActiveSubTab] = useState<'pages' | 'builder' | 'blog'>('builder');
  const [pagesSearch, setPagesSearch] = useState('');
  const [blogSearch, setBlogSearch] = useState('');
  const [heroTitleInput, setHeroTitleInput] = useState(cmsConfig.heroTitle);
  const [heroSubtitleInput, setHeroSubtitleInput] = useState(cmsConfig.heroSubtitle);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const toggleSection = async (id: string) => {
    const success = await toggleCmsSection(id);
    showNotice(success ? 'Layout section updated & published live to database!' : 'Section updated locally');
  };

  const moveSection = async (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= cmsConfig.sections.length) return;
    const updated = [...cmsConfig.sections];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIdx, 0, moved);
    const success = await reorderCmsSections(updated);
    showNotice(success ? 'Section order published live to database!' : 'Section order updated locally');
  };

  const handleSaveHeroCopy = async () => {
    const success = await updateCmsConfig({
      heroTitle: heroTitleInput,
      heroSubtitle: heroSubtitleInput,
    });
    showNotice(success ? 'Homepage hero headlines published live to database!' : 'Hero headlines updated locally');
  };

  const handleResetCms = async () => {
    if (window.confirm('Reset visual layout & CMS configuration to factory defaults?')) {
      await resetCmsConfig();
      setHeroTitleInput(cmsConfig.heroTitle);
      setHeroSubtitleInput(cmsConfig.heroSubtitle);
      showNotice('CMS layout restored to factory defaults and published live.');
    }
  };

  const showNotice = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  const filteredPages = cmsConfig.pages.filter(
    (p) =>
      p.title.toLowerCase().includes(pagesSearch.toLowerCase()) ||
      p.slug.toLowerCase().includes(pagesSearch.toLowerCase())
  );

  const filteredBlog = cmsConfig.blogPosts.filter(
    (b) =>
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(blogSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Real-Time Database Status Banner */}
      <div className="p-4 bg-[#061A2E] text-white rounded-3xl border border-[#EFB33D]/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <div>
            <p className="text-xs font-bold font-mono tracking-wide text-[#EFB33D] flex items-center gap-1.5">
              <Cloud className="w-3.5 h-3.5" />
              <span>LIVE CMS & SECTION BUILDER DATABASE SYNC</span>
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Section order, visibility switches, page texts, and blog posts are saved in Firestore and reflected live for every visitor worldwide.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-[11px] font-mono text-slate-400">
          {isSavingLiveData ? (
            <span className="flex items-center gap-1.5 text-amber-400 animate-pulse">
              <Radio className="w-3 h-3 animate-spin" />
              <span>Publishing live...</span>
            </span>
          ) : (
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{lastLiveDataSyncedAt ? `Synced at ${lastLiveDataSyncedAt}` : 'Live in Cloud'}</span>
            </span>
          )}
        </div>
      </div>

      {successNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl flex items-center gap-2 text-xs animate-slide-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{successNotice}</span>
        </div>
      )}

      {/* Top Bar with Sub-Tab Switcher */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#061A2E] flex items-center gap-2">
            <Layout className="w-5 h-5 text-[#EFB33D]" />
            <span>Website Control & Visual Page Builder</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage Kolupukur Kynexis website pages, customize section layout order, and publish blog articles.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('builder')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === 'builder'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Visual Section Builder
          </button>
          <button
            onClick={() => setActiveSubTab('pages')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === 'pages'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pages Directory
          </button>
          <button
            onClick={() => setActiveSubTab('blog')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === 'blog'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Blog & Patient Guides
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: VISUAL SECTION BUILDER */}
      {activeSubTab === 'builder' && (
        <div className="space-y-6">
          {/* Quick link banner to Brand & Opening Page Studio */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#061A2E] to-[#102A45] border border-[#EFB33D]/30 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFB33D] text-[#061A2E] flex items-center justify-center font-bold">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#EFB33D]">Looking to customize the Clinic Logo or Opening Page Image?</p>
                <p className="text-[11px] text-slate-300">Open the Brand & Opening Page Studio for high-definition media upload and live cloud publishing.</p>
              </div>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('branding')}
                className="px-4 py-2 rounded-xl bg-[#EFB33D] text-[#061A2E] text-xs font-bold hover:bg-[#D9A52F] flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
              >
                <span>Open Brand Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Section Order & Toggles (7 cols) */}
            <div className="lg:col-span-7 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-heading font-bold text-base text-[#061A2E] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#EFB33D]" />
                    <span>Homepage Component Structure & Toggles</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Reorder homepage modules or toggle visibility in real time.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {cmsConfig.sections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      sec.enabled
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-slate-100/60 border-slate-200/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 text-xs font-mono font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-bold text-xs text-[#061A2E]">{sec.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">ID: {sec.id}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveSection(idx, 'up')}
                          disabled={idx === 0}
                          className="px-1.5 py-0.5 bg-slate-200 hover:bg-slate-300 rounded text-[9px] font-bold disabled:opacity-30"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => moveSection(idx, 'down')}
                          disabled={idx === cmsConfig.sections.length - 1}
                          className="px-1.5 py-0.5 bg-slate-200 hover:bg-slate-300 rounded text-[9px] font-bold disabled:opacity-30"
                        >
                          ▼
                        </button>
                      </div>

                      <button
                        onClick={() => toggleSection(sec.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                          sec.enabled
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                      >
                        {sec.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-3 border-t">
                <button
                  onClick={handleResetCms}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Default Structure</span>
                </button>
              </div>
            </div>

            {/* Right: Hero Copy & Headlines (5 cols) */}
            <div className="lg:col-span-5 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-heading font-bold text-base text-[#061A2E]">
                  Homepage Hero Text
                </h3>
                <p className="text-xs text-slate-500">
                  Update primary headline and subtitle on the main clinic homepage.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Title</label>
                  <input
                    type="text"
                    value={heroTitleInput}
                    onChange={(e) => setHeroTitleInput(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Subtitle</label>
                  <textarea
                    rows={4}
                    value={heroSubtitleInput}
                    onChange={(e) => setHeroSubtitleInput(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs"
                  />
                </div>

                <button
                  onClick={handleSaveHeroCopy}
                  disabled={isSavingLiveData}
                  className="w-full py-2.5 bg-[#061A2E] text-[#EFB33D] font-bold text-xs rounded-xl hover:bg-[#10243A] flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>Publish Hero Copy Live</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: PAGES DIRECTORY */}
      {activeSubTab === 'pages' && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-base text-[#061A2E]">
                Published Page Manifest
              </h3>
              <p className="text-xs text-slate-500">
                Kolupukur Kynexis healthcare portal routes, schemas, and live status.
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={pagesSearch}
                onChange={(e) => setPagesSearch(e.target.value)}
                placeholder="Filter pages..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="p-3 font-semibold">Page Title</th>
                  <th className="p-3 font-semibold">Route Slug</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">SEO Score</th>
                  <th className="p-3 font-semibold">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPages.map((pg) => (
                  <tr key={pg.id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-[#061A2E]">{pg.title}</td>
                    <td className="p-3 font-mono text-slate-500">{pg.slug}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {pg.status}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-emerald-600">{pg.seoScore}/100</td>
                    <td className="p-3 text-slate-500">{pg.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: BLOG POSTS */}
      {activeSubTab === 'blog' && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-base text-[#061A2E]">
                Clinical Articles & Health Guides
              </h3>
              <p className="text-xs text-slate-500">
                Educational medical publications authored by Kynexis specialists.
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBlog.map((post) => (
              <div key={post.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-[#061A2E] text-[#EFB33D] font-mono text-[10px] font-bold">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{post.readTime}</span>
                </div>
                <h4 className="font-bold text-sm text-[#061A2E]">{post.title}</h4>
                <p className="text-xs text-slate-600">{post.summary}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200">
                  <span>By {post.author}</span>
                  <span>{post.publishDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
