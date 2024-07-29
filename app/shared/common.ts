import jwt from 'jsonwebtoken';
import { User } from './types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export const convertTimeStamps = (data: string) => {
    const inputDate = new Date(data);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = inputDate.toLocaleDateString('en-US', options);
    return formattedDate;   
};



export const verifyToken = (token: string): User | null => {
    const JWT_SECRET = process?.env?.JWT_SECRET || 'LMS0548$GERMANelald2$13$k1k3OISOSb';
  try {
    return jwt?.verify(token, JWT_SECRET) as User;
  } catch (error:any) {
    console.error('JWT verification error:', error?.message);
    return null;
  }
};



export const downloadHtmlAsPdf = (element: HTMLElement, filename: string) => {
  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    pdf?.addImage(imgData, 'PNG', 0, 0, pdf?.internal?.pageSize?.getWidth(), pdf?.internal?.pageSize?.getHeight());
    pdf?.save(filename);
  });
};