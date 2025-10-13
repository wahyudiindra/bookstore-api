export const ThrottleLimit = {
    SHORT: { default: { limit: 3, ttl: 1000 } },
    MEDIUM: { default: { limit: 20, ttl: 10000 } },
    LONG: { default: { limit: 100, ttl: 60000 } },
};
