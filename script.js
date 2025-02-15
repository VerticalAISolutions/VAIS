// Audio-Setup mit Tone.js
Tone.start(); // Erstes User-Event startet den Audio-Kontext

// Erstelle eine Effektkette
const reverb = new Tone.Reverb(4).toDestination();
const filter = new Tone.Filter(800, "lowpass").connect(reverb);
const delay = new Tone.FeedbackDelay("8n", 0.5).connect(filter);

// Komplexer Synthesizer mit FM-Synthese
const synth = new Tone.FMSynth({
    harmonicity: 2.5,  // Verhältnis von Carrier zu Modulator
    modulationIndex: 10,
    oscillator: { type: "sine" },
    envelope: { attack: 0.5, decay: 1, sustain: 0.5, release: 2 }
}).connect(delay);

// Alternative: Additive Synthese für Obertöne
const additiveSynth = new Tone.Synth({
    oscillator: {
        type: "square8" // 8 Obertöne
    },
    envelope: {
        attack: 0.3,
        decay: 1.2,
        sustain: 0.5,
        release: 3
    }
}).connect(reverb);

function generateSound() {
    let text = document.getElementById("textInput").value.toLowerCase();
    let length = text.length; // Länge des Textes beeinflusst den Sound

    if (text.includes("sanft") || text.includes("ruhig")) {
        // Tiefer, weicher Obertonklang
        additiveSynth.triggerAttackRelease("C3", length * 0.1);
    } else if (text.includes("schnell") || text.includes("wild")) {
        // Hohe, schrille Frequenzen mit FM-Synthese
        synth.harmonicity = 4;
        synth.triggerAttackRelease("G5", "8n");
    } else {
        // Zufällige Obertonstrukturen je nach Wortlänge
        let pitch = ["C4", "E4", "G4", "B4", "D5"];
        let randomNote = pitch[Math.floor(Math.random() * pitch.length)];
        additiveSynth.triggerAttackRelease(randomNote, "4n");
    }

    // Filterfrequenz variieren je nach Wortlänge
    filter.frequency.value = 200 + length * 10;
}

