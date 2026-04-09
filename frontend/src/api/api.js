import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const analyzeReport = async (inputData, language = 'English') => {
    try {
        let config = {};
        let data = inputData;

        // If inputData is FormData (file upload), let axios set headers automatically
        if (inputData instanceof FormData) {
            inputData.append('language', language);
            config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
        } else {
            // Default to JSON for raw text
            data = { report_text: inputData, language };
        }

        const response = await api.post('/analyze', data, config);
        return response.data;
    } catch (error) {
        console.error('Error analyzing report:', error);
        throw error;
    }
};

export const chatWithAssistant = async (prompt, language = 'English', history = '') => {
    try {
        const response = await api.post('/chat', { prompt, language, history });
        return response.data;
    } catch (error) {
        console.error('Error chatting with assistant:', error);
        throw error;
    }
};

export const saveReport = async (summaryData) => {
    try {
        const response = await api.post('/save', summaryData);
        return response.data;
    } catch (error) {
        console.error('Error saving report:', error);
        throw error;
    }
};

export default api;
