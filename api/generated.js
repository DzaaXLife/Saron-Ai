import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        const { messages } = req.body;

        if (!messages) {
            return res.status(400).json({ error: "messages required" });
        }

        const apiKey = process.env.CEREBRAS_API_KEY; 

        const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b',
                messages
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}
