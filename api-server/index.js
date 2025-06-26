// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // For parsing POST body

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use Gemini Flash model
const model = genAI.getGenerativeModel({
  model: "models/gemini-1.5-flash-latest"
});

app.post('/api/summary', async (req, res) => {
  const { rowCount, columnCount, sampleKeys, sampleRows, prompt } = req.body;

  if (!rowCount || !columnCount || !sampleRows || sampleRows.length === 0) {
    return res.status(400).json({ error: "Incomplete data sent" });
  }

 const finalPrompt = prompt || `
You are a data analysis assistant. Summarize the following dataset:
- Rows: ${rowCount}
- Columns: ${columnCount}
- Column names: ${sampleKeys}
- Sample rows (JSON): ${JSON.stringify(sampleRows, null, 2)}

Please provide:
1. A clear, concise overview of the data
2. Key trends, patterns, and outliers identified
3. Recommended visualizations based on the data type:
  - For numerical columns: suggest appropriate charts (scatter plots, histograms, box plots)
  - For categorical data: suggest bar charts, pie charts, or treemaps
  - For time series: suggest line charts or area charts
  - For relationships: suggest correlation matrices or heatmaps
4. For each suggested visualization, explain:
  - What insights it would reveal
  - Which columns should be used
  - The type of chart and why it's appropriate
  - Any specific parameters or settings to highlight the insights 
5. generate and display counts plots and value counts for categorical data, in a bar chart format

Focus on actionable insights and meaningful visual representations of the data.
 `;


  try {
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const summary = response.text();

    res.json({ summary });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    if (error.response) {
      const details = await error.response.text();
      console.error("Gemini API response body:", details);
    }
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

app.listen(port, () => {
  console.log(`✅ Gemini Flash API server running at http://localhost:${port}`);


});
