import { useMemo, useState } from "react";

export default function FinanzworkshopLandingpage() {
  const themen = [
    { label: "Analyse bestehender Verträge", value: "Analyse bestehender Verträge" },
    { label: "Altersvorsorge und langfristige Investments", value: "Altersvorsorge und langfristige Investments" },
    { label: "Absicherung von Einkommen & Familie", value: "Absicherung von Einkommen & Familie" },
    { label: "Spar- und Anlagestrategien", value: "Spar- und Anlagestrategien" },
    { label: "Finanzplanung für Selbstständige", value: "Finanzplanung für Selbstständige" },
    { label: "Immobilie und Finanzierung", value: "Immobilie und Finanzierung" },
    { label: "Absicherungen allgemein", value: "Absicherungen allgemein" }
  ];

  const initialForm = {
    vorname: "",
    nachname: "",
    handy: "",
    email: "",
    situation: "",
    themen: [],
    handout: true,
    nachricht: "",
    datenschutz: false
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  const fullName = useMemo(
    () => `${formData.vorname} ${formData.nachname}`.trim(),
    [formData.vorname, formData.nachname]
  );

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const toggleThema = (value) => {
    setFormData((prev) => ({
      ...prev,
      themen: prev.themen.includes(value)
        ? prev.themen.filter((item) => item !== value)
        : [...prev.themen, value]
    }));
    setErrors((prev) => ({ ...prev, themen: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.vorname.trim()) nextErrors.vorname = "Bitte Vornamen eintragen.";
    if (!formData.nachname.trim()) nextErrors.nachname = "Bitte Nachnamen eintragen.";
    if (!formData.handy.trim()) nextErrors.handy = "Bitte Handynummer eintragen.";
    if (!formData.email.trim()) nextErrors.email = "Bitte E-Mail-Adresse eintragen.";
    if (!formData.situation.trim()) nextErrors.situation = "Bitte wähle deinen Status aus.";
    if (!formData.themen.length) nextErrors.themen = "Bitte wähle mindestens ein Thema aus.";
    if (!formData.datenschutz) nextErrors.datenschutz = "Bitte stimme der Datenverarbeitung zu.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: fullName,
      vorname: formData.vorname,
      nachname: formData.nachname,
      handy: formData.handy,
      email: formData.email,
      situation: formData.situation,
      themen: formData.themen,
      handoutAngefragt: formData.handout,
      nachricht: formData.nachricht,
      submittedAt: new Date().toLocaleString("de-DE")
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbwTxlsnj-5rl9tRBc92f3d1YF9D7Ks5KH-spmtTMZvq4gl97qDhGCT-ZwADj8hoZMtQqg/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      setSubmissions((prev) => [payload, ...prev]);
      console.log("Neue Workshop-Anfrage:", payload);
      setSubmitted(true);
    } catch (err) {
      console.error("Fehler beim Senden an Google Sheets:", err);
      alert("Beim Absenden ist ein Fehler aufgetreten. Bitte später erneut versuchen.");
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 text-slate-800">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-6 pt-4">
            <div className="inline-flex items-center rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-sm font-medium text-rose-600 shadow-sm backdrop-blur">
              Finanzworkshop für Frauen
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Dein nächster Schritt zu mehr
                <span className="block bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
                  Klarheit, Sicherheit und Vermögensaufbau
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                Danke, dass du beim Workshop dabei bist. Trag hier einfach deine Kontaktdaten ein,
                fordere dein Handout an und teile mit, welche Finanzthemen dich besonders interessieren.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
              <h2 className="text-lg font-semibold text-slate-800">Was du hier angeben kannst</h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <p>• deine Kontaktdaten für die Zusendung des Handouts</p>
                <p>• deinen aktuellen Beruf / Studien- oder Erwerbsstatus</p>
                <p>• die Themen, zu denen du dir mehr Orientierung oder Unterstützung wünschst</p>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Das Handout wird nicht direkt automatisch verschickt, sondern im Nachgang persönlich versendet.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-rose-200/40 blur-3xl" />
            <div className="absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-violet-200/40 blur-3xl" />

            <div className="relative rounded-[28px] bg-white/95 p-6 shadow-xl ring-1 ring-slate-100 backdrop-blur md:p-8">
              {!submitted ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Handout anfragen</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Bitte fülle das Formular aus. Felder mit * sind Pflichtfelder.
                    </p>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Vorname *</label>
                        <input
                          type="text"
                          value={formData.vorname}
                          onChange={(e) => updateField("vorname", e.target.value)}
                          placeholder="Vorname"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                        />
                        {errors.vorname ? <p className="text-xs text-rose-500">{errors.vorname}</p> : null}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Nachname *</label>
                        <input
                          type="text"
                          value={formData.nachname}
                          onChange={(e) => updateField("nachname", e.target.value)}
                          placeholder="Nachname"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                        />
                        {errors.nachname ? <p className="text-xs text-rose-500">{errors.nachname}</p> : null}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Handynummer *</label>
                        <input
                          type="tel"
                          value={formData.handy}
                          onChange={(e) => updateField("handy", e.target.value)}
                          placeholder="z. B. 0171 1234567"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                        />
                        {errors.handy ? <p className="text-xs text-rose-500">{errors.handy}</p> : null}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">E-Mail-Adresse *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="deinename@mail.de"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                        />
                        {errors.email ? <p className="text-xs text-rose-500">{errors.email}</p> : null}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Beruf / Studium / Erwerbsstatus *</label>
                      <select
                        value={formData.situation}
                        onChange={(e) => updateField("situation", e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                      >
                        <option value="">Bitte auswählen</option>
                        <option value="Angestellt">Angestellt</option>
                        <option value="Selbstständig">Selbstständig</option>
                        <option value="Beamtin">Beamtin</option>
                        <option value="Studentin">Studentin</option>
                        <option value="In Ausbildung">In Ausbildung</option>
                        <option value="In Elternzeit">In Elternzeit</option>
                        <option value="Aktuell nicht erwerbstätig">Aktuell nicht erwerbstätig</option>
                      </select>
                      {errors.situation ? <p className="text-xs text-rose-500">{errors.situation}</p> : null}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Welche Themen sind für dich besonders spannend? *</label>
                        <p className="mt-1 text-xs text-slate-500">Mehrfachauswahl möglich</p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {themen.map((thema) => {
                          const isSelected = formData.themen.includes(thema.value);
                          return (
                            <label
                              key={thema.value}
                              className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                                isSelected
                                  ? "border-rose-300 bg-rose-50 text-slate-800"
                                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-rose-200 hover:bg-rose-50/60"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleThema(thema.value)}
                                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-rose-500 focus:ring-rose-200"
                              />
                              <span className="leading-6">{thema.label}</span>
                            </label>
                          );
                        })}
                      </div>
                      {errors.themen ? <p className="text-xs text-rose-500">{errors.themen}</p> : null}
                    </div>

                    <div className="space-y-3 rounded-2xl border border-rose-100 bg-rose-50/70 p-4">
                      <label className="flex items-start gap-3 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={formData.handout}
                          onChange={(e) => updateField("handout", e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-rose-500 focus:ring-rose-200"
                        />
                        <span>
                          Ich möchte das <strong>Handout zum Workshop</strong> erhalten.
                        </span>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Noch etwas, das du mitteilen möchtest?</label>
                      <textarea
                        rows={3}
                        value={formData.nachricht}
                        onChange={(e) => updateField("nachricht", e.target.value)}
                        placeholder="Optional: Fragen, Wünsche, bevorzugte Kontaktzeit, konkrete Anliegen ..."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                      />
                    </div>

                    <label className="flex items-start gap-3 text-xs leading-5 text-slate-500">
                      <input
                        type="checkbox"
                        checked={formData.datenschutz}
                        onChange={(e) => updateField("datenschutz", e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-rose-500 focus:ring-rose-200"
                      />
                      <span>
                        Ich stimme der Verarbeitung meiner Daten zum Zweck der Kontaktaufnahme,
                        Zusendung des Handouts und Vorbereitung einer individuellen Beratung zu.
                      </span>
                    </label>
                    {errors.datenschutz ? <p className="-mt-2 text-xs text-rose-500">{errors.datenschutz}</p> : null}

                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
                    >
                      Anfrage absenden
                    </button>

                    <p className="text-center text-xs text-slate-400">
                      Mobil optimiert – ideal für den Aufruf per QR Code direkt im Workshop.
                    </p>
                  </form>
                </>
              ) : (
                <div className="space-y-6 py-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-2xl">
                    ✓
                  </div>
                  <div className="space-y-3 text-center">
                    <h2 className="text-2xl font-semibold tracking-tight">Vielen Dank für deine Anfrage!</h2>
                    <p className="text-sm leading-6 text-slate-600">
                      Deine Angaben wurden erfolgreich erfasst. Das Handout wird <strong>nicht sofort</strong>
                      automatisch versendet, sondern im Nachgang persönlich an dich weitergegeben.
                    </p>
                    <p className="text-sm leading-6 text-slate-500">
                      Auf Basis deiner Auswahl können die für dich relevanten Themen nun gezielt vorbereitet werden.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                    <p><strong>Name:</strong> {fullName || "—"}</p>
                    <p><strong>E-Mail:</strong> {formData.email || "—"}</p>
                    <p><strong>Handout angefragt:</strong> {formData.handout ? "Ja" : "Nein"}</p>
                    <p><strong>Gewählte Themen:</strong> {formData.themen.join(", ") || "—"}</p>
                  </div>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Neues Formular ausfüllen
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {submissions.length > 0 ? (
          <section className="mt-8 rounded-[28px] bg-white/90 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-500">
                  Demo-Übersicht
                </p>
                <h3 className="text-2xl font-semibold tracking-tight">Erfasste Anfragen für Mail / Tabelle</h3>
              </div>
              <p className="text-sm text-slate-500">
                Diese Vorschau zeigt, wie eingehende Daten strukturiert gesammelt werden können.
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Zeitpunkt</th>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Kontakt</th>
                      <th className="px-4 py-3 font-medium">Handout</th>
                      <th className="px-4 py-3 font-medium">Themen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                    {submissions.map((entry) => (
                      <tr key={`${entry.email}-${entry.submittedAt}`}>
                        <td className="px-4 py-4 align-top">{entry.submittedAt}</td>
                        <td className="px-4 py-4 align-top">{entry.name}</td>
                        <td className="px-4 py-4 align-top">
                          <div>{entry.email}</div>
                          <div className="text-slate-500">{entry.handy}</div>
                        </td>
                        <td className="px-4 py-4 align-top">{entry.handoutAngefragt ? "Ja" : "Nein"}</td>
                        <td className="px-4 py-4 align-top">{entry.themen.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
