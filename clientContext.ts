/**
 * Lightweight client context for analytics/tracking.
 * Captures device, browser, locale, and environment (no passwords or PII beyond what auth already has).
 */

export interface ClientContext {
  userAgent: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  browserVersion: string | null;
  os: string;
  osVersion: string | null;
  language: string;
  languages: string[];
  screenWidth: number;
  screenHeight: number;
  timezone: string;
  timezoneOffset: number;
  platform: string;
  cookieEnabled: boolean;
  onLine: boolean;
  hardwareConcurrency: number | null;
  deviceMemory: number | null;
  touchSupport: boolean;
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  const maxTouch = 'maxTouchPoints' in navigator ? navigator.maxTouchPoints : 0;
  const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(ua) || (maxTouch > 2 && /mobile/i.test(ua));
  const isMobile = /android|webos|iphone|ipod|blackberry|iemobile|opera mini|mobile/i.test(ua);
  if (isTablet) return 'tablet';
  if (isMobile) return 'mobile';
  return 'desktop';
}

function getBrowser(): { name: string; version: string | null } {
  if (typeof navigator === 'undefined') return { name: 'unknown', version: null };
  const ua = navigator.userAgent;
  let name = 'unknown';
  let version: string | null = null;
  const versionMatch = (regex: RegExp): string | null => {
    const m = ua.match(regex);
    return m ? m[1] : null;
  };
  if (ua.includes('Edg/')) {
    name = 'Edge';
    version = versionMatch(/Edg\/([\d.]+)/);
  } else if (ua.includes('Chrome') && !ua.includes('Chromium')) {
    name = 'Chrome';
    version = versionMatch(/Chrome\/([\d.]+)/);
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    name = 'Safari';
    version = versionMatch(/Version\/([\d.]+)/);
  } else if (ua.includes('Firefox')) {
    name = 'Firefox';
    version = versionMatch(/Firefox\/([\d.]+)/);
  } else if (ua.includes('Opera') || ua.includes('OPR')) {
    name = 'Opera';
    version = versionMatch(/OPR\/([\d.]+)/) || versionMatch(/Opera\/([\d.]+)/);
  }
  return { name, version };
}

function getOS(): { name: string; version: string | null } {
  if (typeof navigator === 'undefined') return { name: 'unknown', version: null };
  const ua = navigator.userAgent;
  let name = 'unknown';
  let version: string | null = null;
  const versionMatch = (regex: RegExp): string | null => {
    const m = ua.match(regex);
    return m ? m[1] : null;
  };
  if (ua.includes('Win')) {
    name = 'Windows';
    if (ua.includes('Windows NT 10')) version = '10/11';
  } else if (ua.includes('Mac')) {
    name = 'macOS';
    version = versionMatch(/Mac OS X ([\d_]+)/);
  } else if (ua.includes('Android')) {
    name = 'Android';
    version = versionMatch(/Android ([\d.]+)/);
  } else if (ua.includes('iPhone') || ua.includes('iPad')) {
    name = 'iOS';
    version = versionMatch(/OS ([\d_]+)/);
  } else if (ua.includes('Linux')) name = 'Linux';
  return { name, version };
}

export function getClientContext(): ClientContext {
  const nav = typeof navigator !== 'undefined' ? navigator : ({} as Navigator);
  const screen = typeof window !== 'undefined' ? window.screen : ({} as Screen);
  const browser = getBrowser();
  const os = getOS();
  let timezone = 'UTC';
  let timezoneOffset = 0;
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezoneOffset = new Date().getTimezoneOffset();
  } catch (_) {}
  return {
    userAgent: nav.userAgent || '',
    deviceType: getDeviceType(),
    browser: browser.name,
    browserVersion: browser.version,
    os: os.name,
    osVersion: os.version,
    language: nav.language || '',
    languages: Array.isArray(nav.languages) ? [...nav.languages] : [],
    screenWidth: screen.width ?? 0,
    screenHeight: screen.height ?? 0,
    timezone,
    timezoneOffset,
    platform: nav.platform || '',
    cookieEnabled: nav.cookieEnabled ?? false,
    onLine: nav.onLine ?? true,
    hardwareConcurrency: 'hardwareConcurrency' in nav ? (nav as any).hardwareConcurrency : null,
    deviceMemory: 'deviceMemory' in nav ? (nav as any).deviceMemory : null,
    touchSupport: 'ontouchstart' in (typeof window !== 'undefined' ? window : {}),
  };
}

/** Build lastSeen* fields for Firestore from current client context */
export function getLastSeenTracking(): Record<string, unknown> {
  const ctx = getClientContext();
  const now = Date.now();
  return {
    lastSeenAt: now,
    lastSeenUserAgent: ctx.userAgent,
    lastSeenDeviceType: ctx.deviceType,
    lastSeenBrowser: ctx.browser,
    lastSeenBrowserVersion: ctx.browserVersion,
    lastSeenOs: ctx.os,
    lastSeenOsVersion: ctx.osVersion,
    lastSeenTimezone: ctx.timezone,
    lastSeenLanguage: ctx.language,
    lastSeenScreenWidth: ctx.screenWidth,
    lastSeenScreenHeight: ctx.screenHeight,
    lastSeenPlatform: ctx.platform,
    lastSeenTouchSupport: ctx.touchSupport,
    lastSeenOnLine: ctx.onLine,
    lastSeenHardwareConcurrency: ctx.hardwareConcurrency,
    lastSeenDeviceMemory: ctx.deviceMemory,
  };
}
