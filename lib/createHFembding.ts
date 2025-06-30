type HFModelType = string;

interface HuggingFaceEmbeddingsInstance {
  apiKey: string;
  model: HFModelType;
  embedDocuments(texts: string[]): Promise<number[][]>;
  embedQuery(text: string): Promise<number[]>;
  _fetchEmbedding(textOrTexts: string | string[]): Promise<number[][]>;
}

// Constructor Function
export function HuggingFaceEmbeddings(
  this: HuggingFaceEmbeddingsInstance,
  apiKey: string,
  model: HFModelType = "BAAI/bge-large-en-v1.5 "
) {
  if (!(this instanceof HuggingFaceEmbeddings)) {
    return new (HuggingFaceEmbeddings as any)(apiKey, model);
  }

  this.apiKey = apiKey;
  this.model = model;
}

// Fetch embedding for single or multiple texts
HuggingFaceEmbeddings.prototype._fetchEmbedding = async function (
    this: HuggingFaceEmbeddingsInstance,
    textOrTexts: string | string[]
  ): Promise<number[][]> {
    const res = await fetch(
      `https://api-inference.huggingface.co/models/${this.model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: textOrTexts }),
      }
    );
  
    if (!res.ok) {
      throw new Error(`Hugging Face API error: ${res.status} ${res.statusText}`);
    }
  
    const data = await res.json();
  
    if (Array.isArray(textOrTexts)) {
      return data; // multiple embeddings
    } else {
      return [data]; // wrap single embedding
    }
  };
// // Helper: average embeddings across tokens to single vector
// function averageEmbeddings(embeddings: number[][]): number[] {
//   if (embeddings.length === 0) return [];
//   const length = embeddings[0].length;
//   const avg = new Array(length).fill(0);

//   for (const tokenVec of embeddings) {
//     for (let i = 0; i < length; i++) {
//       avg[i] += tokenVec[i];
//     }
//   }

//   for (let i = 0; i < length; i++) {
//     avg[i] /= embeddings.length;
//   }

//   return avg;
// }

HuggingFaceEmbeddings.prototype.embedDocuments = async function (
  this: HuggingFaceEmbeddingsInstance,
  texts: string[]
): Promise<number[][]> {
  // Directly fetch embeddings for all texts at once
  const embeddings = await this._fetchEmbedding(texts);
  return embeddings;
};

HuggingFaceEmbeddings.prototype.embedQuery = async function (
  this: HuggingFaceEmbeddingsInstance,
  text: string
): Promise<number[]> {
  const embeddings = await this._fetchEmbedding(text);
  return embeddings[0]; // return the single embedding vector for the query
};
