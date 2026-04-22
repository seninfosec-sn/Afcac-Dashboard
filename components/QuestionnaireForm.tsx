'use client';

import { useState, useCallback } from 'react';
import { QUESTIONS, AFRICAN_STATES, type Question } from '@/data/questions';
import { getLocalizedQuestion } from '@/data/questions-i18n';
import { useLanguage } from '@/components/LanguageProvider';

interface Answer { pct: number; optIdx: number; label: string; }

const COLORS: Record<number, string> = {
  0: '#95a5a6', 25: '#e07b39', 50: '#f0a500', 75: '#52b788', 100: '#2d9d5e',
};
const LETTERS = ['a', 'b', 'c', 'd', 'e'];

const ADMIN_ONLY_TARGETS = ['T4.2', 'T10.3', 'T12.4'];

interface Props { formNum: 1 | 2; isAdmin?: boolean; }

export default function QuestionnaireForm({ formNum, isAdmin = false }: Props) {
  const { locale, t } = useLanguage();

  const [answers, setAnswers]   = useState<Record<string, Answer>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [state, setState]       = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [toast, setToast]       = useState<{ msg: string; type: 'ok' | 'warn' } | null>(null);

  // Localize all questions and filter restricted targets for non-admin users
  const questions = QUESTIONS
    .filter(q => isAdmin || !ADMIN_ONLY_TARGETS.includes(q.id))
    .map(q => getLocalizedQuestion(q, locale));

  const answered  = Object.keys(answers).length;
  const total     = questions.length;
  const pct       = Math.round((answered / total) * 100);
  const vals      = Object.values(answers).map(a => a.pct);
  const avg       = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;

  // Group questions
  const groups = questions.reduce<Record<string, Question[]>>((acc, q) => {
    if (!acc[q.group]) acc[q.group] = [];
    acc[q.group].push(q);
    return acc;
  }, {});

  const showToast = useCallback((msg: string, type: 'ok' | 'warn' = 'ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  }, []);

  function selectOption(qId: string, optIdx: number, q: Question) {
    const opt = q.options[optIdx];
    setAnswers(prev => ({ ...prev, [qId]: { pct: opt.pct, optIdx, label: opt.label } }));
  }

  function toggleComment(qId: string) {
    setOpenComments(prev => ({ ...prev, [qId]: !prev[qId] }));
  }

  function clearAll() {
    if (!confirm(t('qClearConfirm'))) return;
    setAnswers({});
    setComments({});
    setOpenComments({});
    showToast(t('qClearedMsg'), 'warn');
  }

  function handleSubmit() {
    if (!state) { showToast(t('qSelectStateFirst'), 'warn'); return; }
    if (answered < total) {
      if (!confirm(`${total - answered} ${t('qUnansweredMsg')}`)) return;
    }
    exportJSON();
    showToast(t('qSubmittedMsg'), 'ok');
    setShowSummary(false);
  }

  function exportJSON() {
    const payload = {
      form: `Formulaire ${formNum}`,
      state,
      submittedAt: new Date().toISOString(),
      responses: questions.map(q => ({
        id: q.id, title: q.title, group: q.group, deadline: q.deadline,
        score: answers[q.id]?.pct ?? null,
        status: answers[q.id]?.label ?? null,
        comment: comments[q.id] || null,
      })),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `AASAP_F${formNum}_${state.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  }

  function exportCSV() {
    const rows = [['Form', 'State', 'Target ID', 'Title', 'Group', 'Deadline', 'Score (%)', 'Status', 'Comment']];
    questions.forEach(q => {
      const a = answers[q.id];
      rows.push([
        `Formulaire ${formNum}`, state, q.id,
        `"${q.title.replace(/"/g, '""')}"`,
        `"${q.group}"`, q.deadline,
        String(a?.pct ?? ''),
        `"${a?.label ?? ''}"`,
        `"${(comments[q.id] || '').replace(/"/g, '""')}"`
      ]);
    });
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `AASAP_F${formNum}_${state.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  const pctPillClass = (p: number) => {
    if (p === 0) return 'p0'; if (p <= 25) return 'p25';
    if (p <= 50) return 'p50'; if (p <= 75) return 'p75';
    return 'p100';
  };

  const introText = t('qIntroText').replace('{total}', String(total));

  return (
    <>
      {/* ── HEADER ── */}
      <header className="header">
        <div className="h-emblem">✈</div>
        <div>
          <div className="h-title">{t('qFormTitle')} · Formulaire {formNum}</div>
          <div className="h-sub">{t('qFormSub')} · {total} {total > 1 ? t('qQuestionsPlural') : t('qQuestions')}</div>
        </div>
        <div className="h-right">
          <div className="h-progress-wrap">
            <span className="h-progress-label">{t('qCompletion')}</span>
            <div className="h-progress-bar">
              <div className="h-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="h-pct">{pct}%</span>
          </div>
          <button className="hbtn hbtn-ghost" onClick={() => setShowSummary(true)}>{t('qSummary')}</button>
          <button className="hbtn hbtn-gold" onClick={handleSubmit}>{t('qSubmit')}</button>
        </div>
      </header>

      <div className="shell">
        {/* ── SIDEBAR ── */}
        <nav className="sidebar">
          <div className="sb-info">
            <div className="sb-state-label">{t('qStateLabel')}</div>
            <select className="sb-state-select" value={state} onChange={e => setState(e.target.value)}>
              <option value="">{t('qSelectState')}</option>
              {AFRICAN_STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div id="sbNav">
            {Object.entries(groups).map(([grp, qs]) => (
              <div key={grp}>
                <div className="sb-section">{grp}</div>
                {qs.map(q => {
                  const globalIdx = QUESTIONS.findIndex(orig => orig.id === q.id);
                  const done = !!answers[q.id];
                  return (
                    <div
                      key={q.id}
                      className={`sb-item${done ? ' answered' : ''}`}
                      onClick={() => document.getElementById(`qcard-${q.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    >
                      <span className="sb-num">{globalIdx + 1}</span>
                      <span className="sb-text">{q.id} — {q.title.substring(0, 38)}…</span>
                      {done && <span className="sb-check">✓</span>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="sb-footer">
            <div className="sb-stats">
              <div className="sb-stat">
                <div className="sb-stat-val">{answered}</div>
                <div className="sb-stat-label">{t('qAnswered')}</div>
              </div>
              <div className="sb-stat">
                <div className="sb-stat-val">{total - answered}</div>
                <div className="sb-stat-label">{t('qRemaining')}</div>
              </div>
            </div>
          </div>
        </nav>

        {/* ── MAIN ── */}
        <main className="main">
          {/* Intro */}
          <div className="intro">
            <div className="intro-title">
              {t('qFormTitle')} · Formulaire {formNum}
            </div>
            <div className="intro-text">{introText}</div>
          </div>

          {/* Questions */}
          <div id="questionsContainer">
            {Object.entries(groups).map(([grpName, qs]) => (
              <div key={grpName}>
                <div className="group-header">
                  <span className="gh-title">📌 {grpName}</span>
                  <span className="gh-count">{qs.length} {qs.length > 1 ? t('qQuestionsPlural') : t('qQuestions')}</span>
                </div>

                {qs.map(q => {
                  const globalIdx = QUESTIONS.findIndex(orig => orig.id === q.id);
                  const ans = answers[q.id];
                  const color = ans ? (COLORS[ans.pct] || '#95a5a6') : undefined;

                  return (
                    <div
                      key={q.id}
                      id={`qcard-${q.id}`}
                      className={`q-card${ans ? ' answered' : ''}`}
                    >
                      <div className="q-head">
                        <span className="q-num">Q{globalIdx + 1}</span>
                        <span className="q-target">{q.id}</span>
                        <span className="q-title">{q.title}</span>
                        <span className="q-deadline">🗓 {q.deadline}</span>
                      </div>

                      <div className="q-statement">{q.statement}</div>

                      <div className="q-options">
                        <div className="q-select-wrap">
                          <div className="q-swatch" style={{ background: color }} />
                          <select
                            className="q-select"
                            value={ans ? ans.optIdx + 1 : 0}
                            style={color ? { borderColor: color, boxShadow: `0 0 0 3px ${color}22` } : {}}
                            onChange={e => {
                              const idx = parseInt(e.target.value) - 1;
                              if (idx >= 0) selectOption(q.id, idx, q);
                            }}
                          >
                            <option value={0} disabled>{t('qSelectLevel')}</option>
                            {q.options.map((opt, oi) => (
                              <option key={oi} value={oi + 1}>
                                {LETTERS[oi]})   {opt.pct}% – {opt.label} – {opt.text}
                              </option>
                            ))}
                          </select>

                          <div className={`q-score-badge${ans ? ` sc-${ans.pct}` : ''}`}>
                            {ans ? (
                              <>{LETTERS[ans.optIdx]})<br />{ans.pct}%</>
                            ) : '—'}
                          </div>
                        </div>

                        {ans && (
                          <div className={`q-desc-box visible dc-${ans.pct}`}>
                            <strong>{LETTERS[ans.optIdx]}) {ans.pct}% – {ans.label}</strong>
                            {' – '}{q.options[ans.optIdx].text}
                          </div>
                        )}
                      </div>

                      <div className="q-comment">
                        <div className="comment-toggle" onClick={() => toggleComment(q.id)}>
                          {t('qAddComment')}
                        </div>
                        {openComments[q.id] && (
                          <textarea
                            className="comment-area open"
                            placeholder={t('qCommentPlaceholder')}
                            value={comments[q.id] || ''}
                            onChange={e => setComments(prev => ({ ...prev, [q.id]: e.target.value }))}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* ── BOTTOM ACTION BAR ── */}
      <div className="form-actions">
        <div className="fa-stats">
          <strong>Formulaire {formNum}</strong> — <strong>{answered}</strong> / {total} {t('qQuestionsPlural')}
          &nbsp;·&nbsp; {t('qAvgScore')}: <strong>{avg !== null ? `${avg}%` : '—'}</strong>
        </div>
        <button className="btn btn-secondary" onClick={clearAll}>{t('qClearAll')}</button>
        <button className="btn btn-secondary" onClick={() => setShowSummary(true)}>{t('qReviewSummary')}</button>
        <button className="btn btn-primary" onClick={handleSubmit}>{t('qSubmitDashboard')}</button>
      </div>

      {/* ── SUMMARY MODAL ── */}
      {showSummary && (
        <div className="summary-panel open">
          <div className="summary-box">
            <div className="summary-head">
              <span className="summary-head-title">{t('qSummaryTitle')} — Formulaire {formNum}</span>
              <button className="summary-close" onClick={() => setShowSummary(false)}>✕</button>
            </div>
            <div className="summary-body">
              <div className="summary-kpis">
                {[
                  { val: `F${formNum}`, label: 'Formulaire' },
                  { val: answered,       label: t('qAnswered') },
                  { val: total - answered, label: t('qRemaining') },
                  { val: avg !== null ? `${avg}%` : '—', label: t('qAvgScore') },
                  { val: state || 'N/A', label: t('qStateLabel'), small: true },
                ].map(k => (
                  <div className="sum-kpi" key={k.label}>
                    <div className="sum-kpi-val" style={k.small ? { fontSize: 14 } : {}}>{k.val}</div>
                    <div className="sum-kpi-label">{k.label}</div>
                  </div>
                ))}
              </div>

              <table className="summary-table">
                <thead>
                  <tr>
                    <th>{t('qColHash')}</th>
                    <th>{t('qColTarget')}</th>
                    <th>{t('qColScore')}</th>
                    <th>{t('qColStatus')}</th>
                    <th>{t('qColComments')}</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q, i) => {
                    const a = answers[q.id];
                    const c = comments[q.id] || '';
                    return (
                      <tr key={q.id}>
                        <td style={{ fontWeight: 700, color: 'var(--ink3)' }}>{i + 1}</td>
                        <td style={{ fontSize: 11 }}><strong>{q.id}</strong> — {q.title.substring(0, 60)}…</td>
                        <td>
                          {a
                            ? <span className={`pct-pill ${pctPillClass(a.pct)}`}>{a.pct}%</span>
                            : <span style={{ color: 'var(--ink3)', fontSize: 11 }}>—</span>}
                        </td>
                        <td style={{ fontSize: 11, color: 'var(--ink2)' }}>{a?.label || '—'}</td>
                        <td style={{ fontSize: 11, color: 'var(--ink3)', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis' }}>{c || '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="summary-actions">
              <button className="btn btn-primary" onClick={handleSubmit}>{t('qSubmitDashboard')}</button>
              <button className="btn btn-secondary" onClick={exportJSON}>{t('qExportJSON')}</button>
              <button className="btn btn-secondary" onClick={exportCSV}>{t('qExportCSV')}</button>
              <button className="btn btn-ghost" onClick={() => setShowSummary(false)}>{t('qClose')}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className={`toast t-${toast.type} show`}>
          <span>{toast.msg}</span>
        </div>
      )}
    </>
  );
}
