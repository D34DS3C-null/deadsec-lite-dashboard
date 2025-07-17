
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Report {
  id: string;
  title: string;
  date: string;
  type: 'performance' | 'security' | 'network';
  summary: string;
  details: string;
  severity: 'low' | 'medium' | 'high';
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'System Performance Analysis',
    date: '2024-01-15 14:30',
    type: 'performance',
    summary: 'Overall system performance is optimal. CPU usage within normal ranges.',
    details: '# Performance Report\n\n## CPU Analysis\n- Average Usage: 23%\n- Peak Usage: 67%\n- Temperature: 45°C\n\n## Memory Analysis\n- Usage: 4.2/16 GB (26%)\n- Available: 11.8 GB\n- Swap Usage: 0 GB',
    severity: 'low'
  },
  {
    id: '2',
    title: 'Security Vulnerability Scan',
    date: '2024-01-15 13:15',
    type: 'security',
    summary: 'Found 3 potential security issues. Recommend immediate attention.',
    details: '# Security Report\n\n## Vulnerabilities Found\n- **High**: Outdated SSL certificates\n- **Medium**: Weak password policy\n- **Low**: Unused open ports\n\n## Recommendations\n1. Update SSL certificates\n2. Implement stronger password requirements\n3. Close unnecessary ports',
    severity: 'high'
  }
];

const ReportViewer = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const severityColors = {
    low: 'text-green-400 bg-green-900/20',
    medium: 'text-yellow-400 bg-yellow-900/20',
    high: 'text-red-400 bg-red-900/20'
  };

  const typeColors = {
    performance: 'text-blue-400',
    security: 'text-red-400',
    network: 'text-green-400'
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white font-mono flex items-center gap-2">
          <FileText size={20} />
          Recent Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="list" className="text-gray-300 data-[state=active]:text-white font-mono">
              Reports List
            </TabsTrigger>
            <TabsTrigger value="viewer" className="text-gray-300 data-[state=active]:text-white font-mono">
              Report Viewer
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-3">
            {mockReports.map((report) => (
              <div key={report.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold font-mono">{report.title}</h4>
                    <p className="text-gray-400 text-sm">{report.summary}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-mono ${severityColors[report.severity]}`}>
                      {report.severity.toUpperCase()}
                    </span>
                    <span className={`text-xs font-mono ${typeColors[report.type]}`}>
                      {report.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-mono">{report.date}</span>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={() => setSelectedReport(report)}
                    >
                      <Eye size={14} className="mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      <Download size={14} className="mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="viewer">
            {selectedReport ? (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white font-mono mb-2">{selectedReport.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-400 font-mono">
                    <span>Date: {selectedReport.date}</span>
                    <span>Type: {selectedReport.type}</span>
                    <span>Severity: {selectedReport.severity}</span>
                  </div>
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                  <pre className="bg-gray-900/50 p-4 rounded border border-gray-600 text-gray-300 font-mono text-sm whitespace-pre-wrap">
                    {selectedReport.details}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <FileText size={48} className="mx-auto mb-4 opacity-50" />
                <p className="font-mono">Select a report from the list to view details</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportViewer;
