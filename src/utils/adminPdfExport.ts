import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

interface AdminReportData {
  title: string;
  dateRange: string;
  data: {
    patients: any[];
    consultations: any[];
    dateFilter: {
      startDate: string;
      endDate: string;
      period: string;
    };
  };
}

export const exportAdminPDF = ({ title, dateRange, data }: AdminReportData) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let currentY = 15;

    // Add header
    doc.setFontSize(20);
    doc.text(title, pageWidth / 2, currentY, { align: 'center' });
    
    currentY += 10;
    doc.setFontSize(12);
    doc.text(`Generated on: ${format(new Date(), 'dd, MM, yyyy HH:mm')}`, pageWidth / 2, currentY, { align: 'center' });
    
    currentY += 7;
    doc.text(`Period: ${dateRange}`, pageWidth / 2, currentY, { align: 'center' });
    
    currentY += 15;

    // Summary Statistics
    doc.setFontSize(14);
    doc.text('Summary Statistics', 14, currentY);
    currentY += 10;

    const activePatients = data.patients.filter(patient => 
      patient.admissions?.some(admission => admission.status === 'active')
    ).length;

    const activeConsultations = data.consultations.filter(consultation =>
      consultation.status === 'active'
    ).length;

    const summaryData = [
      ['Active Patients', activePatients.toString()],
      ['Active Consultations', activeConsultations.toString()],
      ['Occupancy Rate', `${Math.round((activePatients / 100) * 100)}%`]
    ];

    autoTable(doc, {
      startY: currentY,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'striped',
      headStyles: {
        fillColor: [63, 81, 181],
        fontSize: 10,
        cellPadding: 3
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: 3
      }
    });

    currentY = (doc as any).lastAutoTable.finalY + 15;

    // Department Statistics
    doc.setFontSize(14);
    doc.text('Department Statistics', 14, currentY);
    currentY += 10;

    const departments = [
      'Internal Medicine',
      'Pulmonology',
      'Neurology',
      'Gastroenterology',
      'Rheumatology',
      'Endocrinology',
      'Hematology',
      'Infectious Disease',
      'Thrombosis Medicine',
      'Immunology & Allergy'
    ];

    const departmentData = departments.map(dept => {
      const deptPatients = data.patients.filter(patient => 
        patient.admissions?.some(admission => 
          admission.department === dept && 
          admission.status === 'active'
        )
      ).length;

      const deptConsultations = data.consultations.filter(consultation =>
        consultation.consultation_specialty === dept &&
        consultation.status === 'active'
      ).length;

      return [
        dept,
        deptPatients.toString(),
        deptConsultations.toString(),
        `${Math.round((deptPatients / (deptPatients + 5)) * 100)}%`
      ];
    });

    autoTable(doc, {
      startY: currentY,
      head: [['Department', 'Active Patients', 'Pending Consultations', 'Occupancy']],
      body: departmentData,
      theme: 'striped',
      headStyles: {
        fillColor: [63, 81, 181],
        fontSize: 10,
        cellPadding: 3
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: 3
      }
    });

    currentY = (doc as any).lastAutoTable.finalY + 15;

    // Safety Admissions
    if (currentY > doc.internal.pageSize.height - 60) {
      doc.addPage();
      currentY = 15;
    }

    doc.setFontSize(14);
    doc.text('Safety Admission Statistics', 14, currentY);
    currentY += 10;

    const safetyData = data.patients
      .filter(patient => patient.admissions?.[0]?.safety_type)
      .reduce((acc: any, patient) => {
        const type = patient.admissions[0].safety_type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

    const safetyTableData = Object.entries(safetyData).map(([type, count]) => [
      type.charAt(0).toUpperCase() + type.slice(1),
      count,
      `${Math.round((Number(count) / activePatients) * 100)}%`
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Safety Type', 'Count', 'Percentage']],
      body: safetyTableData,
      theme: 'striped',
      headStyles: {
        fillColor: [63, 81, 181],
        fontSize: 10,
        cellPadding: 3
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: 3
      }
    });

    currentY = (doc as any).lastAutoTable.finalY + 15;

    // Consultation Urgency Distribution
    if (currentY > doc.internal.pageSize.height - 60) {
      doc.addPage();
      currentY = 15;
    }

    doc.setFontSize(14);
    doc.text('Consultation Urgency Distribution', 14, currentY);
    currentY += 10;

    const urgencyData = data.consultations.reduce((acc: any, consultation) => {
      acc[consultation.urgency] = (acc[consultation.urgency] || 0) + 1;
      return acc;
    }, {});

    const urgencyTableData = Object.entries(urgencyData).map(([type, count]) => [
      type.charAt(0).toUpperCase() + type.slice(1),
      count,
      `${Math.round((Number(count) / data.consultations.length) * 100)}%`
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Urgency Level', 'Count', 'Percentage']],
      body: urgencyTableData,
      theme: 'striped',
      headStyles: {
        fillColor: [63, 81, 181],
        fontSize: 10,
        cellPadding: 3
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: 3
      }
    });

    // Add footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    // Save the PDF
    doc.save(`imd-care-admin-report-${format(new Date(), 'dd-MM-yyyy-HHmm')}.pdf`);
  } catch (error) {
    console.error('Error generating admin PDF:', error);
    throw new Error('Failed to generate administrative report');
  }
};