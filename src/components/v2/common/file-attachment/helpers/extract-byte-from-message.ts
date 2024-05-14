export function extractBytesFromMessage(message: string) {
  // Extract the bytes portion from the message string
  const regex = /(\d+) bytes/;
  const match = message.match(regex);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return 0;
}
