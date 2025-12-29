import React from 'react';

export const IconFilm = ({ className = 'w-5 h-5 inline-block mr-2' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l3-4h12l3 4" /></svg>
);

export const IconCalendar = ({ className = 'w-4 h-4 inline-block mr-1' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
);

export const IconUser = ({ className = 'w-5 h-5 inline-block mr-2' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.12 17.804zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
);

export const IconLock = ({ className = 'w-6 h-6 inline-block mr-2' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11V7a4 4 0 10-8 0v4m16 0v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8h16z"/></svg>
);

export const IconInfo = ({ className = 'w-5 h-5 inline-block mr-2' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
);

export const IconCheck = ({ className = 'w-5 h-5 inline-block mr-2 text-green-400' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
);

export const IconX = ({ className = 'w-5 h-5 inline-block mr-2 text-red-400' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
);

export const IconStar = ({ className = 'w-4 h-4 inline-block mr-2 text-yellow-400' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.98a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.98c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.784.57-1.84-.197-1.54-1.118l1.287-3.98a1 1 0 00-.364-1.118L2.044 9.407c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.287-3.98z"/></svg>
);

export const IconPin = ({ className = 'w-4 h-4 inline-block mr-1 text-indigo-300' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13 21.314 8.343 16.657M12 12v9M7 7l10 10M7 7a5 5 0 017.071 0L21 13"/></svg>
);

export const IconSearch = ({ className = 'w-4 h-4 inline-block mr-2' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/></svg>
);

export const IconMenu = ({ className = 'w-6 h-6 inline-block' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
);

export const IconCog = ({ className = 'w-5 h-5 inline-block mr-2' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a1.724 1.724 0 002.573 1.02c.87-.58 2.068.18 1.688 1.17-.22.6-.34 1.23-.34 1.88 0 .65.12 1.28.34 1.88.38.99-.82 1.75-1.69 1.17a1.724 1.724 0 00-2.57 1.02c-.299.92-1.603.92-1.902 0a1.724 1.724 0 00-2.573-1.02c-.87.58-2.068-.18-1.688-1.17.22-.6.34-1.23.34-1.88 0-.65-.12-1.28-.34-1.88-.38-.99.82-1.75 1.69-1.17a1.724 1.724 0 002.57-1.02z"/></svg>
);

export default null;
