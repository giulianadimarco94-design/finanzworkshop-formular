"use client";
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
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.vorname.trim()) nextErrors.vorname = "Bitte Vornamen eintragen.";
    if (!formData.nachname.trim()) nextErrors.nachname = "Bitte Nachnamen eintragen.";
    if (!formData.handy.trim()) nextErrors.handy = "Bitte Handynummer eintragen.";
    if (!formData.email.trim()) nextErrors.email = "Bitte E-Mail-Adresse eintragen.";
    if (!formData.situation.trim()) nextErrors.situation = "Bitte Status auswählen.";
    if (!formData.themen.length) nextErrors.themen = "Bitte Thema auswählen.";
    if (!formData.datenschutz) nextErrors.datenschutz = "Bitte Zustimmung geben.";

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

      setSubmitted(true);
    } catch (err) {
      alert("Fehler beim Senden");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 600, margin: "0 auto" }}>
      <h1>Finanzworkshop für Frauen</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input placeholder="Vorname" onChange={(e) => updateField("vorname", e.target.value)} /><br /><br />
          <input placeholder="Nachname" onChange={(e) => updateField("nachname", e.target.value)} /><br /><br />
          <input placeholder="Handy" onChange={(e) => updateField("handy", e.target.value)} /><br /><br />
          <input placeholder="E-Mail" onChange={(e) => updateField("email", e.target.value)} /><br /><br />

          <select onChange={(e) => updateField("situation", e.target.value)}>
            <option value="">Status wählen</option>
            <option>Angestellt</option>
            <option>Selbstständig</option>
            <option>Studentin</option>
            <option>Elternzeit</option>
          </select>

          <br /><br />

          {themen.map((t) => (
            <label key={t.value}>
              <input type="checkbox" onChange={() => toggleThema(t.value)} /> {t.label}
              <br />
            </label>
          ))}

          <br />

          <textarea placeholder="Nachricht" onChange={(e) => updateField("nachricht", e.target.value)} />

          <br /><br />

          <label>
            <input type="checkbox" onChange={(e) => updateField("datenschutz", e.target.checked)} />
            Datenschutz akzeptieren
          </label>

          <br /><br />

          <button type="submit">Absenden</button>
        </form>
      ) : (
        <h2>Danke! Deine Daten wurden gespeichert.</h2>
      )}
    </div>
  );
}
