const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  async uploadImage(image, flightId, totalWeight) {
    const formData = new FormData();
    formData.append('image', image);
    if (flightId) formData.append('flight_id', flightId);
    if (totalWeight) formData.append('total_weight', totalWeight);

    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },

  async getWasteTypes() {
    const response = await fetch(`${API_BASE_URL}/waste-types`);
    return response.json();
  },

  async getHistory(params = {}) {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${API_BASE_URL}/history?${queryParams}`);
    return response.json();
  },

  async getStatistics(params = {}) {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${API_BASE_URL}/statistics?${queryParams}`);
    return response.json();
  },

  async submitManualAnalysis(items, flightId, totalWeight) {
    const response = await fetch(`${API_BASE_URL}/analyze/manual`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        flight_id: flightId,
        total_weight: totalWeight,
      }),
    });
    return response.json();
  }
}; 