(function () {
    // Configuration
    const BACKEND_URL = "https://5a37-196-50-25-138.ngrok-free.app";
    const STORAGE_KEY = "telemetry_tracker";
    const DEBUG = true; // Set to true for console logs
  
    // Utility logging
    function log(message) {
      if (DEBUG) console.log(`[Telemetry Tracker] ${message}`);
    }
  
    // Utility functions
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
  
    // Telemetry Tracker Class
    class UniversalTelemetryTracker {
      constructor() {
        this.trackerId = this.initializeTrackerId();
        this.initializeTracking();
  
        this.completionRoutes = [
          "/completion",
          "/success",
          "/final-page",
          "/thank-you",
          "/screen5",
          "/account-opening/personal-account/review-and-submit",
          "/self-service/reciept",
        ];
  
        this.setupAutoCompletion();
      }
  
      setupAutoCompletion() {
        // Check route on each page view
        const checkCompletion = () => {
          const currentPath = window.location.pathname;
  
          if (
            this.completionRoutes.some((route) => currentPath.includes(route))
          ) {
            this.markProcessComplete();
          }
        };
  
        // Initial check and setup for future navigation
        checkCompletion();
  
        // For SPAs, setup history listeners
        window.addEventListener("pushstate", checkCompletion);
        window.addEventListener("popstate", checkCompletion);
      }
  
      initializeTrackerId() {
        // Check if tracker ID exists in localStorage
        let trackerId = localStorage.getItem(STORAGE_KEY);
  
        // If not, generate a new one
        if (!trackerId) {
          trackerId = generateTrackerId();
          localStorage.setItem(STORAGE_KEY, trackerId);
        }
  
        return trackerId;
      }
  
      initializeTracking() {
        // Extract initial parameters
        const urlParams = new URLSearchParams(window.location.search);
        const initialBranch = urlParams.get("branch") || "unknown";
        const initialService = urlParams.get("service") || "unknown";
  
        // Start initial session
        this.startSession(initialBranch, initialService);
  
        // Setup tracking for different frameworks
        this.setupFrameworkAgnosticTracking();
  
        window.addEventListener('beforeunload', function () {
          localStorage.removeItem('tracker_id');
        });
      }
  
      startSession(branch, service) {
        try {
          fetch(`${BACKEND_URL}/start-session`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tracker_id: this.trackerId,
              branch: branch,
              service: service,
            }),
          }).catch((error) => log(`Session start error: ${error}`));
        } catch (error) {
          log(`Session start failed: ${error}`);
        }
      }
  
      setupFrameworkAgnosticTracking() {
        // Track initial page load
        this.trackPageView();
  
        // Track subsequent navigation
        this.setupHistoryListeners();
      }
  
      trackPageView() {
        try {
          fetch(`${BACKEND_URL}/track`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tracker_id: this.trackerId,
              step_name: window.location.pathname,
              isComplete: false,
            }),
          }).catch((error) => log(`Page track error: ${error}`));
        } catch (error) {
          log(`Page tracking failed: ${error}`);
        }
      }
  
      setupHistoryListeners() {
        // Track pushState and replaceState
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
  
        // Track popstate (back/forward navigation)
        window.addEventListener("popstate", () => this.trackPageView());
  
        // Track custom navigation events
        window.addEventListener("pushstate", () => this.trackPageView());
        window.addEventListener("replacestate", () => this.trackPageView());
      }
  
      markProcessComplete() {
        try {
          fetch(`${BACKEND_URL}/track`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tracker_id: this.trackerId,
              step_name: window.location.pathname,
              isComplete: true,
            }),
          }).catch((error) => log(`Completion track error: ${error}`));
        } catch (error) {
          log(`Process completion tracking failed: ${error}`);
        }
      }
    }
  
    // Initialize tracker globally
    window.telemetryTracker = new UniversalTelemetryTracker();
  
    // Expose completion method
    window.markTelemetryComplete = () => {
      if (window.telemetryTracker) {
        window.telemetryTracker.markProcessComplete();
      }
    };
  })();

  