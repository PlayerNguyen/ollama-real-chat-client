export default function useResolver<T>() {
  const decoder = new TextDecoder();

  async function tick(input: Uint8Array) {
    const decodedString = decoder.decode(input);
    console.log(decodedString);

    return JSON.parse(decoder.decode(input)) as T;
  }

  return { tick };
}
