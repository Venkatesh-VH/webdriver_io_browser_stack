// severity: "success" | "error" | "warn"
// message: string
export default function Logger(severity, message) {
    switch (severity) {
        case "success":
            console.log("\x1b[32m", `${message} passed`);
            break;
        case "error":
            console.log("\x1b[31m", `${message} failed`);
            break;
        case "reset":
            console.log("\x1b[0m");
            break;
        default:
            console.log("\x1b[32m", message);
    }
}
