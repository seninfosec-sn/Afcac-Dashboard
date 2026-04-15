import type { TargetRow } from "@/lib/types";

const statusConfig: Record<string, { label: string; cls: string; barColor: string }> = {
  completed:  { label: "Completed",   cls: "s-completed",  barColor: "var(--c-complete)" },
  inprogress: { label: "In Progress", cls: "s-inprogress", barColor: "var(--c-progress)" },
  delayed:    { label: "Delayed",     cls: "s-delayed",    barColor: "var(--c-delayed)" },
  onhold:     { label: "On Hold",     cls: "s-onhold",     barColor: "var(--c-onhold)" },
  notstarted: { label: "Not Started", cls: "s-notstarted", barColor: "var(--c-nostart)" },
};

export default function TargetGrid({ targets }: { targets: TargetRow[] }) {
  return (
    <div className="card">
      <div className="card-head">
        <span className="card-head-title">AFCAC / Abuja Safety Targets — Achievement Progress</span>
        <span className="card-head-badge">Revised Abuja Safety Targets</span>
      </div>
      <div className="card-body">
        <div className="target-grid">
          {targets.map((t) => {
            const sc = statusConfig[t.status] ?? statusConfig.notstarted;
            return (
              <div key={t.id} className="target-card">
                <div className="target-id">{t.id}</div>
                <div className="target-title">{t.title}</div>
                <div className="target-bar-track">
                  <div
                    className="target-bar-fill"
                    style={{ width: `${t.pct}%`, background: sc.barColor }}
                  />
                </div>
                <div className="target-footer">
                  <span className={`badge ${sc.cls}`}>{sc.label}</span>
                  <span style={{ fontWeight: 700 }}>{t.pct}%</span>
                </div>
                <div style={{ fontSize: 10, color: "var(--ink3)", marginTop: 4 }}>
                  📅 {t.deadline}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
