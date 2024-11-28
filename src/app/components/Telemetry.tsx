import { useEffect } from 'react';
import { usePathname } from "next/navigation";

const TelemetryScriptLoader = () => {
  const pathname = usePathname();

  useEffect(() => {
    const scriptContent = `
      (function () {
        const BACKEND_URL = "http://localhost:8000";
        const STORAGE_KEY = "telemetry_tracker";
        const DEBUG = true;

        function log(message) {
          if (DEBUG) console.log(\`[Telemetry Tracker] \${message}\`);
        }

        function generateTrackerId() {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
              var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
              return v.toString(16);
            }
          );
        }

        class UniversalTelemetryTracker {
          constructor() {
            this.trackerId = this.initializeTrackerId();
            this.initializeTracking();

            this.completionRoutes = [
              "/completion", "/success", "/final-page", "/thank-you", "/screen5",
              "/account-opening/personal-account/review-and-submit", "/self-service/reciept",
            ];

            this.setupAutoCompletion();
          }

          setupAutoCompletion() {
            const checkCompletion = () => {
              const currentPath = window.location.pathname;
              if (this.completionRoutes.some((route) => currentPath.includes(route))) {
                this.markProcessComplete();
              }
            };

            checkCompletion();
            window.addEventListener("pushstate", checkCompletion);
            window.addEventListener("popstate", checkCompletion);
          }

          initializeTrackerId() {
            let trackerId = localStorage.getItem(STORAGE_KEY);
            if (!trackerId) {
              trackerId = generateTrackerId();
              localStorage.setItem(STORAGE_KEY, trackerId);
            }
            return trackerId;
          }

          initializeTracking() {
            const urlParams = new URLSearchParams(window.location.search);
            const initialBranch = urlParams.get("branch") || "unknown";
            const initialService = urlParams.get("service") || "unknown";
            this.startSession(initialBranch, initialService);

            this.setupFrameworkAgnosticTracking();

            window.addEventListener('beforeunload', function () {
              localStorage.removeItem('tracker_id');
            });
          }

          startSession(branch, service) {
            try {
              fetch(\`\${BACKEND_URL}/start-session\`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tracker_id: this.trackerId, branch, service }),
              }).catch((error) => log(\`Session start error: \${error}\`));
            } catch (error) {
              log(\`Session start failed: \${error}\`);
            }
          }

          setupFrameworkAgnosticTracking() {
            this.trackPageView();
            this.setupHistoryListeners();
          }

          trackPageView() {
            try {
              fetch(\`\${BACKEND_URL}/track\`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tracker_id: this.trackerId, step_name: window.location.pathname, isComplete: false }),
              }).catch((error) => log(\`Page track error: \${error}\`));
            } catch (error) {
              log(\`Page tracking failed: \${error}\`);
            }
          }

          setupHistoryListeners() {
            const originalPushState = history.pushState;
            const originalReplaceState = history.replaceState;

            history.pushState = function () {
              originalPushState.apply(history, arguments);
              window.dispatchEvent(new Event("pushstate"));
            };

            history.replaceState = function () {
              originalReplaceState.apply(history, arguments);
              window.dispatchEvent(new Event("replacestate"));
            };

            window.addEventListener("popstate", () => this.trackPageView());
            window.addEventListener("pushstate", () => this.trackPageView());
            window.addEventListener("replacestate", () => this.trackPageView());
          }

          markProcessComplete() {
            try {
              fetch(\`\${BACKEND_URL}/track\`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tracker_id: this.trackerId, step_name: window.location.pathname, isComplete: true }),
              }).catch((error) => log(\`Completion track error: \${error}\`));
            } catch (error) {
              log(\`Process completion tracking failed: \${error}\`);
            }
          }
        }

        window.telemetryTracker = new UniversalTelemetryTracker();

        window.markTelemetryComplete = () => {
          if (window.telemetryTracker) {
            window.telemetryTracker.markProcessComplete();
          }
        };
      })();
    `;

    const script = document.createElement('script');
    script.textContent = scriptContent;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [pathname]);

  return null;
};

export default TelemetryScriptLoader;
