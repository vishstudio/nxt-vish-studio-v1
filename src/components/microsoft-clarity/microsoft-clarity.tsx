import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
} from '@/src/lib/cookie-consent';
import Script from 'next/script';

const CLARITY_PROJECT_ID = (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? '')
  .trim()
  .replace(/^['"]+|['"]+$/g, '');

export const MicrosoftClarity = () => {
  if (process.env.NODE_ENV !== 'production' || !CLARITY_PROJECT_ID) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity-loader"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            var projectId = ${JSON.stringify(CLARITY_PROJECT_ID)};
            var consentKey = '${COOKIE_CONSENT_KEY}';
            var consentEvent = '${COOKIE_CONSENT_EVENT}';
            var previewParams = ['tina', 'tina-admin', 'tina-preview', 'tinaPreview', 'visualEditing', 'preview'];
            var params = new URLSearchParams(window.location.search);
            var isPreviewRoute = window.location.pathname.indexOf('/admin') === 0;
            var hasPreviewParam = previewParams.some(function (param) { return params.has(param); });
            var isFramed = false;

            try {
              isFramed = window.self !== window.top;
            } catch (error) {
              isFramed = true;
            }

            var referrer = document.referrer.toLowerCase();
            var isTinaReferrer = referrer.indexOf('/admin') !== -1 || referrer.indexOf('tina') !== -1;

            if (isPreviewRoute || hasPreviewParam || (isFramed && isTinaReferrer)) {
              return;
            }

            function hasAnalyticsConsent() {
              try {
                var cookies = document.cookie ? document.cookie.split(';') : [];
                var prefix = consentKey + '=';
                var storedConsent = '';

                for (var index = 0; index < cookies.length; index += 1) {
                  var cookie = cookies[index].trim();
                  if (cookie.indexOf(prefix) === 0) {
                    storedConsent = cookie.slice(prefix.length);
                    break;
                  }
                }

                if (!storedConsent) return false;
                return JSON.parse(decodeURIComponent(storedConsent)).analytics === true;
              } catch (error) {
                return false;
              }
            }

            function loadMicrosoftClarity() {
              if (window.__vishMicrosoftClarityLoaded) return;

              window.__vishMicrosoftClarityLoaded = true;
              window.clarity = window.clarity || function () {
                (window.clarity.q = window.clarity.q || []).push(arguments);
              };

              var clarityScript = document.createElement('script');
              clarityScript.async = true;
              clarityScript.src = 'https://www.clarity.ms/tag/' + projectId;
              document.head.appendChild(clarityScript);
            }

            window.addEventListener(consentEvent, function (event) {
              if (event.detail && event.detail.analytics === true) {
                loadMicrosoftClarity();
              }
            });

            if (hasAnalyticsConsent()) {
              loadMicrosoftClarity();
            }
          })();
        `,
      }}
    />
  );
};
