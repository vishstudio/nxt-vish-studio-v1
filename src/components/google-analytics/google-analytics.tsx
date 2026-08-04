import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
} from "@/src/lib/cookie-consent";
import Script from "next/script";
import { GoogleAnalyticsPageView } from "./google-analytics-page-view";

const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_ID ?? "")
  .trim()
  .replace(/^['"]+|['"]+$/g, "");

export const GoogleAnalytics = () => {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var measurementId = '${GA_MEASUREMENT_ID}';
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

              function setAnalyticsStorage(value) {
                if (!window.gtag) return;

                window.gtag('consent', 'update', {
                  analytics_storage: value
                });
              }

              function loadGoogleAnalytics() {
                if (window.__vishGoogleAnalyticsLoaded) return;

                window.__vishGoogleAnalyticsLoaded = true;
                window.dataLayer = window.dataLayer || [];
                window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
                window.gtag('consent', 'default', {
                  analytics_storage: 'granted'
                });
                window.gtag('js', new Date());
                window.gtag('config', measurementId, { send_page_view: false });

                var googleTag = document.createElement('script');
                googleTag.async = true;
                googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
                document.head.appendChild(googleTag);
              }

              window.addEventListener(consentEvent, function (event) {
                if (event.detail && event.detail.analytics === true) {
                  loadGoogleAnalytics();
                } else {
                  setAnalyticsStorage('denied');
                }
              });

              if (!hasAnalyticsConsent()) {
                return;
              }

              loadGoogleAnalytics();
            })();
          `,
        }}
      />
      <GoogleAnalyticsPageView />
    </>
  );
}
