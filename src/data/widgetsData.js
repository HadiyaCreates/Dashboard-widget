export const initialDashboard = [
  {
    category: 'CSPM Executive Dashboard',
    widgets: [
      { id: 1, name: 'Cloud Accounts', text: '2 Total\nConnected (2)\nNot Connected (2)' },
      { id: 2, name: 'Cloud Account Risk Assessment', text: '9659 Total\nPassed (7263)\nFailed (689)' },
    ],
  },
  {
    category: 'CWPP Dashboard',
    widgets: [
      { id: 3, name: 'Top 5 Namespace Specific Alerts', text: 'No Graph data available!' },
      { id: 4, name: 'Workload Alerts', text: 'No Graph data available!' },
    ],
  },
  {
    category: 'Registry Scan',
    widgets: [
      { id: 5, name: 'Image Risk Assessment', text: '1470 Total Vulnerabilities\nCritical (9), High (150)' },
      { id: 6, name: 'Image Security Issues', text: '2 Total Images\nCritical (2), High (2)' },
    ],
  },
];
