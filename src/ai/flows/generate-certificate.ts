'use server';

/**
 * @fileOverview A flow for generating a PDF course certificate.
 *
 * - generateCertificate - A function that creates a PDF certificate.
 * - GenerateCertificateInput - The input type for the generateCertificate function.
 * - GenerateCertificateOutput - The return type for the generateCertificate function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { jsPDF } from 'jspdf';

const GenerateCertificateInputSchema = z.object({
    userName: z.string().describe('The name of the user to appear on the certificate.'),
    courseName: z.string().describe('The name of the course.'),
});
export type GenerateCertificateInput = z.infer<typeof GenerateCertificateInputSchema>;

const GenerateCertificateOutputSchema = z.object({
    pdfDataUri: z.string().describe("A data URI of the generated PDF certificate. Must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."),
});
export type GenerateCertificateOutput = z.infer<typeof GenerateCertificateOutputSchema>;

export async function generateCertificate(
    input: GenerateCertificateInput
): Promise<GenerateCertificateOutput> {
    return generateCertificateFlow(input);
}


const generateCertificateFlow = ai.defineFlow(
    {
        name: 'generateCertificateFlow',
        inputSchema: GenerateCertificateInputSchema,
        outputSchema: GenerateCertificateOutputSchema,
    },
    async ({ userName, courseName }) => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'in',
            format: 'letter'
        });

        // Add a border
        doc.setLineWidth(0.05);
        doc.rect(0.5, 0.5, 10, 7.5);

        // Add header
        doc.setFontSize(36);
        doc.setFont('helvetica', 'bold');
        doc.text('Med TechAI Academy', 5.5, 1.5, { align: 'center' });

        doc.setFontSize(24);
        doc.setFont('helvetica', 'normal');
        doc.text('Certificate of Completion', 5.5, 2.5, { align: 'center' });

        doc.setFontSize(14);
        doc.text('This certifies that', 5.5, 3.5, { align: 'center' });

        doc.setFontSize(32);
        doc.setFont('helvetica', 'bold');
        doc.text(userName, 5.5, 4.5, { align: 'center' });

        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text('has successfully completed the course', 5.5, 5.5, { align: 'center' });

        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text(courseName, 5.5, 6.5, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Date of Completion: ${new Date().toLocaleDateString()}`, 2, 7.5);


        const pdfDataUri = doc.output('datauristring');

        return {
            pdfDataUri,
        };
    }
);
