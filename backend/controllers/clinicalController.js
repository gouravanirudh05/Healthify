export const getConditions = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${FHIR_BASE_URL}/Condition?subject=Patient/${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  export const getObservations = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${FHIR_BASE_URL}/Observation?subject=Patient/${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };