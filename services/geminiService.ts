
import { GoogleGenAI, Type } from "@google/genai";
import type { PreventionData } from '../types';

export const fetchPreventionData = async (): Promise<PreventionData> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
    Buat daftar cara mencegah kecanduan film porno dalam format JSON. 
    Sajikan jawaban dengan nada yang mendukung, informatif, dan praktis.
    Buat satu kunci utama: 'tipsPencegahan'. 
    Kunci ini harus berisi array objek, di mana setiap objek memiliki properti 'judul' (singkat dan jelas) dan 'deskripsi' (penjelasan praktis dalam 2-3 kalimat).
    Pastikan ada minimal 8 poin.
    `;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            tipsPencegahan: {
                type: Type.ARRAY,
                description: 'Daftar tips untuk mencegah kecanduan pornografi.',
                items: {
                    type: Type.OBJECT,
                    properties: {
                        judul: {
                            type: Type.STRING,
                            description: 'Judul singkat dari tips pencegahan.'
                        },
                        deskripsi: {
                            type: Type.STRING,
                            description: 'Deskripsi rinci dari tips pencegahan.'
                        }
                    },
                    required: ['judul', 'deskripsi']
                }
            }
        },
        required: ['tipsPencegahan']
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.6,
            },
        });
        
        const jsonText = response.text.trim();
        const data: PreventionData = JSON.parse(jsonText);
        return data;
    } catch (error) {
        console.error("Error fetching data from Gemini API:", error);
        throw new Error("Gagal berkomunikasi dengan layanan AI. Silakan coba lagi nanti.");
    }
};
