// import { render, unmountComponentAtNode } from '@testing-library/react';
// import { usePathname } from 'next/navigation';
// import TelemetryScriptLoader from '@/app/components/Telemetry';

// jest.mock('next/navigation', () => ({
//   usePathname: jest.fn(),
// }));

// describe('TelemetryScriptLoader', () => {
//   let container: HTMLElement;

//   beforeEach(() => {
//     container = document.createElement('div');
//     document.body.appendChild(container);
//   });

//   afterEach(() => {
//     unmountComponentAtNode(container);
//   });

//   test('loads telemetry script on page load', () => {
//     usePathname.mockReturnValue('/test-path');
//     render(<TelemetryScriptLoader />, { container });

//     const scriptTag = document.querySelector('script') as HTMLScriptElement;
//     expect(scriptTag).toBeInTheDocument();
//     expect(scriptTag.src).toBe('https://8283-154-161-162-219.ngrok-free.app/static/telemetry-tracker.js');
//     expect(scriptTag.async).toBe(true);
//   });

//   test('removes telemetry script on unmount', () => {
//     usePathname.mockReturnValue('/another-path');
//     const { unmount } = render(<TelemetryScriptLoader />, { container });

//     let scriptTag = document.querySelector('script') as HTMLScriptElement;
//     expect(scriptTag).toBeInTheDocument();

//     unmount();

//     scriptTag = document.querySelector('script');
//     expect(scriptTag).toBeNull();
//   });
// });
