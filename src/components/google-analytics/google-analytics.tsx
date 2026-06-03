import Script from 'next/script';
import { GoogleAnalyticsPageView } from './google-analytics-page-view';

const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_ID ?? '')
  .trim()
  .replace(/^['"]+|['"]+$/g, '');

export function GoogleAnalytics() {
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

              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
              window.gtag('js', new Date());
              window.gtag('config', measurementId);

              var googleTag = document.createElement('script');
              googleTag.async = true;
              googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
              document.head.appendChild(googleTag);
            })();
          `,
        }}
      />
      <GoogleAnalyticsPageView />
    </>
  );
}
