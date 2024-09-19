const axios = require('axios');

const PROJECT_ID = '288dc03c-17ed-48d9-ab54-6af56dd2b005';
const VERSION_ID = 'ec9e5857-167a-4357-9bb3-49c290c985ef';
const TOKEN = 'ZTRiY2ZhZWEtZTlhOC00ZTgwLWJjODMtNTNiMmMzMmRmOWRiOjllZWI2MTJiLTk1ZTktNGRlZC05NWYyLTBkYjRmYzRlNWVjOQ==';

const API_BASE_URL = 'https://blackduck.vulcancyber.com/api';
const TOKEN_URL = `${API_BASE_URL}/tokens/authenticate`;
const PROJECT_ENDPOINT_URL = `${API_BASE_URL}/projects/${PROJECT_ID}/versions/${VERSION_ID}`;

async function getToken() {
    try {
        const response = await axios.post(TOKEN_URL, null, {
            headers: {
                'Authorization': `token ${TOKEN}`
            }
        });

        return response.data.bearerToken;
    } catch (error) {
        console.error('Error getting token:', error.message);
    }
}

async function getProjectDetails(token) {
    try {
        const response = await axios.get(PROJECT_ENDPOINT_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Project Details:', response.data);
    } catch (error) {
        console.error('Error getting project details:', error.message);
    }
}

async function getProjectRiskProfile(token) {
    try {
        const response = await axios.get(`${PROJECT_ENDPOINT_URL}/risk-profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Project Risk Profile:', response.data);
    } catch (error) {
        console.error('Error getting project risk profile:', error.message);
    }
}

async function getProjectComponents(token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects/${PROJECT_ID}/versions/${VERSION_ID}/components`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = response.data.items.slice(0, 3);

        console.log('Project Components:', data);
        return data;
    } catch (error) {
        console.error('Error getting project components:', error.message);
    }
}

async function getComponentVulnerabilities(token, componentId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/components/${componentId}/vulnerabilities`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(`Vulnerabilities for component ${componentId}:`, response.data);
    } catch (error) {
        console.error(`Error getting vulnerabilities for component ${componentId}:`, error.message);
    }
}

async function main() {
    const token = await getToken();
    if (!token) {
        console.error('No token');
        return;
    }

    console.log('Create new token successfully');

    await getProjectDetails(token);
    await getProjectRiskProfile(token);

    const components = await getProjectComponents(token);
    if (components) {
        for (const component of components) {
            const componentId = component.component.split("/").pop(); // Get the last part of the url that contain the component id
            await getComponentVulnerabilities(token, componentId);
        }
    }

    console.log('Finish all api requests');
}

main();
