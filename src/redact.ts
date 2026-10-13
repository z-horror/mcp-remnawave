const REDACTED = '***REDACTED***';

const SENSITIVE_KEY =
    /(private[_-]?key|secret|passphrase|password|api[_-]?key|access[_-]?token|refresh[_-]?token|token|vless[_-]?uuid|trojan[_-]?password|ss[_-]?password|subscription[_-]?url|ssconf[_-]?links|^links$)/i;

function enabled(): boolean {
    return process.env.REMNAWAVE_REDACT_SECRETS !== 'false';
}

function walk(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === 'object') {
        const out: Record<string, unknown> = {};
        for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
            out[key] = SENSITIVE_KEY.test(key) ? REDACTED : walk(val);
        }
        return out;
    }
    return value;
}

/**
 * Recursively replaces secret-bearing fields (Reality private keys, node
 * secret keys, passwords, API tokens, connection links) before they reach the
 * client. Disable with REMNAWAVE_REDACT_SECRETS=false.
 */
export function redact<T>(value: T): T {
    if (!enabled()) return value;
    return walk(value) as T;
}
