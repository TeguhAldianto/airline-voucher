import { useState } from "react";
import axios from "axios";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:   #0f1f3d;
    --blue:   #1a3a6b;
    --sky:    #3b82f6;
    --gold:   #c8972a;
    --cream:  #fdf8f2;
    --light:  #eef2f9;
    --muted:  #8494ae;
    --border: rgba(15,31,61,0.1);
    --shadow-card: 0 24px 64px rgba(15,31,61,0.13), 0 4px 16px rgba(15,31,61,0.07);
  }

  .voucher-root {
    width: 100%;
    min-height: 100vh;
    background: var(--light);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 48px 20px 64px;
    position: relative;
    overflow: hidden;
    font-family: 'Outfit', sans-serif;
  }

  /* Animated gradient blobs */
  .blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
  }
  .blob-1 {
    width: 560px; height: 560px;
    background: radial-gradient(circle, #c7d9ff 0%, #ddeaff 55%, transparent 100%);
    top: -150px; left: -120px;
    opacity: 0.55;
    animation: blobDrift 14s ease-in-out infinite alternate;
  }
  .blob-2 {
    width: 420px; height: 420px;
    background: radial-gradient(circle, #fde6b5 0%, #fff0d5 55%, transparent 100%);
    bottom: -100px; right: -80px;
    opacity: 0.5;
    animation: blobDrift 10s ease-in-out infinite alternate-reverse;
  }
  .blob-3 {
    width: 280px; height: 280px;
    background: radial-gradient(circle, #c7f0ff 0%, transparent 70%);
    top: 40%; left: 60%;
    opacity: 0.35;
    animation: blobDrift 18s ease-in-out infinite alternate;
  }
  @keyframes blobDrift {
    from { transform: translate(0px, 0px) scale(1); }
    to   { transform: translate(24px, 18px) scale(1.07); }
  }

  /* ── CARD ── */
  .card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 510px;
    background: #ffffff;
    border-radius: 22px;
    box-shadow: var(--shadow-card);
    overflow: hidden;
    animation: cardIn 0.75s cubic-bezier(.22,.68,0,1.15) both;
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(36px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── HEADER ── */
  .card-header {
    background: linear-gradient(135deg, #0f1f3d 0%, #1e3a6e 100%);
    padding: 34px 38px 30px;
    position: relative;
    overflow: hidden;
  }
  .card-header::before {
    content: '';
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.05);
    top: -100px; right: -60px;
  }
  .card-header::after {
    content: '';
    position: absolute;
    width: 180px; height: 180px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.05);
    top: -40px; right: 60px;
  }
  .header-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(200,151,42,0.15);
    border: 1px solid rgba(200,151,42,0.28);
    border-radius: 100px;
    padding: 5px 14px;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #e8b84b;
    margin-bottom: 16px;
    font-weight: 500;
    position: relative;
    z-index: 1;
  }
  .header-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #e8b84b;
    animation: pulse 2s ease infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.7); }
  }
  .card-title {
    font-family: 'Playfair Display', serif;
    font-size: 31px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.15;
    position: relative;
    z-index: 1;
  }
  .card-title span {
    color: rgba(255,255,255,0.45);
    font-weight: 400;
    font-size: 28px;
  }
  .card-subtitle {
    font-size: 12.5px;
    color: rgba(255,255,255,0.38);
    margin-top: 8px;
    font-weight: 300;
    letter-spacing: 0.02em;
    position: relative;
    z-index: 1;
  }

  /* ── TEAR LINE ── */
  .tearline {
    display: flex;
    align-items: center;
    background: var(--light);
    padding: 0 6px;
    position: relative;
  }
  .tearline::before, .tearline::after {
    content: '';
    display: block;
    width: 24px; height: 24px;
    border-radius: 50%;
    background: var(--light);
    position: absolute;
    top: 50%; transform: translateY(-50%);
    z-index: 2;
    box-shadow: inset 0 2px 6px rgba(15,31,61,0.08);
  }
  .tearline::before { left: -12px; }
  .tearline::after  { right: -12px; }
  .tearline-line {
    flex: 1;
    border-top: 2px dashed rgba(15,31,61,0.1);
    margin: 11px 18px;
  }
  .tearline-label {
    font-size: 9px;
    letter-spacing: 0.24em;
    color: var(--muted);
    text-transform: uppercase;
    font-weight: 500;
    background: var(--light);
    padding: 0 4px;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
  }

  /* ── FORM BODY ── */
  .card-body {
    padding: 30px 38px 40px;
    background: white;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 18px;
    opacity: 0;
    animation: fieldIn 0.5s ease forwards;
  }
  .field:last-child { margin-bottom: 0; }

  @keyframes fieldIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 18px;
    opacity: 0;
    animation: fieldIn 0.5s ease forwards;
  }

  label {
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 500;
    padding-left: 2px;
  }

  input, select {
    width: 100%;
    background: var(--light);
    border: 1.5px solid transparent;
    border-radius: 11px;
    padding: 12px 15px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    color: var(--navy);
    font-weight: 400;
    outline: none;
    transition: border-color 0.22s, background 0.22s, box-shadow 0.22s;
    -webkit-appearance: none;
    appearance: none;
  }
  input::placeholder { color: rgba(132,148,174,0.45); font-size: 13px; }
  input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.35; cursor: pointer; }
  input:focus, select:focus {
    border-color: var(--sky);
    background: white;
    box-shadow: 0 0 0 4px rgba(59,130,246,0.09);
  }
  .select-wrap { position: relative; }
  .select-wrap::after {
    content: '⌄';
    position: absolute;
    right: 15px; top: 48%;
    transform: translateY(-50%);
    color: var(--muted);
    font-size: 17px;
    pointer-events: none;
  }
  select option { background: white; color: var(--navy); }

  /* ── BUTTON ── */
  .btn-wrap {
    margin-top: 26px;
    opacity: 0;
    animation: fieldIn 0.5s ease 0.5s forwards;
  }
  .btn-generate {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%);
    border: none;
    border-radius: 13px;
    font-family: 'Outfit', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: white;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.15s, box-shadow 0.22s;
    box-shadow: 0 6px 24px rgba(15,31,61,0.28);
  }
  .btn-generate::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0) 100%);
    transform: translateX(-100%) skewX(-18deg);
    transition: transform 0.55s;
  }
  .btn-generate:hover::after { transform: translateX(220%) skewX(-18deg); }
  .btn-generate:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(15,31,61,0.33);
  }
  .btn-generate:active { transform: translateY(0) scale(0.99); }
  .btn-generate:disabled { opacity: 0.58; cursor: not-allowed; transform: none; }

  .btn-inner {
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .plane-icon {
    font-size: 17px;
    display: inline-block;
    transition: transform 0.35s;
  }
  .btn-generate:hover .plane-icon {
    transform: translateX(5px) rotate(-15deg);
  }
  .spinner {
    width: 17px; height: 17px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
    flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── ERROR ── */
  .error-msg {
    display: flex; align-items: flex-start; gap: 10px;
    background: #fff8f8;
    border: 1.5px solid #fca5a5;
    border-radius: 11px;
    padding: 13px 15px;
    margin-top: 18px;
    font-size: 12.5px;
    color: #b91c1c;
    line-height: 1.5;
    animation: errorIn 0.3s cubic-bezier(.22,.68,0,1.4) both;
  }
  @keyframes errorIn {
    from { opacity: 0; transform: scale(0.95) translateY(-4px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* ── RESULTS ── */
  .results {
    margin-top: 30px;
    padding-top: 26px;
    border-top: 1.5px dashed var(--border);
    animation: cardIn 0.45s cubic-bezier(.22,.68,0,1.2) both;
  }
  .results-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .results-label {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--muted); font-weight: 500;
  }
  .results-badge {
    background: linear-gradient(135deg, var(--navy), var(--blue));
    color: white;
    font-size: 10px; font-weight: 600;
    padding: 4px 12px;
    border-radius: 100px;
    letter-spacing: 0.04em;
  }
  .seats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(68px, 1fr));
    gap: 10px;
  }
  .seat-chip {
    background: var(--light);
    border: 1.5px solid var(--border);
    border-radius: 11px;
    padding: 13px 8px;
    text-align: center;
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--navy);
    cursor: default;
    opacity: 0;
    animation: chipIn 0.45s cubic-bezier(.22,.68,0,1.4) forwards;
    transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .seat-chip:hover {
    border-color: var(--sky);
    background: white;
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(59,130,246,0.14);
  }
  @keyframes chipIn {
    from { opacity: 0; transform: scale(0.65) translateY(10px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
`;

export default function VoucherApp() {
    const [form, setForm] = useState({
        name: "",
        crewId: "",
        flightNumber: "",
        date: "",
        aircraft: "ATR",
    });
    const [seats, setSeats] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [seatsKey, setSeatsKey] = useState(0);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const generate = async () => {
        setError("");
        setSeats([]);
        setLoading(true);
        try {
            const check = await axios.post("/api/check", {
                flightNumber: form.flightNumber,
                date: form.date,
            });
            if (check.data.exists) {
                setError(
                    "Vouchers already generated for this flight and date.",
                );
                return;
            }
            const res = await axios.post("/api/generate", {
                name: form.name,
                id: form.crewId,
                flightNumber: form.flightNumber,
                date: form.date,
                aircraft: form.aircraft,
            });
            setSeatsKey((k) => k + 1);
            setSeats(res.data.data.seats);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "An error occurred. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    const delays = [0.15, 0.22, 0.29, 0.36, 0.43];

    return (
        <>
            <style>{css}</style>
            <div className="voucher-root">
                <div className="blob blob-1" />
                <div className="blob blob-2" />
                <div className="blob blob-3" />

                <div className="card">
                    {/* ── Header ── */}
                    <div className="card-header">
                        <div className="header-eyebrow">
                            <div className="header-dot" />
                            Crew Management System
                        </div>
                        <div className="card-title">
                            Voucher <span>&amp;</span>
                            <br />
                            Seat Generator
                        </div>
                        <div className="card-subtitle">
                            Airline crew flight allocation portal
                        </div>
                    </div>

                    {/* ── Tear line ── */}
                    <div className="tearline">
                        <div className="tearline-line" />
                        <span className="tearline-label">Flight Details</span>
                        <div className="tearline-line" />
                    </div>

                    {/* ── Form ── */}
                    <div className="card-body">
                        {/* Name + ID */}
                        <div
                            className="field-row"
                            style={{ animationDelay: `${delays[0]}s` }}
                        >
                            <div className="field" style={{ marginBottom: 0 }}>
                                <label>Crew Name</label>
                                <input
                                    name="name"
                                    placeholder="Full name"
                                    onChange={handleChange}
                                    value={form.name}
                                />
                            </div>
                            <div className="field" style={{ marginBottom: 0 }}>
                                <label>Crew ID</label>
                                <input
                                    name="crewId"
                                    placeholder="ID number"
                                    onChange={handleChange}
                                    value={form.crewId}
                                />
                            </div>
                        </div>

                        {/* Flight + Date */}
                        <div
                            className="field-row"
                            style={{ animationDelay: `${delays[1]}s` }}
                        >
                            <div className="field" style={{ marginBottom: 0 }}>
                                <label>Flight No.</label>
                                <input
                                    name="flightNumber"
                                    placeholder="e.g. GA-401"
                                    onChange={handleChange}
                                    value={form.flightNumber}
                                />
                            </div>
                            <div className="field" style={{ marginBottom: 0 }}>
                                <label>Flight Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    onChange={handleChange}
                                    value={form.date}
                                />
                            </div>
                        </div>

                        {/* Aircraft */}
                        <div
                            className="field"
                            style={{ animationDelay: `${delays[2]}s` }}
                        >
                            <label>Aircraft Type</label>
                            <div className="select-wrap">
                                <select
                                    name="aircraft"
                                    onChange={handleChange}
                                    value={form.aircraft}
                                >
                                    <option value="ATR">ATR 72-600</option>
                                    <option value="Airbus 320">
                                        Airbus A320
                                    </option>
                                    <option value="Boeing 737 Max">
                                        Boeing 737 MAX
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="btn-wrap">
                            <button
                                className="btn-generate"
                                onClick={generate}
                                disabled={loading}
                            >
                                <div className="btn-inner">
                                    {loading ? (
                                        <>
                                            <div className="spinner" />
                                            <span>Processing…</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Generate Vouchers</span>
                                            <span className="plane-icon">
                                                ✈
                                            </span>
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="error-msg">
                                <span
                                    style={{
                                        fontSize: 15,
                                        flexShrink: 0,
                                        marginTop: 1,
                                    }}
                                >
                                    ⚠️
                                </span>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Seats */}
                        {seats.length > 0 && (
                            <div className="results" key={seatsKey}>
                                <div className="results-header">
                                    <span className="results-label">
                                        Assigned Seats
                                    </span>
                                    <span className="results-badge">
                                        {seats.length} Vouchers
                                    </span>
                                </div>
                                <div className="seats-grid">
                                    {seats.map((seat, i) => (
                                        <div
                                            key={i}
                                            className="seat-chip"
                                            style={{
                                                animationDelay: `${0.06 * i}s`,
                                            }}
                                        >
                                            {seat}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
