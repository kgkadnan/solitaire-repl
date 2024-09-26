// pages/api/log.js

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { level, message, additionalInfo } = req.body;

    // Here you could send the logs to a logging service, store them in a database, etc.
    console.log(`[${level}] ${message}`, additionalInfo);

    res.status(200).json({ status: 'ok' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
