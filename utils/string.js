export default function toTitleCase(str) {
    return str.replace(/\w\S*/g, word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
}