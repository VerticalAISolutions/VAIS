function generateSound() {
    let text = document.getElementById("textInput").value.toLowerCase();

    const synth = new Tone.Synth().toDestination();

    if (text.includes("sanft") || text.includes("ruhig")) {
        synth.triggerAttackRelease("C4", "2n");
    } else if (text.includes("schnell") || text.includes("wild")) {
        synth.triggerAttackRelease("G4", "8n");
    } else {
        synth.triggerAttackRelease("E3", "4n");
    }
}
