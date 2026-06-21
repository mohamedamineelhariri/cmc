"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Upload, RotateCw, Trash2, Save, Plus, Eye, EyeOff, ExternalLink } from "lucide-react";
import { apiFetch } from "@/utils/api";

/* ───────── Types ───────── */

interface Stats {
  total_files: number; files_ok: number; files_failed: number; files_processing: number;
  total_big_chunks: number; total_small_chunks: number; total_summaries: number;
  total_entities: number; total_relations: number; total_users: number;
}

interface KBFile { id: string; title: string; status: string; }
interface BigChunk { id: string; text: string; file_id: string; }
interface User { id: string; username: string; first_name: string | null; last_name: string | null; phone_number: string | null; email: string | null; is_admin: boolean; is_active: boolean; }

/* ───────── Helpers ───────── */

function classNames(...cls: (string | false | null | undefined)[]) { return cls.filter(Boolean).join(" "); }

/* ───────── AdminPanel ───────── */

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"dashboard" | "files" | "chunks" | "users" | "jobs">("dashboard");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-[92vw] h-[90vh] rounded-none shadow-2xl flex overflow-hidden border border-[var(--border-warm)]">
        {/* Sidebar */}
        <div className="w-52 bg-[var(--bg-warm)] p-4 flex flex-col gap-1 border-r border-[var(--border-warm)]">
          <div className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Admin</div>
          {(["dashboard", "files", "chunks", "users", "jobs"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={classNames("text-left px-3 py-2 rounded-none text-sm font-medium transition",
                tab === t ? "bg-[var(--primary)] text-white" : "text-[var(--text-muted)] hover:bg-white/50"
              )}>
              {t === "dashboard" ? "Dashboard" : t === "files" ? "Files" : t === "chunks" ? "Big Chunks" : t === "users" ? "Users" : "Jobs"}
            </button>
          ))}
          <div className="flex-1" />
          <button onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 rounded-none text-sm text-[var(--text-muted)] hover:bg-white/50 transition">
            <X size={16} /> Close
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {tab === "dashboard" && <Dashboard />}
          {tab === "files" && <FilesPanel onSelectFile={(id) => { setTab("chunks"); }} />}
          {tab === "chunks" && <ChunksPanel />}
          {tab === "users" && <UsersPanel />}
          {tab === "jobs" && <JobsPanel />}
        </div>
      </div>
    </div>
  );
}

/* ───────── Dashboard ───────── */

function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await apiFetch("knowledgebase/stats"); setStats(await r.json()); } catch { }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <p className="text-[var(--text-muted)]">Loading...</p>;
  if (!stats) return <p className="text-red-500">Failed to load stats</p>;

  const cards = [
    { label: "Files OK", value: stats.files_ok, color: "text-green-600" },
    { label: "Files Failed", value: stats.files_failed, color: "text-red-600" },
    { label: "Files Processing", value: stats.files_processing, color: "text-yellow-600" },
    { label: "Big Chunks", value: stats.total_big_chunks, color: "text-blue-600" },
    { label: "Small Chunks", value: stats.total_small_chunks, color: "text-indigo-600" },
    { label: "Summaries", value: stats.total_summaries, color: "text-purple-600" },
    { label: "Entities", value: stats.total_entities, color: "text-teal-600" },
    { label: "Relations", value: stats.total_relations, color: "text-orange-600" },
    { label: "Total Users", value: stats.total_users, color: "text-gray-600" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">System Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-[var(--bg-warm)] rounded-none p-4 border border-[var(--border-warm)]">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{c.label}</div>
            <div className={`text-3xl font-bold mt-1 ${c.color}`}>{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── Files Panel ───────── */

function FilesPanel({ onSelectFile }: { onSelectFile: (id: string) => void }) {
  const [files, setFiles] = useState<KBFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await apiFetch("knowledgebase/"); setFiles(await r.json()); } catch { }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("uploaded_file", file);
    form.append("title", file.name);
    try { await apiFetch("knowledgebase/upload", { method: "POST", body: form }); await load(); } catch { }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this file and all its chunks?")) return;
    try { await apiFetch(`knowledgebase/${id}`, { method: "DELETE" }); await load(); } catch { }
  };

  const handleReprocess = async (id: string) => {
    try { await apiFetch(`knowledgebase/${id}/reprocess`, { method: "POST" }); alert("Reprocess queued"); } catch { }
  };

  if (loading) return <p className="text-[var(--text-muted)]">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Knowledgebase Files</h2>
        <label className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-none text-sm font-medium cursor-pointer hover:opacity-90 transition">
          <Upload size={16} /> {uploading ? "Uploading..." : "Upload"}
          <input type="file" className="hidden" onChange={handleUpload} accept=".txt,.pdf,.docx,.md,.csv,.json,.xml,.html" />
        </label>
      </div>
      <div className="space-y-2">
        {files.map((f) => (
          <div key={f.id} className="flex items-center gap-3 bg-[var(--bg-warm)] rounded-none p-3 border border-[var(--border-warm)]">
            <span className={classNames("w-2 h-2 rounded-full shrink-0",
              f.status === "ok" ? "bg-green-500" : f.status === "failed" ? "bg-red-500" : "bg-yellow-500")} />
            <span className="flex-1 font-medium truncate">{f.title}</span>
            <span className="text-xs text-[var(--text-muted)] uppercase">{f.status}</span>
            <button onClick={() => onSelectFile(f.id)} className="p-1.5 rounded-none hover:bg-white/50 transition" title="View chunks">
              <Eye size={15} />
            </button>
            <button onClick={() => handleReprocess(f.id)} className="p-1.5 rounded-none hover:bg-white/50 transition" title="Reprocess">
              <RotateCw size={15} />
            </button>
            <button onClick={() => handleDelete(f.id)} className="p-1.5 rounded-none hover:bg-red-50 text-red-500 transition" title="Delete">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {files.length === 0 && <p className="text-[var(--text-muted)] text-sm">No files uploaded yet.</p>}
      </div>
    </div>
  );
}

/* ───────── Big Chunks Panel ───────── */

function ChunksPanel() {
  const [files, setFiles] = useState<KBFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string>("");
  const [chunks, setChunks] = useState<BigChunk[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch("knowledgebase/").then(r => r.json()).then(setFiles).catch(() => {});
  }, []);

  const loadChunks = useCallback(async (fileId: string) => {
    setLoading(true);
    try { const r = await apiFetch(`knowledgebase/${fileId}/bigchunks`); setChunks(await r.json()); } catch { }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedFileId) loadChunks(selectedFileId);
  }, [selectedFileId, loadChunks]);

  const handleSave = async (chunkId: string) => {
    try {
      await apiFetch(`knowledgebase/${selectedFileId}/bigchunks/${chunkId}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText }),
      });
      setEditId(null);
      loadChunks(selectedFileId);
    } catch { }
  };

  const handleReembed = async (chunkId: string) => {
    try {
      await apiFetch(`knowledgebase/${selectedFileId}/bigchunks/${chunkId}/reembed`, { method: "POST" });
      alert("Re-embed job queued");
    } catch { }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Big Chunks Editor</h2>
      <select value={selectedFileId} onChange={(e) => setSelectedFileId(e.target.value)}
        className="w-full p-2 border border-[var(--border-warm)] rounded-none mb-4 bg-white">
        <option value="">-- Select a file --</option>
        {files.map((f) => <option key={f.id} value={f.id}>{f.title} ({f.status})</option>)}
      </select>

      {loading && <p className="text-[var(--text-muted)]">Loading chunks...</p>}

      {!loading && selectedFileId && chunks.length === 0 && (
        <p className="text-[var(--text-muted)] text-sm">No big chunks found for this file.</p>
      )}

      <div className="space-y-3">
        {chunks.map((ch) => (
          <div key={ch.id} className="bg-[var(--bg-warm)] rounded-none p-3 border border-[var(--border-warm)]">
            {editId === ch.id ? (
              <div>
                <textarea value={editText} onChange={(e) => setEditText(e.target.value)}
                  className="w-full h-40 p-2 border border-[var(--border-warm)] rounded-none text-sm font-mono" />
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleSave(ch.id)} className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-none text-sm">
                    <Save size={14} /> Save
                  </button>
                  <button onClick={() => setEditId(null)} className="px-3 py-1.5 bg-gray-200 rounded-none text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-xs text-[var(--text-muted)] mb-1">ID: {ch.id}</div>
                <pre className="text-sm whitespace-pre-wrap line-clamp-6">{ch.text}</pre>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => { setEditId(ch.id); setEditText(ch.text); }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-none text-sm">
                    <Eye size={14} /> Edit
                  </button>
                  <button onClick={() => handleReembed(ch.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-none text-sm">
                    <RotateCw size={14} /> Re-embed
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── Users Panel ───────── */

function UsersPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ username: "", password: "", first_name: "", last_name: "", phone_number: "", email: "", is_admin: false });

  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await apiFetch("administration/"); setUsers(await r.json()); } catch { }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    try {
      await apiFetch("administration/", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      setShowCreate(false);
      setCreateForm({ username: "", password: "", first_name: "", last_name: "", phone_number: "", email: "", is_admin: false });
      load();
    } catch (err: any) { alert(err.message); }
  };

  const handleToggleActive = async (u: User) => {
    try {
      await apiFetch(`administration/${u.id}/${u.is_active ? "disable" : "enable"}`, { method: "POST" });
      load();
    } catch { }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this user permanently?")) return;
    try { await apiFetch(`administration/${id}`, { method: "DELETE" }); load(); } catch { }
  };

  if (loading) return <p className="text-[var(--text-muted)]">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">User Management</h2>
        <button onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-none text-sm font-medium">
          <Plus size={16} /> {showCreate ? "Cancel" : "Create User"}
        </button>
      </div>

      {showCreate && (
        <div className="bg-[var(--bg-warm)] rounded-none p-4 border border-[var(--border-warm)] mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Username *" value={createForm.username} onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })}
              className="p-2 border border-[var(--border-warm)] rounded-none text-sm" />
            <input placeholder="Password *" type="password" value={createForm.password} onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
              className="p-2 border border-[var(--border-warm)] rounded-none text-sm" />
            <input placeholder="First name" value={createForm.first_name} onChange={(e) => setCreateForm({ ...createForm, first_name: e.target.value })}
              className="p-2 border border-[var(--border-warm)] rounded-none text-sm" />
            <input placeholder="Last name" value={createForm.last_name} onChange={(e) => setCreateForm({ ...createForm, last_name: e.target.value })}
              className="p-2 border border-[var(--border-warm)] rounded-none text-sm" />
            <input placeholder="Phone" value={createForm.phone_number} onChange={(e) => setCreateForm({ ...createForm, phone_number: e.target.value })}
              className="p-2 border border-[var(--border-warm)] rounded-none text-sm" />
            <input placeholder="Email" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
              className="p-2 border border-[var(--border-warm)] rounded-none text-sm" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={createForm.is_admin} onChange={(e) => setCreateForm({ ...createForm, is_admin: e.target.checked })} />
            Admin
          </label>
          <button onClick={handleCreate} className="px-4 py-2 bg-[var(--primary)] text-white rounded-none text-sm font-medium">
            Create
          </button>
        </div>
      )}

      <div className="space-y-2">
        {users.map((u) => (
          <div key={u.id} className="flex items-center gap-3 bg-[var(--bg-warm)] rounded-none p-3 border border-[var(--border-warm)]">
            <span className={classNames("w-2 h-2 rounded-full shrink-0", u.is_active ? "bg-green-500" : "bg-gray-400")} />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{u.first_name || u.username} {u.last_name || ""}</div>
              <div className="text-xs text-[var(--text-muted)]">{u.username}{u.is_admin ? " • Admin" : ""}</div>
            </div>
            <button onClick={() => handleToggleActive(u)}
              className={classNames("px-3 py-1 rounded-none text-xs font-medium",
                u.is_active ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800")}>
              {u.is_active ? "Disable" : "Enable"}
            </button>
            <button onClick={() => handleDelete(u.id)} className="p-1.5 rounded-none hover:bg-red-50 text-red-500 transition" title="Delete">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── Jobs Panel ───────── */

function JobsPanel() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await apiFetch("knowledgebase/jobs"); setJobs(await r.json()); } catch { }
    setLoading(false);
  }, []);

  useEffect(() => { load(); const id = setInterval(load, 5000); return () => clearInterval(id); }, [load]);

  if (loading) return <p className="text-[var(--text-muted)]">Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Ingestion Jobs</h2>
      <div className="space-y-2">
        {jobs.map((j: any) => (
          <div key={j.job_id} className="flex items-center gap-3 bg-[var(--bg-warm)] rounded-none p-3 border border-[var(--border-warm)]">
            <span className={classNames("w-2 h-2 rounded-full shrink-0",
              j.status === "completed" ? "bg-green-500" : j.status === "failed" ? "bg-red-500" : j.status === "processing" ? "bg-yellow-500" : "bg-gray-400")} />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[var(--text-muted)]">{j.job_id}</div>
              <div className="text-sm">{j.title || j.file_id || "(no title)"}</div>
            </div>
            <span className="text-xs uppercase font-medium">{j.status}</span>
            {j.type && <span className="text-xs text-[var(--text-muted)]">{j.type}</span>}
            {j.error && <span className="text-xs text-red-500 truncate max-w-[200px]" title={j.error}>{j.error}</span>}
          </div>
        ))}
        {jobs.length === 0 && <p className="text-[var(--text-muted)] text-sm">No jobs found.</p>}
      </div>
    </div>
  );
}
