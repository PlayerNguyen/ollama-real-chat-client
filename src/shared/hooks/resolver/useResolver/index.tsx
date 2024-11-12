export default function useResolver<T>() {
  const decoder = new TextDecoder();

  async function tick(input: Uint8Array) {
    const decodedString = decoder.decode(input);
    console.log(decodedString);
    const result = decodedString
      .split("\n")
      .filter((v) => v !== "")
      .map((v) => JSON.parse(v));

    return result as T[];
  }

  return { tick };
}
