
const stateClass = (state = "default") => `is-${String(state).toLowerCase().replace(/\s+/g, "-")}`;
const boolData = (value) => (value ? "true" : "false");
const cx = (...parts) => parts.filter(Boolean).join(" ");
const optionValue = (option, index) => option.value ?? option.id ?? option.label ?? String(index);
